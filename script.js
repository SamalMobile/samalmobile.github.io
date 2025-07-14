import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';
import { getFirestore, collection, doc, setDoc, getDoc, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDTP7OFv5ivz4QUEAv7vu3o0sg8Pv2kscA",
    authDomain: "samalmobile.firebaseapp.com",
    databaseURL: "https://samalmobile-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "samalmobile",
    storageBucket: "samalmobile.firebasestorage.app",
    messagingSenderId: "462186581897",
    appId: "1:462186581897:web:c9a644a4fe986a481ddb58",
    measurementId: "G-JHFCPFDCH5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Load products
let products = [];
const loadProducts = async () => {
    try {
        const response = await fetch('products.json');
        if (!response.ok) throw new Error('Failed to fetch products');
        products = await response.json();
        displayProducts(products);
        displayFeaturedProducts(products.slice(0, 3));
    } catch (error) {
        console.error('Error loading products:', error);
        const errorMessages = document.querySelectorAll('#error-message');
        errorMessages.forEach(msg => {
            msg.classList.remove('hidden');
            msg.textContent = 'Failed to load products. Please try again later.';
        });
    }
};
loadProducts();

// Cart
let cart = [];

// User state
let user = null;
onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
        try {
            const cachedUser = sessionStorage.getItem('user');
            if (cachedUser) {
                user = JSON.parse(cachedUser);
                const cartDoc = await getDoc(doc(db, 'carts', firebaseUser.uid));
                cart = cartDoc.exists() ? cartDoc.data().items || [] : [];
            } else {
                const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                user = userDoc.exists() ? { ...userDoc.data(), uid: firebaseUser.uid } : null;
                if (user) {
                    sessionStorage.setItem('user', JSON.stringify(user));
                    const cartDoc = await getDoc(doc(db, 'carts', firebaseUser.uid));
                    cart = cartDoc.exists() ? cartDoc.data().items || [] : [];
                } else {
                    console.error('User data not found in Firestore for UID:', firebaseUser.uid);
                    await signOut(auth); // Force logout if user data missing
                    user = null;
                    cart = [];
                    sessionStorage.removeItem('user');
                    window.location.href = 'login.html';
                }
            }
            document.querySelectorAll('#cart-link').forEach(link => link.classList.remove('hidden'));
        } catch (error) {
            console.error('Error checking user state:', error.message, error.code);
            user = null;
            cart = [];
            sessionStorage.removeItem('user');
            document.querySelectorAll('#cart-link').forEach(link => link.classList.add('hidden'));
            window.location.href = 'login.html';
        }
    } else {
        user = null;
        cart = [];
        sessionStorage.removeItem('user');
        document.querySelectorAll('#cart-link').forEach(link => link.classList.add('hidden'));
    }
    updateUserStatus();
    updateCart();
});

// Signup form handling
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const mobile = document.getElementById('mobile').value;
        const location = document.getElementById('location').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('signup-error');
        const successMessage = document.getElementById('signup-success');
        const loadingMessage = document.getElementById('signup-loading');

        // Input validation
        if (!/^\d{10}$/.test(mobile)) {
            errorMessage.classList.remove('hidden');
            errorMessage.textContent = 'Please enter a valid 10-digit mobile number.';
            successMessage.classList.add('hidden');
            return;
        }
        if (password.length < 6) {
            errorMessage.classList.remove('hidden');
            errorMessage.textContent = 'Password must be at least 6 characters long.';
            successMessage.classList.add('hidden');
            return;
        }

        loadingMessage.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        successMessage.classList.add('hidden');

        try {
            // Check mobile number uniqueness
            console.log('Checking mobile number:', mobile);
            const mobileQuery = query(collection(db, 'users'), where('mobile', '==', mobile));
            const mobileExists = await getDocs(mobileQuery).catch(err => {
                console.error('Mobile query failed:', err.message, err.code);
                throw new Error('Failed to check mobile number. Ensure Firestore index for "mobile" exists.');
            });
            if (!mobileExists.empty) {
                console.log('Mobile number exists:', mobile);
                errorMessage.classList.remove('hidden');
                errorMessage.textContent = 'This mobile number is already registered.';
                loadingMessage.classList.add('hidden');
                return;
            }

            // Check email uniqueness
            console.log('Checking email:', email);
            const emailQuery = query(collection(db, 'users'), where('email', '==', email));
            const emailExists = await getDocs(emailQuery).catch(err => {
                console.error('Email query failed:', err.message, err.code);
                throw new Error('Failed to check email. Ensure Firestore index for "email" exists.');
            });
            if (!emailExists.empty) {
                console.log('Email exists:', email);
                errorMessage.classList.remove('hidden');
                errorMessage.textContent = 'This email is already registered. Try logging in.';
                loadingMessage.classList.add('hidden');
                return;
            }

            // Create user
            console.log('Creating user with email:', email);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password).catch(err => {
                console.error('Auth error:', err.message, err.code);
                if (err.code === 'auth/email-already-in-use') {
                    throw new Error('This email is already registered. Try logging in.');
                } else if (err.code === 'auth/invalid-email') {
                    throw new Error('Please enter a valid email address.');
                } else if (err.code === 'auth/weak-password') {
                    throw new Error('Password is too weak. Use at least 6 characters.');
                } else {
                    throw new Error('Signup failed. Please try again.');
                }
            });

            // Write to Firestore
            console.log('Writing user data for UID:', userCredential.user.uid);
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                name,
                email,
                mobile,
                location
            }).catch(err => {
                console.error('Firestore write failed:', err.message, err.code);
                throw new Error('Failed to save user data. Check Firestore rules.');
            });

            sessionStorage.setItem('user', JSON.stringify({ name, email, mobile, location, uid: userCredential.user.uid }));
            successMessage.classList.remove('hidden');
            successMessage.textContent = 'Signup successful! Redirecting...';
            errorMessage.classList.add('hidden');
            setTimeout(() => window.location.href = 'index.html', 1500);
        } catch (error) {
            console.error('Signup error:', error.message, error.code);
            errorMessage.classList.remove('hidden');
            errorMessage.textContent = error.message.includes('permission-denied') 
                ? 'Signup failed due to server permissions. Contact support or check Firestore rules.' 
                : error.message;
            successMessage.classList.add('hidden');
        } finally {
            loadingMessage.classList.add('hidden');
        }
    });
}

// Login form handling
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = document.getElementById('email-or-mobile').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('login-error');
        const loadingMessage = document.getElementById('login-loading');

        if (!input || !password) {
            errorMessage.classList.remove('hidden');
            errorMessage.textContent = 'Please enter both email/mobile and password.';
            return;
        }

        loadingMessage.classList.remove('hidden');
        errorMessage.classList.add('hidden');

        try {
            let email = input;
            if (/^\d{10}$/.test(input)) {
                console.log('Querying Firestore for mobile:', input);
                const mobileQuery = query(collection(db, 'users'), where('mobile', '==', input));
                const mobileDocs = await getDocs(mobileQuery).catch(err => {
                    console.error('Mobile query failed:', err.message, err.code);
                    throw new Error('Failed to check mobile number. Ensure Firestore index for "mobile" exists.');
                });
                if (mobileDocs.empty) {
                    errorMessage.classList.remove('hidden');
                    errorMessage.textContent = 'No account found with this mobile number.';
                    loadingMessage.classList.add('hidden');
                    return;
                }
                email = mobileDocs.docs[0].data().email;
                console.log('Found email for mobile:', email);
            }

            console.log('Attempting login with email:', email);
            await signInWithEmailAndPassword(auth, email, password).catch(err => {
                console.error('Login failed:', err.message, err.code);
                if (err.code === 'auth/wrong-password') {
                    throw new Error('Incorrect password. Try again or reset your password.');
                } else if (err.code === 'auth/user-not-found') {
                    throw new Error('No account found with this email.');
                } else if (err.code === 'auth/invalid-email') {
                    throw new Error('Please enter a valid email or mobile number.');
                } else if (err.code === 'auth/too-many-requests') {
                    throw new Error('Too many login attempts. Please try again later.');
                } else {
                    throw new Error('Login failed. Please try again.');
                }
            });

            // Verify user data exists in Firestore
            const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
            if (!userDoc.exists()) {
                console.error('User data not found in Firestore for UID:', auth.currentUser.uid);
                await signOut(auth);
                throw new Error('User data not found. Please sign up again.');
            }

            window.location.href = 'index.html';
        } catch (error) {
            console.error('Login error:', error.message, error.code);
            errorMessage.classList.remove('hidden');
            errorMessage.textContent = error.message;
        } finally {
            loadingMessage.classList.add('hidden');
        }
    });
}

// Forget user
async function forgetUser() {
    const input = document.getElementById('email-or-mobile').value;
    const message = document.getElementById('forget-user-message');
    message.classList.remove('hidden');
    if (!input) {
        message.textContent = 'Please enter an email or mobile number.';
        message.classList.remove('text-green-500');
        message.classList.add('text-red-500');
        return;
    }
    try {
        let userQuery;
        if (/^\d{10}$/.test(input)) {
            console.log('Querying Firestore for mobile:', input);
            userQuery = query(collection(db, 'users'), where('mobile', '==', input));
        } else {
            console.log('Querying Firestore for email:', input);
            userQuery = query(collection(db, 'users'), where('email', '==', input));
        }
        const userDocs = await getDocs(userQuery).catch(err => {
            console.error('Forget user query failed:', err.message, err.code);
            throw new Error('Failed to check user. Ensure Firestore indexes for "mobile" and "email" exist.');
        });
        if (!userDocs.empty) {
            const userData = userDocs.docs[0].data();
            message.textContent = `User found: ${userData.name}, Mobile: ${userData.mobile}, Email: ${userData.email}`;
            message.classList.remove('text-red-500');
            message.classList.add('text-green-500');
        } else {
            message.textContent = 'No user found with this email or mobile number.';
            message.classList.remove('text-green-500');
            message.classList.add('text-red-500');
        }
    } catch (error) {
        console.error('Forget user error:', error.message, error.code);
        message.textContent = error.message.includes('permission-denied') 
            ? 'Failed to check user due to server permissions. Contact support.' 
            : 'Error: ' + error.message;
        message.classList.remove('text-green-500');
        message.classList.add('text-red-500');
    }
}

// Forget password
async function forgetPassword() {
    const input = document.getElementById('email-or-mobile').value;
    const message = document.getElementById('forget-password-message');
    message.classList.remove('hidden');
    if (!input) {
        message.textContent = 'Please enter an email or mobile number.';
        message.classList.remove('text-green-500');
        message.classList.add('text-red-500');
        return;
    }
    try {
        let email = input;
        if (/^\d{10}$/.test(input)) {
            console.log('Querying Firestore for mobile:', input);
            const mobileQuery = query(collection(db, 'users'), where('mobile', '==', input));
            const mobileDocs = await getDocs(mobileQuery).catch(err => {
                console.error('Forget password query failed:', err.message, err.code);
                throw new Error('Failed to check mobile number. Ensure Firestore index for "mobile" exists.');
            });
            if (mobileDocs.empty) {
                message.textContent = 'No account found with this mobile number.';
                message.classList.remove('text-green-500');
                message.classList.add('text-red-500');
                return;
            }
            email = mobileDocs.docs[0].data().email;
            console.log('Found email for mobile:', email);
        }

        console.log('Sending password reset email to:', email);
        await sendPasswordResetEmail(auth, email).catch(err => {
            console.error('Password reset failed:', err.message, err.code);
            if (err.code === 'auth/invalid-email') {
                throw new Error('Please enter a valid email address.');
            } else if (err.code === 'auth/user-not-found') {
                throw new Error('No account found with this email.');
            } else {
                throw new Error('Failed to send password reset email. Please try again.');
            }
        });

        message.textContent = 'Password reset email sent. Check your inbox.';
        message.classList.remove('text-red-500');
        message.classList.add('text-green-500');
    } catch (error) {
        console.error('Forget password error:', error.message, error.code);
        message.textContent = error.message.includes('permission-denied') 
            ? 'Failed to process request due to server permissions. Contact support.' 
            : 'Error: ' + error.message;
        message.classList.remove('text-green-500');
        message.classList.add('text-red-500');
    }
}

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formError = document.getElementById('form-error');
        const formSuccess = document.getElementById('form-success');
        try {
            const response = await fetch('https://formspree.io/f/xeozjkqj', {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                formSuccess.classList.remove('hidden');
                formError.classList.add('hidden');
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Contact form error:', error.message);
            formError.classList.remove('hidden');
            formSuccess.classList.add('hidden');
            formError.textContent = 'Failed to submit form. Please try again.';
        }
    });
}

// Update user status in navbar
function updateUserStatus() {
    const userStatusElements = document.querySelectorAll('#user-status');
    const loginLinks = document.querySelectorAll('#login-link');
    userStatusElements.forEach(el => {
        if (user) {
            el.innerHTML = `Welcome, ${user.name} | <a href="#" onclick="logout()">Logout</a>`;
            loginLinks.forEach(link => link.classList.add('hidden'));
        } else {
            el.innerHTML = '';
            loginLinks.forEach(link => link.classList.remove('hidden'));
        }
    });
}

// Logout function
function logout() {
    signOut(auth).then(() => {
        user = null;
        cart = [];
        sessionStorage.removeItem('user');
        updateUserStatus();
        updateCart();
        window.location.href = 'login.html';
    }).catch(err => {
        console.error('Logout failed:', err.message, err.code);
        alert('Failed to log out. Please try again.');
    });
}

// Display products
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    if (productList) {
        productList.innerHTML = '';
        if (products.length === 0) {
            productList.innerHTML = '<p class="text-center">No products available in this category.</p>';
        } else {
            products.forEach(product => {
                const card = `
                    <div class="product-card bg-white p-4 rounded shadow">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover mb-4" onerror="this.src='https://via.placeholder.com/150'; this.alt='Image not available'; console.error('Failed to load image for ${product.name}: ${product.image}');">
                        <h3 class="text-xl font-bold">${product.name}</h3>
                        <p class="text-gray-600">₹${product.price.toLocaleString('en-IN')}</p>
                        <button onclick="addToCart(${product.id})" class="bg-blue-600 text-white py-2 px-4 rounded mt-2">Add to Cart</button>
                    </div>
                `;
                productList.innerHTML += card;
            });
        }
    }
}

// Display featured products
function displayFeaturedProducts(products) {
    const featuredList = document.getElementById('featured-products');
    if (featuredList) {
        featuredList.innerHTML = '';
        if (products.length === 0) {
            featuredList.innerHTML = '<p class="text-center">No featured products available.</p>';
        } else {
            products.forEach(product => {
                const card = `
                    <div class="product-card bg-white p-4 rounded shadow">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover mb-4" onerror="this.src='https://via.placeholder.com/150'; this.alt='Image not available'; console.error('Failed to load image for ${product.name}: ${product.image}');">
                        <h3 class="text-xl font-bold">${product.name}</h3>
                        <p class="text-gray-600">₹${product.price.toLocaleString('en-IN')}</p>
                        <button onclick="addToCart(${product.id})" class="bg-blue-600 text-white py-2 px-4 rounded mt-2">Add to Cart</button>
                    </div>
                `;
                featuredList.innerHTML += card;
            });
        }
    }
}

// Add to cart
async function addToCart(productId) {
    if (!user) {
        alert('Please log in to add items to the cart.');
        window.location.href = 'login.html';
        return;
    }
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        try {
            await setDoc(doc(db, 'carts', user.uid), { items: cart });
            updateCart();
        } catch (err) {
            console.error('Cart write failed:', err.message, err.code);
            alert('Failed to update cart. Please try again.');
        }
    }
}

// Remove from cart
async function removeFromCart(index) {
    if (!user) {
        alert('Please log in to modify the cart.');
        window.location.href = 'login.html';
        return;
    }
    cart.splice(index, 1);
    try {
        await setDoc(doc(db, 'carts', user.uid), { items: cart });
        updateCart();
    } catch (err) {
        console.error('Cart write failed:', err.message, err.code);
        alert('Failed to update cart. Please try again.');
    }
}

// Update cart
async function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if (cartCount && user) cartCount.textContent = cart.length;
    if (cartItems && user) {
        cartItems.innerHTML = '';
        let total = 0;
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="text-center">Your cart is empty.</p>';
        } else {
            cart.forEach((item, index) => {
                cartItems.innerHTML += `
                    <div class="flex justify-between p-2 border-b">
                        <span>${item.name}</span>
                        <div>
                            <span>₹${item.price.toLocaleString('en-IN')}</span>
                            <button onclick="removeFromCart(${index})" class="text-red-500 underline ml-4">Remove</button>
                        </div>
                    </div>
                `;
                total += item.price;
            });
            cartTotal.textContent = `Total: ₹${total.toLocaleString('en-IN')}`;
        }
    }
}

// Toggle cart visibility
document.querySelectorAll('a[href="#cart"]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (!user) {
            e.preventDefault();
            alert('Please log in to view the cart.');
            window.location.href = 'login.html';
            return;
        }
        const cartSection = document.getElementById('cart');
        if (cartSection) {
            cartSection.classList.toggle('hidden');
            updateCart();
        }
    });
});

// Category filter
const categoryFilter = document.getElementById('category-filter');
if (categoryFilter) {
    categoryFilter.addEventListener('change', (e) => {
        const category = e.target.value;
        if (category === 'all') {
            displayProducts(products);
        } else {
            const filteredProducts = products.filter(p => p.category === category);
            displayProducts(filteredProducts);
        }
    });
}
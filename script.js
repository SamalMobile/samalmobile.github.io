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

// Load products with error handling
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
            msg.textContent = 'Failed to load products. Please check back later.';
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
            }
        }
    } else {
        user = null;
        cart = [];
        sessionStorage.removeItem('user');
    }
    updateUserStatus();
    updateCart();
});

// Signup form handling with 10-digit mobile validation
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

        // Validate 10-digit mobile number
        if (!/^\d{10}$/.test(mobile)) {
            errorMessage.classList.remove('hidden');
            errorMessage.textContent = 'Mobile number must be exactly 10 digits.';
            successMessage.classList.add('hidden');
            return;
        }

        loadingMessage.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        successMessage.classList.add('hidden');

        try {
            // Check for existing mobile number
            const mobileQuery = query(collection(db, 'users'), where('mobile', '==', mobile));
            const mobileExists = await getDocs(mobileQuery);
            if (!mobileExists.empty) {
                errorMessage.classList.remove('hidden');
                errorMessage.textContent = 'Mobile number already exists.';
                loadingMessage.classList.add('hidden');
                return;
            }

            // Create user and write to Firestore
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                name,
                email,
                mobile,
                location
            });
            sessionStorage.setItem('user', JSON.stringify({ name, email, mobile, location, uid: userCredential.user.uid }));
            successMessage.classList.remove('hidden');
            errorMessage.classList.add('hidden');
            signupForm.reset();
        } catch (error) {
            errorMessage.classList.remove('hidden');
            errorMessage.textContent = error.message.includes('permission-denied') ? 'Signup failed due to server permissions. Please try again.' : error.message;
            successMessage.classList.add('hidden');
        } finally {
            loadingMessage.classList.add('hidden');
        }
    });
}

// Login form handling with mobile or email
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = document.getElementById('email-or-mobile').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('login-error');
        const loadingMessage = document.getElementById('login-loading');

        loadingMessage.classList.remove('hidden');
        errorMessage.classList.add('hidden');

        try {
            let email = input;
            if (/^\d{10}$/.test(input)) {
                const mobileQuery = query(collection(db, 'users'), where('mobile', '==', input));
                const mobileDocs = await getDocs(mobileQuery);
                if (mobileDocs.empty) {
                    errorMessage.classList.remove('hidden');
                    errorMessage.textContent = 'No account found with this mobile number.';
                    loadingMessage.classList.add('hidden');
                    return;
                }
                email = mobileDocs.docs[0].data().email;
            }
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = 'index.html';
        } catch (error) {
            errorMessage.classList.remove('hidden');
            errorMessage.textContent = 'Invalid email/mobile or password.';
        } finally {
            loadingMessage.classList.add('hidden');
        }
    });
}

// Forget user with mobile or email
async function forgetUser() {
    const input = document.getElementById('email-or-mobile').value;
    const message = document.getElementById('forget-user-message');
    message.classList.remove('hidden');
    try {
        let userQuery;
        if (/^\d{10}$/.test(input)) {
            userQuery = query(collection(db, 'users'), where('mobile', '==', input));
        } else {
            userQuery = query(collection(db, 'users'), where('email', '==', input));
        }
        const userDocs = await getDocs(userQuery);
        if (!userDocs.empty) {
            const userData = userDocs.docs[0].data();
            message.textContent = `User found: ${userData.name}, Mobile: ${userData.mobile}, Email: ${userData.email}`;
            message.classList.remove('text-green-500');
            message.classList.add('text-green-500');
        } else {
            message.textContent = 'No user found with this email or mobile number.';
            message.classList.remove('text-green-500');
            message.classList.add('text-red-500');
        }
    } catch (error) {
        message.textContent = 'Error checking user: ' + error.message;
        message.classList.remove('text-green-500');
        message.classList.add('text-red-500');
    }
}

// Forget password with mobile or email
async function forgetPassword() {
    const input = document.getElementById('email-or-mobile').value;
    const message = document.getElementById('forget-password-message');
    message.classList.remove('hidden');
    if (!input) {
        message.textContent = 'Please enter your email or mobile number.';
        message.classList.remove('text-green-500');
        message.classList.add('text-red-500');
        return;
    }
    try {
        let email = input;
        if (/^\d{10}$/.test(input)) {
            const mobileQuery = query(collection(db, 'users'), where('mobile', '==', input));
            const mobileDocs = await getDocs(mobileQuery);
            if (mobileDocs.empty) {
                message.textContent = 'No account found with this mobile number.';
                message.classList.remove('text-green-500');
                message.classList.add('text-red-500');
                return;
            }
            email = mobileDocs.docs[0].data().email;
        }
        await sendPasswordResetEmail(auth, email);
        message.textContent = 'Password reset email sent. Check your inbox.';
        message.classList.remove('text-red-500');
        message.classList.add('text-green-500');
    } catch (error) {
        message.textContent = 'Error: ' + error.message;
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
    });
}

// Display products with image error handling
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
                        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover mb-4" onerror="this.src='https://via.placeholder.com/150'; this.alt='Image not available';">
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

// Display featured products with image error handling
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
                        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover mb-4" onerror="this.src='https://via.placeholder.com/150'; this.alt='Image not available';">
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

// Add to cart (restricted to logged-in users)
async function addToCart(productId) {
    if (!user) {
        alert('Please log in to add items to the cart.');
        window.location.href = 'login.html';
        return;
    }
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        await setDoc(doc(db, 'carts', user.uid), { items: cart });
        updateCart();
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
    await setDoc(doc(db, 'carts', user.uid), { items: cart });
    updateCart();
}

// Update cart
async function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if (cartCount) cartCount.textContent = cart.length;
    if (cartItems) {
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
    link.addEventListener('click', () => {
        if (!user) {
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
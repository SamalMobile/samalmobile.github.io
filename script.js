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
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Users and login state
let users = JSON.parse(localStorage.getItem('users')) || [];
let user = JSON.parse(localStorage.getItem('user')) || null;
updateUserStatus();

// Signup form handling
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const mobile = document.getElementById('mobile').value;
        const location = document.getElementById('location').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('signup-error');
        const successMessage = document.getElementById('signup-success');

        if (users.find(u => u.mobile === mobile || u.email === email)) {
            errorMessage.classList.remove('hidden');
            errorMessage.textContent = 'Mobile number or email already exists.';
            successMessage.classList.add('hidden');
            return;
        }

        users.push({ name, email, mobile, location, password });
        localStorage.setItem('users', JSON.stringify(users));
        successMessage.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        signupForm.reset();
    });
}

// Login form handling
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const mobile = document.getElementById('mobile').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('login-error');

        const foundUser = users.find(u => u.mobile === mobile && u.password === password);
        if (foundUser) {
            user = foundUser;
            localStorage.setItem('user', JSON.stringify(user));
            updateUserStatus();
            window.location.href = 'index.html';
        } else {
            errorMessage.classList.remove('hidden');
            errorMessage.textContent = 'Invalid mobile number or password.';
        }
    });
}

// Forget user
function forgetUser() {
    const mobile = document.getElementById('mobile').value;
    const message = document.getElementById('forget-user-message');
    const foundUser = users.find(u => u.mobile === mobile);
    message.classList.remove('hidden');
    if (foundUser) {
        message.textContent = `User found: ${foundUser.name}, Email: ${foundUser.email}`;
        message.classList.remove('text-red-500');
        message.classList.add('text-green-500');
    } else {
        message.textContent = 'No user found with this mobile number.';
        message.classList.remove('text-green-500');
        message.classList.add('text-red-500');
    }
}

// Forget password
function forgetPassword() {
    const mobile = document.getElementById('mobile').value;
    const message = document.getElementById('forget-password-message');
    const foundUser = users.find(u => u.mobile === mobile);
    message.classList.remove('hidden');
    if (foundUser) {
        const newPassword = prompt('Enter new password:');
        if (newPassword) {
            foundUser.password = newPassword;
            localStorage.setItem('users', JSON.stringify(users));
            message.textContent = 'Password reset successfully. Please log in.';
            message.classList.remove('text-red-500');
            message.classList.add('text-green-500');
        } else {
            message.textContent = 'Password reset cancelled.';
            message.classList.remove('text-green-500');
            message.classList.add('text-red-500');
        }
    } else {
        message.textContent = 'No user found with this mobile number.';
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
    user = null;
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    cart = [];
    updateUserStatus();
    updateCart();
    window.location.href = 'login.html';
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
function addToCart(productId) {
    if (!user) {
        alert('Please log in to add items to the cart.');
        window.location.href = 'login.html';
        return;
    }
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
}

// Update cart
function updateCart() {
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
            cart.forEach(item => {
                cartItems.innerHTML += `
                    <div class="flex justify-between p-2 border-b">
                        <span>${item.name}</span>
                        <span>₹${item.price.toLocaleString('en-IN')}</span>
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
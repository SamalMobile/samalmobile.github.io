// Load products
let products = [];
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        displayProducts(products);
        displayFeaturedProducts(products.slice(0, 3)); // Show first 3 products on home page
    });

// Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Display products
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    if (productList) {
        productList.innerHTML = '';
        products.forEach(product => {
            const card = `
                <div class="product-card bg-white p-4 rounded shadow">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover mb-4">
                    <h3 class="text-xl font-bold">${product.name}</h3>
                    <p class="text-gray-600">₹${product.price}</p>
                    <button onclick="addToCart(${product.id})" class="bg-blue-600 text-white py-2 px-4 rounded mt-2">Add to Cart</button>
                </div>
            `;
            productList.innerHTML += card;
        });
    }
}

// Display featured products on home page
function displayFeaturedProducts(products) {
    const featuredList = document.getElementById('featured-products');
    if (featuredList) {
        featuredList.innerHTML = '';
        products.forEach(product => {
            const card = `
                <div class="product-card bg-white p-4 rounded shadow">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover mb-4">
                    <h3 class="text-xl font-bold">${product.name}</h3>
                    <p class="text-gray-600">₹${product.price}</p>
                    <button onclick="addToCart(${product.id})" class="bg-blue-600 text-white py-2 px-4 rounded mt-2">Add to Cart</button>
                </div>
            `;
            featuredList.innerHTML += card;
        });
    }
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Update cart
function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartCount.textContent = cart.length;
    if (cartItems) {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            cartItems.innerHTML += `
                <div class="flex justify-between p-2 border-b">
                    <span>${item.name}</span>
                    <span>₹${item.price}</span>
                </div>
            `;
            total += item.price;
        });
        cartTotal.textContent = `Total: ₹${total}`;
    }
}

// Toggle cart visibility
document.querySelectorAll('a[href="#cart"]').forEach(link => {
    link.addEventListener('click', () => {
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

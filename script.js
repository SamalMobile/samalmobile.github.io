// Load products
let products = [];
const loadProducts = async () => {
    try {
        const response = await fetch('products.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}: Failed to fetch products`);
        products = await response.json();
        displayProducts(products);
        displayFeaturedProducts(products.slice(0, 3));
    } catch (error) {
        console.error('Error loading products:', error.message);
        document.querySelectorAll('#error-message').forEach(msg => {
            msg.classList.remove('hidden');
            msg.textContent = 'Failed to load products. Please try again later.';
        });
    }
};
loadProducts();

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
                throw new Error(`HTTP ${response.status}: Form submission failed`);
            }
        } catch (error) {
            console.error('Contact form error:', error.message);
            formError.classList.remove('hidden');
            formSuccess.classList.add('hidden');
            formError.textContent = 'Failed to submit form. Please try again.';
        }
    });
}

// Display products
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    if (productList) {
        productList.innerHTML = '';
        if (products.length === 0) {
            productList.innerHTML = '<p class="text-center text-gray-700">No products available in this category.</p>';
        } else {
            products.forEach(product => {
                const card = `
                    <div class="product-card bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded-lg mb-4" onerror="this.src='https://via.placeholder.com/150'; this.alt='Image not available'; console.error('Failed to load image for ${product.name}: ${product.image}');">
                        <h3 class="text-xl font-bold text-gray-800">${product.name}</h3>
                        <p class="text-gray-600">₹${product.price.toLocaleString('en-IN')}</p>
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
            featuredList.innerHTML = '<p class="text-center text-gray-700">No featured products available.</p>';
        } else {
            products.forEach(product => {
                const card = `
                    <div class="product-card bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded-lg mb-4" onerror="this.src='https://via.placeholder.com/150'; this.alt='Image not available'; console.error('Failed to load image for ${product.name}: ${product.image}');">
                        <h3 class="text-xl font-bold text-gray-800">${product.name}</h3>
                        <p class="text-gray-600">₹${product.price.toLocaleString('en-IN')}</p>
                    </div>
                `;
                featuredList.innerHTML += card;
            });
        }
    }
}

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
// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

if (themeToggle) {
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }

    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        if (document.documentElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            localStorage.setItem('theme', 'light');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
    });
}

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

// Feedback form handling
const feedbackForm = document.getElementById('feedback-form');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const feedbackError = document.getElementById('feedback-error');
        const feedbackSuccess = document.getElementById('feedback-success');
        try {
            const response = await fetch('https://formspree.io/f/xeozjkqj', {
                method: 'POST',
                body: new FormData(feedbackForm),
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                feedbackSuccess.classList.remove('hidden');
                feedbackError.classList.add('hidden');
                feedbackForm.reset();
            } else {
                throw new Error(`HTTP ${response.status}: Feedback submission failed`);
            }
        } catch (error) {
            console.error('Feedback form error:', error.message);
            feedbackError.classList.remove('hidden');
            feedbackSuccess.classList.add('hidden');
            feedbackError.textContent = 'Failed to submit feedback. Please try again.';
        }
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
            productList.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3');
            products.forEach(product => {
                const card = `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/150'; this.alt='Image not available'; console.error('Failed to load image for ${product.name}: ${product.image}');">
                        <h3 class="text-xl font-bold">${product.name}</h3>
                        <p>₹${product.price.toLocaleString('en-IN')}</p>
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
            featuredList.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3');
            products.forEach(product => {
                const card = `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/150'; this.alt='Image not available'; console.error('Failed to load image for ${product.name}: ${product.image}');">
                        <h3 class="text-xl font-bold">${product.name}</h3>
                        <p>₹${product.price.toLocaleString('en-IN')}</p>
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
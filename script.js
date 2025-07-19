// Load your product data
const products = [
    {"brand": "Samsung", "model": "Galaxy F05", "price": 7999, "back_cover": "Silicone Soft Case", "back_cover_price": 299, "front_glass": "Tempered Glass 9H", "front_glass_price": 199},
    {"brand": "Samsung", "model": "Galaxy M05", "price": 7999, "back_cover": "Silicone Soft Case", "back_cover_price": 299, "front_glass": "Tempered Glass 9H", "front_glass_price": 199},
    // ... rest of your product data
];

// Global filter state
let currentFilters = {
    brand: 'all',
    minPrice: 0,
    maxPrice: 200000,
    sort: 'default'
};

let filteredProducts = [...products];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    initializePriceRange();
    renderProducts(products);
    updateResultsCount();
});

// Set up all event listeners[1][2][3]
function setupEventListeners() {
    // Brand filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleBrandFilter);
    });

    // Price range slider
    const priceRange = document.getElementById('priceRange');
    const currentMaxPrice = document.getElementById('currentMaxPrice');
    
    priceRange.addEventListener('input', (e) => {
        currentMaxPrice.textContent = `₹${parseInt(e.target.value).toLocaleString()}`;
    });

    // Apply price filter button
    document.querySelector('.apply-filter-btn').addEventListener('click', applyPriceFilter);

    // Sort select
    document.getElementById('sortSelect').addEventListener('change', handleSort);

    // Clear filters button
    document.querySelector('.clear-filters-btn').addEventListener('click', clearAllFilters);

    // Price input fields
    document.getElementById('minPrice').addEventListener('change', handlePriceInputs);
    document.getElementById('maxPrice').addEventListener('change', handlePriceInputs);

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

// Initialize price range based on product data[6][12]
function initializePriceRange() {
    const prices = products.map(p => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    const priceRange = document.getElementById('priceRange');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    
    priceRange.min = minPrice;
    priceRange.max = maxPrice;
    priceRange.value = maxPrice;
    
    minPriceInput.placeholder = minPrice.toString();
    maxPriceInput.placeholder = maxPrice.toString();
    
    currentFilters.minPrice = minPrice;
    currentFilters.maxPrice = maxPrice;
    
    document.getElementById('currentMaxPrice').textContent = `₹${maxPrice.toLocaleString()}`;
}

// Handle brand filtering[2][5]
function handleBrandFilter(e) {
    // Remove active class from all buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    e.target.classList.add('active');
    
    // Update filter state
    currentFilters.brand = e.target.dataset.brand;
    
    // Apply all filters
    applyAllFilters();
}

// Handle price filter application[6][12]
function applyPriceFilter() {
    const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseInt(document.getElementById('maxPrice').value) || parseInt(document.getElementById('priceRange').value);
    
    currentFilters.minPrice = minPrice;
    currentFilters.maxPrice = maxPrice;
    
    applyAllFilters();
}

// Handle price input changes
function handlePriceInputs() {
    const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseInt(document.getElementById('maxPrice').value) || 200000;
    
    // Update slider position
    document.getElementById('priceRange').value = maxPrice;
    document.getElementById('currentMaxPrice').textContent = `₹${maxPrice.toLocaleString()}`;
}

// Handle sorting[1][8]
function handleSort(e) {
    currentFilters.sort = e.target.value;
    applyAllFilters();
}

// Apply all filters and sorting[9][10]
function applyAllFilters() {
    let filtered = [...products];
    
    // Apply brand filter
    if (currentFilters.brand !== 'all') {
        filtered = filtered.filter(product => product.brand === currentFilters.brand);
    }
    
    // Apply price filter
    filtered = filtered.filter(product => 
        product.price >= currentFilters.minPrice && 
        product.price <= currentFilters.maxPrice
    );
    
    // Apply sorting
    switch (currentFilters.sort) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'name-az':
            filtered.sort((a, b) => a.model.localeCompare(b.model));
            break;
        case 'name-za':
            filtered.sort((a, b) => b.model.localeCompare(a.model));
            break;
        default:
            // Keep original order
            break;
    }
    
    filteredProducts = filtered;
    renderProducts(filtered);
    updateResultsCount();
}

// Render products to the grid
function renderProducts(productsToRender) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        productGrid.innerHTML = `
            <div class="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your filters to see more products.</p>
            </div>
        `;
        return;
    }
    
    productsToRender.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Create individual product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-header">
            <div class="product-brand">${product.brand}</div>
            <div class="product-price">₹${product.price.toLocaleString()}</div>
        </div>
        
        <h3 class="product-title">${product.model}</h3>
        
        <div class="accessories-info">
            <h4>Available Accessories:</h4>
            <div class="accessory-item">
                <span>${product.back_cover}</span>
                <span class="accessory-price">₹${product.back_cover_price}</span>
            </div>
            <div class="accessory-item">
                <span>${product.front_glass}</span>
                <span class="accessory-price">₹${product.front_glass_price}</span>
            </div>
        </div>
        
        <button class="add-to-cart" onclick="addToCart('${product.model}')">
            Add to Cart
        </button>
    `;
    
    return card;
}

// Update results count
function updateResultsCount() {
    document.getElementById('resultsCount').textContent = filteredProducts.length;
}

// Clear all filters[5]
function clearAllFilters() {
    // Reset filter state
    currentFilters = {
        brand: 'all',
        minPrice: 0,
        maxPrice: 200000,
        sort: 'default'
    };
    
    // Reset UI elements
    document.querySelector('.filter-btn[data-brand="all"]').classList.add('active');
    document.querySelectorAll('.filter-btn:not([data-brand="all"])').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    document.getElementById('priceRange').value = 200000;
    document.getElementById('currentMaxPrice').textContent = '₹200,000';
    document.getElementById('sortSelect').value = 'default';
    
    // Re-render all products
    renderProducts(products);
    filteredProducts = [...products];
    updateResultsCount();
}

// Add to cart functionality
function addToCart(productModel) {
    const button = event.target;
    const originalText = button.textContent;
    
    // Visual feedback
    button.textContent = 'Added! ✓';
    button.style.background = '#10b981';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        button.disabled = false;
    }, 2000);
    
    // Add your cart logic here
    console.log(`Added ${productModel} to cart`);
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

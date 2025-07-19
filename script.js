// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Product Data
const products = [
    {
        id: 1,
        name: "iPhone 15 Pro Max",
        price: "$1,199",
        emoji: "📱",
        category: "smartphones"
    },
    {
        id: 2,
        name: "AirPods Pro",
        price: "$249",
        emoji: "🎧",
        category: "accessories"
    },
    {
        id: 3,
        name: "MagSafe Charger",
        price: "$39",
        emoji: "⚡",
        category: "accessories"
    },
    {
        id: 4,
        name: "Premium Case",
        price: "$59",
        emoji: "🛡️",
        category: "accessories"
    },
    {
        id: 5,
        name: "Galaxy S24 Ultra",
        price: "$1,299",
        emoji: "📱",
        category: "smartphones"
    },
    {
        id: 6,
        name: "Wireless Stand",
        price: "$79",
        emoji: "🔌",
        category: "accessories"
    }
];

// Render Products
function renderProducts() {
    const productGrid = document.querySelector('.product-grid');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">${product.price}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });
}

// Add to Cart Functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    // Add visual feedback
    const button = event.target;
    const originalText = button.textContent;
    
    button.textContent = 'Added! ✓';
    button.style.background = '#10b981';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 1500);
    
    // Here you would typically add to cart logic
    console.log('Added to cart:', product);
}

// Smooth Scrolling
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

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Search Functionality
function addSearchFeature() {
    const header = document.querySelector('.nav-container');
    const searchHTML = `
        <div class="search-container">
            <input type="text" placeholder="Search products..." class="search-input" id="searchInput">
            <button class="search-btn">🔍</button>
        </div>
    `;
    
    // Add search styles
    const searchStyles = `
        .search-container {
            display: flex;
            align-items: center;
            background: var(--bg-light);
            border-radius: 25px;
            padding: 0.5rem 1rem;
            margin-left: 2rem;
        }
        
        .search-input {
            border: none;
            background: transparent;
            outline: none;
            padding: 0.5rem;
            font-size: 0.9rem;
            width: 200px;
        }
        
        .search-btn {
            border: none;
            background: transparent;
            cursor: pointer;
            font-size: 1rem;
        }
        
        @media (max-width: 768px) {
            .search-container {
                display: none;
            }
        }
    `;
    
    // Add styles to head
    const style = document.createElement('style');
    style.textContent = searchStyles;
    document.head.appendChild(style);
    
    // Add search to header
    header.insertAdjacentHTML('beforeend', searchHTML);
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        filterProducts(query);
    });
}

function filterProducts(query) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach((card, index) => {
        const product = products[index];
        const matchesSearch = product.name.toLowerCase().includes(query) || 
                            product.category.toLowerCase().includes(query);
        
        if (matchesSearch) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

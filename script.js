// script.js
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const productTableBody = document.getElementById('product-table-body');
    const brandFilter = document.getElementById('brand-filter');
    const priceFilter = document.getElementById('price-filter');
    const sortBy = document.getElementById('sort-by');

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateToggleIcon(savedTheme);

    // Toggle theme on button click
    toggleButton.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleIcon(newTheme);
    });

    // Update sun/moon icon
    function updateToggleIcon(theme) {
        toggleButton.innerHTML = theme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    }

    // Fetch and display products from product.json
    if (productTableBody) {
        let products = [];

        // Fetch products with cache-busting
        fetch(`product.json?t=${Date.now()}`, { cache: 'no-store' })
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch product.json');
                return response.json();
            })
            .then(data => {
                products = data;
                populateBrandFilter();
                updateProducts();
            })
            .catch(error => {
                console.error('Error loading products:', error);
                productTableBody.innerHTML = '<tr><td colspan="7">Error loading products. Please try again.</td></tr>';
            });

        // Populate brand filter dynamically
        function populateBrandFilter() {
            const brands = [...new Set(products.map(product => product.brand))];
            brands.forEach(brand => {
                const option = document.createElement('option');
                option.value = brand;
                option.textContent = brand;
                brandFilter.appendChild(option);
            });
        }

        // Filter products
        function filterProducts() {
            const selectedBrand = brandFilter.value;
            const priceRange = priceFilter.value;

            let filteredProducts = [...products];

            // Filter by brand
            if (selectedBrand !== 'all') {
                filteredProducts = filteredProducts.filter(product => product.brand === selectedBrand);
            }

            // Filter by price range
            if (priceRange !== 'all') {
                const [minPrice, maxPrice] = priceRange.split('-').map(Number);
                filteredProducts = filteredProducts.filter(product => 
                    product.price >= minPrice && (maxPrice ? product.price <= maxPrice : true)
                );
            }

            return filteredProducts;
        }

        // Sort products
        function sortProducts(productsToSort) {
            const sortValue = sortBy.value;
            return productsToSort.sort((a, b) => {
                if (sortValue === 'price-asc') return a.price - b.price;
                if (sortValue === 'price-desc') return b.price - a.price;
                if (sortValue === 'name-asc') return a.model.localeCompare(b.model);
                if (sortValue === 'name-desc') return b.model.localeCompare(a.model);
                return 0;
            });
        }

        // Update table with filtered and sorted products
        function updateProducts() {
            const filteredProducts = filterProducts();
            const sortedProducts = sortProducts(filteredProducts);
            productTableBody.innerHTML = '';
            if (sortedProducts.length === 0) {
                productTableBody.innerHTML = '<tr><td colspan="7">No products found.</td></tr>';
                return;
            }
            sortedProducts.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.brand}</td>
                    <td>${product.model}</td>
                    <td>${product.price.toLocaleString('en-IN')}</td>
                    <td>${product.back_cover}</td>
                    <td>${product.back_cover_price.toLocaleString('en-IN')}</td>
                    <td>${product.front_glass}</td>
                    <td>${product.front_glass_price.toLocaleString('en-IN')}</td>
                `;
                productTableBody.appendChild(row);
            });
        }

        // Event listeners for filters and sort
        brandFilter.addEventListener('change', updateProducts);
        priceFilter.addEventListener('change', updateProducts);
        sortBy.addEventListener('change', updateProducts);
    }
});
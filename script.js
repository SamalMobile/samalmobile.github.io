(function() {
  const routes = {
    home: document.getElementById('home') || document.querySelector('main'),
    products: document.querySelector('main > h1'),
    about: document.getElementById('about-section') || null,
    contact: document.getElementById('contact-section') || null
  };

  function navigate() {
    const hash = location.hash.replace('#', '') || 'home';
    // Hide all main sections
    document.querySelectorAll('main > *').forEach(el => el.style.display='none');

    if (hash === 'home') {
      document.querySelector('main').style.display='block';
    } else if (hash === 'products') {
      window.location.href='products.html';
    } else if (hash === 'about') {
      window.location.href='about.html';
    } else if (hash === 'contact') {
      window.location.href='contact.html';
    }
  }

  window.addEventListener('hashchange', navigate);
  window.addEventListener('load', navigate);

  // Optional: Add event listeners to nav links if needed to prevent full page reload
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const route = e.target.getAttribute('href').replace('#', '');
      location.hash = route;
    });
  });
})();

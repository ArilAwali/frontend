(function () {
    function initNavbar() {
        const navbarContainer = document.querySelector('.crypto-navbar') || document.querySelector('header') || document.querySelector('.navbar');
        if (!navbarContainer) return;

        // Determine current page filename
        let path = window.location.pathname;
        let page = path.split('/').pop();
        if (!page || page === '') page = 'home-desktop.html';
        page = decodeURIComponent(page);

        // Detect if page is inside the portal folder
        let isPortal = path.includes('/portal/');
        let rootPrefix = isPortal ? '../' : '';

        // Generate Buttons based on page
        let authButtonsHtml = '';
        if (page === 'login.html') {
            authButtonsHtml = `<a href="${rootPrefix}daftar.html" class="navbar-btn btn-filled" id="btn-register">Daftar</a>`;
        } else if (page === 'daftar.html') {
            authButtonsHtml = `<a href="${rootPrefix}login.html" class="navbar-btn btn-outline" id="btn-login">Masuk</a>`;
        } else {
            authButtonsHtml = `
                <a href="${rootPrefix}login.html" class="navbar-btn btn-outline" id="btn-login">Masuk</a>
                <a href="${rootPrefix}daftar.html" class="navbar-btn btn-filled" id="btn-register">Daftar</a>
            `;
        }

        // Generate HTML Structure
        navbarContainer.className = 'crypto-navbar';
        navbarContainer.innerHTML = `
            <div class="navbar-container">
                <a href="${rootPrefix}home-desktop.html" class="navbar-logo">
                    <span class="logo-text">Universitas Crypto</span>
                </a>
                
                <div class="navbar-menu-wrapper" id="navbarMenu">
                    <nav class="navbar-links">
                        <a href="${rootPrefix}home-desktop.html" class="nav-item-link ${page === 'home-desktop.html' ? 'active' : ''}" id="nav-home">Beranda</a>
                        <a href="${rootPrefix}informasi.html" class="nav-item-link ${page === 'informasi.html' ? 'active' : ''}" id="nav-informasi">Informasi</a>
                        <a href="${rootPrefix}bantuan.html" class="nav-item-link ${page === 'bantuan.html' ? 'active' : ''}" id="nav-bantuan">Bantuan</a>
                    </nav>
                    
                    <div class="navbar-auth">
                        ${authButtonsHtml}
                    </div>
                </div>
                
                <button class="navbar-mobile-toggle" id="mobileToggle" aria-label="Toggle menu">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </button>
            </div>
        `;

        // Toggle logic
        const mobileToggle = document.getElementById('mobileToggle');
        const navbarMenu = document.getElementById('navbarMenu');

        if (mobileToggle && navbarMenu) {
            mobileToggle.addEventListener('click', function () {
                mobileToggle.classList.toggle('open');
                navbarMenu.classList.toggle('open');
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbar);
    } else {
        initNavbar();
    }
})();

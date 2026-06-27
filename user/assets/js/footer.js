(function () {
    function initFooter() {
        const footerContainer = document.getElementById('footer');
        if (!footerContainer) return;

        // Determine current page filename
        let path = window.location.pathname;
        let page = path.split('/').pop();
        if (!page || page === '') page = 'home desktop.html';
        page = decodeURIComponent(page);

        footerContainer.innerHTML = `
         <div class="container">
            <div class="footer-content">
                <div class="footer-logo">Universitas Crypto</div>
                <p>Mencetak generasi unggul yang berjiwa pejuang, profesional, dan berintegritas tinggi untuk Indonesia
                    maju.</p>
                <div class="social-links">
                    <a href="#" class="social-icon"><i class="fa-brands fa-youtube"></i></a>
                    <a href="#" class="social-icon"><i class="fa-solid fa-share-nodes"></i></a>
                    <a href="#" class="social-icon"><i class="fa-brands fa-instagram"></i></a>
                </div>
            </div>
            <div class="footer-bottom">
                &copy; 2026 Universitas Crypto. Sistem Penerimaan Mahasiswa Baru.
            </div>
        </div>
        `;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFooter);
    } else {
        initFooter();
    }
})();

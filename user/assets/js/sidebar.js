(function () {
    function initSidebar() {
        const sidebarContainer = document.querySelector('.sidebar') || document.querySelector('nav.sidebar') || document.querySelector('#sidebar-container');
        if (!sidebarContainer) return;

        // 1. Tentukan halaman aktif saat ini
        let path = window.location.pathname;
        let page = path.split('/').pop();
        if (!page || page === '') page = 'beranda.html';
        page = decodeURIComponent(page);

        // 2. Tentukan prefix path (apakah file berada di dalam folder portal)
        let isPortal = path.includes('/portal/');
        let portalPrefix = isPortal ? '' : 'portal/';
        let rootPrefix = isPortal ? '../' : '';

        // 3. Ambil status registrasi ulang dari localStorage
        const isRegistered = localStorage.getItem('isRegistered') === 'true';

        // 4. Bangun menu PMB (Pendaftaran) secara dinamis
        let pmbMenuHtml = `
            <a href="${portalPrefix}biodata.html" class="nav-link nav-item menu-item ${page === 'biodata.html' ? 'active' : ''}"><i class="fas fa-user fa-regular fa-user"></i> <span>Biodata</span></a>
            <a href="${portalPrefix}formulir.html" class="nav-link nav-item menu-item ${page === 'formulir.html' ? 'active' : ''}"><i class="fas fa-file-alt fa-solid fa-bars-staggered"></i> <span>Formulir Pendaftaran</span></a>
            <a href="${portalPrefix}dokumen.html" class="nav-link nav-item menu-item ${page === 'dokumen.html' ? 'active' : ''}"><i class="fas fa-folder fa-regular fa-file-lines"></i> <span>Dokumen</span></a>
            <a href="${portalPrefix}status-pendaftaran.html" class="nav-link nav-item menu-item ${page === 'status-pendaftaran.html' ? 'active' : ''}"><i class="fas fa-check-circle fa-regular fa-circle-check"></i> <span>Status Pendaftaran</span></a>
        `;

        if (!isRegistered) {
            pmbMenuHtml += `
                <a href="${portalPrefix}registrasi-ulang.html" class="nav-link nav-item menu-item ${(page === 'registrasi-ulang.html' || page === 'pembayaran-ukt.html') ? 'active' : ''}"><i class="fas fa-id-card fa-regular fa-id-card"></i> <span>Registrasi Ulang</span></a>
            `;
        }

        // 5. Bangun menu tambahan jika SUDAH registrasi
        let extendedMenuHtml = '';
        if (isRegistered) {
            extendedMenuHtml = `
            <div class="nav-section menu-section" style="margin-top: 15px;">
                <div class="menu-title">AKADEMIK</div>
                <a href="${portalPrefix}dashboard-akademik.html" class="nav-link nav-item menu-item ${page === 'dashboard-akademik.html' ? 'active' : ''}"><i class="fas fa-columns fa-solid fa-border-all"></i> <span>Dashboard Akademik</span></a>
                <a href="${portalPrefix}krs.html" class="nav-link nav-item menu-item ${page === 'krs.html' ? 'active' : ''}"><i class="fas fa-book-open fa-solid fa-book"></i> <span>KRS</span></a>
                <a href="${portalPrefix}khs.html" class="nav-link nav-item menu-item ${page === 'khs.html' ? 'active' : ''}"><i class="fas fa-star fa-regular fa-star"></i> <span>KHS (Nilai)</span></a>
                <a href="${portalPrefix}transkrip.html" class="nav-link nav-item menu-item ${page === 'transkrip.html' ? 'active' : ''}"><i class="fas fa-file-invoice fa-solid fa-graduation-cap"></i> <span>Transkrip</span></a>
                <a href="${portalPrefix}jadwal.html" class="nav-link nav-item menu-item ${page === 'jadwal.html' ? 'active' : ''}"><i class="far fa-calendar-alt fa-regular fa-calendar-days"></i> <span>Jadwal Kuliah</span></a>
            </div>

            <div class="nav-section menu-section" style="margin-top: 15px;">
                <div class="menu-title">KOMUNIKASI</div>
                <a href="#" class="nav-link nav-item menu-item"><i class="far fa-envelope fa-regular fa-envelope"></i> <span>Pesan</span></a>
                <a href="${portalPrefix}pengumuman.html" class="nav-link nav-item menu-item ${(page === 'pengumuman.html' || page === 'informasi.html') ? 'active' : ''}"><i class="fas fa-bullhorn fa-solid fa-bullhorn"></i> <span>Pengumuman</span></a>
                <a href="${portalPrefix}forum.html" class="nav-link nav-item menu-item ${page === 'forum.html' ? 'active' : ''}"><i class="far fa-comments fa-regular fa-comments"></i> <span>Diskusi / Forum</span></a>
            </div>

            <div class="nav-section menu-section" style="margin-top: 15px;">
                <div class="menu-title">ADMINISTRASI</div>
                <a href="${portalPrefix}keuangan.html" class="nav-link nav-item menu-item ${(page === 'keuangan.html' || page === 'keuangan-detail.html') ? 'active' : ''}"><i class="fas fa-wallet fa-solid fa-money-bill-wave"></i> <span>Keuangan</span></a>
            </div>
            `;
        }

        // 6. Render HTML Sidebar
        const html = `
        <div class="sidebar-header brand logo-area">
            <div class="title-wrapper" style="display:flex; align-items:center; gap:12px; font-weight:700;">
                <i class="fas fa-university fa-solid fa-building-columns"></i>
                <div class="brand-text">
                    <h2>Universitas<br>Crypto</h2>
                    <p class="subtitle">Portal Mahasiswa</p>
                </div>
            </div>
        </div>

        <a href="${portalPrefix}beranda.html" class="nav-link nav-item menu-item ${page === 'beranda.html' ? 'active' : ''}">
            <i class="fas fa-home fa-solid fa-house"></i> <span>Beranda</span>
        </a>

        <div class="nav-section menu-section" style="margin-top: 15px;">
            <div class="menu-title">PMB (PENDAFTARAN)</div>
            ${pmbMenuHtml}
        </div>

        ${extendedMenuHtml}

        <div class="logout-btn" style="margin-top: auto; padding-top: 20px;">
            <a href="${rootPrefix}login.html" class="btn-logout nav-link nav-item menu-item" id="sidebarLogout" style="display:flex; align-items:center; gap:8px; justify-content:center;"><i class="fas fa-sign-out-alt fa-solid fa-arrow-right-from-bracket"></i> <span>Keluar</span></a>
        </div>
        `;

        sidebarContainer.innerHTML = html;

        // Reset state saat menekan tombol keluar
        const logoutBtn = document.getElementById('sidebarLogout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                localStorage.removeItem('isRegistered');
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSidebar);
    } else {
        initSidebar();
    }
})();

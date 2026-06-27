(function () {
    function initSidebar() {
        const sidebarContainer = document.querySelector('.sidebar') || document.querySelector('nav.sidebar') || document.querySelector('#sidebar-container');
        if (!sidebarContainer) return;

        // Determine current page filename
        let path = window.location.pathname;
        let page = path.split('/').pop();
        if (!page || page === '') page = 'branda pmb.html';
        page = decodeURIComponent(page);

        // Standardized Sidebar Content
        const html = `
        <div class="sidebar-header brand logo-area">
            <div class="title-wrapper" style="display:flex; align-items:center; gap:10px; font-weight:700;">
                <i class="fas fa-university fa-solid fa-building-columns"></i>
                <div>
                    <h2 style="font-size: 16px; margin: 0; line-height: 1.2;">Universitas<br>Crypto</h2>
                </div>
            </div>
            <div class="subtitle" style="font-size: 11px; opacity: 0.8; margin-top: 4px;">Portal Mahasiswa</div>
        </div>

        <a href="branda pmb.html" class="nav-link nav-item menu-item ${page === 'branda pmb.html' ? 'active' : ''}">
            <i class="fas fa-home fa-solid fa-house"></i> <span>Beranda</span>
        </a>

        <div class="nav-section menu-section" style="margin-top: 15px;">
            <div class="menu-title" style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.7; margin-bottom: 8px;">PMB (PENDAFTARAN)</div>
            <a href="biodaata.html" class="nav-link nav-item menu-item ${page === 'biodaata.html' ? 'active' : ''}"><i class="fas fa-user fa-regular fa-user"></i> <span>Biodata</span></a>
            <a href="formulir pendaftaran.html" class="nav-link nav-item menu-item ${page === 'formulir pendaftaran.html' ? 'active' : ''}"><i class="fas fa-file-alt fa-solid fa-bars-staggered"></i> <span>Formulir Pendaftaran</span></a>
            <a href="dokumen step 1.html" class="nav-link nav-item menu-item ${page === 'dokumen step 1.html' ? 'active' : ''}"><i class="fas fa-folder fa-regular fa-file-lines"></i> <span>Dokumen</span></a>
            <a href="a_status.html" class="nav-link nav-item menu-item ${page === 'a_status.html' ? 'active' : ''}"><i class="fas fa-check-circle fa-regular fa-circle-check"></i> <span>Status Pendaftaran</span></a>
            <a href="registrasi_ulang.html" class="nav-link nav-item menu-item ${(page === 'registrasi_ulang.html' || page === 'pembayaran_ukt.html') ? 'active' : ''}"><i class="fas fa-id-card fa-regular fa-id-card"></i> <span>Registrasi Ulang</span></a>
        </div>

        <div class="nav-section menu-section" style="margin-top: 15px;">
            <div class="menu-title" style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.7; margin-bottom: 8px;">AKADEMIK</div>
            <a href="dashboard akademik user.html" class="nav-link nav-item menu-item ${page === 'dashboard akademik user.html' ? 'active' : ''}"><i class="fas fa-columns fa-solid fa-border-all"></i> <span>Dashboard Akademik</span></a>
            <a href="krs.html" class="nav-link nav-item menu-item ${page === 'krs.html' ? 'active' : ''}"><i class="fas fa-book-open fa-solid fa-book"></i> <span>KRS</span></a>
            <a href="khs user.html" class="nav-link nav-item menu-item ${page === 'khs user.html' ? 'active' : ''}"><i class="fas fa-star fa-regular fa-star"></i> <span>KHS (Nilai)</span></a>
            <a href="a_transkip_user.html" class="nav-link nav-item menu-item ${page === 'a_transkip_user.html' ? 'active' : ''}"><i class="fas fa-file-invoice fa-solid fa-graduation-cap"></i> <span>Transkrip</span></a>
            <a href="jadwal.html" class="nav-link nav-item menu-item ${page === 'jadwal.html' ? 'active' : ''}"><i class="far fa-calendar-alt fa-regular fa-calendar-days"></i> <span>Jadwal Kuliah</span></a>
        </div>

        <div class="nav-section menu-section" style="margin-top: 15px;">
            <div class="menu-title" style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.7; margin-bottom: 8px;">KOMUNIKASI</div>
            <a href="#" class="nav-link nav-item menu-item"><i class="far fa-envelope fa-regular fa-envelope"></i> <span>Pesan</span></a>
            <a href="pengumuman.html" class="nav-link nav-item menu-item ${(page === 'pengumuman.html' || page === 'informasi.html') ? 'active' : ''}"><i class="fas fa-bullhorn fa-solid fa-bullhorn"></i> <span>Pengumuman</span></a>
            <a href="forum.html" class="nav-link nav-item menu-item ${page === 'forum.html' ? 'active' : ''}"><i class="far fa-comments fa-regular fa-comments"></i> <span>Diskusi / Forum</span></a>
        </div>

        <div class="nav-section menu-section" style="margin-top: 15px;">
            <div class="menu-title" style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.7; margin-bottom: 8px;">ADMINISTRASI</div>
            <a href="keuangan.html" class="nav-link nav-item menu-item ${(page === 'keuangan.html' || page === 'keungan2.html') ? 'active' : ''}"><i class="fas fa-wallet fa-solid fa-money-bill-wave"></i> <span>Keuangan</span></a>
        </div>

        <div class="logout-btn" style="margin-top: auto; padding-top: 20px;">
            <a href="login.html" class="btn-logout nav-link nav-item menu-item" style="display:flex; align-items:center; gap:8px;"><i class="fas fa-sign-out-alt fa-solid fa-arrow-right-from-bracket"></i> <span>Keluar</span></a>
        </div>
        `;

        sidebarContainer.innerHTML = html;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSidebar);
    } else {
        initSidebar();
    }
})();

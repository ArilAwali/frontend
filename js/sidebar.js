(function() {
  document.addEventListener('DOMContentLoaded', () => {
    renderSidebar();
  });

  function renderSidebar() {
    const sidebarEl = document.querySelector('.sidebar');
    if (!sidebarEl) return;

    const pagePath = window.location.pathname;
    const pageName = decodeURIComponent(pagePath.split('/').pop().toLowerCase()) || 'branda pmb.html';

    // PMB Halaman List
    const pmbPages = [
      'branda pmb.html',
      'biodaata.html',
      'formulir pendaftaran.html',
      'dokumen step 1.html',
      'a_status.html'
    ];

    const isPMBPage = pmbPages.includes(pageName);

    if (isPMBPage) {
      renderPMBSidebar(sidebarEl, pageName);
    } else {
      renderAcademicSidebar(sidebarEl, pageName);
    }
  }

  // --- PMB SIDEBAR RENDER ---
  function renderPMBSidebar(el, activePage) {
    const brandHtml = `
      <div class="brand">
        <div class="brand-icon">
          <svg viewBox="0 0 24 24">
            <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.81-1.53M12 5.27l7.5 4.09L12 13.45 4.5 9.36M17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73z" />
          </svg>
        </div>
        <div class="brand-text">
          <h2>Universitas<br>Crypto</h2>
          <span>Portal Mahasiswa</span>
        </div>
      </div>
    `;

    const menuItems = [
      { file: 'branda pmb.html', text: 'Beranda', icon: '<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>' },
      { file: 'biodaata.html', text: 'Biodata', icon: '<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>' },
      { file: 'formulir pendaftaran.html', text: 'Formulir Pendaftaran', icon: '<svg viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>' },
      { file: 'dokumen step 1.html', text: 'Dokumen', icon: '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>' },
      { file: 'a_status.html', text: 'Status Pendaftaran', icon: '<svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>' }
    ];

    let menuHtml = `
      <div class="nav-section">PMB (PENDAFTARAN)</div>
      <ul class="nav-menu">
    `;

    menuItems.forEach(item => {
      const activeClass = (item.file === activePage) ? 'active' : '';
      menuHtml += `
        <li>
          <a href="${item.file}" class="nav-item ${activeClass}">
            ${item.icon}
            ${item.text}
          </a>
        </li>
      `;
    });

    menuHtml += '</ul>';

    const logoutHtml = `
      <button class="btn-logout" id="btn-sidebar-logout">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
        Keluar
      </button>
    `;

    el.innerHTML = brandHtml + menuHtml + logoutHtml;

    document.getElementById('btn-sidebar-logout').addEventListener('click', (e) => {
      e.preventDefault();
      logoutUser();
    });
  }

  // --- ACADEMIK SIDEBAR RENDER ---
  function renderAcademicSidebar(el, activePage) {
    // 1. Tentukan target class link & icon library dari nama halaman
    let itemClass = 'nav-link';
    if (activePage === 'khs user.html' || activePage === 'forum.html') {
      itemClass = 'nav-item';
    } else if (activePage === 'a_transkip_user.html' || activePage === 'jadwal.html' || activePage === 'keuangan.html' || activePage === 'keungan2.html') {
      itemClass = 'menu-item';
    }

    // Tentukan brand HTML logo berdasarkan halaman
    let brandHtml = '';
    if (activePage === 'keuangan.html' || activePage === 'keungan2.html') {
      brandHtml = `
        <div class="logo-area">
          <div class="title-wrapper">
            <i class="fa-solid fa-building-columns"></i> Universitas Crypto
          </div>
          <div class="subtitle">Portal Mahasiswa</div>
        </div>
      `;
    } else if (activePage === 'forum.html') {
      brandHtml = `
        <div class="logo-container">
          <div class="logo-icon">
            <i class="fa-solid fa-building-columns"></i>
          </div>
          <div class="logo-text">
            <h2>Universitas<br>Crypto</h2>
            <p>Portal Mahasiswa</p>
          </div>
        </div>
      `;
    } else {
      brandHtml = `
        <div class="sidebar-header">
          <i class="fas fa-university"></i>
          <div>
            <h2>Universitas<br>Crypto</h2>
            <span>Portal Mahasiswa</span>
          </div>
        </div>
      `;
    }

    // Data Menu Items
    const pmbItems = [
      { file: 'branda pmb.html', text: 'Beranda', icon: 'fa-solid fa-house' },
      { file: 'biodaata.html', text: 'Biodata', icon: 'fa-regular fa-user' },
      { file: 'formulir pendaftaran.html', text: 'Formulir Pendaftaran', icon: 'fa-solid fa-bars-staggered' },
      { file: 'dokumen step 1.html', text: 'Dokumen', icon: 'fa-regular fa-file-lines' },
      { file: 'a_status.html', text: 'Status Pendaftaran', icon: 'fa-regular fa-circle-check' }
    ];

    const akademikItems = [
      { file: 'dashboard akademik user.html', text: 'Dashboard Akademik', icon: 'fa-solid fa-border-all' },
      { file: 'krs.html', text: 'KRS', icon: 'fa-solid fa-book-open' },
      { file: 'khs user.html', text: 'KHS (Nilai)', icon: 'fa-regular fa-star' },
      { file: 'a_transkip_user.html', text: 'Transkrip', icon: 'fa-solid fa-graduation-cap' },
      { file: 'jadwal.html', text: 'Jadwal Kuliah', icon: 'fa-regular fa-calendar-days' }
    ];

    const komunikasiItems = [
      { file: '#', text: 'Pesan', icon: 'fa-regular fa-envelope' },
      { file: '#', text: 'Pengumuman', icon: 'fa-solid fa-bullhorn' },
      { file: 'forum.html', id: 'nav-forum', text: 'Diskusi / Forum', icon: 'fa-regular fa-comments' }
    ];

    const administrasiItems = [
      { file: 'keuangan.html', id: 'nav-keuangan', text: 'Keuangan', icon: 'fa-solid fa-money-bill-wave' }
    ];

    // Cek apakah halaman saat ini adalah halaman keuangan (dimana menu "Forum" dan "Keuangan" ditangani oleh script lokal halaman)
    const isKeuanganPage = (activePage === 'keuangan.html' || activePage === 'keungan2.html');

    // Helper render items
    const buildItemsHtml = (items) => {
      let html = '';
      items.forEach(item => {
        const activeClass = (item.file === activePage) ? 'active' : '';
        const idAttr = item.id ? `id="${item.id}"` : '';
        
        // Href khusus untuk halaman keuangan agar tidak melompat (ditangani js lokal untuk pergantian tab)
        let href = item.file;
        if (isKeuanganPage && (item.id === 'nav-forum' || item.id === 'nav-keuangan')) {
          href = '#';
        }

        if (activePage === 'keuangan.html' || activePage === 'keungan2.html') {
          html += `<li ${idAttr} class="${itemClass} ${activeClass}"><i class="${item.icon}"></i> ${item.text}</li>`;
        } else {
          html += `<a href="${href}" ${idAttr} class="${itemClass} ${activeClass}"><i class="${item.icon}"></i> ${item.text}</a>`;
        }
      });
      return html;
    };

    // Rangkai menu
    let menuHtml = '';
    if (activePage === 'keuangan.html' || activePage === 'keungan2.html') {
      menuHtml += `
        <ul class="menu-items">
          <li class="menu-item" onclick="window.location.href='branda pmb.html'"><i class="fa-solid fa-house"></i> Beranda</li>
        </ul>
        <div class="menu-section" style="margin-top: 15px;">
          <div class="menu-title">PMB (PENDAFTARAN)</div>
          <ul class="menu-items">${buildItemsHtml(pmbItems.slice(1))}</ul>
        </div>
        <div class="menu-section">
          <div class="menu-title">AKADEMIK</div>
          <ul class="menu-items">${buildItemsHtml(akademikItems)}</ul>
        </div>
        <div class="menu-section">
          <div class="menu-title">KOMUNIKASI</div>
          <ul class="menu-items">${buildItemsHtml(komunikasiItems)}</ul>
        </div>
        <div class="menu-section">
          <div class="menu-title">ADMINISTRASI</div>
          <ul class="menu-items">${buildItemsHtml(administrasiItems)}</ul>
        </div>
      `;
    } else if (activePage === 'forum.html') {
      menuHtml += `
        <nav class="nav-menu">
          <a href="branda pmb.html" class="nav-item"><i class="fa-solid fa-house"></i> Beranda</a>
          <div class="nav-section">PMB (PENDAFTARAN)</div>
          ${buildItemsHtml(pmbItems.slice(1))}
          <div class="nav-section">AKADEMIK</div>
          ${buildItemsHtml(akademikItems)}
          <div class="nav-section">KOMUNIKASI</div>
          ${buildItemsHtml(komunikasiItems)}
          <div class="nav-section">ADMINISTRASI</div>
          ${buildItemsHtml(administrasiItems)}
        </nav>
      `;
    } else {
      menuHtml += `
        <a href="branda pmb.html" class="${itemClass}"><i class="fas fa-home"></i> Beranda</a>
        <div class="nav-section">PMB (Pendaftaran)</div>
        ${buildItemsHtml(pmbItems.slice(1))}
        <div class="nav-section">Akademik</div>
        ${buildItemsHtml(akademikItems)}
        <div class="nav-section">Komunikasi</div>
        ${buildItemsHtml(komunikasiItems)}
        <div class="nav-section">Administrasi</div>
        ${buildItemsHtml(administrasiItems)}
      `;
    }

    // Tombol Keluar / Logout
    let logoutHtml = '';
    if (activePage === 'keuangan.html' || activePage === 'keungan2.html') {
      logoutHtml = `
        <button class="logout-btn" id="btn-sidebar-logout">
          <i class="fa-solid fa-arrow-right-from-bracket"></i> Keluar
        </button>
      `;
    } else if (activePage === 'forum.html') {
      logoutHtml = `
        <div class="logout-container">
          <button class="btn-logout" id="btn-sidebar-logout">
            <i class="fa-solid fa-arrow-right-from-bracket"></i> Keluar
          </button>
        </div>
      `;
    } else if (activePage === 'khs user.html') {
      logoutHtml = `
        <div class="nav-section"></div>
        <a href="#" id="btn-sidebar-logout" class="${itemClass}"><i class="fa-solid fa-arrow-right-from-bracket"></i> Keluar</a>
      `;
    } else {
      logoutHtml = `
        <div class="logout-btn">
          <a href="#" id="btn-sidebar-logout"><i class="fas fa-sign-out-alt"></i> Keluar</a>
        </div>
      `;
    }

    el.innerHTML = brandHtml + menuHtml + logoutHtml;

    document.getElementById('btn-sidebar-logout').addEventListener('click', (e) => {
      e.preventDefault();
      logoutUser();
    });
  }

  // --- LOGOUT IMPLEMENTATION ---
  function logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
  }
})();

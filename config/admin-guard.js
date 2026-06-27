(function() {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    let isAdmin = false;

    if (token && userStr) {
        try {
            const user = JSON.parse(userStr);
            if (user.role === 'staf administration') {
                isAdmin = true;
            }
        } catch (e) {
            console.error('Gagal memparsing data user dari localStorage:', e);
        }
    }

    if (!isAdmin) {
        alert('Akses Ditolak: Halaman ini hanya untuk Staf Administrasi. Silakan login terlebih dahulu.');
        
        // Redirect dinamis ke halaman login admin berdasarkan lokasi file saat ini
        const pathname = window.location.pathname;
        if (pathname.includes('/admin/')) {
            window.location.href = 'admin-login.html';
        } else {
            window.location.href = 'admin/admin-login.html';
        }
    }

    // Attach global logout handler once the DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        const logoutBtn = document.querySelector('.sidebar-footer a');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm('Apakah Anda yakin ingin keluar dari Portal Admin?')) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    localStorage.removeItem('isRegistered');
                    
                    const pathname = window.location.pathname;
                    if (pathname.includes('/admin/')) {
                        window.location.href = 'admin-login.html';
                    } else {
                        window.location.href = 'admin/admin-login.html';
                    }
                }
            });
        }
    });
})();

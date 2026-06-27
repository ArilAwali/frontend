(function() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Akses Ditolak: Silakan masuk ke akun Anda terlebih dahulu.');
        
        // Redirect dinamis berdasarkan lokasi file HTML
        if (window.location.pathname.includes('/portal/')) {
            window.location.href = '../login.html';
        } else {
            window.location.href = 'login.html';
        }
    }
})();

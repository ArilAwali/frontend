const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Wrapper Fetch API untuk mempermudah HTTP Request dengan otentikasi otomatis
 * @param {string} endpoint - Jalur API (contoh: '/auth/login')
 * @param {Object} options - Opsi fetch (method, body, headers, dll.)
 */
async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  // Set default headers
  const headers = {
    ...options.headers
  };

  // Jika body dikirim sebagai JSON string (bukan FormData), tambahkan Content-Type
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  // Masukkan Token JWT ke Header Authorization jika ada
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  // Jika token expired atau ditolak (401 / 403), paksa logout dan arahkan ke login.html
  if (response.status === 401 || response.status === 403) {
    alert('Sesi Anda telah berakhir. Silakan masuk kembali.');
    logout();
    return;
  }

  const result = await response.json();
  if (!response.ok) {
    throw result; // Lempar data response agar bisa di-catch oleh form handler
  }

  return result;
}

/**
 * Cek apakah pengguna sudah memiliki sesi login aktif
 */
function checkSession() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
  }
}

/**
 * Logout dari aplikasi
 */
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'login.html';
}

/**
 * Membaca data profil pengguna dari token JWT (decoding client-side sederhana jika diperlukan)
 */
function getLoggedInUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

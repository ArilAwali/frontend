// Konfigurasi URL API Backend
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Helper terpusat untuk melakukan request HTTP ke API backend
 * @param {string} endpoint - Path endpoint API (misal: '/auth/login')
 * @param {Object} options - Opsi fetch (method, headers, body, dll)
 * @returns {Promise<Object>} Response JSON dari backend
 */
async function fetchAPI(endpoint, options = {}) {
    const token = localStorage.getItem('token');

    // Set header default
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    // Tambahkan token JWT jika tersedia
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

        // Auto-logout jika token expired (401 Unauthorized)
        if (response.status === 401 && !endpoint.includes('/auth/login')) {
            localStorage.removeItem('token');
            localStorage.removeItem('isRegistered');
            window.location.href = window.location.pathname.includes('/portal/') ? '../../login.html' : '../login.html'; // Redirect dinamis ke login page
            throw new Error('Sesi Anda telah berakhir. Silakan login kembali.');
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Terjadi kesalahan pada server.');
        }

        return data;
    } catch (error) {
        console.error(`API Error (${endpoint}):`, error.message);
        throw error;
    }
}

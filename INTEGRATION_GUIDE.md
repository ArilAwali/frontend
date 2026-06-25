# Panduan Integrasi Frontend - Backend (Portal PMB & Akademik)

Dokumen ini berisi panduan teknis mendetail bagi Junior Programmer atau AI Model untuk mengintegrasikan halaman HTML statis (Vanilla JS) di folder `frontend` dengan API server di folder `backend-pendaftaran-mahasiswa`.

---

## 🛠️ 1. Persiapan & Arsitektur Global

Frontend dibangun menggunakan HTML statis murni. Untuk menghindari penulisan kode koneksi API berulang kali, langkah pertama adalah membuat berkas utilitas global untuk menangani AJAX, Token JWT, dan Session.

### Tugas 1.1: Buat Berkas `frontend/js/api.js`
Buat folder baru bernama `js` di dalam folder `frontend`, lalu buat file `api.js` dengan kode di bawah ini.

```javascript
// frontend/js/api.js

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
```

### Tugas 1.2: Impor `api.js` pada Semua Halaman HTML
Tambahkan tag `<script>` ini di setiap bagian bawah file HTML sebelum tag penutup `</body>`:
```html
<script src="js/api.js"></script>
```

---

## 🔑 2. Modul Autentikasi (Auth)

### Halaman 2.1: `login.html` (Masuk Akun)
1. **Modifikasi HTML**:
   - Berikan `id="email"` pada input email.
   - Berikan `id="password"` pada input password.
   - Berikan `id="btn-login"` pada tombol submit/masuk, atau ubah tombol tersebut menjadi type submit dan pasang event listener submit pada form.
2. **Implementasi Script**:
   Pasang event listener di `login.html`:
   ```javascript
   document.querySelector('.btn-submit').addEventListener('click', async (e) => {
     e.preventDefault();
     const email = document.getElementById('email').value;
     const password = document.getElementById('password').value;

     if (!email || !password) {
       alert('Email dan password wajib diisi!');
       return;
     }

     try {
       const res = await apiFetch('/auth/login', {
         method: 'POST',
         body: JSON.stringify({ email, password })
       });

       if (res.success) {
         // Simpan token JWT dan informasi pengguna
         localStorage.setItem('token', res.data.token);
         localStorage.setItem('user', JSON.stringify(res.data.user));

         alert('Login Berhasil!');
         
         // Arahkan ke dashboard berdasarkan role
         if (res.data.user.role === 'admin') {
           window.location.href = 'admin login.html'; // Sesuaikan dengan Dashboard Admin
         } else {
           window.location.href = 'biodaata.html';
         }
       }
     } catch (err) {
       alert(err.message || 'Login gagal, periksa email/password Anda.');
     }
   });
   ```

### Halaman 2.2: `daftar.html` (Pendaftaran Akun Baru)
1. **Modifikasi HTML**:
   - Berikan ID pada input: `#nama_lengkap`, `#nik`, `#nomor_wa`, `#email`, `#password`, `#konfirmasi_password`, `#terms` (checkbox).
2. **Implementasi Script**:
   ```javascript
   document.querySelector('.btn-submit').addEventListener('click', async (e) => {
     e.preventDefault();
     const nama_lengkap = document.getElementById('nama_lengkap').value;
     const nik = document.getElementById('nik').value;
     const nomor_wa = document.getElementById('nomor_wa').value;
     const email = document.getElementById('email').value;
     const password = document.getElementById('password').value;
     const konfirmasi_password = document.getElementById('konfirmasi_password').value;
     const terms = document.getElementById('terms').checked;

     if (!terms) {
       alert('Anda harus menyetujui Syarat & Ketentuan.');
       return;
     }

     try {
       const res = await apiFetch('/auth/register', {
         method: 'POST',
         body: JSON.stringify({
           nama_lengkap,
           nik,
           nomor_wa,
           email,
           password,
           konfirmasi_password
         })
       });

       alert(res.message || 'Registrasi sukses! Silakan login.');
       window.location.href = 'login.html';
     } catch (err) {
       if (err.errors) {
         // Tampilkan detail error validasi jika ada
         const errorMsgs = Object.values(err.errors).join('\n');
         alert('Gagal:\n' + errorMsgs);
       } else {
         alert(err.message || 'Terjadi kesalahan saat registrasi.');
       }
     }
   });
   ```

---

## 📝 3. Formulir & Biodata Calon Mahasiswa (PMB Stepper)

Setiap halaman di modul ini harus menjalankan fungsi `checkSession()` di bagian paling atas script.

### Halaman 3.1: `biodaata.html` (Langkah 1: Mengisi Data Pribadi)
1. **Muat Data Awal (Pre-fill)**:
   Saat halaman di-load, panggil API untuk memuat biodata yang sudah pernah disimpan.
   - Endpoint: `GET /api/biodata/biodata` (Internal Token)
   - Jika response mengembalikan data, isi form dengan data tersebut:
     - `tempat_lahir`, `tanggal_lahir`, `jenis_kelamin` (centang L/P), `agama`, `alamat_lengkap`, `provinsi`, `kota_kabupaten`, `kecamatan`, `kode_pos`.
     - Simpan status apakah user sedang mengedit data (flag `isUpdate = true`) agar tombol submit tahu apakah harus mengirim `POST` atau `PUT`.
2. **Kirim Data (Submit)**:
   - Ambil nilai dari seluruh input form.
   - Endpoint:
     - Jika pertama kali mengisi: `POST /api/biodata/biodata`
     - Jika memperbarui/edit data: `PUT /api/biodata/biodata`
   - Payload JSON format:
     ```json
     {
       "tempat_lahir": "Bandung",
       "tanggal_lahir": "2000-01-30",
       "jenis_kelamin": "L", 
       "agama": "islam",
       "alamat_lengkap": "Jl. Merdeka No 10",
       "provinsi": "Jawa Barat",
       "kota_kabupaten": "Bandung",
       "kecamatan": "Cibeureum",
       "kode_pos": "40111"
     }
     ```
   - Catatan: `jenis_kelamin` wajib divalidasi ke format `'L'` atau `'P'` di frontend sebelum dikirim ke backend.

### Halaman 3.2: `formulir pendaftaran.html` (Langkah 2: Pilihan Prodi & Nilai Rapor)
1. **Modifikasi Dropdown Program Studi**:
   Pilihan prodi dapat di-hardcode sesuai opsi di database:
   - Pilihan 1: Fakultas Ilmu Komputer -> S1 Teknik Informatika, S1 Sistem Informasi
   - Pilihan 2: Fakultas Ekonomi & Bisnis -> S1 Manajemen, S1 Akuntansi
2. **Kirim/Perbarui Prodi & Rapor**:
   Halaman ini mengirim 2 jenis data:
   * **Update Prodi Calon Mahasiswa**:
     Kirim `PUT /api/biodata/biodata` dengan body:
     ```json
     {
       "pilihan_prodi_1": "S1 Teknik Informatika",
       "pilihan_prodi_2": "S1 Sistem Informasi"
     }
     ```
   * **Simpan Rapor Semester 1 - 5**:
     Karena API rapor menerima satu-persatu per semester (`POST /api/biodata/rapor`), loop input rapor dari semester 1 s.d 5 dan lakukan request secara berurutan atau menggunakan `Promise.all`:
     ```javascript
     const semesters = [1, 2, 3, 4, 5];
     const matematikaInput = document.querySelectorAll('.grade-input'); // sesuaikan selector
     
     // Kirim data rapor secara paralel
     try {
       const promises = semesters.map((sem, index) => {
         const avgGrade = parseFloat(matematikaInput[index].value) || 0;
         return apiFetch('/biodata/rapor', {
           method: 'POST',
           body: JSON.stringify({
             semester: sem,
             matematika: avgGrade,
             bahasa_indonesia: avgGrade, // Backend membutuhkan nilai-nilai mapel ini
             bahasa_inggris: avgGrade,
             ipa: avgGrade,
             ips: avgGrade
           })
         });
       });
       await Promise.all(promises);
       alert('Pilihan Program Studi & Rapor berhasil disimpan!');
       window.location.href = 'dokumen step 1.html';
     } catch (err) {
       alert('Gagal menyimpan nilai rapor: ' + err.message);
     }
     ```

---

## 📂 4. Unggah Dokumen Persyaratan

### Halaman 4.1: `dokumen step 1.html`
Calon mahasiswa mengunggah 4 dokumen wajib/opsional: KTP, Ijazah/SKL, Kartu Keluarga (KK), Pas Foto 4x6.

1. **Memuat Status Berkas Terunggah**:
   Saat halaman dimuat, jalankan request:
   - Endpoint: `GET /api/dokumen`
   - Respon API akan mengembalikan kelengkapan dokumen. Jika berkas seperti `ktp` sudah diunggah, ubah status di card HTML dari **"Belum diunggah"** (merah) menjadi **"ktp_nama_file.pdf diunggah"** (hijau/sukses) dan nonaktifkan tombol upload atau ubah teks tombol menjadi "Unggah Ulang".
2. **Proses Upload**:
   - Di setiap card dokumen, buat elemen `<input type="file" style="display:none;" id="input-ktp">` (dan sejenisnya untuk KK, ijazah, pas foto).
   - Hubungkan klik tombol **"Upload File"** untuk menstimulasi klik pada `<input type="file">` terkait.
   - Saat input file berubah (`change` event), jalankan fungsi upload:
     ```javascript
     async function uploadDokumen(fieldName, fileObj) {
       const formData = new FormData();
       formData.append(fieldName, fileObj); // fieldName harus bernilai: 'ktp', 'kartu_keluarga', 'ijazah_skl', atau 'pas_foto'

       try {
         const res = await apiFetch('/dokumen/', {
           method: 'POST',
           body: formData
         });
         alert(`${fieldName.toUpperCase()} berhasil diunggah!`);
         window.location.reload(); // Reload halaman untuk memuat status terbaru
       } catch (err) {
         alert('Gagal upload berkas: ' + err.message);
       }
     }
     ```

---

## 📢 5. Status Verifikasi & Seleksi PMB

### Halaman 5.1: `a_status.html`
Halaman ini adalah pintu gerbang kelulusan. Calon mahasiswa melihat status kelengkapan berkas & seleksi penerimaan mereka.

1. **Request Data Status**:
   - Endpoint: `GET /api/portal/status` (Token)
   - Respon objek memiliki struktur:
     ```json
     {
       "success": true,
       "data": {
         "status_verifikasi": "diverifikasi", // belum_diverifikasi | diverifikasi | ditolak
         "status_kelulusan": "lulus", // proses | lulus | tidak_lulus
         "catatan": "Berkas lengkap, selamat bergabung!"
       }
     }
     ```
2. **Logika UI Tampilan**:
   - **Verifikasi**: Jika `status_verifikasi === 'diverifikasi'`, tampilkan badge hijau **"Berkas Terverifikasi"**. Jika ditolak, tampilkan badge merah dan baca `catatan` penolakannya.
   - **Kelulusan**:
     - Jika `status_kelulusan === 'proses'`, tampilkan pengumuman: *"Pendaftaran Anda sedang dievaluasi oleh panitia PMB."*
     - Jika `status_kelulusan === 'lulus'`, tampilkan ucapan selamat bertema hijau yang megah, serta tombol mengambang / banner mencolok: **"Masuk ke Portal Akademik"** yang mengarah ke halaman `dashboard akademik user.html`.
     - Jika `status_kelulusan === 'tidak_lulus'`, tampilkan pesan maaf bertema abu-abu/merah.

---

## 🎓 6. Portal Akademik (Khusus Mahasiswa LULUS)

Seluruh halaman ini **wajib** diproteksi dengan `checkSession()`. Panggil API `GET /api/portal/status` terlebih dahulu saat halaman dimuat. Jika status kelulusan bukan `lulus`, alihkan paksa pengguna ke halaman `a_status.html`.

### Halaman 6.1: `dashboard akademik user.html`
1. **Muat Ringkasan Akademik**:
   - Endpoint: `GET /api/akademik/dashboard`
   - Ambil data IPK (`ipk`), total SKS (`total_sks`), SKS aktif (`sks_aktif`), dan array pengumuman.
   - Perbarui DOM angka-angka statistik di card dashboard.
   - Render pengumuman ke dalam kontainer list pengumuman di dashboard secara dinamis.

### Halaman 6.2: `krs.html` (Kartu Rencana Studi)
1. **Muat Data KRS Mahasiswa**:
   - Panggil `GET /api/akademik/krs` untuk mengambil KRS yang sedang diprogram. Tampilkan di tabel.
2. **Pilih & Ajukan Kelas Baru**:
   - Panggil `GET /api/akademik/krs/kelas` untuk mengambil daftar mata kuliah & kelas yang dibuka semester ini.
   - Tampilkan dengan checkbox agar mahasiswa dapat memilih.
   - Untuk memprogram KRS, kirim `POST /api/akademik/krs` dengan body:
     ```json
     {
       "kelas_ids": [1, 2, 5, 8] // Array ID kelas yang dipilih mahasiswa
     }
     ```

### Halaman 6.3: `khs user.html` & `a_transkip_user.html`
1. **KHS (Kartu Hasil Studi)**:
   - Panggil `GET /api/akademik/khs` (Opsional query parameter `?semester=1`).
   - Tampilkan daftar nilai mata kuliah, SKS, nilai huruf, dan hitung IPS (Indeks Prestasi Semester).
2. **Transkrip**:
   - Panggil `GET /api/akademik/transkrip`.
   - Render seluruh daftar mata kuliah yang pernah diambil beserta IPK kumulatif ke dalam tabel transkrip.

### Halaman 6.4: `keuangan.html` (Pembayaran UKT)
1. **Dapatkan Detail Tagihan**:
   - Panggil `GET /api/akademik/keuangan`
   - Tampilkan informasi tagihan semester aktif, nominal UKT, status (`Lunas` / `Belum Lunas`), dan histori pembayaran.
2. **Simulasi Pembayaran**:
   - Saat tombol bayar ditekan, kirim `POST /api/akademik/keuangan/bayar` dengan body:
     ```json
     {
       "nominal": 5000000 // nominal UKT
     }
     ```
   - Refresh data halaman setelah pembayaran sukses untuk mengubah status menjadi LUNAS.

### Halaman 6.5: `forum.html` (Forum Diskusi)
1. **Muat Daftar Thread**:
   - Endpoint: `GET /api/akademik/forum/threads`
   - Render daftar pertanyaan / thread diskusi yang dibuat mahasiswa lain.
2. **Buat Thread Diskusi Baru**:
   - Endpoint: `POST /api/akademik/forum/threads`
   - Payload: `{ "judul": "...", "konten": "..." }`
3. **Membaca detail & Membalas Thread**:
   - Mengambil detail thread beserta komentar/balasan: `GET /api/akademik/forum/threads/:id`
   - Mengirim balasan komentar baru: `POST /api/akademik/forum/threads/:id/replies` dengan body `{ "konten": "isi komentar" }`.

---

## 🔑 7. Portal Admin (`admin login.html`)

Admin menggunakan alur login yang sama, namun setelah sukses dengan role `'admin'`, admin diarahkan ke dashboard admin.
1. **Verifikasi Calon Mahasiswa**:
   - Admin melihat daftar pendaftar: `GET /api/admin/pendaftar`
   - Admin melakukan verifikasi status pendaftaran calon mahasiswa:
     - Endpoint: `PUT /api/portal/admin/status/:userId`
     - Payload: `{ "status_verifikasi": "diverifikasi", "status_kelulusan": "lulus", "catatan": "..." }`

---

## ✅ Checklist Uji Coba Integrasi (QA)
- [ ] Registrasi pengguna baru berhasil tanpa duplikasi NIK/Email.
- [ ] Login mengembalikan token JWT dan menyimpannya di localStorage.
- [ ] Halaman dashboard & biodata menolak akses jika tidak membawa token (otomatis redirect ke `login.html`).
- [ ] Input data biodata berhasil disimpan dan bisa diedit kembali.
- [ ] Pengiriman 5 semester nilai rapor berhasil.
- [ ] Dokumen (KTP, Ijazah, KK, Pas Foto) berhasil diupload dan status dokumen ter-update.
- [ ] Halaman status PMB menampilkan kelulusan. Tombol masuk portal akademik muncul hanya jika status kelulusan bernilai `"lulus"`.
- [ ] KRS, KHS, Transkrip, Keuangan, dan Forum berfungsi dengan memanggil API Akademik yang sesuai.

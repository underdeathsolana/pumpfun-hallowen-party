# 🔐 Setup OpenAI Environment

Panduan lengkap untuk mengatur OpenAI API agar fitur AI Costume Consultant berfungsi optimal.

## 📋 Daftar Isi
1. [Cara Mendapatkan API Key](#cara-mendapatkan-api-key)
2. [Setup Environment](#setup-environment)
3. [Konfigurasi](#konfigurasi)
4. [Cara Penggunaan](#cara-penggunaan)
5. [Keamanan](#keamanan)
6. [Troubleshooting](#troubleshooting)

---

## 🔑 Cara Mendapatkan API Key

### Langkah 1: Buat Akun OpenAI
1. Kunjungi [platform.openai.com](https://platform.openai.com)
2. Klik **Sign Up** untuk membuat akun baru
3. Verifikasi email Anda

### Langkah 2: Dapatkan API Key
1. Login ke akun OpenAI Anda
2. Kunjungi [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
3. Klik **"Create new secret key"**
4. Beri nama key Anda (contoh: "Halloween Party Website")
5. **PENTING**: Copy API key dan simpan dengan aman
6. ⚠️ Key hanya ditampilkan SATU KALI saja!

### Kredit Gratis
- Akun baru mendapat **$5 kredit gratis** untuk 3 bulan pertama
- Cukup untuk ribuan request AI costume suggestions!
- Cek sisa kredit di: [platform.openai.com/usage](https://platform.openai.com/usage)

---

## ⚙️ Setup Environment

### Metode 1: Menggunakan File `.env` (Recommended untuk Development)

1. **Copy file template:**
   ```bash
   cp .env.example .env
   ```

2. **Edit file `.env`:**
   ```env
   OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxx
   OPENAI_MODEL=gpt-3.5-turbo
   OPENAI_MAX_TOKENS=300
   OPENAI_TEMPERATURE=0.9
   ```

3. **Edit `config.js`:**
   ```javascript
   const CONFIG = {
       openai: {
           apiKey: 'sk-proj-xxxxxxxxxxxxxxxxxx', // Paste API key Anda di sini
           // ... config lainnya
       }
   };
   ```

⚠️ **JANGAN commit file `.env` atau `config.js` yang sudah berisi API key ke Git!**

### Metode 2: Menggunakan LocalStorage (Recommended untuk Production)

Tidak perlu setup! User bisa:
1. Masukkan API key langsung di website
2. Centang "Simpan API Key di browser"
3. Key tersimpan aman di browser (tidak dikirim ke server)

### Metode 3: Input Manual (Paling Aman)

User memasukkan API key setiap kali menggunakan fitur AI.

---

## 🎛️ Konfigurasi

### File `config.js`

Customize pengaturan OpenAI di `config.js`:

```javascript
const CONFIG = {
    openai: {
        // API Key (kosongkan untuk input manual)
        apiKey: '', 
        
        // Model yang digunakan
        model: 'gpt-3.5-turbo',  // Atau: gpt-4, gpt-4-turbo
        
        // Maximum tokens untuk response
        maxTokens: 300,  // Naikan untuk response lebih panjang
        
        // Temperature (kreativitas AI)
        temperature: 0.9,  // 0.0 = konservatif, 2.0 = sangat kreatif
        
        // System prompt (instruksi untuk AI)
        systemPrompt: `Your custom prompt here...`
    }
};
```

### Pengaturan Lanjutan

#### Mengubah Model AI:
```javascript
model: 'gpt-4'  // Lebih pintar tapi lebih mahal
model: 'gpt-3.5-turbo'  // Default, balance bagus
```

#### Mengubah Kreativitas:
```javascript
temperature: 0.3  // Lebih konsisten
temperature: 0.9  // Balance (default)
temperature: 1.5  // Lebih kreatif dan random
```

#### Nonaktifkan OpenAI:
```javascript
features: {
    enableOpenAI: false  // Hanya gunakan fallback AI
}
```

---

## 🚀 Cara Penggunaan

### Untuk Developer (Setup Permanen)

1. **Set API key di `config.js`:**
   ```javascript
   apiKey: 'sk-proj-your-key-here'
   ```

2. **Buka website:**
   - API key otomatis terisi
   - User langsung bisa gunakan fitur AI

### Untuk End User

#### Opsi A: Dengan API Key Pribadi
1. Dapatkan API key dari OpenAI
2. Buka website
3. Masukkan nama di form
4. Masukkan API key
5. ✓ Centang "Simpan API Key di browser"
6. Klik "Get My Costume Suggestion"

**Keuntungan:**
- Response AI lebih personal dan kreatif
- Unlimited requests (sampai kredit habis)
- Key tersimpan untuk kunjungan berikutnya

#### Opsi B: Tanpa API Key (Mode Gratis)
1. Buka website
2. Masukkan nama di form
3. Kosongkan field API key
4. Klik "Get My Costume Suggestion"

**Keuntungan:**
- Tidak perlu registrasi
- Gratis 100%
- Tetap dapat saran kostum bagus

---

## 🔒 Keamanan

### ✅ LAKUKAN:

1. **Gunakan `.gitignore`:**
   ```gitignore
   .env
   *.key
   config.js  # Jika berisi API key
   ```

2. **Simpan API key di environment variable:**
   ```bash
   # Linux/Mac
   export OPENAI_API_KEY="sk-proj-xxx"
   
   # Windows PowerShell
   $env:OPENAI_API_KEY="sk-proj-xxx"
   ```

3. **Gunakan localStorage untuk browser:**
   - Key hanya tersimpan di device user
   - Tidak terkirim ke server
   - User bisa hapus kapan saja

4. **Rate limiting:**
   ```javascript
   // Tambahkan di script.js
   let lastRequestTime = 0;
   const MIN_INTERVAL = 3000; // 3 detik
   
   if (Date.now() - lastRequestTime < MIN_INTERVAL) {
       alert('Please wait a moment before trying again!');
       return;
   }
   ```

### ❌ JANGAN:

1. ❌ Commit API key ke Git/GitHub
2. ❌ Share API key di public
3. ❌ Hardcode API key di production
4. ❌ Simpan key di database tanpa enkripsi
5. ❌ Gunakan API key orang lain

### Regenerate API Key

Jika key bocor:
1. Login ke [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Klik icon delete pada key yang lama
3. Buat key baru
4. Update di semua aplikasi Anda

---

## 🐛 Troubleshooting

### Error: "API key not valid"

**Penyebab:**
- API key salah/typo
- API key sudah dihapus
- Format key salah

**Solusi:**
```javascript
// Pastikan format benar:
sk-proj-xxxxxxxxxxxxxxxxxx  // ✓ Benar
sk-xxxxxxxxxxxxxxxxxx       // ✓ Benar (format lama)
sk proj xxxxxxxxxxxxxxxxxx  // ✗ Salah (ada spasi)
```

### Error: "Rate limit exceeded"

**Penyebab:**
- Terlalu banyak request dalam waktu singkat

**Solusi:**
1. Tunggu 1 menit
2. Tambahkan rate limiting di code
3. Upgrade plan OpenAI

### Error: "Insufficient credits"

**Penyebab:**
- Kredit gratis habis
- Billing tidak aktif

**Solusi:**
1. Cek sisa kredit: [platform.openai.com/usage](https://platform.openai.com/usage)
2. Tambah payment method: [platform.openai.com/billing](https://platform.openai.com/billing)
3. Atau gunakan mode fallback (gratis)

### API Key Tidak Tersimpan

**Solusi:**
1. Pastikan checkbox "Simpan API Key" dicentang
2. Cek browser support localStorage:
   ```javascript
   // Test di console
   localStorage.setItem('test', 'ok');
   console.log(localStorage.getItem('test')); // Harus tampil "ok"
   ```
3. Pastikan browser bukan mode Incognito/Private

### Response Terlalu Lambat

**Solusi:**
1. Kurangi `maxTokens` di config:
   ```javascript
   maxTokens: 150  // Dari 300
   ```
2. Gunakan model lebih cepat:
   ```javascript
   model: 'gpt-3.5-turbo'  // Tercepat
   ```

### CORS Error

**Penyebab:**
- Request dari `file://` protocol
- Browser blocking

**Solusi:**
Jalankan local server:
```bash
# Python
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

Kemudian buka: `http://localhost:8000`

---

## 📊 Monitoring Usage

### Cek Penggunaan API:
1. Login ke [platform.openai.com/usage](https://platform.openai.com/usage)
2. Lihat grafik usage per hari
3. Monitor total cost

### Estimasi Cost:
- GPT-3.5-turbo: ~$0.002 per request
- GPT-4: ~$0.06 per request
- 1000 requests = $2 (gpt-3.5) atau $60 (gpt-4)

---

## 🎯 Tips & Best Practices

### 1. Gunakan Fallback
Selalu sediakan mode tanpa API key:
```javascript
if (apiKey) {
    return await getFromOpenAI();
} else {
    return getFallbackSuggestion();
}
```

### 2. Cache Response
```javascript
const cache = {};
if (cache[userName]) {
    return cache[userName];
}
cache[userName] = await getFromOpenAI(userName);
```

### 3. Loading State
Berikan feedback visual saat loading:
```javascript
showLoadingIndicator();
try {
    const result = await getFromOpenAI();
} finally {
    hideLoadingIndicator();
}
```

### 4. Error Handling
```javascript
try {
    return await getFromOpenAI();
} catch (error) {
    console.error('OpenAI Error:', error);
    return getFallbackSuggestion();
}
```

---

## 📞 Support

- **OpenAI Help**: [help.openai.com](https://help.openai.com)
- **API Documentation**: [platform.openai.com/docs](https://platform.openai.com/docs)
- **Status Page**: [status.openai.com](https://status.openai.com)

---

## 🎃 Selamat Menggunakan! 🎃

Website Halloween party Anda sekarang dilengkapi dengan AI yang powerful! 

Happy haunting! 👻

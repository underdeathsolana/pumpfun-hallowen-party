# 🎃 Pump Fun Halloween Party Website 🎃

Website interaktif untuk Halloween party dengan tema horror dan fitur AI untuk saran kostum!

## ✨ Fitur Utama

### 🎨 Desain & Visual
- **Background Horror**: Gradien gelap dengan efek fog/kabut bergerak
- **Animasi Interaktif**: 
  - Hantu mengambang
  - Laba-laba turun dengan jaring
  - Efek lightning/petir
  - Glitch effect pada title
  - Partikel saat klik
- **Custom Cursor**: Cursor khusus dengan efek trail
- **Responsive Design**: Optimal di desktop dan mobile

### 🔊 Efek Audio
- Musik latar horror ambient
- Suara jeritan random
- Efek suara petir
- Toggle untuk on/off audio
- Audio otomatis saat interaksi

### 🤖 AI Costume Consultant
- **Dengan OpenAI API**: Saran kostum personal menggunakan GPT-3.5
- **Mode Fallback**: Sistem AI built-in tanpa perlu API key
- Saran berdasarkan nama pengguna
- Tips dan deskripsi detail kostum
- Efek typing animation

### ⏰ Countdown Timer
- Hitung mundur real-time ke tanggal party
- Update setiap detik
- Animasi interaktif

### 📋 Info Party
- Waktu & lokasi
- Dress code
- Entertainment details
- Gallery foto tahun lalu

## 🚀 Cara Menggunakan

### 1. Setup OpenAI (Opsional tapi Recommended)

**Untuk Developer:**
```bash
# 1. Copy file environment
cp .env.example .env

# 2. Edit .env dan tambahkan API key Anda
# OPENAI_API_KEY=sk-proj-your-key-here

# 3. Atau edit config.js langsung
```

**Untuk User:**
- Dapatkan API key gratis di [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- Kredit gratis $5 untuk 3 bulan!

📖 **Panduan lengkap**: Lihat [SETUP_OPENAI.md](SETUP_OPENAI.md)

### 2. Buka Website
Buka file `index.html` di browser modern (Chrome, Firefox, Edge, Safari)

**Atau jalankan dengan local server:**
```bash
# Python
python -m http.server 8000

# Node.js
npx serve

# PHP  
php -S localhost:8000
```

### 3. Aktifkan Suara
Klik tombol 🔊 di pojok kanan atas untuk mengaktifkan efek suara horror

### 4. Gunakan AI Costume Consultant

#### Mode 1: Dengan OpenAI API (Recommended):
1. Masukkan nama Anda
2. Masukkan API key (sk-...)
3. ✓ Centang "Simpan API Key di browser" (opsional)
4. Klik "Get My Costume Suggestion"
5. Dapatkan saran kostum ultra-personal dari ChatGPT!

**Keuntungan:**
- Saran super personal dan kreatif
- Setiap nama dapat response unik
- API key tersimpan aman di browser Anda

#### Mode 2: Tanpa OpenAI API (Gratis):
1. Masukkan nama Anda
2. Biarkan field API Key kosong
3. Klik "Get My Costume Suggestion"
4. Dapatkan saran kostum dari AI built-in

**Keuntungan:**
- 100% gratis, tidak perlu registrasi
- Tetap dapat saran bagus
- Privacy terjaga

### 4. Jelajahi Website
- Scroll untuk melihat semua section dengan smooth animation
- Klik tombol "Enter If You Dare" untuk efek surprise
- Hover pada elemen untuk efek interaktif
- Lihat countdown timer ke hari party

## 🎯 Easter Eggs

### Konami Code
Ketik kode rahasia: ↑ ↑ ↓ ↓ ← → ← → B A
untuk mengaktifkan mode rahasia! 🌈

## 🛠️ Teknologi

- **HTML5**: Struktur semantic modern
- **CSS3**: Animasi, gradients, transforms, custom properties
- **Vanilla JavaScript**: No framework, pure JS
- **OpenAI API**: Integrasi ChatGPT GPT-3.5/GPT-4 (opsional)
- **LocalStorage API**: Simpan API key dengan aman
- **Canvas API**: Animasi laba-laba
- **Fetch API**: Request ke OpenAI

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎨 Font

Website ini menggunakan Google Fonts:
- **Creepster**: Logo utama
- **Nosifer**: Hero title
- **Butcherman**: Section titles

## 🔧 Customisasi

### Setup OpenAI API Key (Developer Mode)

**File `config.js`:**
```javascript
const CONFIG = {
    openai: {
        apiKey: 'sk-proj-your-key-here',  // Paste key di sini
        model: 'gpt-3.5-turbo',           // Atau gpt-4
        maxTokens: 300,
        temperature: 0.9
    }
};
```

⚠️ **Jangan commit file dengan API key!** Gunakan `.gitignore`

### Mengubah Tanggal Party
Edit file `config.js`:
```javascript
event: {
    name: 'Pump Fun Halloween Party',
    date: 'October 31, 2025 20:00:00'  // Ubah tanggal di sini
}
```

### Mengubah Warna
Edit file `style.css`, ubah CSS variables di bagian `:root`:
```css
:root {
    --primary-color: #ff6b00;
    --secondary-color: #8b00ff;
    --dark-bg: #0a0a0a;
    --blood-red: #8b0000;
    --ghost-white: #f0f0f0;
    --purple-dark: #2d0052;
}
```

### Menambah Audio
Ganti URL audio di `index.html`:
```html
<audio id="backgroundMusic" loop>
    <source src="URL_AUDIO_ANDA" type="audio/mpeg">
</audio>
```

## 📁 Struktur File

```
HALOOWEN/
├── index.html          # Halaman utama
├── style.css           # Styling dan animasi
├── script.js           # JavaScript interaktif
├── config.js           # Konfigurasi (API key, settings)
├── .env                # Environment variables (jangan commit!)
├── .env.example        # Template environment
├── .gitignore          # File yang diabaikan Git
├── README.md           # Dokumentasi utama
└── SETUP_OPENAI.md     # Panduan setup OpenAI
```

## ⚠️ Catatan Penting

1. **OpenAI API Key**: 
   - API key bersifat **PRIBADI**, jangan share!
   - Dapatkan gratis dengan kredit $5 trial di OpenAI
   - Website tetap berfungsi 100% tanpa API key
   - Key tersimpan aman di browser, tidak dikirim ke server
   - Baca [SETUP_OPENAI.md](SETUP_OPENAI.md) untuk panduan lengkap

2. **Keamanan**:
   - Jangan commit file `.env` atau `config.js` yang berisi API key
   - Gunakan `.gitignore` yang sudah disediakan
   - Regenerate key jika tidak sengaja terpublish

3. **Audio Autoplay**:
   - Browser modern memblokir autoplay audio
   - User harus klik tombol sound toggle dulu

3. **Performance**:
   - Animasi optimized untuk performance
   - Canvas animation efficient
   - No heavy libraries

## 📝 Credits

Dibuat dengan 💀 untuk Pump Fun Halloween Party 2025

### Assets
- Audio: Mixkit (royalty-free)
- Fonts: Google Fonts
- Icons: Unicode Emoji

## 🎃 Have a Spooky Party! 🎃

Selamat menikmati party Halloween yang seram dan menyenangkan!

---

**Note**: Website ini dibuat untuk tujuan entertainment dan celebration Halloween. Semua efek horror dirancang untuk fun, bukan untuk menakuti sungguhan! 👻

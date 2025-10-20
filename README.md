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

### 1. Install Dependencies (Untuk Developer)

```bash
# Install Node.js packages
npm install
```

### 2. Setup Environment Variables (Untuk Developer)

```bash
# 1. Copy file environment example
cp .env.example .env

# 2. Edit .env dan tambahkan OpenAI API key
# OPENAI_API_KEY=sk-proj-your-key-here
```

📖 **Panduan lengkap untuk developer**: Lihat [BACKEND_SETUP.md](BACKEND_SETUP.md)

### 3. Jalankan Website

**Cara Mudah (Recommended):**
```bash
# Windows - Double click salah satu:
start.bat
# atau
.\start.ps1
```

Script akan otomatis:
- Start backend server (port 3000)
- Start frontend server (port 8000)
- Buka browser otomatis

**Manual:**
```bash
# Terminal 1 - Backend
node server.js

# Terminal 2 - Frontend  
python -m http.server 8000
```

### 4. Aktifkan Suara
Klik tombol 🔊 di pojok kanan atas untuk mengaktifkan efek suara horror

### 5. Gunakan AI Costume Consultant

**Untuk User (SUPER SIMPLE):**
1. Masukkan nama Anda
2. Klik "Get My Costume Suggestion"
3. Dapatkan saran kostum dari AI! ✨

**Tidak perlu API key!** 🎉
- AI berjalan di backend server
- Privacy terjaga
- Rate limited untuk mencegah abuse
- Fallback system jika API error

### 6. Jelajahi Website
- Scroll untuk melihat semua section dengan smooth animation
- Klik tombol "Enter If You Dare" untuk efek surprise
- Hover pada elemen untuk efek interaktif
- Lihat countdown timer ke hari party

## 🎯 Easter Eggs

### Konami Code
Ketik kode rahasia: ↑ ↑ ↓ ↓ ← → ← → B A
untuk mengaktifkan mode rahasia! 🌈

## 🛠️ Teknologi

### Frontend
- **HTML5**: Struktur semantic modern
- **CSS3**: Animasi, gradients, transforms, custom properties
- **Vanilla JavaScript**: No framework, pure JS
- **Canvas API**: Animasi laba-laba
- **Fetch API**: Request ke backend

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web server framework
- **OpenAI API**: Integrasi ChatGPT GPT-3.5-turbo
- **Security**: Rate limiting, Helmet, CORS protection
- **dotenv**: Environment variable management

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

**File `.env`:**
```bash
OPENAI_API_KEY=sk-proj-your-key-here
```

⚠️ **PENTING**: File `.env` sudah ada di `.gitignore` - tidak akan ter-commit ke GitHub!

### Mengubah Tanggal Party
Edit file `script.js`, cari bagian countdown:
```javascript
const countdownDate = new Date('October 31, 2025 20:00:00').getTime();
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
├── index.html              # Halaman utama
├── style.css               # Styling dan animasi
├── script.js               # JavaScript frontend
├── api-client.js           # API client untuk backend
├── server.js               # Backend Express server
├── package.json            # Node.js dependencies
├── .env                    # Environment variables (TIDAK DI COMMIT!)
├── .env.example            # Template environment
├── .gitignore              # File yang diabaikan Git
├── start.ps1               # PowerShell starter script
├── start.bat               # Batch starter script
├── README.md               # Dokumentasi utama
├── BACKEND_README.md       # API documentation
├── BACKEND_SETUP.md        # Setup guide untuk deployment
└── FINAL_SUMMARY.md        # Summary lengkap
```

## ⚠️ Catatan Penting

### Untuk User (Pengunjung Website)
- **Tidak perlu API key!** Website siap pakai langsung
- Cukup masukkan nama dan klik button untuk saran kostum
- Rate limited: 10 requests per 5 menit (fair usage)

### Untuk Developer

1. **OpenAI API Key**: 
   - API key bersifat **PRIBADI**, jangan share!
   - Dapatkan gratis dengan kredit $5 trial di [platform.openai.com](https://platform.openai.com/api-keys)
   - Key disimpan di `.env` file (server-side only)
   - Tidak pernah terekspos ke frontend/user
   - Baca [BACKEND_SETUP.md](BACKEND_SETUP.md) untuk panduan lengkap

2. **Keamanan**:
   - File `.env` sudah protected di `.gitignore`
   - JANGAN commit file `.env` dengan API key!
   - Rate limiting aktif (10 req/5min per IP)
   - Helmet security headers enabled
   - Input validation & sanitization

3. **API Documentation**:
   - Endpoint details: [BACKEND_README.md](BACKEND_README.md)
   - POST `/api/costume-suggestion` - Main AI endpoint
   - POST `/api/fallback-suggestion` - Fallback tanpa OpenAI
   - GET `/api/health` - Health check

4. **Audio Autoplay**:
   - Browser modern memblokir autoplay audio
   - User harus klik tombol sound toggle dulu

5. **Performance**:
   - Animasi optimized untuk performance
   - Canvas animation efficient
   - Backend response < 5 detik
   - Request timeout: 30 detik

## � Dokumentasi Lengkap

- **[BACKEND_README.md](BACKEND_README.md)** - API documentation & endpoints
- **[BACKEND_SETUP.md](BACKEND_SETUP.md)** - Deployment & setup guide
- **[FINAL_SUMMARY.md](FINAL_SUMMARY.md)** - Comprehensive summary

## �📝 Credits

Dibuat dengan 💀 untuk Pump Fun Halloween Party 2025

### Tech Stack
- Frontend: HTML5, CSS3, Vanilla JavaScript
- Backend: Node.js, Express.js
- AI: OpenAI GPT-3.5-turbo
- Security: Helmet, CORS, Rate Limiting

### Assets
- Audio: Mixkit (royalty-free)
- Fonts: Google Fonts (Creepster, Nosifer, Butcherman)
- Icons: Unicode Emoji

## 🎃 Have a Spooky Party! 🎃

Selamat menikmati party Halloween yang seram dan menyenangkan!

---

**Note**: Website ini dibuat untuk tujuan entertainment dan celebration Halloween. Semua efek horror dirancang untuk fun, bukan untuk menakuti sungguhan! 👻

**Security Note**: API key tidak pernah terekspos ke client. Backend server menangani semua request OpenAI dengan aman.

# 🎃 Website Integration Files - Pump Halloween Party

## 📁 File Yang Ada di Folder Ini

```
website-integration-files/
├── mint-nft.html                 # Halaman mint NFT (siap pakai)
├── js/
│   ├── solana-config.js          # Konfigurasi Solana (Program ID, metadata URIs)
│   ├── solana-wallet.js          # Wallet connection handler
│   ├── solana-mint.js            # NFT minting logic
│   └── mint-page-controller.js   # Page controller
└── css/
    └── mint-page.css             # Styling untuk mint page
```

---

## 🚀 CARA MENGGUNAKAN

### **LANGKAH 1: Copy File ke Website Anda**

Copy semua file dari folder `website-integration-files/` ke folder website Anda di:
```
D:\coding\SOLANA CHAIN\HALOOWEN\
```

Sehingga strukturnya menjadi:
```
D:\coding\SOLANA CHAIN\HALOOWEN\
├── index.html                    # (sudah ada)
├── mint-nft.html                 # ← Copy dari sini
├── js/
│   ├── solana-config.js          # ← Copy dari sini
│   ├── solana-wallet.js          # ← Copy dari sini
│   ├── solana-mint.js            # ← Copy dari sini
│   └── mint-page-controller.js   # ← Copy dari sini
└── css/
    └── mint-page.css             # ← Copy dari sini
```

---

### **LANGKAH 2: Tambahkan Link di index.html (Opsional)**

Tambahkan link ke mint page di `index.html` Anda:

```html
<!-- Tambahkan di menu navigasi -->
<a href="mint-nft.html" style="color: #ff6b00; font-weight: bold;">
  🎃 Mint Halloween NFT
</a>
```

---

### **LANGKAH 3: Install Phantom Wallet**

1. Download Phantom: https://phantom.app/
2. Install di Chrome/Firefox/Brave
3. Buat wallet baru atau import yang ada
4. **PENTING**: Switch wallet ke **Devnet**
   - Klik Settings (⚙️)
   - Developer Settings
   - Pilih **Devnet**

---

### **LANGKAH 4: Dapatkan SOL Devnet (Untuk Testing)**

```bash
solana airdrop 2 YOUR_WALLET_ADDRESS --url devnet
```

Atau gunakan faucet online:
- https://faucet.solana.com/

---

### **LANGKAH 5: Test Website**

1. Buka `mint-nft.html` di browser
   ```
   D:\coding\SOLANA CHAIN\HALOOWEN\mint-nft.html
   ```

2. Klik **"Connect Wallet"**
3. Approve connection di Phantom
4. Klik **"Mint Halloween NFT"**
5. Approve transaction di Phantom
6. Tunggu konfirmasi (5-10 detik)
7. NFT berhasil di-mint! 🎉

---

## 🔧 Troubleshooting

### **Error: "Wallet tidak ditemukan"**
- Install Phantom wallet: https://phantom.app/
- Refresh browser setelah install

### **Error: "Transaction failed"**
- Pastikan wallet di **Devnet** (bukan Mainnet!)
- Pastikan balance SOL cukup (minimal 0.1 SOL)
- Airdrop SOL devnet: `solana airdrop 2 --url devnet`

### **Error: "Insufficient funds"**
- Balance SOL kurang
- Airdrop SOL devnet lagi

### **NFT tidak muncul di wallet**
- Buka Solana Explorer untuk lihat transaction
- NFT akan muncul di wallet setelah beberapa menit
- Cek di tab "Collectibles" di Phantom

---

## 📝 Informasi Penting

### **Network:**
- **Devnet** (untuk testing)
- Jangan lupa switch wallet ke Devnet!

### **Program ID:**
```
2QHgBJFgBcsBCuHfPezqdZRDjFNu2Du2p1JGR6Dk6zKf
```

### **RPC Endpoint:**
```
https://api.devnet.solana.com
```

### **Explorer:**
```
https://explorer.solana.com/address/2QHgBJFgBcsBCuHfPezqdZRDjFNu2Du2p1JGR6Dk6zKf?cluster=devnet
```

---

## 🎨 Customization

### **Mengubah Warna:**
Edit file `css/mint-page.css`:
```css
.mint-title {
  color: #ff6b00;  /* ← Ubah warna judul */
}

.btn-primary {
  background: linear-gradient(135deg, #ff6b00 0%, #ff8c00 100%); /* ← Ubah warna tombol */
}
```

### **Mengubah Teks:**
Edit file `mint-nft.html`:
```html
<h1 class="mint-title">🎃 Mint Halloween NFT 🎃</h1> <!-- ← Ubah judul -->
<p class="mint-subtitle">Pump Halloween Party 2025</p> <!-- ← Ubah subtitle -->
```

---

## 🔒 Keamanan

### **File yang AMAN untuk di-upload ke hosting:**
- ✅ `mint-nft.html`
- ✅ `js/solana-config.js`
- ✅ `js/solana-wallet.js`
- ✅ `js/solana-mint.js`
- ✅ `js/mint-page-controller.js`
- ✅ `css/mint-page.css`

### **File yang JANGAN di-upload:**
- ❌ File `.env` di folder Solana project
- ❌ File `*-keypair.json`
- ❌ API keys Pinata

---

## 🚢 Deploy ke Production (Mainnet)

### **Jika Mau Deploy ke Mainnet Beta:**

1. **Update `js/solana-config.js`:**
   ```javascript
   NETWORK: 'mainnet-beta',  // ← Ubah dari 'devnet'
   RPC_ENDPOINT: 'https://api.mainnet-beta.solana.com',  // ← Ubah endpoint
   ```

2. **Deploy Solana Program ke Mainnet:**
   ```bash
   cd /home/acer_nitro_5/SOLANA/pumphalloweennft/pumphalloween-nft
   anchor deploy --provider.cluster mainnet
   ```

3. **Update Program ID di `js/solana-config.js`:**
   ```javascript
   PROGRAM_ID: 'NEW_MAINNET_PROGRAM_ID',  // ← Ganti dengan Program ID mainnet
   ```

4. **Switch Phantom wallet ke Mainnet**

5. **Test mint dengan SOL real** (hati-hati!)

---

## 🎃 Selamat!

Website Anda sekarang sudah bisa mint Halloween NFT!

**File-file di folder ini sudah siap pakai, tinggal copy ke website Anda.**

Happy Halloween! 👻🦇🎃

# Shuttle Booking Mini App

Aplikasi Single Page Application (SPA) untuk pemesanan shuttle online yang menghubungkan Jakarta, Bandung, dan Surabaya. Dibangun dengan Next.js 15, TypeScript, dan Tailwind CSS dengan fokus pada pengalaman pengguna yang responsif dan mudah diakses.

## 🚀 Fitur Utama

- **Form Pencarian Interaktif**: Pencarian shuttle dengan validasi lengkap
- **Tampilan Hasil Real-time**: Daftar shuttle tersedia dengan filter otomatis
- **Ringkasan Pemesanan**: Detail lengkap perjalanan sebelum konfirmasi
- **Konfirmasi Booking**: Halaman konfirmasi dengan informasi lengkap
- **Responsive Design**: Optimized untuk mobile dan desktop
- **Accessibility**: Dukungan screen reader dan navigasi keyboard
- **Localization**: Interface dalam Bahasa Indonesia dengan timezone UTC+7

## 🛠️ Teknologi yang Digunakan

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono
- **Analytics**: Vercel Analytics

## 📋 Persyaratan Sistem

- Node.js 18.17 atau lebih baru
- npm, yarn, atau pnpm

## 🚀 Cara Menjalankan Project

### 1. Clone Repository

\`\`\`bash
git clone [<repository-url>](https://github.com/NurCahyoPrasetyo/shuttle-booking-app.git)
cd shuttle-booking-app
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install

# atau

yarn install

# atau

pnpm install
\`\`\`

### 3. Jalankan Development Server

\`\`\`bash
npm run dev

# atau

yarn dev

# atau

pnpm dev
\`\`\`

### 4. Buka Browser

Akses aplikasi di [http://localhost:3000](http://localhost:3000)

Development server akan berjalan dengan fitur:

- Hot reload untuk perubahan code
- TypeScript checking
- Tailwind CSS compilation
- Automatic browser refresh

## 📁 Struktur Folder

\`\`\`
shuttle-booking-app/
├── app/ # Next.js App Router
│ ├── globals.css # Global styles & Tailwind config
│ ├── layout.tsx # Root layout dengan metadata
│ ├── loading.tsx # Loading UI component
│ └── page.tsx # Homepage dengan state management
├── components/ # React Components
│ ├── ui/ # shadcn/ui base components
│ ├── booking-confirmation.tsx # Halaman konfirmasi booking
│ ├── booking-summary.tsx # Ringkasan pemesanan
│ ├── search-form.tsx # Form pencarian shuttle
│ └── shuttle-list.tsx # Daftar hasil pencarian
├── lib/ # Utilities dan types
│ ├── types.ts # TypeScript type definitions
│ └── utils/
│ ├── currency.ts # Format mata uang IDR
│ └── date.ts # Format tanggal Indonesia
├── public/
│ └── data/
│ └── shuttles.json # Data shuttle dan jadwal
└── README.md # Dokumentasi project
\`\`\`

## 📝 Catatan Keputusan Teknis & Asumsi

### Keputusan Arsitektur

- **Single Page Application (SPA)**: Menggunakan state management di client-side untuk navigasi tanpa reload halaman
- **Component-based Architecture**: Memisahkan UI menjadi komponen yang reusable dan maintainable
- **TypeScript**: Untuk type safety dan better developer experience
- **Mobile-first Design**: Prioritas pada pengalaman mobile dengan progressive enhancement

### Asumsi Bisnis

- **Rute Terbatas**: Hanya melayani 3 kota (Jakarta, Bandung, Surabaya)
- **Pemesanan Hari Ini**: Minimal tanggal keberangkatan adalah hari ini
- **Single Passenger**: Satu pemesanan untuk satu penumpang
- **No Payment Integration**: Fokus pada flow booking tanpa pembayaran real

### Keputusan Data

- **Static JSON Data**: Menggunakan file JSON statis untuk simulasi data shuttle
- **LocalStorage**: Menyimpan data pencarian untuk UX yang lebih baik
- **Client-side Filtering**: Filter data dilakukan di browser untuk performa yang cepat

### Keputusan UI/UX

- **Orange Color Scheme**: Warna orange untuk memberikan kesan energik dan terpercaya
- **Card-based Layout**: Menggunakan card untuk organisasi informasi yang jelas
- **Progressive Disclosure**: Menampilkan informasi secara bertahap sesuai flow user

## 🗂️ Data Shuttle (shuttles.json)

File `public/data/shuttles.json` berisi data shuttle yang dapat diakses melalui fetch API. Struktur data:

\`\`\`json
{
"schedules": [
{
"id": "string",
"operator": "string",
"origin": "Jakarta" | "Bandung" | "Surabaya",
"destination": "Jakarta" | "Bandung" | "Surabaya",
"departureTimes": ["HH:MM", ...],
"price": number,
"duration": "string",
"facilities": ["string", ...]
}
]
}
\`\`\`

**Akses Data**: File dapat diakses melalui `/data/shuttles.json` endpoint dan di-fetch menggunakan:
\`\`\`javascript
const response = await fetch('/data/shuttles.json');
const data = await response.json();
\`\`\`

## 🎯 Cara Menggunakan Aplikasi

### 1. Pencarian Shuttle

- Masukkan nama penumpang
- Pilih kota asal dan tujuan (Jakarta, Bandung, Surabaya)
- Pilih tanggal keberangkatan (minimal hari ini)
- Klik "Cari Shuttle"

### 2. Memilih Jadwal

- Lihat daftar shuttle yang tersedia
- Pilih operator dan waktu keberangkatan yang diinginkan
- Klik "Pilih" pada jadwal yang dipilih

### 3. Konfirmasi Pemesanan

- Review detail perjalanan di halaman ringkasan
- Pastikan semua informasi sudah benar
- Klik "Konfirmasi Pemesanan"

### 4. Booking Berhasil

- Dapatkan konfirmasi booking dengan kode referensi
- Simpan informasi untuk referensi

## 🔧 Kustomisasi

### Menambah Rute Baru

Edit file `public/data/shuttles.json` dan tambahkan data shuttle baru dengan rute yang diinginkan.

### Mengubah Styling

Modifikasi file `app/globals.css` untuk mengubah color tokens atau tambahkan custom styles.

### Menambah Validasi

Edit komponen `components/search-form.tsx` untuk menambah aturan validasi baru.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility Features

- Semantic HTML elements
- ARIA labels dan roles
- Screen reader support
- Keyboard navigation
- Focus management
- Color contrast compliance

## 🚀 Deployment

### Vercel (Recommended)

\`\`\`bash
npm run build
vercel --prod
\`\`\`

### Manual Build

\`\`\`bash
npm run build
npm start
\`\`\`

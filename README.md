# Pipeline Content Creator API

Backend layanan REST API berbasis Node.js, Express, TypeScript, dan Prisma ORM untuk mengelola alur kerja (pipeline) pembuatan konten, mulai dari autentikasi pengguna, manajemen channel, perencanaan konten, penugasan (checklist sub-tugas), hingga pencatatan metrik performa.

---

## Fitur Utama

- **Autentikasi & Otorisasi**: Registrasi, login dengan JSON Web Token (JWT), dan pembatasan akses berbasis peran (RBAC).
- **Manajemen Channel**: Pembuatan, pembaharuan, pemrosesan daftar, dan penghapusan channel media sosial/platform.
- **Pipeline Konten**: Manajemen alur kerja konten (CRUD konten, filter status pipeline, validasi sebelum publikasi).
- **Sub-tugas & Checklist**: Pengelolaan checklist/tugas produksi konten berdasarkan pengguna dan item konten.
- **Pencatatan Metrik**: Dokumentasi angka performa (views, likes, shares, comments) untuk konten yang telah dipublikasikan.
- **Logging Terstruktur**: Penanganan log aktivitas dan error menggunakan Pino Logger.

---

## Layanan & Teknologi

- **Runtime & Bahasa**: Node.js, TypeScript
- **Web Framework**: Express.js
- **Database & ORM**: MySQL, Prisma ORM
- **Validasi Data**: Zod
- **Autentikasi**: JWT (JsonWebToken), Bcrypt
- **Logger**: Pino, Pino-HTTP

---

## Struktur Proyek

Proyek ini dibangun menggunakan arsitektur modular terpisah per domain (*Domain-driven/Modular Architecture*):

```text
pipeline-content-creator/
├── prisma/
│   ├── migrations/       # Riwayat skema dan migrasi database
│   ├── schema.prisma     # Definisi model data Prisma
│   └── seed.ts           # Data awal (seeding) database
├── src/
│   ├── core/             # Konfigurasi database, logger, dan utilitas inti
│   ├── modules/          # Modul aplikasi utama
│   │   ├── auth/         # Registrasi, Login, DTO, Service & Middleware Auth
│   │   ├── channel/      # Manajemen Channel Konten
│   │   ├── content/      # Alur Pipeline Konten & Filter
│   │   ├── task/         # Sub-tugas & Checklist Produksi
│   │   ├── metric/       # Pencatatan Metrik Performa Konten
│   │   ├── user/         # Manajemen Pengguna & Peran
│   │   └── shared/       # Exception kustom, Service umum, & Middleware global
│   ├── routes/           # Penataan rute HTTP Express (v1)
│   ├── types/            # Deklarasi tipe global Express
│   └── app.ts            # Inisialisasi Express App & Root Middleware
├── server.ts             # Entry point untuk menjalankan server HTTP
├── .env.example          # Template konfigurasi variabel lingkungan
├── package.json          # Dependency & skrip npm
└── tsconfig.json         # Konfigurasi kompilator TypeScript

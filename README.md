# Biolabpedia

Media edukasi tentang alat, perlengkapan, teknik, dan praktik laboratorium biologi.
Domain rencana: `biolabpedia.com`. Bukan toko — tanpa harga, keranjang, atau ajakan membeli.

Status terakhir (25 Nov 2026): **41 artikel** (26 artikel produk + 9 artikel lama + 6 teknik/troubleshooting), build statis sukses.

## Teknologi

- [Astro](https://astro.build) 5 + TypeScript (strict), tanpa framework UI
- Konten: Markdown + Astro Content Collections (`src/content/articles/`)
- Build statis, SEO metadata per halaman (canonical, Open Graph, Twitter card, meta description)
- Tanpa database, tanpa backend — output murni HTML/CSS/JS

## Menjalankan

```bash
npm install
npm run dev        # dev server http://localhost:4321
npm run build      # build ke dist/ (HTML biasa)
npm run build:file # build + rapikan path agar dist/ bisa dibuka via file://
npm run preview    # preview build via astro preview
```

Cara tercepat tanpa terminal: **dobel-klik `BUKA-WEBSITE.bat`** — otomatis install, build, lalu membuka `dist/index.html` di browser.

## Deployment

Build ini statis (murni HTML/CSS/JS), jadi bisa di-hosting mana pun — unggah isi `dist/` ke Vercel, GitHub Pages, Cloudflare Pages, atau shared hosting biasa.

- Domain produksi: `https://biolabpedia.com` (lihat `site` di `astro.config.mjs`).
- Untuk hosting dengan HTTPS/URL bersih, jalankan `npm run build` biasa (**tanpa** `build:file`) supaya link absolut root (`/artikel/…`) dipakai.
- `build:file` hanya untuk preview lokal via `file://` (dobel-klik) — jangan dipakai untuk versi yang diunggah.
- Belum ada: sitemap.xml, robots.txt, CI/deploy otomatis (lihat bagian SEO).
- **Catatan font:** judul & isi memuat font dari Google Fonts (`@import` di `global.css`). Tanpa internet, browser jatuh ke fallback (`Georgia` / `Segoe UI`) — halaman tetap tampil, hanya beda huruf.

## Struktur

```
biolabpedia/
├── astro.config.mjs          # site: https://biolabpedia.com, base: './'
├── tsconfig.json
├── package.json              # script build/dev/preview
├── BUKA-WEBSITE.bat          # build + buka dist/ otomatis (double-click)
├── public/
│   ├── favicon.svg
│   └── images/               # hero + ikon 6 pilar (SVG)
├── src/
│   ├── content.config.ts     # skema artikel (zod) + PILLAR_LIST (6 pilar)
│   ├── content/articles/     # 41 artikel Markdown
│   ├── layouts/BaseLayout.astro   # <head>, OG/Twitter meta, header, footer
│   ├── components/ArticleCard.astro
│   ├── pages/
│   │   ├── index.astro       # beranda: hero, unggulan, section per pilar
│   │   ├── tentang.astro     # tentang + usulan topik
│   │   ├── 404.astro
│   │   └── artikel/
│   │       ├── index.astro   # arsip: pencarian + filter 6 pilar (client-side)
│   │       └── [slug].astro  # detail: breadcrumb, reading progress, sumber, terkait
│   └── styles/global.css     # design system (token warna, tipografi, komponen)
├── scripts/
│   ├── make-file-friendly.mjs # post-build: path relatif agar jalan via file://
│   ├── check-links.cjs        # cek link internal di dist/
│   └── fix-*.cjs / add-meta.cjs # utilitas perbaikan frontmatter/SEO konten
├── graphify-out/             # knowledge graph codebase (opsional, 135 nodes)
└── dist/                     # hasil build (jangan edit manual)
```

## Halaman yang dihasilkan

| URL | File | Isi |
|---|---|---|
| `/` | `src/pages/index.astro` | Hero, artikel unggulan, daftar per pilar |
| `/artikel/` | `src/pages/artikel/index.astro` | Arsip + pencarian teks + filter pilar |
| `/artikel/[slug]/` | `src/pages/artikel/[slug].astro` | Detail artikel |
| `/tentang/` | `src/pages/tentang.astro` | Tentang & usulan topik |
| `404` | `src/pages/404.astro` | Halaman tidak ditemukan |

Build saat ini menghasilkan sekitar 45 halaman.

## Frontmatter artikel

```markdown
---
title: Judul Artikel
description: Ringkasan 1–2 kalimat (dipakai untuk SEO, meta description, dan arsip).
pillar: kenali-alat            # salah satu dari 6 pilar (lihat tabel bawah)
publishedAt: 2026-11-01
updatedAt: 2026-11-18          # opsional, hapus bila tidak ada pembaruan
tags: [micropipette, pipette tips]
featured: true                 # opsional, tampil di "Topik unggulan" beranda
author: Redaksi Biolabpedia    # opsional, sudah default
readingTime: 5                 # opsional, menit baca
sources:                       # opsional, wajib untuk artikel teknis
  - label: 'Manual produsen / SOP / SDS / literatur'
    url: 'https://...'         # opsional
---
```

Skema divalidasi zod di `src/content.config.ts`. Slug = nama file tanpa `.md` → `/artikel/nama-file/`.

## Menambah artikel baru

1. Buat file Markdown di `src/content/articles/`, mis. `micropipette-dasar.md`.
2. Isi frontmatter (tabel di atas).
3. Simpan, jalankan `npm run dev`, buka `http://localhost:4321/artikel/nama-file/`.
4. Cek arsip di `/artikel/` — artikel baru langsung muncul (diurutkan `publishedAt` terbaru).

## 6 pilar (kategori)

`pillar` di frontmatter hanya boleh salah satu nilai ini (lihat `PILLAR_LIST` di `src/content.config.ts`):

| Nilai | Label | Ikon |
|---|---|---|
| `kenali-alat` | Kenali alat laboratorium | `pillar-alat.svg` |
| `panduan-penggunaan` | Panduan penggunaan | `pillar-panduan.svg` |
| `bahan-habis-pakai` | Memilih dan memahami bahan habis pakai | `pillar-bahan.svg` |
| `perawatan-keselamatan` | Perawatan, penyimpanan, dan keselamatan | `pillar-keselamatan.svg` |
| `teknik-dasar` | Teknik dasar laboratorium | `pillar-teknik.svg` |
| `pemecahan-masalah` | Pemecahan masalah dan kesalahan umum | `pillar-masalah.svg` |

Menambah pilar baru: edit `pillars` dan `PILLAR_LIST` di `src/content.config.ts`, lalu tambah SVG ikon di `public/images/`.

## Desain

- Tipografi: **Merriweather** (judul, editorial) + **Nunito Sans** (isi, santai) — dimuat via Google Fonts (`@import` di `global.css` baris 1)
- Warna: biru navy `#144e8c`, teks `#243447`, aksen rust `#b8542e`, radius sudut 3–6px (tipis, bukan bulat penuh)
- Referensi UI: Lab Manager (gaya editorial, navy blue)
- Fitur halaman artikel: breadcrumb, reading progress bar, byline "Redaksi Biolabpedia", menit baca (`readingTime`, tampil "N min read"), sumber rujukan, artikel terkait dalam pilar yang sama

Token desain ada di `src/styles/global.css` (CSS custom properties): `--color-primary: #144e8c`, `--radius-sm/md/lg: 3/4/6px`, `--font-display` / `--font-sans`.

## Aturan editorial (ringkas)

- Jangan mengarang spesifikasi, prosedur, klaim keselamatan, atau hasil.
- Rujuk manual produsen (detail alat), SOP (prosedur setempat), SDS (keselamatan bahan), sumber ilmiah/pendidikan (konsep umum).
- Judul memakai nama umum alat/teknik — brand hanya sebagai contoh edukasi, bukan endorsement.
- Tegaskan panduan bersifat umum dan bisa berbeda per model/sampel/protokol.
- Cantumkan `sources` pada artikel teknis; perbarui `updatedAt` bila informasi berubah.
- Tanpa tanda kutip dekoratif di output; bahasa Indonesia ringan dan langsung.

## SEO saat ini & yang belum

Sudah: title per halaman, meta description, canonical, Open Graph (type/title/description/url), Twitter card, `article:published_time` / `article:modified_time`, generator.

Belum (kandidat langkah berikutnya):

- **OG image** (`og:image` 1200×630) — pilihan: 1 gambar statis, 6 gambar per pilar, atau generate per artikel.
- **sitemap.xml** — belum ada; `@astrojs/sitemap` belum terpasang (dicek di `node_modules/`).
- **robots.txt** — belum ada di `public/`.
- **Structured data** (JSON-LD `Article`/`FAQPage`).

Catatan: `base: './'` di `astro.config.mjs` membuat build ramah `file://`. Sitemap/OG absolut butuh URL absolut `https://biolabpedia.com/...` — jangan dipakai saat preview file://.

## Domain

Ganti `site` di `astro.config.mjs` bila domain berubah. Canonical, Open Graph, dan URL internal mengikuti nilai ini. Jalankan ulang `npm run build:file` setelah mengganti.

## Backlog & pertanyaan terbuka (dari handoff 25 Nov 2026)

- OG image: generate otomatis per artikel, atau statis (1 gambar / 6 per pilar)? Belum diputuskan.
- Perlu topic landing page per pilar (seperti Lab Manager)? Belum ada.
- `graphify-out/` = knowledge graph codebase (135 nodes, 47 communities) via skill graphify — opsional, untuk navigasi struktur kode tanpa baca file.

Preferensi yang sudah dipakai (jangan diubah tanpa konfirmasi): font santai, border radius tipis, tanpa tanda kutip di output, judul pakai nama umum (brand hanya contoh), fokus edukasi murni.

## Troubleshooting cepat

| Gejala | Penyebab / solusi |
|---|---|
| `npm run build` gagal validasi frontmatter | Field wajib hilang/salah: `title`, `description`, `pillar`, `publishedAt`. Lihat error zod di terminal. |
| Tanggal aneh / encoding rusak di YAML | Jalankan `node scripts/fix-regex.cjs` (atau `fix-all.cjs`) |
| Link putus di dist/ | `node scripts/check-links.cjs` |
| Build mati di tengah jalan karena cache | Hapus folder `.astro` di root proyek lalu build ulang |
| Halaman kosong via file:// | Pakai `npm run build:file` (path relatif), jangan `npm run build` biasa |
| Artikel tidak muncul di arsip | Pastikan file `.md` di `src/content/articles/` dan build dijalankan ulang |

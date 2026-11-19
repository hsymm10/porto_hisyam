# MOBILE ONLY — SECTION SPACING AUDIT & REFINEMENT
**Website Portfolio:** HSZAM² (`https://hisyamsayyid.my.id/`)  
**Sections Audited:**
1. **Cara Saya Membangun • Standar Kualitas** (`#craft` — `CraftStory.svelte`)
2. **Pengalaman** (`#experience` — `src/routes/+page.svelte`)

---

## 1. Masalah yang Ditemukan (Problem Statement)

Berdasarkan inspeksi tangkapan layar mobile (`media_1795079592254_222efb35.png`):
- Jarak vertikal antara kartu penutup section **Cara Saya Membangun** (`[KODE BERSIH]`) dengan batas pemisah section sangat mepet/terhimpit.
- Jarak kartu pembuka section **Pengalaman** (`PENGALAMAN ->`) terasa terlalu dekat dengan section sebelumnya.
- Transisi visual antarsection terasa terkompresi dan kurang nyaman saat pengunjung melakukan scrolling di perangkat mobile.

---

## 2. Audit Penyebab Utama (Root Cause Analysis)

Melalui inspeksi komputasi DOM langsung via Chrome DevTools Protocol (CDP) pada viewport mobile (375px), ditemukan dua penyebab utama:

### A. Pergeseran Visual Relatif (`top: calc(...)` pada `position: relative`)
- Pada elemen `.craft-frame` di dalam `CraftStory.svelte`, terdapat inline style:
  ```html
  <div class="craft-frame z-20 w-full" style="top: calc(var(--nav-h) + var(--nav-gap));">
  ```
- **Masalah:** Pada breakpoint mobile (`< 768px`), `.craft-frame` memiliki `position: relative` (bukan `sticky`). Sesuai spesifikasi CSS W3C, penerapan `top: 66px` pada elemen relatif memindahkan kotak render elemen ke bawah sebesar 66px **tanpa memperbesar tinggi kontainer pembungkusnya** (`craft-track` & `#craft`).
- **Dampak:** Pergeseran 66px ke bawah ini "memakan habis" seluruh ruang `padding-bottom: 48px` (`py-12`) dari `#craft`.
  - Jarak kartu ke border bawah `#craft` terukur negatif: **`-37.12px`** (kartu menabrak dan menembus garis batas bawah section).
  - Jarak total dari kartu Craft ke kartu Pengalaman hanya tersisa **`12.87px`** (hampir menempel 0px).

### B. Spacing Simetris Default Mobile Kurang Memberi Jeda Transisi
- Kelas Tailwind default pada mobile untuk `#craft` dan `#experience` adalah `py-12` (48px top, 48px bottom).
- Untuk transisi antarsection bertipe kartu besar (neobrutalism shadow box), jeda penutup dan pembuka membutuhkan ritme visual yang lebih proporsional agar pengunjung dapat membedakan konteks topik secara nyaman.

---

## 3. Implementasi Perbaikan (Implementation Details)

Perbaikan dilakukan dengan pendekatan **mobile-first** tanpa mengubah tampilan desktop maupun tablet sedikit pun:

### 1. `src/lib/components/CraftStory.svelte`
- **Menghapus inline style `style="top: ..."` dari elemen HTML `.craft-frame`:**
  Nilai `top: calc(var(--nav-h) + var(--nav-gap))` dipindahkan ke dalam media query `@media (min-width: 768px)` di `<style>`.
- **Pada mobile (`< 768px`):** `.craft-frame` kini memiliki `top: 0`, sehingga elemen mengalir secara alami (*in-flow*) tanpa pergeseran ke bawah yang merusak padding.
- **Pada desktop & tablet (`>= 768px`):** `.craft-frame` tetap mempertahankan `position: sticky; top: calc(var(--nav-h) + var(--nav-gap))` untuk fitur *sticky scrollytelling*.
- **Padding Section:** Menyesuaikan padding mobile `#craft` menjadi `pt-12 pb-16 sm:py-16 md:py-20 lg:py-24` untuk memberikan ruang penutup (*closing buffer*) yang cukup.

### 2. `src/routes/+page.svelte`
- **Padding Section `#experience`:** Menyesuaikan padding mobile menjadi `pt-16 pb-12 sm:py-16 md:py-20 lg:py-24`.
- Jarak awal (*opening buffer*) section Pengalaman menjadi proporsional (64px) dari border pemisah.

---

## 4. Perbandingan Metrik Spacing (Sebelum vs Sesudah)

| Parameter Pengukuran (Viewport 375px) | Sebelum Perbaikan | Sesudah Perbaikan | Status |
| :--- | :---: | :---: | :---: |
| **`frame.position` (Mobile)** | `relative` | `relative` | Sesuai |
| **`frame.top` (Mobile)** | `66px` (artifisial) | `0px` (natural flow) | **Optimal** |
| **`#craft` padding-bottom** | `48px` | `64px` (`pb-16`) | **Proporsional** |
| **Jarak Kartu Craft ke Border Bawah** | **`-37.12px` (menabrak)** | **`+44.88px` (bersih)** | **Teratasi** |
| **`#experience` padding-top** | `48px` | `64px` (`pt-16`) | **Proporsional** |
| **Jarak Border ke Kartu Pengalaman** | `50px` | `66px` | **Nyaman** |
| **Jarak Total Antar-Kartu (Visual Gap)** | **`12.87px` (sangat rapat)** | **`110.88px` (lega & rapi)** | **Sempurna** |

---

## 5. Hasil Pengujian Viewport (Multi-Device Verification)

### A. Breakpoint Mobile
1. **Viewport 375px (iPhone SE / Standard Mobile):**
   - Horizontal Overflow: `false` (`scrollWidth: 375px` == `innerWidth: 375px`)
   - Elemen Bertabrakan: `false`
   - Jarak visual antar-kartu: **`110.88px`**
2. **Viewport 390px (iPhone 12/13/14 Pro):**
   - Horizontal Overflow: `false` (`scrollWidth: 390px` == `innerWidth: 390px`)
   - Elemen Bertabrakan: `false`
   - Jarak visual antar-kartu: **`110.58px`**
3. **Viewport 430px (iPhone 14/15 Pro Max):**
   - Horizontal Overflow: `false` (`scrollWidth: 430px` == `innerWidth: 430px`)
   - Elemen Bertabrakan: `false`
   - Jarak visual antar-kartu: **`109.30px`**

### B. Breakpoint Tablet & Desktop (Strict Non-Regression Check)
1. **Viewport 768px (iPad / Tablet Portrait):**
   - `craftPaddingTop`: `80px` (`md:py-20`) — **TIDAK BERUBAH**
   - `craftPaddingBottom`: `80px` (`md:py-20`) — **TIDAK BERUBAH**
   - `frame.position`: `sticky` — **TETAP AKTIF**
   - `frame.top`: `88px` — **TETAP MENGIKUTI NAVBAR**
   - `expPaddingTop`: `80px` (`md:py-20`) — **TIDAK BERUBAH**
2. **Viewport 1280px (Desktop):**
   - `craftPaddingTop`: `96px` (`lg:py-24`) — **TIDAK BERUBAH**
   - `craftPaddingBottom`: `96px` (`lg:py-24`) — **TIDAK BERUBAH**
   - `frame.position`: `sticky` — **TETAP AKTIF**
   - `frame.top`: `98px` — **TETAP MENGIKUTI NAVBAR**
   - `expPaddingTop`: `96px` (`lg:py-24`) — **TIDAK BERUBAH**

---

## 6. Kesimpulan

Perbaikan layout spacing khusus mobile telah berhasil diterapkan secara presisi:
- **0 elemen overlap / terpotong.**
- **0 horizontal overflow.**
- Jarak visual kedua section kini proporsional, lapang, dan mengikuti kaidah desain Neobrutalism.
- Breakpoint desktop dan tablet terlindungi 100% tanpa perubahan perilaku maupun dimensi.

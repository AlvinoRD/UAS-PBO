# Aplikasi Point of Sale (POS) Sederhana

Selamat datang di repositori proyek UAS (Ujian Akhir Semester) untuk mata kuliah Pemrograman Berorientasi Objek (PBO). Proyek ini adalah aplikasi desktop Point of Sale (POS) sederhana yang dibangun menggunakan **Electron**, **Next.js**, **React**, dan **TypeScript**.

Aplikasi ini dirancang untuk mengelola produk, menangani transaksi penjualan, dan melihat riwayat invoice. Aplikasi ini menggunakan file `db.json` sebagai database lokal untuk menyimpan data produk dan transaksi.

## Demo Aplikasi

Anda dapat melihat cara kerja dan penggunaan aplikasi melalui video demo di YouTube:

[Tonton Demo Aplikasi di YouTube](https://youtu.be/8ZtpMaRxa6M)

## Fitur Utama

* **Manajemen Produk**: Tambah, lihat, ubah, dan hapus produk. Setiap produk memiliki informasi nama, harga, dan stok.
* **Keranjang Belanja**: Pengguna dapat mencari produk dan menambahkannya ke dalam keranjang.
* **Proses Transaksi**: Aplikasi akan menghitung total belanja dan mengelola pembayaran.
* **Riwayat Invoice**: Semua transaksi yang berhasil akan disimpan dan dapat dilihat kembali di halaman invoice.
* **Penyimpanan Lokal**: Data aplikasi (produk dan invoice) disimpan secara lokal dalam format JSON, sehingga mudah untuk dikelola.

## Teknologi yang Digunakan

* **Framework Aplikasi Desktop**: [Electron](https://www.electronjs.org/)
* **Framework Frontend**: [Next.js](https://nextjs.org/) (dengan [React](https://reactjs.org/))
* **Bahasa Pemrograman**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) (berdasarkan analisis dari `tailwind.config.js`)
* **Database**: JSON-Server (disimulasikan melalui `db.json`)

## Struktur Proyek

* `main/`: Berisi kode untuk proses utama Electron (`background.ts`) yang bertanggung jawab untuk membuat dan mengelola jendela aplikasi.
* `renderer/`: Berisi kode untuk proses renderer Electron, yang merupakan aplikasi Next.js.
    * `renderer/app/`: Direktori utama untuk halaman dan komponen aplikasi.
        * `Products/`: Halaman untuk manajemen produk (CRUD).
        * `cart/`: Halaman untuk keranjang belanja dan proses checkout.
        * `Invoices/`: Halaman untuk menampilkan riwayat transaksi.
* `db.json`: File yang berfungsi sebagai database sederhana untuk menyimpan data produk dan invoice.

## Instalasi dan Menjalankan Proyek

Untuk menjalankan proyek ini di lingkungan lokal, ikuti langkah-langkah berikut:

1.  **Clone repositori ini:**
    ```bash
    git clone [URL_REPOSITORY_ANDA]
    cd [NAMA_FOLDER_PROYEK]
    ```

2.  **Install dependensi:**
    Pastikan Anda memiliki [Node.js](https://nodejs.org/) dan pnpm terinstal.
    ```bash
    pnpm install
    ```

3.  **Jalankan aplikasi dalam mode development:**
    ```bash
    pnpm dev
    ```

4.  **Untuk membuat build aplikasi:**
    ```bash
    pnpm build
    ```

## Kontributor

* **Alvino Radyo Danisworo** - A11.2022.14600

* Dibuat sebagai bagian dari Ujian Akhir Semester Pemrograman Berorientasi Objek.

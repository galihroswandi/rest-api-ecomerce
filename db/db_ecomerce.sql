-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 29 Apr 2023 pada 03.40
-- Versi server: 10.4.25-MariaDB
-- Versi PHP: 8.0.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_ecomerce`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `cart`
--

CREATE TABLE `cart` (
  `id_cart` int(11) NOT NULL,
  `uid` varchar(255) NOT NULL,
  `id_product` int(11) NOT NULL,
  `kuantitas` int(35) NOT NULL,
  `total_harga` int(35) NOT NULL,
  `id_user` int(11) NOT NULL,
  `tanggal` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `cart`
--

INSERT INTO `cart` (`id_cart`, `uid`, `id_product`, `kuantitas`, `total_harga`, `id_user`, `tanggal`) VALUES
(65, 'QR1681533093818jc', 2, 1, 50000, 1, '2023-04-15 04:31:33'),
(66, 'BI1681533111354xe', 7, 1, 30000, 1, '2023-04-15 04:31:51');

-- --------------------------------------------------------

--
-- Struktur dari tabel `checkout`
--

CREATE TABLE `checkout` (
  `id_checkout` int(11) NOT NULL,
  `id_pesanan` varchar(255) NOT NULL,
  `id_product` int(11) NOT NULL,
  `pesan` text DEFAULT NULL,
  `kuantitas` int(11) NOT NULL,
  `subtotal` int(100) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `checkout`
--

INSERT INTO `checkout` (`id_checkout`, `id_pesanan`, `id_product`, `pesan`, `kuantitas`, `subtotal`, `id_user`) VALUES
(1, '202cb962ac59075b964b07152', 2, 'pengiriman jangan lama ya', 1, 100000, 1),
(7, '202cb962ac59075b964b07152', 5, 'pengiriman jangan lama ya', 2, 16000000, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `kategori`
--

CREATE TABLE `kategori` (
  `id_kategori` int(11) NOT NULL,
  `nama_kategori` varchar(50) NOT NULL,
  `gambar_kategori` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `kategori`
--

INSERT INTO `kategori` (`id_kategori`, `nama_kategori`, `gambar_kategori`) VALUES
(1, 'Laptop & PC', 'images/1680096280582-325355446-PC-Laptop.png'),
(2, 'Skincare', 'images/1680099347867-931971408-skincare.png'),
(3, 'Hanphone', 'images/1680099382779-226447805-handphone.png'),
(4, 'Fashion', 'images/1680099410176-134166593-Fashion.png'),
(5, 'Sepatu', 'images/1680099486346-909786585-sepatu.png'),
(6, 'Elektronik', 'images/1680099439495-389265514-PC-Laptop.png');

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id_product` int(11) NOT NULL,
  `nama_product` varchar(50) NOT NULL,
  `deskripsi` text NOT NULL,
  `harga` varchar(20) NOT NULL,
  `gambar_product` varchar(255) NOT NULL,
  `id_kategori` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id_product`, `nama_product`, `deskripsi`, `harga`, `gambar_product`, `id_kategori`) VALUES
(2, 'Kabel Data Type C', 'lorem ipsum dolor sit amet', '50000', 'images/1680096304755-672668114-Product8.png', 1),
(3, 'Laptop Asus ROG Strix', 'lorem ipsum dolor sit amet', '15000000', 'images/1680099786861-510990386-Product1.png', 1),
(4, 'ASUS ZENBOOK C103', 'lorem ipsum dolor sit amet', '10000000', 'images/1680099816618-840501158-Product2.png', 1),
(5, 'IPhone 11', 'lorem ipsum dolor sit amet', '8000000', 'images/1680099852647-872222131-Product3.png', 3),
(6, 'IPhone XR', 'lorem ipsum dolor sit amet', '5000000', 'images/1680099911004-274943150-Product4.png', 3),
(7, 'BAJU WANITA SIMPLE', 'lorem ipsum dolor sit amet', '30000', 'images/1680099954754-344696254-Product5.png', 4),
(8, 'Tas Kece', 'lorem ipsum dolor sit amet', '40000', 'images/1680099972928-776153069-Product6.png', 4),
(9, 'Pembersih Hidung', 'lorem ipsum dolor sit amet', '10000', 'images/1680100002002-480469930-Product7.png', 6);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `uid` varchar(50) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `no_hp` char(16) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `alamat` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id_user`, `uid`, `nama`, `no_hp`, `email`, `password`, `alamat`) VALUES
(1, '327897965824DAGDEQ', 'Galih Roswandi', '087897796582', 'galihroswandi25@gmail.com', '202cb962ac59075b964b07152d234b70', 'Bugelan, RT.2/RW.6, Gunungtandala, Kawalu, KOTA TASIKMALAYA\r\n');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id_cart`),
  ADD KEY `id_product` (`id_product`);

--
-- Indeks untuk tabel `checkout`
--
ALTER TABLE `checkout`
  ADD PRIMARY KEY (`id_checkout`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_barang` (`id_product`);

--
-- Indeks untuk tabel `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_product`),
  ADD KEY `id_kategori` (`id_kategori`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `cart`
--
ALTER TABLE `cart`
  MODIFY `id_cart` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT untuk tabel `checkout`
--
ALTER TABLE `checkout`
  MODIFY `id_checkout` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id_kategori` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`);

--
-- Ketidakleluasaan untuk tabel `checkout`
--
ALTER TABLE `checkout`
  ADD CONSTRAINT `checkout_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`),
  ADD CONSTRAINT `checkout_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Ketidakleluasaan untuk tabel `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_kategori`) REFERENCES `kategori` (`id_kategori`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

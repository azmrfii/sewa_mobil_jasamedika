-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 03, 2023 at 05:07 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sewa_mobil_jasamedika`
--

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `manajemens`
--

CREATE TABLE `manajemens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `merek` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `nomor_plat` varchar(255) NOT NULL,
  `tarif_sewa` double(8,2) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `status` enum('tersedia','tersewa') NOT NULL DEFAULT 'tersedia',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `manajemens`
--

INSERT INTO `manajemens` (`id`, `merek`, `model`, `nomor_plat`, `tarif_sewa`, `user_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Daihatsu', 'Xenia', 'B 01 ABC', 75000.00, 1, 'tersedia', '2023-10-02 18:58:51', '2023-10-02 19:58:51'),
(2, 'Toyota', 'Avansa', 'B 02 AB', 55000.00, 1, 'tersedia', '2023-10-02 19:33:30', '2023-10-02 19:59:12');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_10_02_065122_create_manajemens_table', 1),
(6, '2023_10_02_081508_create_pinjams_table', 1),
(7, '2023_10_02_123232_create_pengembalians_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pengembalians`
--

CREATE TABLE `pengembalians` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `pinjam_id` varchar(255) NOT NULL,
  `biaya_sewa` double(8,2) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pengembalians`
--

INSERT INTO `pengembalians` (`id`, `pinjam_id`, `biaya_sewa`, `user_id`, `created_at`, `updated_at`) VALUES
(1, '2', 2000.00, 1, '2023-10-02 19:07:40', '2023-10-02 19:07:40');

--
-- Triggers `pengembalians`
--
DELIMITER $$
CREATE TRIGGER `update pinjam` AFTER INSERT ON `pengembalians` FOR EACH ROW update pinjams
set status = 'telah_dikembalikan'
where id = NEW.pinjam_id
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pinjams`
--

CREATE TABLE `pinjams` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tgl_mulai` date NOT NULL,
  `tgl_selesai` date NOT NULL,
  `manajemen_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `sewa` double(8,2) NOT NULL,
  `status` enum('sedang_disewa','telah_dikembalikan') NOT NULL DEFAULT 'sedang_disewa',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pinjams`
--

INSERT INTO `pinjams` (`id`, `tgl_mulai`, `tgl_selesai`, `manajemen_id`, `user_id`, `sewa`, `status`, `created_at`, `updated_at`) VALUES
(2, '2023-10-03', '2023-10-05', 1, 1, 2000.00, 'telah_dikembalikan', '2023-10-02 19:01:11', '2023-10-02 19:01:11');

--
-- Triggers `pinjams`
--
DELIMITER $$
CREATE TRIGGER `return manajemen` AFTER UPDATE ON `pinjams` FOR EACH ROW update manajemens
set status = 'tersedia'
where id = new.manajemen_id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update status` AFTER INSERT ON `pinjams` FOR EACH ROW update manajemens
set status = 'tersewa'
where id = NEW.manajemen_id
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `alamat` text NOT NULL,
  `nomor_handphone` bigint(20) DEFAULT NULL,
  `nomor_sim` bigint(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama`, `alamat`, `nomor_handphone`, `nomor_sim`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'pelanggan1', 'Jl. Kampung 3', 81166222211, 1234567890123, '$2y$10$Fvq5.f5qeeB/9vr8WRl/n.gdMfQNf1URiKq2uDJDIRWl.NuKVsMba', NULL, '2023-10-02 18:58:33', '2023-10-02 18:58:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `manajemens`
--
ALTER TABLE `manajemens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `manajemens_nomor_plat_unique` (`nomor_plat`),
  ADD KEY `manajemens_user_id_foreign` (`user_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `pengembalians`
--
ALTER TABLE `pengembalians`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pengembalians_pinjam_id_unique` (`pinjam_id`),
  ADD KEY `pengembalians_user_id_foreign` (`user_id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `pinjams`
--
ALTER TABLE `pinjams`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pinjams_manajemen_id_foreign` (`manajemen_id`),
  ADD KEY `pinjams_user_id_foreign` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `manajemens`
--
ALTER TABLE `manajemens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `pengembalians`
--
ALTER TABLE `pengembalians`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pinjams`
--
ALTER TABLE `pinjams`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `manajemens`
--
ALTER TABLE `manajemens`
  ADD CONSTRAINT `manajemens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `pengembalians`
--
ALTER TABLE `pengembalians`
  ADD CONSTRAINT `pengembalians_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `pinjams`
--
ALTER TABLE `pinjams`
  ADD CONSTRAINT `pinjams_manajemen_id_foreign` FOREIGN KEY (`manajemen_id`) REFERENCES `manajemens` (`id`),
  ADD CONSTRAINT `pinjams_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

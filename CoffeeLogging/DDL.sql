-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 16, 2025 at 01:47 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coffee`
--

-- --------------------------------------------------------

--
-- Table structure for table `batch`
--

CREATE TABLE `batch` (
  `id` int(11) NOT NULL,
  `roast_date` date NOT NULL,
  `prod_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `brewmethod`
--

CREATE TABLE `brewmethod` (
  `id` int(11) NOT NULL,
  `coffee_amount` float NOT NULL,
  `grind_size` varchar(255) NOT NULL,
  `water_temp` float NOT NULL,
  `bloom_count` int(11) NOT NULL,
  `water_amount` float NOT NULL,
  `method` varchar(255) NOT NULL,
  `dairy_type` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `grower`
--

CREATE TABLE `grower` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `region` varchar(255) NOT NULL,
  `farm_elevation` float NOT NULL,
  `country_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `processingmethod`
--

CREATE TABLE `processingmethod` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `productnotes`
--

CREATE TABLE `productnotes` (
  `note_id` int(11) NOT NULL,
  `prod_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `pro_meth_id` int(11) NOT NULL,
  `var_id` int(11) NOT NULL,
  `grower_id` int(11) NOT NULL,
  `roaster_id` int(11) NOT NULL,
  `rlevel_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `emoji` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roaster`
--

CREATE TABLE `roaster` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `website` varchar(255) NOT NULL,
  `given_up` varchar(3) NOT NULL DEFAULT 'no'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roastlevel`
--

CREATE TABLE `roastlevel` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tasting`
--

CREATE TABLE `tasting` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `batch_id` int(11) NOT NULL,
  `rate_id` int(11) NOT NULL,
  `bm_id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tastingnotes`
--

CREATE TABLE `tastingnotes` (
  `note_id` int(11) NOT NULL,
  `taste_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `varietal`
--

CREATE TABLE `varietal` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `batch`
--
ALTER TABLE `batch`
  ADD PRIMARY KEY (`id`),
  ADD KEY `b_pid_fk` (`prod_id`);

--
-- Indexes for table `brewmethod`
--
ALTER TABLE `brewmethod`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `grower`
--
ALTER TABLE `grower`
  ADD PRIMARY KEY (`id`),
  ADD KEY `g_cid_fk` (`country_id`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `processingmethod`
--
ALTER TABLE `processingmethod`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productnotes`
--
ALTER TABLE `productnotes`
  ADD PRIMARY KEY (`note_id`,`prod_id`),
  ADD KEY `pn_pid_fk` (`prod_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `p_pmid_fk` (`pro_meth_id`),
  ADD KEY `p_vid_fk` (`var_id`),
  ADD KEY `p_gid_fk` (`grower_id`),
  ADD KEY `p_rid_fk` (`roaster_id`),
  ADD KEY `p_rlid_fk` (`rlevel_id`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roaster`
--
ALTER TABLE `roaster`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roastlevel`
--
ALTER TABLE `roastlevel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasting`
--
ALTER TABLE `tasting`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_rid_fk` (`rate_id`),
  ADD KEY `t_bmid_fk` (`bm_id`),
  ADD KEY `t_bid_fk` (`batch_id`);

--
-- Indexes for table `tastingnotes`
--
ALTER TABLE `tastingnotes`
  ADD PRIMARY KEY (`note_id`,`taste_id`),
  ADD KEY `tn_tid_fk` (`taste_id`);

--
-- Indexes for table `varietal`
--
ALTER TABLE `varietal`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `batch`
--
ALTER TABLE `batch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `brewmethod`
--
ALTER TABLE `brewmethod`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `grower`
--
ALTER TABLE `grower`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `processingmethod`
--
ALTER TABLE `processingmethod`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roaster`
--
ALTER TABLE `roaster`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roastlevel`
--
ALTER TABLE `roastlevel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tasting`
--
ALTER TABLE `tasting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `varietal`
--
ALTER TABLE `varietal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `batch`
--
ALTER TABLE `batch`
  ADD CONSTRAINT `b_pid_fk` FOREIGN KEY (`prod_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `grower`
--
ALTER TABLE `grower`
  ADD CONSTRAINT `g_cid_fk` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`);

--
-- Constraints for table `productnotes`
--
ALTER TABLE `productnotes`
  ADD CONSTRAINT `pn_nid_fk` FOREIGN KEY (`note_id`) REFERENCES `notes` (`id`),
  ADD CONSTRAINT `pn_pid_fk` FOREIGN KEY (`prod_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `p_gid_fk` FOREIGN KEY (`grower_id`) REFERENCES `grower` (`id`),
  ADD CONSTRAINT `p_pmid_fk` FOREIGN KEY (`pro_meth_id`) REFERENCES `processingmethod` (`id`),
  ADD CONSTRAINT `p_rid_fk` FOREIGN KEY (`roaster_id`) REFERENCES `roaster` (`id`),
  ADD CONSTRAINT `p_rlid_fk` FOREIGN KEY (`rlevel_id`) REFERENCES `roastlevel` (`id`),
  ADD CONSTRAINT `p_vid_fk` FOREIGN KEY (`var_id`) REFERENCES `varietal` (`id`);

--
-- Constraints for table `tasting`
--
ALTER TABLE `tasting`
  ADD CONSTRAINT `t_bid_fk` FOREIGN KEY (`batch_id`) REFERENCES `batch` (`id`),
  ADD CONSTRAINT `t_bmid_fk` FOREIGN KEY (`bm_id`) REFERENCES `brewmethod` (`id`),
  ADD CONSTRAINT `t_rid_fk` FOREIGN KEY (`rate_id`) REFERENCES `rating` (`id`);

--
-- Constraints for table `tastingnotes`
--
ALTER TABLE `tastingnotes`
  ADD CONSTRAINT `tn_nid_fk` FOREIGN KEY (`note_id`) REFERENCES `notes` (`id`),
  ADD CONSTRAINT `tn_tid_fk` FOREIGN KEY (`taste_id`) REFERENCES `tasting` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

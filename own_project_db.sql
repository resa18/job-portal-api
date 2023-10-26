-- -------------------------------------------------------------
-- TablePlus 5.4.2(506)
--
-- https://tableplus.com/
--
-- Database: own_project_db
-- Generation Time: 2023-10-26 18:05:47.2880
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `carts`;
CREATE TABLE `carts` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `outlet_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `item_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `qty` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `item_id` (`item_id`),
  KEY `outlet_id` (`outlet_id`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`),
  CONSTRAINT `carts_ibfk_3` FOREIGN KEY (`outlet_id`) REFERENCES `outlets` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `detail_transactions`;
CREATE TABLE `detail_transactions` (
  `transaction_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `item_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `outlet_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `price` int DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `sub_total` int DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`transaction_id`,`item_id`,`outlet_id`),
  KEY `item_id` (`item_id`),
  KEY `outlet_id` (`outlet_id`),
  CONSTRAINT `detail_transactions_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `detail_transactions_ibfk_3` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `detail_transactions_ibfk_4` FOREIGN KEY (`outlet_id`) REFERENCES `outlets` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `items`;
CREATE TABLE `items` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `total_stock` int DEFAULT NULL,
  `outlet_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `outlets`;
CREATE TABLE `outlets` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `stocks`;
CREATE TABLE `stocks` (
  `warehouse_id` char(36) NOT NULL,
  `item_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `total_stock` int NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`warehouse_id`,`item_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `stocks_ibfk_1` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses` (`id`),
  CONSTRAINT `stocks_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `transactions`;
CREATE TABLE `transactions` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `total_amount` int DEFAULT NULL,
  `total_item` int DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `warehouses`;
CREATE TABLE `warehouses` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `outlet_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `outlet_id` (`outlet_id`),
  CONSTRAINT `warehouses_ibfk_1` FOREIGN KEY (`outlet_id`) REFERENCES `outlets` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `carts` (`id`, `user_id`, `outlet_id`, `status`, `item_id`, `qty`, `created_at`, `updated_at`) VALUES
('142d5cb0-98d8-4df7-92db-aeb746ca9100', '70fb8e24-6c69-4d50-b3c2-684b57063073', 'OT-1', 'expired', 'IT-2', 5, '2023-10-25 11:42:43', '2023-10-26 08:05:00'),
('142d5cb0-98d8-4df7-92db-aeb746ca9101', '70fb8e24-6c69-4d50-b3c2-684b57063073', 'OT-1', 'active', 'IT-6', 3, '2023-10-25 11:42:43', '2023-10-25 11:42:43'),
('c29831ea-e562-412d-adde-10ae6b85021a', '70fb8e24-6c69-4d50-b3c2-684b57063073', 'OT-2', 'expired', 'IT-11', 2, '2023-10-26 08:16:12', '2023-10-26 08:47:49');

INSERT INTO `detail_transactions` (`transaction_id`, `item_id`, `outlet_id`, `price`, `qty`, `sub_total`, `status`, `created_at`, `updated_at`) VALUES
('61bcfba6-bea9-401d-9493-ba86ee45d217', 'IT-11', 'OT-2', 21000000, 2, 42000000, 'paid', '2023-10-26 08:47:49', '2023-10-26 08:48:27'),
('7d8e2110-2bfe-42c8-9118-3fbb86b244b7', 'IT-2', 'OT-1', 15000000, 5, 75000000, 'expired', '2023-10-25 15:36:34', '2023-10-26 07:47:00'),
('7d8e2110-2bfe-42c8-9118-3fbb86b244b7', 'IT-6', 'OT-1', 13000000, 3, 39000000, 'expired', '2023-10-25 15:36:34', '2023-10-26 07:47:00');

INSERT INTO `items` (`id`, `name`, `description`, `price`, `total_stock`, `outlet_id`, `created_at`, `updated_at`) VALUES
('IT-1', 'Iphone 14', 'All Color', 13000000, 10, 'OT-1', NULL, NULL),
('IT-10', 'Iphone 15', 'All Color', 17000000, 15, 'OT-2', NULL, NULL),
('IT-11', 'Iphone 15 Pro', 'All Color', 21000000, 15, 'OT-2', NULL, NULL),
('IT-12', 'Iphone 15 Pro Max', 'All Color', 25000000, 15, 'OT-2', NULL, NULL),
('IT-2', 'Iphone 14 Pro', 'All Color', 15000000, 3, 'OT-1', NULL, '2023-10-26 06:02:15'),
('IT-3', 'Iphone 14 Pro Max', 'All Color', 18000000, 10, 'OT-1', NULL, NULL),
('IT-4', 'Iphone 15', 'All Color', 17000000, 10, 'OT-1', NULL, NULL),
('IT-5', 'Iphone 15 Pro', 'All Color', 21000000, 10, 'OT-1', NULL, NULL),
('IT-6', 'Iphone 15 Pro Max', 'All Color', 25000000, 10, 'OT-1', NULL, NULL),
('IT-7', 'Iphone 14', 'All Color', 13000000, 15, 'OT-2', NULL, NULL),
('IT-8', 'Iphone 14 Pro', 'All Color', 15000000, 15, 'OT-2', NULL, NULL),
('IT-9', 'Iphone 14 Pro Max', 'All Color', 18000000, 15, 'OT-2', NULL, NULL);

INSERT INTO `outlets` (`id`, `name`, `created_at`, `updated_at`) VALUES
('OT-1', 'ITech Store', '2023-10-25 12:58:19', '2023-10-25 12:58:19'),
('OT-2', 'AP Store', '2023-10-25 12:58:19', '2023-10-25 12:58:19');

INSERT INTO `stocks` (`warehouse_id`, `item_id`, `total_stock`, `created_at`, `updated_at`) VALUES
('1', 'IT-1', 25, NULL, NULL),
('1', 'IT-2', 12, NULL, NULL),
('1', 'IT-3', 21, NULL, NULL),
('1', 'IT-4', 20, NULL, NULL),
('1', 'IT-5', 15, NULL, NULL),
('1', 'IT-6', 12, NULL, NULL),
('2', 'IT-4', 28, NULL, '2023-10-26 09:46:30'),
('2', 'IT-5', 50, NULL, NULL),
('2', 'IT-6', 50, NULL, NULL),
('3', 'IT-4', 22, '2023-10-26 09:40:56', '2023-10-26 09:46:30');

INSERT INTO `transactions` (`id`, `user_id`, `total_amount`, `total_item`, `status`, `created_at`, `updated_at`) VALUES
('61bcfba6-bea9-401d-9493-ba86ee45d217', '70fb8e24-6c69-4d50-b3c2-684b57063073', 42000000, 1, 'paid', '2023-10-26 08:47:49', '2023-10-26 08:48:27'),
('7d8e2110-2bfe-42c8-9118-3fbb86b244b7', '70fb8e24-6c69-4d50-b3c2-684b57063073', 114000000, 2, 'expired', '2023-10-25 15:36:34', '2023-10-26 07:47:00'),
('deadb307-9ad7-4c54-81d7-0843ccd8f9da', '70fb8e24-6c69-4d50-b3c2-684b57063073', 42000000, 1, 'expired', '2023-10-26 08:44:37', '2023-10-26 09:10:00');

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `created_at`, `updated_at`) VALUES
('70fb8e24-6c69-4d50-b3c2-684b57063073', 'RESA DWIANTORO', 'email@gmail.com', '$2b$10$.EykFme3ijJjpn2qcUu7DuNfWwkfD/R8MvhLxKfhlKFvx9ZvDAfeG', '081931223123', '2023-10-25 06:38:22', '2023-10-25 06:38:22');

INSERT INTO `warehouses` (`id`, `name`, `outlet_id`, `is_active`, `created_at`, `updated_at`) VALUES
('1', 'Warehouse A', 'OT-1', 1, '2023-10-25 10:52:50', '2023-10-26 04:30:18'),
('2', 'Warehouse B', 'OT-2', 1, '2023-10-25 10:52:50', '2023-10-25 10:52:50'),
('3', 'Warehouse C', 'OT-2', 1, '2023-10-25 10:52:50', '2023-10-25 10:52:50');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
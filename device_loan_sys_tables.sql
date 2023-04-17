-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1:3306
-- 生成日期： 2023-02-21 17:36:02
-- 服务器版本： 5.7.36
-- PHP 版本： 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `dl`
--

-- --------------------------------------------------------

--
-- 表的结构 `device`
--

DROP TABLE IF EXISTS `device`;
CREATE TABLE IF NOT EXISTS `device` (
  `deviceId` int(11) NOT NULL AUTO_INCREMENT,
  `state` varchar(255) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `ruleExt` tinyint(1) DEFAULT NULL,
  `ruleDur` int(11) DEFAULT NULL,
  `qrCode` int(11) DEFAULT NULL,
  `storage` varchar(255) DEFAULT NULL,
  `launchYr` int(11) DEFAULT NULL,
  `cost` double(10,2) DEFAULT NULL,
  PRIMARY KEY (`deviceId`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `device`
--

INSERT INTO `device` (`deviceId`, `state`, `details`, `category`, `name`, `ruleExt`, `ruleDur`, `qrCode`, `storage`, `launchYr`, `cost`) VALUES
(0, 'Available', '{"CPU": "Intel Core i9-12900H Octo-core 20 threads", "GPU": "RTX 3070ti 8G 150W", "Memory": "DDR5 16GB 4800Hz Dual", "SSD": "SAMSUNG PM9A1 512GB", "Screen": "2.5K (2560*1600) 16:10 165Hz", "Power": "300W", "WIFI": "AX211"}', 'Laptop', 'Lenovo Legion Y9000P 2022 RTX 3070ti', 1, 14, 123, 'A1', 2022, 1000.00),
(1, 'Reserved', '{"CPU": "Intel Core i7-12700H Octo-core 16 threads", "GPU": "RTX 3070 8G 140W", "Memory": "DDR5 16GB 4800Hz Dual", "SSD": "SAMSUNG PM9A1 512GB", "Screen": "2.5K (2560*1600) 16:10 165Hz", "Power": "300W", "WIFI": "AX211"}', 'Laptop', 'Lenovo Legion Y9000P 2022 RTX 3070', 0, 7, 1234, 'A2', 2022, 900.00),
(2, 'Loaned', '{"CPU": "M1 Pro 10-Core", "Memory": "16GB Unified", "SSD": "512GB", "Screen": "13.3-inch Retina Display", "Ports": "2 x Thunderbolt 4"}', 'Laptop', 'Apple MacBook Air 2022', 1, 14, 1235, 'A3', 2022, 1300.00),
(3, 'Available', '{"CPU": "M1 Pro 10-Core", "Memory": "16GB Unified", "SSD": "512GB", "Screen": "14-inch Retina Display", "Ports": "3 x Thunderbolt 4"}', 'Laptop', 'Apple MacBook Pro 2022 14-inch', 1, 14, 1236, 'A4', 2022, 1500.00),
(4, 'Available', '{"CPU": "M1 Pro 10-Core", "Memory": "16GB Unified", "SSD": "512GB", "Screen": "16-inch Retina Display", "Ports": "3 x Thunderbolt 4"}', 'Laptop', 'Apple MacBook Pro 2022 16-inch', 1, 14, 1237, 'A5', 2022, 1700.00),
(5, 'Maintenance', '{"CPU": "Intel Core i9-12900H Octo-core 20 threads", "GPU": "NVIDIA GeForce RTX 3070 8GB", "Memory": "DDR5 16GB 4800Hz Dual", "SSD": "SAMSUNG PM9A1 1TB", "Screen": "17.3-inch 4K OLED", "Ports": "4 x Thunderbolt 4"}', 'Laptop', 'Dell XPS 17 2022', 1, 14, 1239, 'A7', 2022, 1800.00),
(6, 'Available', '{"CPU": "Intel Core i7-1165G7", "Memory": "16GB LPDDR4x", "SSD": "512GB", "Screen": "13-inch PixelSense Display", "Ports": "1 x USB-C"}', 'Tablet', 'Microsoft Surface Pro 8', 1, 14, 1240, 'A8', 2021, 1400.00),
(7, 'Loaned', '{"CPU": "Intel Core i7-1195G7", "GPU": "NVIDIA GeForce RTX 3050 Ti", "Memory": "16GB LPDDR4x", "SSD": "512GB", "Screen": "14.4-inch PixelSense Display", "Ports": "2 x USB-C"}', 'Laptop', 'Microsoft Surface Laptop Studio', 1, 14, 1241, 'A9', 2021, 2000.00),
(8, 'Maintenance', '{"CPU": "Intel Core i7-1185G7", "Memory": "16GB LPDDR4x", "SSD": "1TB", "Screen": "14-inch FHD", "Ports": "2 x Thunderbolt 4"}', 'Laptop', 'Lenovo ThinkPad X1 Carbon Gen 9', 1, 14, 1242, 'A10', 2021, 1600.00),
(9, 'Reserved', '{"CPU": "Intel Core i7-1165G7", "Memory": "16GB LPDDR4x", "SSD": "1TB", "Screen": "14-inch FHD", "Ports": "2 x Thunderbolt 4"}', 'Laptop', 'Lenovo ThinkPad X1 Yoga Gen 6', 1, 14, 1243, 'A11', 2021, 1700.00),
(10, 'Available', '{"CPU": "Intel Core i9-12900H Octo-core 20 threads", "GPU": "RTX 3070ti 8G 150W", "Memory": "DDR5 16GB 4800Hz Dual", "SSD": "SAMSUNG PM9A1 512GB", "Screen": "2.5K (2560*1600) 16:10 165Hz", "Power": "300W", "WIFI": "AX211"}', 'Laptop', 'Lenovo Legion Y9000P 2022 RTX 3070ti', 1, 14, 123, 'A1', 2022, 1000.00),
(11, 'Available', '{"CPU": "M1 Pro 10-Core", "Memory": "16GB Unified", "SSD": "512GB", "Screen": "14-inch Retina Display", "Ports": "3 x Thunderbolt 4"}', 'Laptop', 'Apple MacBook Pro 2022 14-inch', 1, 14, 1236, 'A4', 2022, 1500.00),
(12, 'Maintenance', '{"CPU": "Intel Core i7-1185G7", "Memory": "16GB LPDDR4x", "SSD": "1TB", "Screen": "14-inch FHD", "Ports": "2 x Thunderbolt 4"}', 'Laptop', 'Lenovo ThinkPad X1 Carbon Gen 9', 1, 14, 1242, 'A10', 2021, 1600.00),
(13, 'Maintenance', '{"CPU": "Intel Core i9-12900H Octo-core 20 threads", "GPU": "NVIDIA GeForce RTX 3070 8GB", "Memory": "DDR5 16GB 4800Hz Dual", "SSD": "SAMSUNG PM9A1 1TB", "Screen": "17.3-inch 4K OLED", "Ports": "4 x Thunderbolt 4"}', 'Laptop', 'Dell XPS 17 2022', 1, 14, 1239, 'A7', 2022, 1800.00);



-- --------------------------------------------------------

--
-- 表的结构 `loan`
--

DROP TABLE IF EXISTS `loan`;
CREATE TABLE IF NOT EXISTS `loan` (
  `loanId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `dueDate` date DEFAULT NULL,
  `deviceId` int(11) DEFAULT NULL,
  `exten` tinyint(1) DEFAULT NULL,
  `scheduledCollectionDate` date DEFAULT NULL,
  `scheduledReturnDate` date DEFAULT NULL,
  PRIMARY KEY (`loanId`),
  KEY `deviceId` (`deviceId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

INSERT INTO `loan` (`loanId`, `userId`, `startDate`, `dueDate`, `deviceId`, `exten`, `scheduledCollectionDate`, `scheduledReturnDate`)
VALUES
(1, 1, '2022-01-01', '2024-01-15', 1, 0, NULL, NULL),
(2, 1, '2022-02-05', '2024-02-20', 2, 1, NULL, NULL),
(3, 2, '2022-03-10', '2024-03-25', 3, 0, NULL, NULL),
(4, 2, '2022-04-01', '2024-04-16', 4, 0, NULL, NULL),
(5, 2, '2022-05-01', '2024-05-16', 5, 1, NULL, NULL),
(6, 1, '2022-06-01', '2024-06-16', 6, 0, NULL, NULL),
(7, 3, '2022-07-01', '2024-07-16', 7, 0, NULL, NULL),
(8, 2, '2022-08-01', '2024-08-16', 8, 1, NULL, NULL),
(9, 3, '2022-09-01', '2024-09-16', 9, 0, NULL, NULL),
(10, 3, '2022-10-01', '2024-10-16', 10, 0, NULL, NULL),
(11, 1, '2022-11-01', '2024-11-16', 11, 1, NULL, NULL),
(12, 1, '2022-12-01', '2024-12-16', 12, 0, NULL, NULL),
(13, 3, '2023-01-01', '2025-01-16', 13, 0, NULL, NULL);

-- 'admins'
-- DROP TABLE IF EXISTS `admins` (`adminUPI`,`schedule`)

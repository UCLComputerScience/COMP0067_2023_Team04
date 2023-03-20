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
  `status` varchar(255) DEFAULT NULL,
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

INSERT INTO `device` (`deviceId`, `status`, `details`, `category`, `name`, `ruleExt`, `ruleDur`, `qrCode`, `storage`, `launchYr`, `cost`) VALUES
(1, 'Available', 'abababa', 'Laptop', 'Laptop1', 1, 14, 123, 'A1', 2022, 1000.00),
(2, 'Available', 'cdefg', 'Tablet', 'Tablet1', 0, 7, 456, 'B2', 2021, 750.00),
(3, 'Reserved', 'xyzxyz', 'Smartphone', 'Phone1', 1, 14, 789, 'C3', 2020, 500.00),
(4, 'Available', 'hijklm', 'Laptop', 'Laptop2', 0, 7, 234, 'A1', 2023, 1200.00),
(5, 'Unavailable', 'nopqrs', 'Printer', 'Printer1', 1, 14, 567, 'D4', 2019, 800.00);

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
(1, 1, '2022-01-01', '2024-01-15', 1001, 0, NULL, NULL),
(2, 1, '2022-02-05', '2024-02-20', 1002, 1, NULL, NULL),
(3, 2, '2022-03-10', '2024-03-25', 1003, 0, NULL, NULL);
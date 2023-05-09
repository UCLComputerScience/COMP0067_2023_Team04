-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/

-- settings
-- SET GLOBAL event_scheduler = ON; -- SET in Azure
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+01:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- device table
-- deviceIds are UUIDs
-- ruleExt refers to how many times a renewal can be made
-- issues provides extra space to note down any device issues
-- state can be Available, Reserved, Loaned, Maintenance, and Scrapped
DROP TABLE IF EXISTS `device`;
CREATE TABLE IF NOT EXISTS `device` (
  `deviceId` CHAR(36) NOT NULL,
  `registerDate` date,
  `state` varchar(255) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `ruleExt` int(11) DEFAULT NULL,
  `ruleDur` int(11) DEFAULT NULL,
  `storage` varchar(255) DEFAULT NULL,
  `launchYr` int(11) DEFAULT NULL,
  `cost` double(10,2) DEFAULT NULL,
  `issues` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`deviceId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `device` (`deviceId`, `registerDate`, `state`, `details`, `category`, `name`, `ruleExt`, `ruleDur`, `storage`, `launchYr`, `cost`) VALUES
('fb73ee46-e7ac-11ed-93d2-6045bdd1583d', CURRENT_DATE(),'Loaned', '{"CPU": "Intel Core i9-12900H Octo-core 20 threads", "GPU": "RTX 3070ti 8G 150W", "Memory": "DDR5 16GB 4800Hz Dual", "SSD": "SAMSUNG PM9A1 512GB", "Screen": "2.5K (2560*1600) 16:10 165Hz", "Power": "300W", "WIFI": "AX211"}', 'Laptop', 'Lenovo Legion Y9000P 2022 RTX 3070ti', 1, 14, 'A1', 2022, 1000.00),
('dab4de3d-e7ac-11ed-93d2-6045bdd1583d', CURRENT_DATE(),'Loaned', '{"CPU": "Intel Core i7-12700H Octo-core 16 threads", "GPU": "RTX 3070 8G 140W", "Memory": "DDR5 16GB 4800Hz Dual", "SSD": "SAMSUNG PM9A1 512GB", "Screen": "2.5K (2560*1600) 16:10 165Hz", "Power": "300W", "WIFI": "AX211"}', 'Laptop', 'Lenovo Legion Y9000P 2022 RTX 3070', 1, 7, 'A2', 2022, 900.00),
('efbe9ea8-e7ab-11ed-93d2-6045bdd1583d', CURRENT_DATE(),'Loaned', '{"CPU": "M1 Pro 10-Core", "Memory": "16GB Unified", "SSD": "512GB", "Screen": "13.3-inch Retina Display", "Ports": "2 x Thunderbolt 4"}', 'Laptop', 'Apple MacBook Air 2022', 1, 14, 'A3', 2022, 1300.00),
('051d4e1a-e7ac-11ed-93d2-6045bdd1583d', CURRENT_DATE(),'Loaned', '{"CPU": "M1 Pro 10-Core", "Memory": "16GB Unified", "SSD": "512GB", "Screen": "14-inch Retina Display", "Ports": "3 x Thunderbolt 4"}', 'Laptop', 'Apple MacBook Pro 2022 14-inch', 1, 14, 'A4', 2022, 1500.00),
('09a5423b-e7ac-11ed-93d2-6045bdd1583d', CURRENT_DATE(),'Loaned', '{"CPU": "M1 Pro 10-Core", "Memory": "16GB Unified", "SSD": "512GB", "Screen": "16-inch Retina Display", "Ports": "3 x Thunderbolt 4"}', 'Laptop', 'Apple MacBook Pro 2022 16-inch', 1, 14, 'A5', 2022, 1700.00),
('a411ce8b-e7ac-11ed-93d2-6045bdd1583d', CURRENT_DATE(),'Loaned', '{"CPU": "Intel Core i9-12900H Octo-core 20 threads", "GPU": "NVIDIA GeForce RTX 3070 8GB", "Memory": "DDR5 16GB 4800Hz Dual", "SSD": "SAMSUNG PM9A1 1TB", "Screen": "17.3-inch 4K OLED", "Ports": "4 x Thunderbolt 4"}', 'Laptop', 'Dell XPS 17 2022', 1, 14, 'A7', 2022, 1800.00),
('aad7cc2c-e7ac-11ed-93d2-6045bdd1583d', CURRENT_DATE(),'Reserved', '{"CPU": "Intel Core i7-1165G7", "Memory": "16GB LPDDR4x", "SSD": "512GB", "Screen": "13-inch PixelSense Display", "Ports": "1 x USB-C"}', 'Tablet', 'Microsoft Surface Pro 8', 1, 14, 'A8', 2021, 1400.00),
('aea90655-e7ac-11ed-93d2-6045bdd1583d', CURRENT_DATE(),'Available', '{"CPU": "Intel Core i7-1195G7", "GPU": "NVIDIA GeForce RTX 3050 Ti", "Memory": "16GB LPDDR4x", "SSD": "512GB", "Screen": "14.4-inch PixelSense Display", "Ports": "2 x USB-C"}', 'Laptop', 'Microsoft Surface Laptop Studio', 1, 14, 'A9', 2021, 2000.00),
('b397e028-e7ac-11ed-93d2-6045bdd1583d', CURRENT_DATE(),'Available', '{"CPU": "Intel Core i7-1185G7", "Memory": "16GB LPDDR4x", "SSD": "1TB", "Screen": "14-inch FHD", "Ports": "2 x Thunderbolt 4"}', 'Laptop', 'Lenovo ThinkPad X1 Carbon Gen 9', 1, 14, 'A10', 2021, 1600.00),
('bacf5a3c-e7ac-11ed-93d2-6045bdd1583d', CURRENT_DATE(),'Available', '{"CPU": "Intel Core i7-1165G7", "Memory": "16GB LPDDR4x", "SSD": "1TB", "Screen": "14-inch FHD", "Ports": "2 x Thunderbolt 4"}', 'Laptop', 'Lenovo ThinkPad X1 Yoga Gen 6', 1, 14, 'A11', 2021, 1700.00),
('c3ce447d-e7ac-11ed-93d2-6045bdd1583d', CURRENT_DATE(),'Scrapped', '{"CPU": "Intel Core i9-12900H Octo-core 20 threads", "GPU": "RTX 3070ti 8G 150W", "Memory": "DDR5 16GB 4800Hz Dual", "SSD": "SAMSUNG PM9A1 512GB", "Screen": "2.5K (2560*1600) 16:10 165Hz", "Power": "300W", "WIFI": "AX211"}', 'Laptop', 'Lenovo Legion Y9000P 2022 RTX 3070ti', 1, 14, 'A1', 2022, 1000.00),
('cdf8c212-e7ac-11ed-93d2-6045bdd1583d', CURRENT_DATE(),'Maintenance', '{"CPU": "M1 Pro 10-Core", "Memory": "16GB Unified", "SSD": "512GB", "Screen": "14-inch Retina Display", "Ports": "3 x Thunderbolt 4"}', 'Laptop', 'Apple MacBook Pro 2022 14-inch', 1, 14, 'A4', 2022, 1500.00),
('dff5d4ba-e7ac-11ed-93d2-6045bdd1583d', CURRENT_DATE(),'Available', '{"CPU": "Intel Core i7-1185G7", "Memory": "16GB LPDDR4x", "SSD": "1TB", "Screen": "14-inch FHD", "Ports": "2 x Thunderbolt 4"}', 'Laptop', 'Lenovo ThinkPad X1 Carbon Gen 9', 1, 14, 'A10', 2021, 1600.00),
('e9dc9c56-e7ac-11ed-93d2-6045bdd1583d', CURRENT_DATE(),'Available', '{"CPU": "Intel Core i9-12900H Octo-core 20 threads", "GPU": "NVIDIA GeForce RTX 3070 8GB", "Memory": "DDR5 16GB 4800Hz Dual", "SSD": "SAMSUNG PM9A1 1TB", "Screen": "17.3-inch 4K OLED", "Ports": "4 x Thunderbolt 4"}', 'Laptop', 'Dell XPS 17 2022', 1, 14, 'A7', 2022, 1800.00),
('b4ac3b32-af1c-11ec-94b7-6045bdd1583d', CURRENT_DATE(), 'Loaned', '{"CPU": "Intel Core i7-1185G7", "Memory": "16GB LPDDR4x", "SSD": "1TB", "Screen": "14-inch FHD", "Ports": "2 x Thunderbolt 4"}', 'Laptop', 'Lenovo ThinkPad X1 Carbon Gen 9', 1, 14, 'A12', 2021, 1600.00),
('cde71f44-af1c-11ec-94b7-6045bdd1583d', CURRENT_DATE(), 'Loaned', '{"CPU": "M1 Pro 10-Core", "Memory": "16GB Unified", "SSD": "512GB", "Screen": "14-inch Retina Display", "Ports": "3 x Thunderbolt 4"}', 'Laptop', 'Apple MacBook Pro 2022 14-inch', 1, 14, 'A13', 2022, 1500.00),
('e6bf12a6-af1c-11ec-94b7-6045bdd1583d', CURRENT_DATE(), 'Loaned', '{"CPU": "Intel Core i9-12900H Octo-core 20 threads", "GPU": "NVIDIA GeForce RTX 3080 10GB", "Memory": "DDR5 32GB 4800Hz Dual", "SSD": "SAMSUNG PM9A1 1TB", "Screen": "15.6-inch 4K OLED", "Ports": "4 x Thunderbolt 4"}', 'Laptop', 'Dell XPS 15 2022', 1, 14, 'A14', 2022, 2000.00);

-- loan table
-- note that startDate = start of reservation
-- exten refers to how many times a loan has been extended
DROP TABLE IF EXISTS `loan`;
CREATE TABLE IF NOT EXISTS `loan` (
  `loanId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) DEFAULT NULL,
  `userEmail` varchar(255) DEFAULT NULL,
  `startDate` date,
  `dueDate` date DEFAULT NULL,
  `deviceId` CHAR(36) DEFAULT NULL,
  `exten` int(11) DEFAULT 0,
  `returnedDate` date DEFAULT NULL,
  PRIMARY KEY (`loanId`),
  KEY `deviceId` (`deviceId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

INSERT INTO `loan` (`loanId`, `userId`, `userEmail`, `startDate`, `dueDate`, `deviceId`, `exten`, `returnedDate`)
VALUES
(1,'cdaix20', 'ucabcda@ucl.ac.uk', '2023-01-01', '2023-01-16', 'dff5d4ba-e7ac-11ed-93d2-6045bdd1583d', 0 , '2023-01-18'),
(2,'cdaix20', 'ucabcda@ucl.ac.uk', '2023-02-01', '2023-03-16', 'e9dc9c56-e7ac-11ed-93d2-6045bdd1583d', 0 , '2023-02-18'),
(3,'cdaix20', 'ucabcda@ucl.ac.uk', '2023-03-01', '2023-05-16', 'fb73ee46-e7ac-11ed-93d2-6045bdd1583d', 0 , NULL),
(4,'cdaix20', 'ucabcda@ucl.ac.uk', '2023-04-01', '2023-05-06', 'dab4de3d-e7ac-11ed-93d2-6045bdd1583d', 0 , NULL),
(5,'cdaix20', 'ucabcda@ucl.ac.uk', '2023-05-10', '2023-05-24', 'efbe9ea8-e7ab-11ed-93d2-6045bdd1583d', 0 , NULL),
(6,'jhudx92', 'ucabj38@ucl.ac.uk', '2023-04-01', '2023-04-24', 'bacf5a3c-e7ac-11ed-93d2-6045bdd1583d', 0 , '2023-04-24'),
(7, 'tchaa15', 'ucabtc5@ucl.ac.uk', '2023-05-01', '2023-05-06', '051d4e1a-e7ac-11ed-93d2-6045bdd1583d', 0, NULL),
(8, 'tchaa15', 'ucabtc5@ucl.ac.uk', '2023-05-02', '2023-05-09', '09a5423b-e7ac-11ed-93d2-6045bdd1583d', 0, NULL),
(9, 'tchaa15', 'ucabtc5@ucl.ac.uk', '2023-05-03', '2023-05-10', 'a411ce8b-e7ac-11ed-93d2-6045bdd1583d', 0, NULL),
(10, 'tchaa15', 'ucabtc5@ucl.ac.uk', '2023-05-03', NULL, 'aad7cc2c-e7ac-11ed-93d2-6045bdd1583d', 0, NULL);

-- EVENT CALLED AT THE END OF EACH WEEK TO CLEAR RESERVATIONS
DROP EVENT IF EXISTS `clear_reservations`;
DELIMITER $$
CREATE EVENT IF NOT EXISTS `clear_reservations`
ON SCHEDULE EVERY 1 WEEK STARTS CURRENT_DATE + INTERVAL (7 - DAYOFWEEK(CURRENT_DATE)) DAY + INTERVAL '23:59:59' HOUR_SECOND
ON COMPLETION PRESERVE
DO
  BEGIN
    -- delete the most recent loan associated with each 'Reserved' device
    DELETE loan FROM loan 
    INNER JOIN (
        SELECT deviceId, MAX(startDate) as maxDate
        FROM loan 
        INNER JOIN device ON loan.deviceId = device.deviceId
        WHERE device.state = 'Reserved'
        GROUP BY deviceId
    ) AS t1 ON loan.deviceId = t1.deviceId AND loan.startDate = t1.maxDate;

    -- update the state of 'Reserved' devices to 'Available'
    UPDATE device
    SET state = 'Available'
    WHERE state = 'Reserved';
  END $$
DELIMITER ;
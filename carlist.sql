-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 17, 2024 at 02:38 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `carlist`
--

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `carId` int(11) NOT NULL,
  `brand` text NOT NULL,
  `model` text NOT NULL,
  `category` text NOT NULL,
  `seats` int(11) NOT NULL,
  `cc` int(11) NOT NULL,
  `transmission` text NOT NULL,
  `rental` int(11) NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`carId`, `brand`, `model`, `category`, `seats`, `cc`, `transmission`, `rental`, `image`) VALUES
(1, 'toyota', 'vios', 'sedan', 5, 1500, 'auto', 60, 'https://imgcdn.oto.com/large/gallery/color/38/1798/toyota-vios-color-631442.jpg'),
(2, 'toyota', 'corolla altis', 'sedan', 5, 1600, 'auto', 70, 'https://www.toyota.com.sg/showroom/new-models/-/media/81c22c688cd445d5a0e6cc495d2dddcf.png'),
(3, 'honda', 'civic', 'sedan', 5, 1800, 'auto', 80, 'https://www.honda.com.sg/images/cars/2021_All-New_Civic/Exterior/Exterior.png'),
(4, 'honda', 'city', 'sedan', 5, 1600, 'auto', 70, 'https://www.honda.com.sg/images/cars/city/main-banner/City_2024/Home-Model-Image---732x455pxSV.png'),
(5, 'mazada', 'cx-30', 'suv', 5, 2000, 'auto', 100, 'https://s1.paultan.org/image/2019/03/Mazda-CX-30-12.jpg'),
(6, 'honda', 'vezel', 'suv', 5, 2000, 'auto', 100, 'https://www.honda.com.sg/images/cars/2024_HR-V/NEW_HR-V_Home_Model_Image_-_732x455px.png'),
(7, 'toyota', 'rav4', 'suv', 5, 2500, 'auto', 120, 'https://www.toyota.com.sg/showroom/new-models/-/media/5391b0cb37f945d5b0e4d43fa77f62db.png'),
(8, 'hyundai', 'kona', 'suv', 5, 2000, 'auto', 100, 'https://hyundai.com.sg/_nuxt/image/c329ea.png'),
(9, 'mercedes', 'c180', 'luxury', 5, 2000, 'auto', 150, 'https://motorshow.com.br/wp-content/uploads/sites/2/2016/04/mercedes-classe-c-flex.jpg'),
(10, 'bmw', '3 series', 'luxury', 5, 2000, 'auto', 150, 'https://doubleapex.co.za/wp-content/uploads/New-BMW-3-Series-with-Performance-Parts.jpg'),
(11, 'lexus', 'IS 300h', 'luxury', 5, 2000, 'auto', 140, 'https://www.lexus.com.sg/content/dam/lexus-v3-blueprint/models/sedan/is/mlp/my21/teaser/features/lexus-is-teaser-features-1.jpg'),
(12, 'mercedes', 'A180', 'luxury', 5, 1800, 'auto', 130, 'https://imgcdn.oto.com.sg/large/gallery/exterior/8/43/mercedes-benz-a-class-sedan-front-angle-low-view-631301.jpg'),
(13, 'toyota', 'alphard', 'mpv', 7, 2500, 'auto', 140, 'https://www.toyota.com.sg/showroom/new-models/-/media/1384774ee4d946d39965fc30b3b693a8.png'),
(14, 'nissan', 'serena', 'mpv', 7, 2500, 'auto', 140, 'https://www.dsf.my/wp-content/uploads/2018/05/02-All-New-Serena_Premium-Highway-Star_Front.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customerId` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `license` varchar(20) NOT NULL,
  `dob` date NOT NULL,
  `location` varchar(100) NOT NULL,
  `postal` int(10) NOT NULL,
  `startdate` date NOT NULL,
  `enddate` date NOT NULL,
  `contact` int(20) NOT NULL,
  `car` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customerId`, `name`, `license`, `dob`, `location`, `postal`, `startdate`, `enddate`, `contact`, `car`) VALUES
(9, 'Javier', 't0509649e', '2024-07-16', 'punggol', 823173, '2024-07-16', '2024-07-16', 85956706, 'bmw 3 series'),
(10, 'Elhan', 't0509649e11', '2024-07-17', 'pasir ris', 123456, '2024-07-17', '2024-07-17', 987654321, 'toyota rav4');

-- --------------------------------------------------------

--
-- Table structure for table `inquiry`
--

CREATE TABLE `inquiry` (
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `image` text NOT NULL,
  `comments` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`carId`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customerId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `carId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

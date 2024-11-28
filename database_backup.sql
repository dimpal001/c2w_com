-- MySQL dump 10.13  Distrib 8.0.40, for Linux (x86_64)
--
-- Host: localhost    Database: c2w_shopping
-- ------------------------------------------------------
-- Server version	8.0.40-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Announcements`
--

DROP TABLE IF EXISTS `Announcements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Announcements` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `text` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Announcements`
--

LOCK TABLES `Announcements` WRITE;
/*!40000 ALTER TABLE `Announcements` DISABLE KEYS */;
INSERT INTO `Announcements` VALUES ('46d36e24-30e5-42f4-b46e-838d86fe1ae3','50% off on first orders');
/*!40000 ALTER TABLE `Announcements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ArrivalsLink`
--

DROP TABLE IF EXISTS `ArrivalsLink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ArrivalsLink` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ArrivalsLink`
--

LOCK TABLES `ArrivalsLink` WRITE;
/*!40000 ALTER TABLE `ArrivalsLink` DISABLE KEYS */;
/*!40000 ALTER TABLE `ArrivalsLink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AuditLog`
--

DROP TABLE IF EXISTS `AuditLog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AuditLog` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `action` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `AuditLog_userId_fkey` (`userId`),
  CONSTRAINT `AuditLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AuditLog`
--

LOCK TABLES `AuditLog` WRITE;
/*!40000 ALTER TABLE `AuditLog` DISABLE KEYS */;
/*!40000 ALTER TABLE `AuditLog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Blogs`
--

DROP TABLE IF EXISTS `Blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Blogs` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hyperLink` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Blogs`
--

LOCK TABLES `Blogs` WRITE;
/*!40000 ALTER TABLE `Blogs` DISABLE KEYS */;
/*!40000 ALTER TABLE `Blogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Button`
--

DROP TABLE IF EXISTS `Button`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Button` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `iconUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Button`
--

LOCK TABLES `Button` WRITE;
/*!40000 ALTER TABLE `Button` DISABLE KEYS */;
/*!40000 ALTER TABLE `Button` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CartItem`
--

DROP TABLE IF EXISTS `CartItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CartItem` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `CartItem_userId_fkey` (`userId`),
  KEY `CartItem_productId_fkey` (`productId`),
  CONSTRAINT `CartItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CartItem_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CartItem`
--

LOCK TABLES `CartItem` WRITE;
/*!40000 ALTER TABLE `CartItem` DISABLE KEYS */;
INSERT INTO `CartItem` VALUES ('0f8e2674-6c89-49e7-9927-0401ade4d5eb','6eeb6f1d-2508-4cc6-b64c-8a881363168c','15eb4732-3c11-498a-a8fc-befc29ca1f00',5,'2024-11-15 07:52:51.812','2024-11-15 07:52:51.812');
/*!40000 ALTER TABLE `CartItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CollectionLink`
--

DROP TABLE IF EXISTS `CollectionLink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CollectionLink` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CollectionLink`
--

LOCK TABLES `CollectionLink` WRITE;
/*!40000 ALTER TABLE `CollectionLink` DISABLE KEYS */;
/*!40000 ALTER TABLE `CollectionLink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CustomerType`
--

DROP TABLE IF EXISTS `CustomerType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CustomerType` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `CustomerType_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CustomerType`
--

LOCK TABLES `CustomerType` WRITE;
/*!40000 ALTER TABLE `CustomerType` DISABLE KEYS */;
INSERT INTO `CustomerType` VALUES ('2e84df71-a852-4e0a-b3e1-32667816f6d1','men','men'),('5da11c54-8c4e-46d7-acbf-17a33b69ba9e','kids','kids'),('609e766d-d9ee-4ef2-af8c-37f26c829949','boy','boy'),('c7b8a4ab-dd2a-433f-bf9b-d85f6c66dc63','women','women');
/*!40000 ALTER TABLE `CustomerType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Discount`
--

DROP TABLE IF EXISTS `Discount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Discount` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` double NOT NULL,
  `type` enum('PERCENTAGE','FIXED') COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `maxPrice` double DEFAULT NULL,
  `minPrice` double DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `isSpecial` tinyint(1) NOT NULL DEFAULT '0',
  `orders` int DEFAULT NULL,
  `userEmails` json NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Discount_code_key` (`code`),
  KEY `Discount_productId_fkey` (`productId`),
  CONSTRAINT `Discount_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Discount`
--

LOCK TABLES `Discount` WRITE;
/*!40000 ALTER TABLE `Discount` DISABLE KEYS */;
INSERT INTO `Discount` VALUES ('7b904229-35fa-4971-be5e-b61d4e1878a2','C2w25104','Flat 2000 discount',2000,'FIXED','2024-11-22 08:39:55.332','2024-11-26 05:32:50.296','db33fdf9-1f96-4a29-9b9e-09577bee1277',NULL,5000,1,1,5,'[\"user1@gmail.com\"]');
/*!40000 ALTER TABLE `Discount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ExclusiveCollection`
--

DROP TABLE IF EXISTS `ExclusiveCollection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ExclusiveCollection` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hyperLink` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categoryHyperLink` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `mrp` double DEFAULT NULL,
  `price` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ExclusiveCollection`
--

LOCK TABLES `ExclusiveCollection` WRITE;
/*!40000 ALTER TABLE `ExclusiveCollection` DISABLE KEYS */;
/*!40000 ALTER TABLE `ExclusiveCollection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HeroSliders`
--

DROP TABLE IF EXISTS `HeroSliders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HeroSliders` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hyperLink` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryHyperLink` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HeroSliders`
--

LOCK TABLES `HeroSliders` WRITE;
/*!40000 ALTER TABLE `HeroSliders` DISABLE KEYS */;
/*!40000 ALTER TABLE `HeroSliders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ImageWeek`
--

DROP TABLE IF EXISTS `ImageWeek`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ImageWeek` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hyperLink` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imageUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ImageWeek`
--

LOCK TABLES `ImageWeek` WRITE;
/*!40000 ALTER TABLE `ImageWeek` DISABLE KEYS */;
/*!40000 ALTER TABLE `ImageWeek` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Logos`
--

DROP TABLE IF EXISTS `Logos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Logos` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logoUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '0',
  `altText` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Logos`
--

LOCK TABLES `Logos` WRITE;
/*!40000 ALTER TABLE `Logos` DISABLE KEYS */;
INSERT INTO `Logos` VALUES ('860e784a-420d-4a44-ae26-ed754ad31eed','https://cdn.thefashionsalad.com/clothes2wear/image-1732512018258.blob:http://localhost:3000/de57b187-c75d-4eba-bed2-42c9626d9a14',1,'logo alt text'),('8d6a5887-3bfc-4c0e-a566-ce9eb664bcaa','https://cdn.thefashionsalad.com/clothes2wear/image-1732510359049.blob:http://localhost:3000/8c0fd64f-f111-4ebe-a0cd-3d2ed6670fe4',0,'logo alt text 2');
/*!40000 ALTER TABLE `Logos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `NewArrivals`
--

DROP TABLE IF EXISTS `NewArrivals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `NewArrivals` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hyperLink` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `mrp` double DEFAULT NULL,
  `price` double DEFAULT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `NewArrivals`
--

LOCK TABLES `NewArrivals` WRITE;
/*!40000 ALTER TABLE `NewArrivals` DISABLE KEYS */;
/*!40000 ALTER TABLE `NewArrivals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Notification`
--

DROP TABLE IF EXISTS `Notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Notification` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `isRead` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `hyperLink` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Notification_userId_fkey` (`userId`),
  CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notification`
--

LOCK TABLES `Notification` WRITE;
/*!40000 ALTER TABLE `Notification` DISABLE KEYS */;
INSERT INTO `Notification` VALUES ('255d4d87-d4cc-4832-9e4e-988148fd6905','6eeb6f1d-2508-4cc6-b64c-8a881363168c','asdf',0,'2024-11-18 08:32:37.457','asdf','adsf'),('b0530300-7c7d-4753-9c05-7f6f2a669cff','5583f5b5-4a2d-4066-99ec-cf88d0ee9c77','notification message',0,'2024-11-18 08:31:27.552','link','notification title');
/*!40000 ALTER TABLE `Notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderDetails`
--

DROP TABLE IF EXISTS `OrderDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderDetails` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `totalPrice` double NOT NULL,
  `status` enum('INCOMPLETE','PENDING','APPROVED','SHIPPED','INTRANSIT','DELIVERED','CANCELLED') COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `discountId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `orderId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paymentMethod` enum('COD','ONLINE') COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `trackingId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `OrderDetails_orderId_key` (`orderId`),
  KEY `OrderDetails_userId_fkey` (`userId`),
  KEY `OrderDetails_discountId_fkey` (`discountId`),
  CONSTRAINT `OrderDetails_discountId_fkey` FOREIGN KEY (`discountId`) REFERENCES `Discount` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `OrderDetails_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderDetails`
--

LOCK TABLES `OrderDetails` WRITE;
/*!40000 ALTER TABLE `OrderDetails` DISABLE KEYS */;
INSERT INTO `OrderDetails` VALUES ('4ac69a5c-14c9-40ec-af68-51b98e95b53a','6eeb6f1d-2508-4cc6-b64c-8a881363168c',8075.8,'APPROVED','2024-11-14 15:34:59.146','2024-11-27 10:39:53.918',NULL,'OI8280448','ONLINE','','');
/*!40000 ALTER TABLE `OrderDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderItem`
--

DROP TABLE IF EXISTS `OrderItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderItem` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL,
  `price` double NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `sizeId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `OrderItem_sizeId_fkey` (`sizeId`),
  KEY `OrderItem_orderId_fkey` (`orderId`),
  KEY `OrderItem_productId_fkey` (`productId`),
  CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `OrderDetails` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `OrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `OrderItem_sizeId_fkey` FOREIGN KEY (`sizeId`) REFERENCES `ProductSize` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderItem`
--

LOCK TABLES `OrderItem` WRITE;
/*!40000 ALTER TABLE `OrderItem` DISABLE KEYS */;
INSERT INTO `OrderItem` VALUES ('27d480f4-2fd7-4d71-ab7b-b6fcb1cc694a','4ac69a5c-14c9-40ec-af68-51b98e95b53a','15eb4732-3c11-498a-a8fc-befc29ca1f00',2,4800,'2024-11-14 15:34:59.146','2024-11-14 15:34:59.146','1c3666bf-14a3-4b84-92f5-b91e1a35a5b5');
/*!40000 ALTER TABLE `OrderItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Otp`
--

DROP TABLE IF EXISTS `Otp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Otp` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiresAt` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Otp_userId_fkey` (`userId`),
  CONSTRAINT `Otp_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Otp`
--

LOCK TABLES `Otp` WRITE;
/*!40000 ALTER TABLE `Otp` DISABLE KEYS */;
/*!40000 ALTER TABLE `Otp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PaymentDetails`
--

DROP TABLE IF EXISTS `PaymentDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PaymentDetails` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` double NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `bank` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `currency` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `method` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `upi` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `wallet` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `PaymentDetails_orderId_fkey` (`orderId`),
  CONSTRAINT `PaymentDetails_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `OrderDetails` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PaymentDetails`
--

LOCK TABLES `PaymentDetails` WRITE;
/*!40000 ALTER TABLE `PaymentDetails` DISABLE KEYS */;
INSERT INTO `PaymentDetails` VALUES ('262a431d-db4c-4106-a911-c24642a2d9fd','4ac69a5c-14c9-40ec-af68-51b98e95b53a',8075.8,'2024-11-14 15:35:24.037','2024-11-14 15:35:24.037',NULL,'INR','upi','order_PLEhsDNlfcRwqM','pay_PLEi1JP4g2XvCq','das@okicici',NULL);
/*!40000 ALTER TABLE `PaymentDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isReturnable` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `thumbnailUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '0',
  `description` text COLLATE utf8mb4_unicode_ci,
  `summary` text COLLATE utf8mb4_unicode_ci,
  `customerTypeId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estimatedDeliveryDay` int DEFAULT NULL,
  `styleId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `returnPolicy` text COLLATE utf8mb4_unicode_ci,
  `views` int NOT NULL DEFAULT '0',
  `displayPrice` double NOT NULL DEFAULT '0',
  `tags` json NOT NULL,
  `longTailKeyword` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Product_slug_key` (`slug`),
  UNIQUE KEY `Product_styleId_key` (`styleId`),
  KEY `Product_customerTypeId_fkey` (`customerTypeId`),
  KEY `Product_userId_fkey` (`userId`),
  CONSTRAINT `Product_customerTypeId_fkey` FOREIGN KEY (`customerTypeId`) REFERENCES `CustomerType` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Product_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
INSERT INTO `Product` VALUES ('15eb4732-3c11-498a-a8fc-befc29ca1f00','second-product-title-2024-11-14',1,'2024-11-14 15:29:54.623','2024-11-27 06:56:14.972','https://cdn.thefashionsalad.com/clothes2wear/image-1731598193260.png',1,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\nWhy do we use it?\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy.','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.','c7b8a4ab-dd2a-433f-bf9b-d85f6c66dc63','6eeb6f1d-2508-4cc6-b64c-8a881363168c',10,'C2W449574','Second product title','10 days return policy.',0,1399,'[\"tag1\", \"tag3\"]','long tail keyword of this product'),('db33fdf9-1f96-4a29-9b9e-09577bee1277','product-title-2024-11-26',1,'2024-11-26 05:32:50.296','2024-11-27 06:50:10.796','https://cdn.thefashionsalad.com/clothes2wear/image-1732599169345.png',1,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.','c7b8a4ab-dd2a-433f-bf9b-d85f6c66dc63','6eeb6f1d-2508-4cc6-b64c-8a881363168c',7,'C2W265622','product title','10 days return policy',0,3999,'[\"tag1\", \"tag2\", \"tag3\", \"tag4\"]','demo long tail keyword');
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductCategory`
--

DROP TABLE IF EXISTS `ProductCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductCategory` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ProductCategory_slug_key` (`slug`),
  UNIQUE KEY `ProductCategory_name_slug_key` (`name`,`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductCategory`
--

LOCK TABLES `ProductCategory` WRITE;
/*!40000 ALTER TABLE `ProductCategory` DISABLE KEYS */;
INSERT INTO `ProductCategory` VALUES ('dbd796e5-eb3f-44df-8d71-25fad31e9cbd','lehenga','lehenga'),('7b986bf3-b154-4590-a6df-524a8411c7e5','sarees','sarees');
/*!40000 ALTER TABLE `ProductCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductColor`
--

DROP TABLE IF EXISTS `ProductColor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductColor` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ProductColor_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductColor`
--

LOCK TABLES `ProductColor` WRITE;
/*!40000 ALTER TABLE `ProductColor` DISABLE KEYS */;
INSERT INTO `ProductColor` VALUES ('2e9a9c80-81f2-42f9-aa81-66773efa18a6','Blue','#0a1bff','blue'),('736d013b-abbb-4978-9b1a-c32b725fc75c','Green','#0dc700','green'),('b1ec8fda-501c-4789-b7ef-a70a79744650','Black','#000000','black'),('fb7ec341-1a64-4827-97c5-98131f2ad147','red','#e00000','red');
/*!40000 ALTER TABLE `ProductColor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductImage`
--

DROP TABLE IF EXISTS `ProductImage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductImage` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `colorId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `altText` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ProductImage_productId_fkey` (`productId`),
  KEY `ProductImage_colorId_fkey` (`colorId`),
  CONSTRAINT `ProductImage_colorId_fkey` FOREIGN KEY (`colorId`) REFERENCES `ProductColor` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ProductImage_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductImage`
--

LOCK TABLES `ProductImage` WRITE;
/*!40000 ALTER TABLE `ProductImage` DISABLE KEYS */;
INSERT INTO `ProductImage` VALUES ('06de88dd-ea1a-40e6-962b-4c35850457f9','15eb4732-3c11-498a-a8fc-befc29ca1f00','https://cdn.thefashionsalad.com/clothes2wear/image-1732532780110.png','736d013b-abbb-4978-9b1a-c32b725fc75c','alt text 2'),('1aad5d1f-ca31-4ea8-b4fa-92683397d25e','db33fdf9-1f96-4a29-9b9e-09577bee1277','https://cdn.thefashionsalad.com/clothes2wear/image-1732599169345.png','2e9a9c80-81f2-42f9-aa81-66773efa18a6','lehenga'),('a6915617-2ab3-44c6-9b2b-031b8360eea4','15eb4732-3c11-498a-a8fc-befc29ca1f00','https://cdn.thefashionsalad.com/clothes2wear/image-1732532748994.jpeg','2e9a9c80-81f2-42f9-aa81-66773efa18a6','alt text 1');
/*!40000 ALTER TABLE `ProductImage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductInventory`
--

DROP TABLE IF EXISTS `ProductInventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductInventory` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mrp` int NOT NULL,
  `price` int NOT NULL,
  `sizeId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stock` int NOT NULL,
  `minQuantity` int NOT NULL DEFAULT '1',
  `discount` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ProductInventory_sizeId_fkey` (`sizeId`),
  KEY `ProductInventory_productId_fkey` (`productId`),
  CONSTRAINT `ProductInventory_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ProductInventory_sizeId_fkey` FOREIGN KEY (`sizeId`) REFERENCES `ProductSize` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductInventory`
--

LOCK TABLES `ProductInventory` WRITE;
/*!40000 ALTER TABLE `ProductInventory` DISABLE KEYS */;
INSERT INTO `ProductInventory` VALUES ('c283d948-c733-41c5-bbef-a4a26570bdc7','15eb4732-3c11-498a-a8fc-befc29ca1f00',0,0,'8fb9efd1-ae0f-4baf-8720-681c4c9cfdc5',0,1,100),('da6ba9a8-cf9f-438c-85b2-c3fc5f645098','15eb4732-3c11-498a-a8fc-befc29ca1f00',2500,2400,'347f0d35-e3b9-47f3-b7c2-bf4423105870',10,3,NULL),('f34b6c1d-9279-4347-8190-f80399eb4ebc','db33fdf9-1f96-4a29-9b9e-09577bee1277',6798,4999,'347f0d35-e3b9-47f3-b7c2-bf4423105870',25,1,36);
/*!40000 ALTER TABLE `ProductInventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductReview`
--

DROP TABLE IF EXISTS `ProductReview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductReview` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` int NOT NULL,
  `review` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `images` json NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ProductReview_userId_fkey` (`userId`),
  KEY `ProductReview_productId_fkey` (`productId`),
  CONSTRAINT `ProductReview_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ProductReview_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductReview`
--

LOCK TABLES `ProductReview` WRITE;
/*!40000 ALTER TABLE `ProductReview` DISABLE KEYS */;
INSERT INTO `ProductReview` VALUES ('57ed6827-cf4a-406f-b43d-84ea7fa7465c','6eeb6f1d-2508-4cc6-b64c-8a881363168c','15eb4732-3c11-498a-a8fc-befc29ca1f00',5,'Nice Product','2024-11-27 05:46:27.696','2024-11-27 05:46:27.696','[]'),('a9eb485e-3371-416b-9b57-6f2c63e36d39','6eeb6f1d-2508-4cc6-b64c-8a881363168c','15eb4732-3c11-498a-a8fc-befc29ca1f00',3,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.  Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).','2024-11-15 07:46:03.912','2024-11-27 05:41:57.533','[]');
/*!40000 ALTER TABLE `ProductReview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductSize`
--

DROP TABLE IF EXISTS `ProductSize`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductSize` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ProductSize_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductSize`
--

LOCK TABLES `ProductSize` WRITE;
/*!40000 ALTER TABLE `ProductSize` DISABLE KEYS */;
INSERT INTO `ProductSize` VALUES ('1c3666bf-14a3-4b84-92f5-b91e1a35a5b5','xl','xl'),('347f0d35-e3b9-47f3-b7c2-bf4423105870','m','m'),('8fb9efd1-ae0f-4baf-8720-681c4c9cfdc5','s','s');
/*!40000 ALTER TABLE `ProductSize` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductWeek`
--

DROP TABLE IF EXISTS `ProductWeek`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductWeek` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hyperLink` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imageUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductWeek`
--

LOCK TABLES `ProductWeek` WRITE;
/*!40000 ALTER TABLE `ProductWeek` DISABLE KEYS */;
/*!40000 ALTER TABLE `ProductWeek` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ReturnRequest`
--

DROP TABLE IF EXISTS `ReturnRequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ReturnRequest` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderItemId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reason` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('PENDING','APPROVED','REJECTED','REFUNDED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `requestedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `resolvedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ReturnRequest_orderItemId_fkey` (`orderItemId`),
  CONSTRAINT `ReturnRequest_orderItemId_fkey` FOREIGN KEY (`orderItemId`) REFERENCES `OrderItem` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ReturnRequest`
--

LOCK TABLES `ReturnRequest` WRITE;
/*!40000 ALTER TABLE `ReturnRequest` DISABLE KEYS */;
/*!40000 ALTER TABLE `ReturnRequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SearchHint`
--

DROP TABLE IF EXISTS `SearchHint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SearchHint` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `text` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SearchHint`
--

LOCK TABLES `SearchHint` WRITE;
/*!40000 ALTER TABLE `SearchHint` DISABLE KEYS */;
/*!40000 ALTER TABLE `SearchHint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SearchQuery`
--

DROP TABLE IF EXISTS `SearchQuery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SearchQuery` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `query` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `SearchQuery_userId_fkey` (`userId`),
  CONSTRAINT `SearchQuery_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SearchQuery`
--

LOCK TABLES `SearchQuery` WRITE;
/*!40000 ALTER TABLE `SearchQuery` DISABLE KEYS */;
INSERT INTO `SearchQuery` VALUES ('17634b30-801a-409b-90ea-b365ad797fd0','wedding','2024-11-20 12:35:36.024','6eeb6f1d-2508-4cc6-b64c-8a881363168c'),('1f2f40ca-2fc3-4910-a281-17f5ced72c7e','wedding','2024-11-26 06:17:17.496','5583f5b5-4a2d-4066-99ec-cf88d0ee9c77'),('81d947e1-815f-45c5-a898-b2640a6d5960','women clothes','2024-11-26 06:17:56.918','5583f5b5-4a2d-4066-99ec-cf88d0ee9c77'),('9b6129fa-b15c-46c0-b325-a8163c6dc18e','clothes2wear','2024-11-26 06:18:08.487','5583f5b5-4a2d-4066-99ec-cf88d0ee9c77'),('b2c20aaf-1c4a-41d6-88dd-226f2b47e6d2','clothes','2024-11-26 06:17:45.213','5583f5b5-4a2d-4066-99ec-cf88d0ee9c77'),('feb7e6ce-d26b-4d9c-a490-86d3cd145ceb','lehenga','2024-11-26 06:17:28.785','5583f5b5-4a2d-4066-99ec-cf88d0ee9c77');
/*!40000 ALTER TABLE `SearchQuery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Session`
--

DROP TABLE IF EXISTS `Session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Session` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Session`
--

LOCK TABLES `Session` WRITE;
/*!40000 ALTER TABLE `Session` DISABLE KEYS */;
/*!40000 ALTER TABLE `Session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ShopByOccasion`
--

DROP TABLE IF EXISTS `ShopByOccasion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ShopByOccasion` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `occasionName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categoryHyperLinks` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ShopByOccasion`
--

LOCK TABLES `ShopByOccasion` WRITE;
/*!40000 ALTER TABLE `ShopByOccasion` DISABLE KEYS */;
/*!40000 ALTER TABLE `ShopByOccasion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ShopByOccasionProduct`
--

DROP TABLE IF EXISTS `ShopByOccasionProduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ShopByOccasionProduct` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hyperLink` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shopByOccasionId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ShopByOccasionProduct_shopByOccasionId_fkey` (`shopByOccasionId`),
  CONSTRAINT `ShopByOccasionProduct_shopByOccasionId_fkey` FOREIGN KEY (`shopByOccasionId`) REFERENCES `ShopByOccasion` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ShopByOccasionProduct`
--

LOCK TABLES `ShopByOccasionProduct` WRITE;
/*!40000 ALTER TABLE `ShopByOccasionProduct` DISABLE KEYS */;
INSERT INTO `ShopByOccasionProduct` VALUES ('3f3afc8a-ebf1-4b9a-94c4-7405982f4486','https://cdn.thefashionsalad.com/clothes2wear/image-1732520025691.png','https://www.thefashionsalad.com/blogs/comparing-different-fabrics-which-lehenga-material-is-right-for-you-5249',NULL,'2024-11-25 07:33:46.172','2024-11-25 07:33:46.172');
/*!40000 ALTER TABLE `ShopByOccasionProduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ShopBySeason`
--

DROP TABLE IF EXISTS `ShopBySeason`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ShopBySeason` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `videoUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ShopBySeason`
--

LOCK TABLES `ShopBySeason` WRITE;
/*!40000 ALTER TABLE `ShopBySeason` DISABLE KEYS */;
/*!40000 ALTER TABLE `ShopBySeason` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ShopBySeasonProduct`
--

DROP TABLE IF EXISTS `ShopBySeasonProduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ShopBySeasonProduct` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `seasonId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hyperLink` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ShopBySeasonProduct_seasonId_fkey` (`seasonId`),
  CONSTRAINT `ShopBySeasonProduct_seasonId_fkey` FOREIGN KEY (`seasonId`) REFERENCES `ShopBySeason` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ShopBySeasonProduct`
--

LOCK TABLES `ShopBySeasonProduct` WRITE;
/*!40000 ALTER TABLE `ShopBySeasonProduct` DISABLE KEYS */;
/*!40000 ALTER TABLE `ShopBySeasonProduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Showcases`
--

DROP TABLE IF EXISTS `Showcases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Showcases` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hyperLink` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryHyperLink` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Showcases`
--

LOCK TABLES `Showcases` WRITE;
/*!40000 ALTER TABLE `Showcases` DISABLE KEYS */;
/*!40000 ALTER TABLE `Showcases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SocialLinks`
--

DROP TABLE IF EXISTS `SocialLinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SocialLinks` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hyperLink` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SocialLinks`
--

LOCK TABLES `SocialLinks` WRITE;
/*!40000 ALTER TABLE `SocialLinks` DISABLE KEYS */;
/*!40000 ALTER TABLE `SocialLinks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SubCategory`
--

DROP TABLE IF EXISTS `SubCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SubCategory` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `SubCategory_categoryId_fkey` (`categoryId`),
  CONSTRAINT `SubCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `ProductCategory` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SubCategory`
--

LOCK TABLES `SubCategory` WRITE;
/*!40000 ALTER TABLE `SubCategory` DISABLE KEYS */;
/*!40000 ALTER TABLE `SubCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SupportTicket`
--

DROP TABLE IF EXISTS `SupportTicket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SupportTicket` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('OPEN','IN_PROGRESS','RESOLVED','CLOSED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'OPEN',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `resolvedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `SupportTicket_userId_fkey` (`userId`),
  CONSTRAINT `SupportTicket_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SupportTicket`
--

LOCK TABLES `SupportTicket` WRITE;
/*!40000 ALTER TABLE `SupportTicket` DISABLE KEYS */;
/*!40000 ALTER TABLE `SupportTicket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Trending`
--

DROP TABLE IF EXISTS `Trending`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Trending` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `videoUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hyperLink` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `avatarUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Trending`
--

LOCK TABLES `Trending` WRITE;
/*!40000 ALTER TABLE `Trending` DISABLE KEYS */;
/*!40000 ALTER TABLE `Trending` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TrendingLink`
--

DROP TABLE IF EXISTS `TrendingLink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TrendingLink` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TrendingLink`
--

LOCK TABLES `TrendingLink` WRITE;
/*!40000 ALTER TABLE `TrendingLink` DISABLE KEYS */;
/*!40000 ALTER TABLE `TrendingLink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `isVerified` tinyint(1) NOT NULL DEFAULT '0',
  `role` enum('ADMIN','SELLER','BUYER') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'BUYER',
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('ACTIVE','DEACTIVE','BANNED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `profileUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `mobileNumber` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `whatsAppNumber` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isLoggedIn` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('5583f5b5-4a2d-4066-99ec-cf88d0ee9c77','user2@gmail.com','$2y$10$WB7Z6Jfm3wOcTak.b1qdCO27iJ1qg1qqXD9Kzc72wv08RliQOSCe6','2024-11-15 06:27:25.742','2024-11-28 05:45:27.875',1,'BUYER','User 2','Das','ACTIVE',NULL,NULL,NULL,1),('6c179ad1-c2fa-4af4-8a7f-49e8a7486815','user4@gmail.com','$2a$10$425zxRPjrTEfRPoD0H6ju.6vDsdoaRF22UF90nooksy8uwOELquw.','2024-11-20 07:30:19.121','2024-11-20 07:33:50.140',0,'BUYER','Dimpal','Das','ACTIVE','',NULL,NULL,0),('6eeb6f1d-2508-4cc6-b64c-8a881363168c','admin@mail.co','$2y$10$WB7Z6Jfm3wOcTak.b1qdCO27iJ1qg1qqXD9Kzc72wv08RliQOSCe6','2024-11-14 13:02:20.047','2024-11-16 09:32:03.118',1,'ADMIN','Dimpal','Das','ACTIVE',NULL,NULL,NULL,0),('f0cabf84-1022-45db-9d22-c7fb465f05b0','user1@gmail.com','$2a$10$2P0EV/PwbauQqEkY8iT5EucO.8MBdAa4AiAIPmSivm8KRJZeVqNja','2024-11-18 06:25:49.185','2024-11-25 11:14:25.755',1,'BUYER','User','Name','ACTIVE',NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserAddress`
--

DROP TABLE IF EXISTS `UserAddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserAddress` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `addressLine1` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `addressLine2` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zipCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobileNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `isDefault` tinyint(1) NOT NULL,
  `fullName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserAddress_userId_fkey` (`userId`),
  CONSTRAINT `UserAddress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserAddress`
--

LOCK TABLES `UserAddress` WRITE;
/*!40000 ALTER TABLE `UserAddress` DISABLE KEYS */;
INSERT INTO `UserAddress` VALUES ('ce1a7a93-900d-473b-89d8-8da7423304a0','6eeb6f1d-2508-4cc6-b64c-8a881363168c','Bajali, Assam',NULL,'Guwahati','Assam','781329','India','6003030303','2024-11-14 16:48:59.181','2024-11-14 16:48:59.181',1,NULL),('db4f3d46-2060-497e-b022-87b2c06e4c8d','6eeb6f1d-2508-4cc6-b64c-8a881363168c','First address','Second Address','Ghy','Meghalaya','793022','India','6003030202','2024-11-15 07:23:36.095','2024-11-15 07:23:36.095',0,NULL);
/*!40000 ALTER TABLE `UserAddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vides`
--

DROP TABLE IF EXISTS `Vides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Vides` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `videoUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `price` double DEFAULT NULL,
  `hyperLink` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vides`
--

LOCK TABLES `Vides` WRITE;
/*!40000 ALTER TABLE `Vides` DISABLE KEYS */;
INSERT INTO `Vides` VALUES ('9725e1a8-3c76-4f31-943a-d88bf4767fd3','https://cdn.thefashionsalad.com/clothes2wear/image-1732769442363.webm','Vide title 2','Short description 4',NULL,'2024-11-28 04:50:43.396','2024-11-28 04:56:41.457',4000,'https://www.thefashionsalad.com/blogs/comparing-different-fabrics-which-lehenga-material-is-right-for-you-5249');
/*!40000 ALTER TABLE `Vides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WishlistItem`
--

DROP TABLE IF EXISTS `WishlistItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `WishlistItem` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `WishlistItem_userId_fkey` (`userId`),
  KEY `WishlistItem_productId_fkey` (`productId`),
  CONSTRAINT `WishlistItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `WishlistItem_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WishlistItem`
--

LOCK TABLES `WishlistItem` WRITE;
/*!40000 ALTER TABLE `WishlistItem` DISABLE KEYS */;
INSERT INTO `WishlistItem` VALUES ('8f6dc15b-0820-46f8-980b-d526059a0bc7','6eeb6f1d-2508-4cc6-b64c-8a881363168c','15eb4732-3c11-498a-a8fc-befc29ca1f00','2024-11-15 07:53:25.550');
/*!40000 ALTER TABLE `WishlistItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_ProductCategories`
--

DROP TABLE IF EXISTS `_ProductCategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_ProductCategories` (
  `A` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `_ProductCategories_AB_unique` (`A`,`B`),
  KEY `_ProductCategories_B_index` (`B`),
  CONSTRAINT `_ProductCategories_A_fkey` FOREIGN KEY (`A`) REFERENCES `Product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_ProductCategories_B_fkey` FOREIGN KEY (`B`) REFERENCES `ProductCategory` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_ProductCategories`
--

LOCK TABLES `_ProductCategories` WRITE;
/*!40000 ALTER TABLE `_ProductCategories` DISABLE KEYS */;
INSERT INTO `_ProductCategories` VALUES ('15eb4732-3c11-498a-a8fc-befc29ca1f00','dbd796e5-eb3f-44df-8d71-25fad31e9cbd'),('db33fdf9-1f96-4a29-9b9e-09577bee1277','dbd796e5-eb3f-44df-8d71-25fad31e9cbd');
/*!40000 ALTER TABLE `_ProductCategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_SimilarProducts`
--

DROP TABLE IF EXISTS `_SimilarProducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_SimilarProducts` (
  `A` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `_SimilarProducts_AB_unique` (`A`,`B`),
  KEY `_SimilarProducts_B_index` (`B`),
  CONSTRAINT `_SimilarProducts_A_fkey` FOREIGN KEY (`A`) REFERENCES `Product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_SimilarProducts_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_SimilarProducts`
--

LOCK TABLES `_SimilarProducts` WRITE;
/*!40000 ALTER TABLE `_SimilarProducts` DISABLE KEYS */;
INSERT INTO `_SimilarProducts` VALUES ('db33fdf9-1f96-4a29-9b9e-09577bee1277','15eb4732-3c11-498a-a8fc-befc29ca1f00');
/*!40000 ALTER TABLE `_SimilarProducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_SubcategoryProducts`
--

DROP TABLE IF EXISTS `_SubcategoryProducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_SubcategoryProducts` (
  `A` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `_SubcategoryProducts_AB_unique` (`A`,`B`),
  KEY `_SubcategoryProducts_B_index` (`B`),
  CONSTRAINT `_SubcategoryProducts_A_fkey` FOREIGN KEY (`A`) REFERENCES `Product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_SubcategoryProducts_B_fkey` FOREIGN KEY (`B`) REFERENCES `SubCategory` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_SubcategoryProducts`
--

LOCK TABLES `_SubcategoryProducts` WRITE;
/*!40000 ALTER TABLE `_SubcategoryProducts` DISABLE KEYS */;
/*!40000 ALTER TABLE `_SubcategoryProducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('01a2be88-a285-457c-adca-b71e31919531','5a3f6f33c36c7b1cf0eea54d903ded952ac5e1468633649d46334217e1b4962f','2024-11-27 12:30:36.749','20241127123036_add_new_model_vides',NULL,NULL,'2024-11-27 12:30:36.658',1),('02dc5e8a-ab4b-40a4-ba46-9f0a6a1ce515','64c1701160ddd5c6a42b4a11eca7f7a3d5e5781185b805a6c28006a16169ee03','2024-11-18 07:53:47.010','20241118075346_add_new_fields_to_product_model_display_price',NULL,NULL,'2024-11-18 07:53:46.919',1),('069cb15a-fbca-4847-ae2a-9e7115354873','b4287e357fb691ca8f7c60d9adcda7e24243ab77f94571d9eeb7f3c6b40b5029','2024-11-22 07:20:59.243','20241122072059_add_subcategories_to_procuts',NULL,NULL,'2024-11-22 07:20:59.173',1),('0846752f-2ce4-4e35-8382-da5e61a10231','06f35f94e120bb0b201e2d399eb6bcaed39ac4ee4d76ca1d506c5c8310461849','2024-11-14 12:59:54.210','20241106075030_new_models',NULL,NULL,'2024-11-14 12:59:53.811',1),('0aa1a0a1-44d8-4e3b-b5f9-f381d33d3b4b','48983357ff7076fab92856f9b47b0458877f7c52ccdf57803cf723106cbf78cb','2024-11-20 04:43:59.397','20241120044359_add_field_in_shop_by_season_model_created_at_updated_at',NULL,NULL,'2024-11-20 04:43:59.283',1),('0b123d9a-6b52-4035-ba72-2e9527a695a2','8d4b8759090625bb058ac82ca54d1cd34997c5ad8535400c79217ab784761a76','2024-11-23 10:07:13.842','20241123100713_add_new_model_blogs_social_links',NULL,NULL,'2024-11-23 10:07:13.781',1),('0c78ec1b-fa9c-40db-8680-7b5913ba5f73','dd5eb94ca6bec8afe2ccd9315b6e1315d2253e77c11e7faac8a60465e154cabd','2024-11-28 04:49:25.067','20241128044924_update_vides_model',NULL,NULL,'2024-11-28 04:49:24.998',1),('0d335818-8f41-41a1-b1af-efee7bf2f30c','b105d54a938e8e7b8842a3f984b1d0c44b8da11f4962594b8a27fd022f540305','2024-11-21 11:03:37.745','20241121110337_add_new_model_sub_category',NULL,NULL,'2024-11-21 11:03:37.437',1),('0e6cfeb8-2b37-4944-aa28-01c79557c8ab','d670e79ed3e0f763fed3f24f10454656f4e7580e3c4c7c03d319551c1f3358f7','2024-11-15 10:09:15.917','20241115100915_update_product_review_field_increase_space',NULL,NULL,'2024-11-15 10:09:15.817',1),('15436a54-3bf0-426c-b9ad-9f72a6bfad24','a2003a4d06e6d7b1b036c93ab98c8e48c58e41d62b93e01b08cf6e4b41242c43','2024-11-23 06:22:31.301','20241123062231_add_new_model_product_week_image_week',NULL,NULL,'2024-11-23 06:22:31.244',1),('20aa8312-9923-48df-bacd-ae0c8a3ac703','36544a9acddda84fbb9ec9c9a02d0421fb5da95511aeeb4c6ca5c5eb2bd28099','2024-11-28 05:50:40.043','20241128055039_update_session_model',NULL,NULL,'2024-11-28 05:50:39.987',1),('2167d072-7567-4ee2-aa90-501b146f9756','72a72274e650ef43c4bd603349c72702c42ce51402fd6666b5b31d895d8d7258','2024-11-23 07:56:59.624','20241123075659_add_new_model_searchhit_trndinglink_arrivalslink_collectionlink',NULL,NULL,'2024-11-23 07:56:59.526',1),('21e8c4ac-fe44-4cb1-bc27-07b269c7edd4','82ef9d1920febf73b5b7fe68266cc7edfa62a7e2b95860bf65ee7a401e34a3b3','2024-11-16 09:30:58.710','20241116093058_add_profile_url_field_on_user_model',NULL,NULL,'2024-11-16 09:30:58.662',1),('310fab7e-236e-45a9-90d8-e06035f9f3b8','a66a026cc4f684424b632a8af304662eaaf7c293b665428c77fb8ff58afbfa8b','2024-11-18 04:15:10.486','20241118041510_regenerate_everyhting',NULL,NULL,'2024-11-18 04:15:10.312',1),('364c5928-e93b-4f20-80e1-dc366151ede0','da57554659c5297ecf5f9022c3fbdc434c90e2236f3bd99db4ee97b0f550a183','2024-11-22 05:41:11.543','20241122054111_change_sub_category_unique_to_normal',NULL,NULL,'2024-11-22 05:41:11.495',1),('37148271-02cc-49ab-98e4-a06573dd91b4','9b47974d6bec6be4cccf942f60a35a85c8c9545c16e28c6089d254328bc508a5','2024-11-21 10:19:10.425','20241121101910_update_model_name_to_new_arrivals',NULL,NULL,'2024-11-21 10:19:10.209',1),('37913238-f599-4a18-8fbe-ce31b95d09c7','ea3db74cb3dcede6a54c653a3d82141797cbb97a77159c98c9100172ab3f0aba','2024-11-25 04:18:01.236','20241125041801_add_new_field_to_logos_alt_text',NULL,NULL,'2024-11-25 04:18:01.208',1),('380995af-679e-458e-8b22-b13347a28523','cd7a47f3eca2f67a5b8a110657c39f051f6fc1f6b1e92e49cf14bc66e97336d6','2024-11-28 05:26:26.350','20241128052626_add_new_model_session',NULL,NULL,'2024-11-28 05:26:26.255',1),('403524f0-3799-4582-b53e-48621fa57d1b','6c4e4ad6a0f1b930f22341c43f62ec06803621f83071dbe9a13c200c865e3145','2024-11-14 12:59:53.806','20241104061319_new_models',NULL,NULL,'2024-11-14 12:59:52.288',1),('40e8a588-e0d0-45ba-a08b-0fda3c742e44','36cbfe4ed0c26689d6d8cc722c14bbc2f38adbb9901a4fa571b55d137f271e43','2024-11-22 12:03:59.520','20241122120359_add_new_model',NULL,NULL,'2024-11-22 12:03:59.473',1),('421d8685-ce28-448a-b916-d017fedf7821','db097726ab0325687088ff86d99d62b47751159e492eabfa52000fb00a723bd8','2024-11-18 09:47:18.255','20241118094718_remove_product_tag_model',NULL,NULL,'2024-11-18 09:47:18.102',1),('429cbd18-7972-4921-bbda-21a6b5b6cec2','8e1c971d87285017a4c3ca400b9bc5f825e32716c007d3bc81032d85293deee4','2024-11-20 04:51:50.411','20241120045150_add_field_in_shop_by_season_model_created_at_updated_at',NULL,NULL,'2024-11-20 04:51:50.360',1),('432a1b82-fdb9-4e9d-be7a-3f729732e7be','26923fa730cf496d190e6d04b8604f15ae723a2bb9fce63280e4e50a61d0c4cb','2024-11-14 12:59:55.881','20241108121133_update_slug_field_make_it_as_unique',NULL,NULL,'2024-11-14 12:59:55.826',1),('447caf0a-7330-4637-a81a-0bb9a1eab1e0','daee0a5fd6fcb7495926bbf55c2e20e73afbeb9e295a017b262d9cd97cc106cd','2024-11-20 04:38:36.949','20241120043836_add_field_in_shop_by_season_model_created_at_updated_at',NULL,NULL,'2024-11-20 04:38:36.515',1),('45357146-73a6-4129-8b51-97f2975d16ef','3b9555d59e35e8b9a3565d63af2510c6432bcaac7f1bf12261004d6eae3d5e89','2024-11-28 05:02:16.868','20241128050216_update_user_model',NULL,NULL,'2024-11-28 05:02:16.787',1),('497c9b09-7edd-45c5-8ccd-f51d6bdc35cd','35ab1f7df8b66bac7cf8891a3982f6f9b7e00ebfe22fe391df9d12347ca3b69f','2024-11-23 05:34:41.716','20241123053441_update_model_exclusive_collection',NULL,NULL,'2024-11-23 05:34:41.692',1),('51534167-d66a-48b9-b0b0-2a44aa71fcad','0011f11eaa02c5247b7aef05eeaeb8750dcfcb2d07431c8aa46d8c2dfddc486e','2024-11-27 06:17:01.619','20241127061701_update_order_status',NULL,NULL,'2024-11-27 06:17:01.516',1),('639b4180-ed3d-40fa-aeeb-6d38c256dcf6','2e51f89b9e22909f601773acf745a9fdbff9600f5a96e8f5f07c0425d9edf8a7','2024-11-18 06:47:42.474','20241118064742_add_new_fields_to_user_model_search_queries_and_product_model_views',NULL,NULL,'2024-11-18 06:47:42.317',1),('642a7a5c-8513-4dd1-86aa-64fb69f8bc92','93bd6e9f735f922ef8f21317e1d4409d3a15fdaf660ccf0937c20cce864ca3f8','2024-11-14 12:59:56.571','20241111071014_change_field_names_in_product_model',NULL,NULL,'2024-11-14 12:59:56.062',1),('64e42e0b-f448-453b-a127-bf13c3978fb2','dc34db4be02fd3170626e098a62177e59d85d122940cd94732dad63b8ff868e5','2024-11-14 12:59:57.037','20241113091742_add_is_default_field_in_address_model',NULL,NULL,'2024-11-14 12:59:56.919',1),('6a5fca11-0e1b-4ade-abfd-c3eae94366ae','1df95adaf85a049785a4ea239bfb44e9291cd1c5cbb31bdb311f93c91fecf00f','2024-11-14 12:59:57.159','20241113092236_add_size_id_to_order_item_model',NULL,NULL,'2024-11-14 12:59:57.040',1),('705f0a2a-7006-4d02-a27c-1a3ae496a337','90e288ea87599885a4a512d88aad8f2dd0886a76ff52dcecf6d487dd74c78bee','2024-11-16 07:06:44.576','20241116070644_change_shop_by_occasion_model',NULL,NULL,'2024-11-16 07:06:44.306',1),('71d4d458-155f-4988-8dba-8dae56c5115e','328efe7742e891cb727457ad428eee33f8eb54faee369e08470abb44dd4c5859',NULL,'20241128060156_update_session_model','A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve\n\nMigration name: 20241128060156_update_session_model\n\nDatabase error code: 1553\n\nDatabase error:\nCannot drop index \'Session_userId_key\': needed in a foreign key constraint\n\nPlease check the query number 1 from the migration file.\n\n   0: sql_schema_connector::apply_migration::apply_script\n           with migration_name=\"20241128060156_update_session_model\"\n             at schema-engine/connectors/sql-schema-connector/src/apply_migration.rs:106\n   1: schema_core::commands::apply_migrations::Applying migration\n           with migration_name=\"20241128060156_update_session_model\"\n             at schema-engine/core/src/commands/apply_migrations.rs:91\n   2: schema_core::state::ApplyMigrations\n             at schema-engine/core/src/state.rs:226','2024-11-28 06:41:34.265','2024-11-28 06:01:56.130',0),('7631718e-e029-4d20-802e-4fe5a9155e83','23537c1278c3f91625075dfc6ec508a598c270c10d4fc8e90543562aaa86060b','2024-11-14 12:59:56.778','20241112111528_add_isactive_field_on_discount',NULL,NULL,'2024-11-14 12:59:56.746',1),('773a7a3e-6482-4546-8680-a830000fb193','79cd8419f41f48779ace8f7ff5a058e3ae3b6c2c4bfa37ae83a1026f85069bd6','2024-11-16 07:32:08.961','20241116073208_change_shop_by_occasion_model',NULL,NULL,'2024-11-16 07:32:08.898',1),('78cc6f78-fb88-4093-a924-7e21bc15f5b9','3e5ac55344b4da62079f55313bddd9c92ea336cf31664404ed45effc325ea001','2024-11-21 05:56:58.844','20241121055658_add_field_in_order_details',NULL,NULL,'2024-11-21 05:56:58.771',1),('82fc29cf-fe02-41d7-893d-a5d43547ab18','7c55e91b88c2146eb4377fa2b23c379d93e061381d3d2651fb2045ed88287f0f','2024-11-25 05:56:47.629','20241125055647_update_model_shop_by_occasion',NULL,NULL,'2024-11-25 05:56:47.467',1),('864e829c-cab0-4d84-ba27-e8bb17a0ddc0','e4cf497a1f4da87f21223b6383cd01b5a1eada56665e5da4af8bb8f3882a27b9','2024-11-28 05:44:56.072','20241128054455_update_session_model',NULL,NULL,'2024-11-28 05:44:55.978',1),('8bd67295-87f9-48fb-a9a0-fc49a202fec4','b48cbe7680b47968f3fe46b334cc5361e78d25715a0b5c425a14c0cefe2be878','2024-11-21 06:15:01.908','20241121061501_add_enum_on_order_status',NULL,NULL,'2024-11-21 06:15:01.752',1),('8edc42f3-caa2-4d5a-b349-530fe77c024b','08806ddfa6afa424a046cd08dc5d18c5faf4c3a2656957c2cec05e99d399ef4b','2024-11-14 12:59:56.880','20241113042326_remove_shopping_session_model',NULL,NULL,'2024-11-14 12:59:56.781',1),('8f81882e-1ecc-4708-8040-31494cee4091','b380c40830ebf88da15e22c551c8898a291f3f64672fe25a219e054e6bad3b0c','2024-11-22 06:02:13.462','20241122060213_change_sub_category_unique_to_normal',NULL,NULL,'2024-11-22 06:02:13.438',1),('8f90fe16-de26-406d-b82c-e9390d771111','8d07ab4420e7976b887ee1327fda03ff20f2a1251e130be8b48e53d22b8bdb94','2024-11-14 12:59:56.916','20241113065457_add_is_default_field_in_address_model',NULL,NULL,'2024-11-14 12:59:56.884',1),('91c840eb-a434-40bc-bbd5-f46680019850','372114e7ed0e3837112ae94eda8d00452ed637fcb37a8fa017b0d8ee54e8805d','2024-11-14 12:59:57.326','20241113103620_add_on_delete_on_order_details',NULL,NULL,'2024-11-14 12:59:57.279',1),('92f68149-f905-4727-b55a-e8cb2669272a','42f26af1964013a0c327c294b6b7cb3187b72ac37d5dd24a3823f07bb9f51459','2024-11-27 12:32:59.409','20241127123259_update_video_model',NULL,NULL,'2024-11-27 12:32:59.354',1),('9f67d18d-41e1-47f9-bf24-48cd5d3ed3b6','fbb983993b1ff0288997a5b83fe78783438a7e315ceb17659996e0a819aead30','2024-11-22 08:37:09.603','20241122083709_change_field_names_in_discount_model',NULL,NULL,'2024-11-22 08:37:09.560',1),('a2134427-c5c0-40ea-b625-34422a5e6546','2484670832727fc28c09c07b04776cc767f9ba57e85c70b94516e514b13c49bd','2024-11-14 13:00:08.195','20241114130008_update_payment_details_model',NULL,NULL,'2024-11-14 13:00:08.115',1),('a67c6767-ef74-430c-8882-4a8bd422a893','d79b822aaf25216bfe382ed64334154eb986ae539ecc808b8862a9d4aef33b6c','2024-11-22 11:35:15.657','20241122113515_add_new_fields_to_new_arrival_products',NULL,NULL,'2024-11-22 11:35:15.602',1),('a6cda132-3759-4c10-8af5-3d052db5c0f0','6b2aaee43e099485b97bf29708cfbf9c1670814e07d652f48d8caf134530c3c3','2024-11-27 12:49:25.469','20241127124925_update_video_model',NULL,NULL,'2024-11-27 12:49:25.391',1),('a76db73c-dd41-40b4-9cb1-e56971536be5','ebea773af5c81adf7124a1904e28569659e5d0fe51b062eed552de5b5ae43c75','2024-11-23 06:52:46.424','20241123065246_add_new_model_button',NULL,NULL,'2024-11-23 06:52:46.393',1),('a9c1bd02-b37e-4a42-9255-a300e17ab8b3','46a8a70fa2bed2f3a41b864f22b0adee524b50d15f867d1370f185e1535c2dd0','2024-11-14 12:59:57.276','20241113095332_add_on_delete_on_order_details',NULL,NULL,'2024-11-14 12:59:57.163',1),('b00a260b-7405-418e-b12e-be9e48520cdb','3b4a14b99a7f68bec8ef9f32c5934f76caa9eadc50f274957be7b24c0169b230','2024-11-25 04:04:55.460','20241125040455_add_new_model_logos',NULL,NULL,'2024-11-25 04:04:55.425',1),('b8765caf-d78b-4069-9a02-c9cd20d19fe7','54d36dff41f30bb85926a8b1dc816a397b9c4b1214bade8a624f56789dfafa21','2024-11-14 12:59:55.328','20241107051516_add_new_model_review_product_notification_tags_audit_logs_return_request_wish_list_item',NULL,NULL,'2024-11-14 12:59:54.266',1),('b8eca58b-9d7a-4368-9f77-55737042de36','35f43abc8c300b3c342dd11255220166e6b51cad6199cfb62f7d7081b6434998','2024-11-14 12:59:56.704','20241112061430_change_type_of_description_field_in_product_model',NULL,NULL,'2024-11-14 12:59:56.575',1),('b937b957-d7b8-40ad-8b49-aac48860f006','527b567f267010add49518b0f6809aeee6b01c39c1b64c2f9f69d4a6369818c5','2024-11-16 06:06:23.618','20241116060623_add_new_model_trending_shopbyoccasshio_exclusive_collection_new_arrival',NULL,NULL,'2024-11-16 06:06:23.486',1),('c21e32f9-7b8f-4793-90d4-c66f5d529a4f','ac19b48c3820184f0aee39dcfdfe95600d6503204f6ec2a9b24d3fa26d0f5686','2024-11-25 11:03:07.917','20241125110258_update_model_product_add_on_delete_cascade',NULL,NULL,'2024-11-25 11:02:58.708',1),('c64d3afa-8dc5-4eaf-8c00-970f28255ce3','f4bad4706b4cd647c586bae61f0a20c9dd1c950fe038415edd9b31f5b21f3dc4','2024-11-14 12:59:55.823','20241108101052_add_hero_sliders_model',NULL,NULL,'2024-11-14 12:59:55.794',1),('c8d73563-5d01-470c-9a60-1bb5160313bf','7631f1fa565ac627042f1cbb443e73957a0fe6eaeabd51c2dd51faf15db680e8','2024-11-14 12:59:54.263','20241106075651_add_new_field_role',NULL,NULL,'2024-11-14 12:59:54.213',1),('d0ba61e8-5064-4eb9-a326-23c4f61f3742','82ab8d1d04fe50c05ed358cc140f5bfd41733d4bb70fa9a60f0d1d1f838ba5d6','2024-11-27 12:48:43.408','20241127124843_update_video_model',NULL,NULL,'2024-11-27 12:48:43.381',1),('d1345640-0ad2-4a88-9cfc-de12d2170103','012aa56841c26ead671a27547141a0faf341f232a7c56f90b0929017975fea66','2024-11-14 12:59:55.758','20241108064917_add_size_color_customertype_model',NULL,NULL,'2024-11-14 12:59:55.332',1),('d1d2414c-fe0e-4be7-a8b0-2232d390da57','15d321eb59cd46ce1dbcd4336cf29441c6f0efd2c286a51122366cb75341d364','2024-11-14 12:59:56.743','20241112105151_change_add_minprice_max_price_on_discount',NULL,NULL,'2024-11-14 12:59:56.707',1),('d867ce1c-1372-442e-9b0c-b1eccb8c1281','e25025b3bf2f095d42fcdc88a7db6e978407a08465b8a28cbbf59350ee12a5a1','2024-11-14 12:59:55.791','20241108084817_add_showcases_model',NULL,NULL,'2024-11-14 12:59:55.761',1),('dfc335a1-4bf2-4199-94b7-ba20e9d6c664','258fe129634152230245755c17c158686cbce4a0f03d05f0db7992dcfeb3d384','2024-11-15 06:42:43.563','20241115064243_add_new_field_on_user_status',NULL,NULL,'2024-11-15 06:42:43.508',1),('e90d647f-939a-4867-a37e-70842c58ec26','dd89235552ff1b624e45538e7fad3892a0424bcdeed12a4b8983ca9094ac937e','2024-11-16 09:26:52.813','20241116092652_add_profile_url_field_on_user_model',NULL,NULL,'2024-11-16 09:26:52.693',1),('eb3c7f3c-153c-4bca-bef6-0794ae77361e','d24bf899b9f6c024183902df014a56e204a7bf9084d7a79bb2711a740346df8a','2024-11-14 12:59:56.059','20241109071322_add_user_id_to_product_model',NULL,NULL,'2024-11-14 12:59:55.884',1),('eec9e449-c0d0-41a0-b892-0ed4b2f89508','7e876a4c3468baf4692c9f999f3db639a25fa441c3547b9d8069739e3c41bad7','2024-11-20 04:18:42.489','20241120041842_add_new_model_shop_by_season',NULL,NULL,'2024-11-20 04:18:42.345',1),('fc93aaf7-684e-4a6d-891c-1c2b8a9c3b84','bdd7d6c3138ebe4348c3e6db8107b46e90db40a6fb8a9b3ff64964178397bf10','2024-11-14 12:59:57.395','20241113112043_add_order_id_field',NULL,NULL,'2024-11-14 12:59:57.328',1),('ff7ace7d-e6d3-46d1-89d3-0ac9019b84a4','fcd2b67a6d4618a4fe0e53398404b30a6cf87626f665bfcc06f3485d3adb625e','2024-11-19 05:52:06.012','20241119055205_add_new_fields_to_product_model_min_quantity',NULL,NULL,'2024-11-19 05:52:05.977',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-28 12:24:28

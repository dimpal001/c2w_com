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
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `text` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Announcements`
--

LOCK TABLES `Announcements` WRITE;
/*!40000 ALTER TABLE `Announcements` DISABLE KEYS */;
INSERT INTO `Announcements` VALUES ('0249b833-c8ce-457b-80ae-e99d6f497409','Flat 100 off on first order');
/*!40000 ALTER TABLE `Announcements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ArrivalsLink`
--

DROP TABLE IF EXISTS `ArrivalsLink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ArrivalsLink` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `action` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hyperLink` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Blogs`
--

LOCK TABLES `Blogs` WRITE;
/*!40000 ALTER TABLE `Blogs` DISABLE KEYS */;
INSERT INTO `Blogs` VALUES ('73dc8728-d281-4a49-af20-a507444cae70','https://cdn.thefashionsalad.com/clothes2wear/image-1732777817420.jpg','Why ciggerates are more healthier than gutkas. Know more','hey guys today i am going to tell you why cigg\'s are more healthier than fruits, vegetbale...','santwoo.com'),('94217d22-dcb9-4a2b-bc5f-d605b6d5c05e','https://cdn.thefashionsalad.com/clothes2wear/image-1732777734495.jpg','You won\'t believe what happens next.','Let\'s Sing Phoolo ka taaro ka sabka kehna hain ek hazaro mein meri  Clothes2Wear Hain Lalala...','santwoo.com');
/*!40000 ALTER TABLE `Blogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Button`
--

DROP TABLE IF EXISTS `Button`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Button` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `iconUrl` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Button`
--

LOCK TABLES `Button` WRITE;
/*!40000 ALTER TABLE `Button` DISABLE KEYS */;
INSERT INTO `Button` VALUES ('297463ba-b5d7-4139-9149-4d7c1fabe27c','Favorite','https://cdn.thefashionsalad.com/clothes2wear/image-1732355431016.png','https://santwoo.com/'),('f4856530-344a-4fb5-921d-24b3c71151e0','Cart','https://cdn.thefashionsalad.com/clothes2wear/image-1732355215362.png','https://www.thebmim.com/');
/*!40000 ALTER TABLE `Button` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CartItem`
--

DROP TABLE IF EXISTS `CartItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CartItem` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
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
/*!40000 ALTER TABLE `CartItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CollectionLink`
--

DROP TABLE IF EXISTS `CollectionLink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CollectionLink` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `CustomerType_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CustomerType`
--

LOCK TABLES `CustomerType` WRITE;
/*!40000 ALTER TABLE `CustomerType` DISABLE KEYS */;
INSERT INTO `CustomerType` VALUES ('51f32f75-706d-4b43-9280-acec35b1d8f7','men','men'),('ba055622-9aed-4904-a080-5a2b62c5e71d','kids','kids'),('f73accf6-f2e2-451e-bcb8-1ee10023fdb0','women','women'),('fb1e643a-2542-44cc-a509-a2499ddbfddf','girl','girl');
/*!40000 ALTER TABLE `CustomerType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Discount`
--

DROP TABLE IF EXISTS `Discount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Discount` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` double NOT NULL,
  `type` enum('PERCENTAGE','FIXED') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `productId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
INSERT INTO `Discount` VALUES ('b334758d-e9d8-4e3e-b6a5-e4e24769d6c5','C2W121121','20% OFF on first order',20,'PERCENTAGE','2024-12-05 05:00:53.136','2024-12-05 04:59:42.643',NULL,NULL,NULL,1,0,NULL,'[]'),('dcdf638b-b89c-4b77-bab3-ad29fe888e12','C2W121123','Flat 500 OFF on first order.',500,'FIXED','2024-12-05 05:47:17.316','2024-12-05 11:26:03.557',NULL,NULL,NULL,1,0,NULL,'[]');
/*!40000 ALTER TABLE `Discount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ExclusiveCollection`
--

DROP TABLE IF EXISTS `ExclusiveCollection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ExclusiveCollection` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hyperLink` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categoryHyperLink` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
INSERT INTO `ExclusiveCollection` VALUES ('5fb26c39-54ea-4f8a-9d8c-80dc69754791','https://cdn.thefashionsalad.com/clothes2wear/image-1732605309016.jpg','https://santwoo.com/','Alia Bhattacharjie Brown Kurti Set Golden Blouse','2024-11-26 07:15:09.782','2024-11-26 08:49:40.544',9999,999),('85be8f5a-4805-4b9f-911d-41771c0a4e8b','https://cdn.thefashionsalad.com/clothes2wear/image-1732780681774.jpg','santwoo.com','Sunny Leone Blue Kurti with Black Golden Blouse','2024-11-28 07:58:03.326','2024-11-28 07:58:03.326',9999,9999),('b2c868be-2984-4980-957b-8636f96a3f4b','https://cdn.thefashionsalad.com/clothes2wear/image-1732780785220.webp','santwoo.com','Deepak kalal Black blouse dress suit lehenga','2024-11-28 07:59:46.598','2024-11-28 09:07:53.380',12000,10000),('bcf80521-e165-49d3-86b1-77500f0b256f','https://cdn.thefashionsalad.com/clothes2wear/image-1732605288227.webp','https://santwoo.com/','Priyanka Chopri Brown Kurti Set Golden Blouse','2024-11-26 07:14:49.539','2024-11-26 08:47:34.992',9999,999),('cf020ae8-7be6-4436-bd14-2b883b46148a','https://cdn.thefashionsalad.com/clothes2wear/image-1732780745419.jpg','santwoo.com','Rakhi Sawant Mental Friendly Dress Black','2024-11-28 07:59:06.972','2024-11-28 07:59:06.972',10000,10000);
/*!40000 ALTER TABLE `ExclusiveCollection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HeroSliders`
--

DROP TABLE IF EXISTS `HeroSliders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HeroSliders` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `hyperLink` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryHyperLink` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
INSERT INTO `HeroSliders` VALUES ('0f769ccc-e501-4176-88ee-28aa2a762941','https://cdn.thefashionsalad.com/clothes2wear/image-1732300610417.jpg','https://santwoo.com/',NULL,'2024-11-22 18:36:53.643','2024-11-22 18:36:53.643'),('7de5f631-b452-4029-b80a-1bc2f0297505','https://cdn.thefashionsalad.com/clothes2wear/image-1732300587665.jpg','https://santwoo.com/',NULL,'2024-11-22 18:36:30.190','2024-11-22 18:36:30.190'),('8c7f7f88-b305-4759-bb66-4271c92e0f0f','https://cdn.thefashionsalad.com/clothes2wear/image-1732300552898.jpg','https://santwoo.com/',NULL,'2024-11-22 18:35:56.656','2024-11-22 18:35:56.656');
/*!40000 ALTER TABLE `HeroSliders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ImageWeek`
--

DROP TABLE IF EXISTS `ImageWeek`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ImageWeek` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `hyperLink` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imageUrl` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ImageWeek`
--

LOCK TABLES `ImageWeek` WRITE;
/*!40000 ALTER TABLE `ImageWeek` DISABLE KEYS */;
INSERT INTO `ImageWeek` VALUES ('41cce466-973e-4f84-8190-c5f99b6bef6f','https://santwoo.com/','https://cdn.thefashionsalad.com/clothes2wear/image-1732643738955.webp'),('536c8ddc-bcea-40be-92d1-a109e429aefd','https://santwoo.com/','https://cdn.thefashionsalad.com/clothes2wear/image-1732643766524.jpg'),('64bdfd17-a63e-4806-8c38-59e417250547','https://santwoo.com/','https://cdn.thefashionsalad.com/clothes2wear/image-1732643784469.jpg');
/*!40000 ALTER TABLE `ImageWeek` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Logos`
--

DROP TABLE IF EXISTS `Logos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Logos` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logoUrl` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '0',
  `altText` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Logos`
--

LOCK TABLES `Logos` WRITE;
/*!40000 ALTER TABLE `Logos` DISABLE KEYS */;
/*!40000 ALTER TABLE `Logos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `NewArrivals`
--

DROP TABLE IF EXISTS `NewArrivals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `NewArrivals` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hyperLink` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `mrp` double DEFAULT NULL,
  `price` double DEFAULT NULL,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `NewArrivals`
--

LOCK TABLES `NewArrivals` WRITE;
/*!40000 ALTER TABLE `NewArrivals` DISABLE KEYS */;
INSERT INTO `NewArrivals` VALUES ('4542da59-e41d-4822-a06c-b6d1296ba033','https://cdn.thefashionsalad.com/clothes2wear/image-1732528447287.jpg','https://santwoo.com/','2024-11-25 09:54:08.355','2024-11-25 09:54:08.355','Buy ultimate lehenga saree of alia bhatt with designer aniket pradhan. The world best designer holding more than 500 bn assets compounding interest.',1000,5000,'Alia Bhatt Suit Anarkali Lehenga with Western Style Blouse'),('b1ade222-31f9-4d92-bdbf-b1b326576c01','https://cdn.thefashionsalad.com/clothes2wear/image-1732528488839.jpg','https://santwoo.com/','2024-11-25 09:54:49.169','2024-11-25 09:54:49.169','Buy ultimate lehenga saree of alia bhatt with designer aniket pradhan. The world best designer holding more than 500 bn assets compounding interest.',4000,10000,'Aniket Pradhan Suit Anarkali Lehenga with Western Style Blouse'),('e19e693e-abe1-46bc-bfff-76385c1bde28','https://cdn.thefashionsalad.com/clothes2wear/image-1732528062699.webp','https://santwoo.com/','2024-11-25 09:47:43.426','2024-11-25 09:47:43.426','Buy ultimate lehenga saree of alia bhatt with designer aniket pradhan. The world best designer holding more than 500 bn assets compounding interest.',999,1000,'Sunny Leone Suit Anarkali Lehenga with Western Style Blous'),('f9f8fed8-3df2-44ce-8aa8-630a01c2c574','https://cdn.thefashionsalad.com/clothes2wear/image-1732469003064.jpg','https://santwoo.com/','2024-11-23 18:44:48.215','2024-11-24 17:23:27.575','Buy ultimate lehenga saree of alia bhatt with designer aniket pradhan. The world best designer holding more than 500 bn assets compounding interest.',5999,99999,'Alia Bhatt Suit Anarkali Lehenga with Western Style Blouse');
/*!40000 ALTER TABLE `NewArrivals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Notification`
--

DROP TABLE IF EXISTS `Notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Notification` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `isRead` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `hyperLink` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
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
/*!40000 ALTER TABLE `Notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderDetails`
--

DROP TABLE IF EXISTS `OrderDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderDetails` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `totalPrice` double NOT NULL,
  `status` enum('INCOMPLETE','PENDING','APPROVED','SHIPPED','INTRANSIT','DELIVERED','CANCELLED') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `discountId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `orderId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `paymentMethod` enum('COD','ONLINE') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `trackingId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `addressId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `finalPrice` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `OrderDetails_orderId_key` (`orderId`),
  KEY `OrderDetails_userId_fkey` (`userId`),
  KEY `OrderDetails_discountId_fkey` (`discountId`),
  KEY `OrderDetails_addressId_fkey` (`addressId`),
  CONSTRAINT `OrderDetails_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `UserAddress` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `OrderDetails_discountId_fkey` FOREIGN KEY (`discountId`) REFERENCES `Discount` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `OrderDetails_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderDetails`
--

LOCK TABLES `OrderDetails` WRITE;
/*!40000 ALTER TABLE `OrderDetails` DISABLE KEYS */;
INSERT INTO `OrderDetails` VALUES ('00ca0f7f-c821-43ce-acf1-c6501f86975c','b6ec8cb2-bd25-4b10-99a6-f8e168cab091',7000,'PENDING','2024-12-05 07:40:37.421','2024-12-05 07:41:54.766','dcdf638b-b89c-4b77-bab3-ad29fe888e12','OI9703527','ONLINE',NULL,NULL,'3a3cc97f-f3e6-4447-9569-50d89fd0bc24',6500),('5513eac2-dec9-464a-8d37-4fc43dbd9adf','b6ec8cb2-bd25-4b10-99a6-f8e168cab091',5000,'PENDING','2024-12-05 11:17:27.101','2024-12-05 11:20:53.582','dcdf638b-b89c-4b77-bab3-ad29fe888e12','OI8670510','ONLINE',NULL,NULL,'3a3cc97f-f3e6-4447-9569-50d89fd0bc24',4500);
/*!40000 ALTER TABLE `OrderDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderItem`
--

DROP TABLE IF EXISTS `OrderItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderItem` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL,
  `price` double NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `sizeId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
INSERT INTO `OrderItem` VALUES ('25b2f126-bdbd-49ea-a0c3-b4dc09ad7d2e','5513eac2-dec9-464a-8d37-4fc43dbd9adf','58b349f3-d7ad-4acc-a869-398a98317cab',1,1000,'2024-12-05 11:17:27.101','2024-12-05 11:17:27.101','552e4a18-6e82-42d1-96fb-9f1a55774b14'),('4ce586b6-456f-40b0-909c-eb0b8ff3f5ef','00ca0f7f-c821-43ce-acf1-c6501f86975c','5209edd3-6536-4bf5-8dba-0234d5090f80',3,2000,'2024-12-05 07:40:37.421','2024-12-05 07:40:37.421','552e4a18-6e82-42d1-96fb-9f1a55774b14'),('8a4689e4-9882-4d34-b865-9c73e1bf2ecf','5513eac2-dec9-464a-8d37-4fc43dbd9adf','5209edd3-6536-4bf5-8dba-0234d5090f80',2,2000,'2024-12-05 11:17:27.101','2024-12-05 11:17:27.101','552e4a18-6e82-42d1-96fb-9f1a55774b14'),('c436c4a4-0f18-4a79-a30e-8e6bd929f8b3','00ca0f7f-c821-43ce-acf1-c6501f86975c','58b349f3-d7ad-4acc-a869-398a98317cab',1,1000,'2024-12-05 07:40:37.421','2024-12-05 07:40:37.421','552e4a18-6e82-42d1-96fb-9f1a55774b14');
/*!40000 ALTER TABLE `OrderItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Otp`
--

DROP TABLE IF EXISTS `Otp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Otp` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` double NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `bank` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `currency` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `method` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `upi` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `wallet` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
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
INSERT INTO `PaymentDetails` VALUES ('145c00d3-4f64-4160-ac36-dab07dabbce5','5513eac2-dec9-464a-8d37-4fc43dbd9adf',4500,'2024-12-05 11:20:53.588','2024-12-05 11:20:53.588',NULL,'INR','upi','order_PTTaVXwzoT2fbV','pay_PTTaiPn6VQzJ4x','adsfsd@okicici',NULL),('9b158a5c-4a55-45d2-b0f4-768e75b6c10f','00ca0f7f-c821-43ce-acf1-c6501f86975c',6500,'2024-12-05 07:41:54.775','2024-12-05 07:41:54.775',NULL,'INR','upi','order_PTPrEQ0yAEtaDJ','pay_PTPrPYggxqrMBw','adsfsd@okicici',NULL);
/*!40000 ALTER TABLE `PaymentDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isReturnable` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `thumbnailUrl` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '0',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `summary` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `customerTypeId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `estimatedDeliveryDay` int DEFAULT NULL,
  `styleId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `returnPolicy` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `views` int NOT NULL DEFAULT '0',
  `displayPrice` double NOT NULL DEFAULT '0',
  `tags` json NOT NULL,
  `longTailKeyword` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `affiliateId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isCODAvailable` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Product_slug_key` (`slug`),
  UNIQUE KEY `Product_styleId_key` (`styleId`),
  UNIQUE KEY `Product_affiliateId_key` (`affiliateId`),
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
INSERT INTO `Product` VALUES ('5209edd3-6536-4bf5-8dba-0234d5090f80','dimpu-lehenga-saree-exclusive-golden-blouse-2024-11-26',0,'2024-11-26 08:00:44.652','2024-12-06 05:01:54.198','https://cdn.thefashionsalad.com/clothes2wear/image-1732608042793.jpg',1,'Hii my name is aniket pradhan and this is my prodcct','Hii my name is aniket pradhan and this is my prodcct','51f32f75-706d-4b43-9280-acec35b1d8f7','a3ff6c2e-aecd-49c3-81f0-4cb7d1a4ae9e',15,'C2W725754','Dimpu Lehenga Saree Exclusive Golden Blouse','Hii my name is aniket pradhan and this is my prodcct',0,999,'[]','Hii my name is aniket pradhan and this is my prodcct','wfMXg',1),('58b349f3-d7ad-4acc-a869-398a98317cab','afreen-jeans-top-suit-exclusive-black-collection-2024-11-26',1,'2024-11-26 08:26:04.965','2024-12-06 05:01:54.198','https://cdn.thefashionsalad.com/clothes2wear/image-1732609564394.webp',1,'Hii guys this aniket pradhan ','Hi my name is aniket pradhan thanks for watching this video i love you','51f32f75-706d-4b43-9280-acec35b1d8f7','a3ff6c2e-aecd-49c3-81f0-4cb7d1a4ae9e',10,'C2W219625','Afreen Jeans top suit Exclusive Black Collection','hi guys this aniket radhan',0,1000,'[\"thank you for\", \"hii\"]','hi guys this aniket radhan','r6Q30',1);
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductCategory`
--

DROP TABLE IF EXISTS `ProductCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductCategory` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
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
INSERT INTO `ProductCategory` VALUES ('65c23155-a575-4a10-9499-224aec8d7b53','ACCESSORIES','accessories'),('cfa2050c-61da-485d-be80-6860d71a1a02','KIDS','kids'),('0f47afa6-401c-4c09-b151-be0fd01de9b5','MATERIAL','material'),('41d6ca03-22c5-48a5-a511-61e565992e55','MEN','men'),('4460347d-85da-4ac6-b0d3-20a0a731c5e9','SALE','sale'),('60432d72-652a-4d44-84a6-144d14702a02','SEASON','season'),('bf8ea9d0-f678-4d21-bb0b-9e6ce683f62a','SHOES','shoes'),('45652f00-0c12-4fd0-a211-3f79d107d470','WOMEN','women');
/*!40000 ALTER TABLE `ProductCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductColor`
--

DROP TABLE IF EXISTS `ProductColor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductColor` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ProductColor_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductColor`
--

LOCK TABLES `ProductColor` WRITE;
/*!40000 ALTER TABLE `ProductColor` DISABLE KEYS */;
INSERT INTO `ProductColor` VALUES ('3d3b27d3-a2cf-4333-96f9-eed21e14142b','blue','#0000ff','blue'),('de89118a-5132-4506-8620-23a7351443c1','red','#ff0000','red'),('f584c51b-3792-4d96-aca3-c6b1a77aaf2a','green','#00ff00','green');
/*!40000 ALTER TABLE `ProductColor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductImage`
--

DROP TABLE IF EXISTS `ProductImage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductImage` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `colorId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `altText` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
INSERT INTO `ProductImage` VALUES ('1a6d013e-7685-40cd-85fe-d3a1082f652d','58b349f3-d7ad-4acc-a869-398a98317cab','https://cdn.thefashionsalad.com/clothes2wear/image-1732609564395.avif','f584c51b-3792-4d96-aca3-c6b1a77aaf2a',''),('3219ab3e-4d85-465f-ad93-cc1cb2736a04','5209edd3-6536-4bf5-8dba-0234d5090f80','https://cdn.thefashionsalad.com/clothes2wear/image-1732608042793.jpg','3d3b27d3-a2cf-4333-96f9-eed21e14142b',''),('a6d22cc9-0cac-4393-88f2-b6dcf56aefb2','5209edd3-6536-4bf5-8dba-0234d5090f80','https://cdn.thefashionsalad.com/clothes2wear/image-1732608042796.webp','de89118a-5132-4506-8620-23a7351443c1',''),('af8947c7-a3f1-4fff-a8ac-f84302c494f2','58b349f3-d7ad-4acc-a869-398a98317cab','https://cdn.thefashionsalad.com/clothes2wear/image-1732609564394.webp','3d3b27d3-a2cf-4333-96f9-eed21e14142b',''),('dd4730f6-f9f7-492d-97f0-6c12daada339','5209edd3-6536-4bf5-8dba-0234d5090f80','https://cdn.thefashionsalad.com/clothes2wear/image-1732608042796.jpg','f584c51b-3792-4d96-aca3-c6b1a77aaf2a',''),('e5443b15-4bb3-4a6e-8c9d-1d433799952a','58b349f3-d7ad-4acc-a869-398a98317cab','https://cdn.thefashionsalad.com/clothes2wear/image-1732609564395.avif','de89118a-5132-4506-8620-23a7351443c1','');
/*!40000 ALTER TABLE `ProductImage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductInventory`
--

DROP TABLE IF EXISTS `ProductInventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductInventory` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `mrp` int NOT NULL,
  `price` int NOT NULL,
  `sizeId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
INSERT INTO `ProductInventory` VALUES ('4d603864-56c4-441a-b5ff-9530cbeb1d7a','5209edd3-6536-4bf5-8dba-0234d5090f80',2700,2000,'552e4a18-6e82-42d1-96fb-9f1a55774b14',70,2,35),('5e810874-8e8b-4982-a2eb-4582d984b609','58b349f3-d7ad-4acc-a869-398a98317cab',1160,1000,'552e4a18-6e82-42d1-96fb-9f1a55774b14',80,109,16),('830a1a61-fdac-4c89-816f-c6b055846c98','5209edd3-6536-4bf5-8dba-0234d5090f80',1098,999,'b59f078e-2bf4-4395-afb4-52a813be4bc1',100,1,10);
/*!40000 ALTER TABLE `ProductInventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductReview`
--

DROP TABLE IF EXISTS `ProductReview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductReview` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` int NOT NULL,
  `review` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
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
/*!40000 ALTER TABLE `ProductReview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductSize`
--

DROP TABLE IF EXISTS `ProductSize`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductSize` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ProductSize_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductSize`
--

LOCK TABLES `ProductSize` WRITE;
/*!40000 ALTER TABLE `ProductSize` DISABLE KEYS */;
INSERT INTO `ProductSize` VALUES ('552e4a18-6e82-42d1-96fb-9f1a55774b14','s','s'),('b59f078e-2bf4-4395-afb4-52a813be4bc1','m','m');
/*!40000 ALTER TABLE `ProductSize` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductWeek`
--

DROP TABLE IF EXISTS `ProductWeek`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductWeek` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hyperLink` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imageUrl` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductWeek`
--

LOCK TABLES `ProductWeek` WRITE;
/*!40000 ALTER TABLE `ProductWeek` DISABLE KEYS */;
INSERT INTO `ProductWeek` VALUES ('6fc3a8ab-c09c-4ce2-9407-5f9a1fba535c','Dimpu will be the next biggest CEO at Microhard','https://santwoo.com/','https://cdn.thefashionsalad.com/clothes2wear/image-1732618322099.jpg'),('80ba419a-b2ab-4e08-9ed8-65d000c276bf','Aniket Pradhan will be the next CEO at Guugle','https://santwoo.com/','https://cdn.thefashionsalad.com/clothes2wear/image-1732618286401.jpg'),('80d0904c-7932-4858-ae6d-2f2e566e193b','Kangkana Will be the next biggest CEO at Opple','https://santwoo.com/','https://cdn.thefashionsalad.com/clothes2wear/image-1732619406208.jpg'),('e74486ce-0178-4986-9a21-ef5c8bca7984','Afreen will be the next Biggest CEO at Mamiearth','https://santwoo.com/','https://cdn.thefashionsalad.com/clothes2wear/image-1732618363001.webp');
/*!40000 ALTER TABLE `ProductWeek` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ReturnRequest`
--

DROP TABLE IF EXISTS `ReturnRequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ReturnRequest` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderItemId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `reason` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('PENDING','APPROVED','REJECTED','REFUNDED') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
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
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `text` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SearchHint`
--

LOCK TABLES `SearchHint` WRITE;
/*!40000 ALTER TABLE `SearchHint` DISABLE KEYS */;
INSERT INTO `SearchHint` VALUES ('cbf722c1-5681-4c16-ae6e-73b725df7cd7','Search Taylor Swift lehenga..');
/*!40000 ALTER TABLE `SearchHint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SearchQuery`
--

DROP TABLE IF EXISTS `SearchQuery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SearchQuery` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `query` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
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
/*!40000 ALTER TABLE `SearchQuery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Session`
--

DROP TABLE IF EXISTS `Session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Session` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Session_token_key` (`token`),
  KEY `Session_userId_fkey` (`userId`),
  CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
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
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `occasionName` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categoryHyperLinks` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
INSERT INTO `ShopByOccasion` VALUES ('315271df-6343-49fe-9bde-9f5bd76fd1e7','This Diwali','santwoo.com','2024-11-25 18:56:45.932','2024-11-25 19:46:17.599'),('e5c7d58a-148e-448a-b68c-3f312309579d','This Winter','santwoo.com','2024-11-25 19:31:30.624','2024-11-25 19:46:29.542');
/*!40000 ALTER TABLE `ShopByOccasion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ShopByOccasionProduct`
--

DROP TABLE IF EXISTS `ShopByOccasionProduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ShopByOccasionProduct` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `hyperLink` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `shopByOccasionId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
INSERT INTO `ShopByOccasionProduct` VALUES ('20ed7f1d-a50a-4ad6-8eaa-888d4c0b69c4','https://cdn.thefashionsalad.com/clothes2wear/image-1732561036732.webp','https://santwoo.com/','315271df-6343-49fe-9bde-9f5bd76fd1e7','2024-11-25 18:57:17.360','2024-11-25 18:57:17.360'),('44328118-fc8b-4c46-bf15-945d20929adc','https://cdn.thefashionsalad.com/clothes2wear/image-1732561046396.webp','https://santwoo.com/','315271df-6343-49fe-9bde-9f5bd76fd1e7','2024-11-25 18:57:26.974','2024-11-25 18:57:26.974'),('5a548b81-78ac-4a98-9474-ada16dd285d1','https://cdn.thefashionsalad.com/clothes2wear/image-1732561063093.jpg','https://santwoo.com/','315271df-6343-49fe-9bde-9f5bd76fd1e7','2024-11-25 18:57:43.642','2024-11-25 18:57:43.642'),('66b63510-bbe4-4081-8e26-bd4d621165b2','https://cdn.thefashionsalad.com/clothes2wear/image-1732561026408.jpg','https://santwoo.com/','315271df-6343-49fe-9bde-9f5bd76fd1e7','2024-11-25 18:57:07.608','2024-11-25 18:57:07.608'),('83588c53-f826-4783-9518-bf2282391e66','https://cdn.thefashionsalad.com/clothes2wear/image-1732561054252.jpg','https://santwoo.com/','315271df-6343-49fe-9bde-9f5bd76fd1e7','2024-11-25 18:57:35.582','2024-11-25 18:57:35.582'),('868d1201-7825-4b85-8bf6-f4b7e17124c1','https://cdn.thefashionsalad.com/clothes2wear/image-1732563122745.avif','https://santwoo.com/','e5c7d58a-148e-448a-b68c-3f312309579d','2024-11-25 19:32:03.509','2024-11-25 19:32:03.509'),('88e81f71-80d8-42a3-bafe-b0618f708b32','https://cdn.thefashionsalad.com/clothes2wear/image-1732563157497.jpg','https://santwoo.com/','e5c7d58a-148e-448a-b68c-3f312309579d','2024-11-25 19:32:38.269','2024-11-25 19:32:38.269'),('933e5b5e-dc24-42d4-bb29-a76226762459','https://cdn.thefashionsalad.com/clothes2wear/image-1732563133889.avif','https://santwoo.com/','e5c7d58a-148e-448a-b68c-3f312309579d','2024-11-25 19:32:14.519','2024-11-25 19:32:14.519'),('bc8d9b32-274f-42e1-b7f8-a34cbc703eca','https://cdn.thefashionsalad.com/clothes2wear/image-1732563143945.jpeg','https://santwoo.com/','e5c7d58a-148e-448a-b68c-3f312309579d','2024-11-25 19:32:24.568','2024-11-25 19:32:24.568'),('ed15d0b0-c7e9-4d70-9de6-ae7cd0dbe0bd','https://cdn.thefashionsalad.com/clothes2wear/image-1732563113419.webp','https://santwoo.com/','e5c7d58a-148e-448a-b68c-3f312309579d','2024-11-25 19:31:54.629','2024-11-25 19:31:54.629');
/*!40000 ALTER TABLE `ShopByOccasionProduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ShopBySeason`
--

DROP TABLE IF EXISTS `ShopBySeason`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ShopBySeason` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `videoUrl` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
INSERT INTO `ShopBySeason` VALUES ('f0fa7310-ec9f-45cf-b465-e2fc46b3d759','https://cdn.thefashionsalad.com/clothes2wear/image-1732613600913.mp4','2024-11-26 09:33:26.231','2024-11-26 09:33:26.231');
/*!40000 ALTER TABLE `ShopBySeason` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ShopBySeasonProduct`
--

DROP TABLE IF EXISTS `ShopBySeasonProduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ShopBySeasonProduct` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `seasonId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `hyperLink` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
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
INSERT INTO `ShopBySeasonProduct` VALUES ('365c6096-eeb0-4726-8780-0ae80740d054','https://cdn.thefashionsalad.com/clothes2wear/image-1732785593673.jpg','Buy ultimate lehenga saree of alia bhatt with designer aniket pradhan. The world best designer holding more than 500 bn assets compounding interest.','2024-11-28 09:19:54.692','2024-11-28 09:19:54.692','f0fa7310-ec9f-45cf-b465-e2fc46b3d759','santwoo.com'),('61679081-c42a-4e64-b781-9fda0a5f9935','https://cdn.thefashionsalad.com/clothes2wear/image-1732785575065.jpg','Buy ultimate lehenga saree of alia bhatt with designer aniket pradhan. The world best designer holding more than 500 bn assets compounding interest.','2024-11-28 09:19:36.292','2024-11-28 09:19:36.292','f0fa7310-ec9f-45cf-b465-e2fc46b3d759','santwoo.com'),('91dc4dcd-8130-4b2a-ab97-e254987190f0','https://cdn.thefashionsalad.com/clothes2wear/image-1732785531596.jpg','Buy ultimate lehenga saree of alia bhatt with designer aniket pradhan. The world best designer holding more than 500 bn assets compounding interest.','2024-11-28 09:18:53.157','2024-11-28 09:18:53.157','f0fa7310-ec9f-45cf-b465-e2fc46b3d759','santwoo.com'),('dca937e9-27fb-4ad2-acf4-2e7a584316f0','https://cdn.thefashionsalad.com/clothes2wear/image-1732785555769.jpg','Buy ultimate lehenga saree of alia bhatt with designer aniket pradhan. The world best designer holding more than 500 bn assets compounding interest.','2024-11-28 09:19:16.780','2024-11-28 09:19:16.780','f0fa7310-ec9f-45cf-b465-e2fc46b3d759','santwoo.com'),('ed03448e-1ddf-4890-9d54-4e5df98ce4a2','https://cdn.thefashionsalad.com/clothes2wear/image-1732614748756.jpg','Buy ultimate lehenga saree of alia bhatt with designer aniket pradhan. The world best designer holding more than 500 bn assets compounding interest.','2024-11-26 09:52:30.011','2024-11-26 09:52:30.011','f0fa7310-ec9f-45cf-b465-e2fc46b3d759','https://santwoo.com/');
/*!40000 ALTER TABLE `ShopBySeasonProduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Showcases`
--

DROP TABLE IF EXISTS `Showcases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Showcases` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `hyperLink` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryHyperLink` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
INSERT INTO `Showcases` VALUES ('d8a90bee-6659-4a7c-aa3a-6d5e8734e81f','EUROPEAN','https://cdn.thefashionsalad.com/clothes2wear/image-1732300198146.jpg','https://santwoo.com/',NULL,'2024-11-22 18:30:01.690','2024-11-22 18:30:01.690'),('fe1335dd-0ea4-4ca4-b372-c7b17db0de8d','WESTERN','https://cdn.thefashionsalad.com/clothes2wear/image-1732299939712.webp','https://santwoo.com/',NULL,'2024-11-22 18:25:42.722','2024-11-22 18:25:42.722');
/*!40000 ALTER TABLE `Showcases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SocialLinks`
--

DROP TABLE IF EXISTS `SocialLinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SocialLinks` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hyperLink` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SocialLinks`
--

LOCK TABLES `SocialLinks` WRITE;
/*!40000 ALTER TABLE `SocialLinks` DISABLE KEYS */;
INSERT INTO `SocialLinks` VALUES ('38910f93-504f-4232-878f-5b506021413e','https://cdn.thefashionsalad.com/clothes2wear/image-1732777840717.avif','santwoo.com'),('3bfe5c44-5ec1-4a9f-b366-f68e41461eaf','https://cdn.thefashionsalad.com/clothes2wear/image-1732778020397.jpg','santwoo.com'),('6dc5586b-6607-4051-96c4-dd1255381d4d','https://cdn.thefashionsalad.com/clothes2wear/image-1732778059461.jpg','santwoo.com '),('d0a5b06c-9592-4968-9b1b-c7b6bd06de33','https://cdn.thefashionsalad.com/clothes2wear/image-1732778078013.jpg','santwoo.com');
/*!40000 ALTER TABLE `SocialLinks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SubCategory`
--

DROP TABLE IF EXISTS `SubCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SubCategory` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
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
INSERT INTO `SubCategory` VALUES ('46f34b9c-aaaa-434d-a282-d7139495f65a','cap','cap','cfa2050c-61da-485d-be80-6860d71a1a02'),('fbbc2d3a-348c-4c4c-8b5d-de35c6203d5b','jacket','jacket','cfa2050c-61da-485d-be80-6860d71a1a02');
/*!40000 ALTER TABLE `SubCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SupportTicket`
--

DROP TABLE IF EXISTS `SupportTicket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SupportTicket` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('OPEN','IN_PROGRESS','RESOLVED','CLOSED') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'OPEN',
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
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `videoUrl` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hyperLink` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `avatarUrl` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Trending`
--

LOCK TABLES `Trending` WRITE;
/*!40000 ALTER TABLE `Trending` DISABLE KEYS */;
INSERT INTO `Trending` VALUES ('612cbf9e-886f-4e03-87ae-bae2ad5d20a3','https://cdn.thefashionsalad.com/clothes2wear/image-1732382368930.mp4','Sharukh Khalifa Special Golden Kurti with Black Blouse','999999','https://santwoo.com/','2024-11-23 17:19:33.753','2024-11-23 17:19:33.753','https://cdn.thefashionsalad.com/clothes2wear/image-1732382369495.jpg'),('855cc5e9-0433-475d-a06b-ac0be8016202','https://cdn.thefashionsalad.com/clothes2wear/image-1732381385521.MP4','Salman Leone Special Golden Kurti with Black Blouse','99999','https://santwoo.com/','2024-11-23 17:03:10.115','2024-11-23 17:03:10.115','https://cdn.thefashionsalad.com/clothes2wear/image-1732381386372.jpg'),('c163269f-de2d-40fb-a665-c71af8e99820','https://cdn.thefashionsalad.com/clothes2wear/image-1732382461642.mp4','Deepika Khan Special Golden Kurti with Black Blouse','89996','https://santwoo.com/','2024-11-23 17:21:06.184','2024-11-23 17:21:06.184','https://cdn.thefashionsalad.com/clothes2wear/image-1732382462457.webp');
/*!40000 ALTER TABLE `Trending` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TrendingLink`
--

DROP TABLE IF EXISTS `TrendingLink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TrendingLink` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `isVerified` tinyint(1) NOT NULL DEFAULT '0',
  `role` enum('ADMIN','SELLER','BUYER') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'BUYER',
  `firstName` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastName` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('ACTIVE','DEACTIVE','BANNED') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `profileUrl` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '',
  `mobileNumber` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `whatsAppNumber` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
INSERT INTO `User` VALUES ('6f0ef14f-884f-4cbe-8951-913875e22b87','anky@gmail.com','$2a$10$jMpwEdqslH5XPdJPhetRROzWnKjLiResWjL7Ostmn7cYmIvBzl3bG','2024-11-28 07:51:12.042','2024-11-28 07:51:44.017',0,'BUYER','Aniket','Pradhan','ACTIVE','',NULL,NULL,0),('a3ff6c2e-aecd-49c3-81f0-4cb7d1a4ae9e','anky','$2y$10$dVQDpBY8xRw/JLJsFsKhpuAUhNg68TlxOCIem7KAs9k3MVa78KI7q','2024-11-22 17:27:02.600','2024-11-27 10:25:24.984',1,'ADMIN','Ankyy',' ','ACTIVE','',NULL,NULL,0),('b6ec8cb2-bd25-4b10-99a6-f8e168cab091','user1@gmail.com','$2a$10$kwXiv.48Y/NbXr3F2sNrqO5W7qM8eWCF2.9XU8TRpxBlCkUFMucYK','2024-11-28 07:50:01.826','2024-12-05 10:15:01.760',1,'BUYER','Dimpal','Das','ACTIVE','',NULL,NULL,1);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserAddress`
--

DROP TABLE IF EXISTS `UserAddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserAddress` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `addressLine1` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `addressLine2` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `zipCode` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobileNumber` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `isDefault` tinyint(1) NOT NULL,
  `fullName` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
INSERT INTO `UserAddress` VALUES ('3a3cc97f-f3e6-4447-9569-50d89fd0bc24','b6ec8cb2-bd25-4b10-99a6-f8e168cab091','Maligaon, Guwahati',NULL,'Guwahati','Assam','780104','India','6003030303','2024-12-05 04:14:57.582','2024-12-05 04:14:57.582',1,'Dimpal Das'),('a2724024-db48-40f7-b97c-2216b3341c41','b6ec8cb2-bd25-4b10-99a6-f8e168cab091','Amingaon, North-Guwahati',NULL,'North Guwahati','Assam','780504','India','6003030325','2024-12-05 04:16:04.284','2024-12-05 04:16:04.284',0,'Dimpal Das');
/*!40000 ALTER TABLE `UserAddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vides`
--

DROP TABLE IF EXISTS `Vides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Vides` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `videoUrl` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `hyperLink` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `productId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vides`
--

LOCK TABLES `Vides` WRITE;
/*!40000 ALTER TABLE `Vides` DISABLE KEYS */;
/*!40000 ALTER TABLE `Vides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WishlistItem`
--

DROP TABLE IF EXISTS `WishlistItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `WishlistItem` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
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
/*!40000 ALTER TABLE `WishlistItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_ProductCategories`
--

DROP TABLE IF EXISTS `_ProductCategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_ProductCategories` (
  `A` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
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
INSERT INTO `_ProductCategories` VALUES ('5209edd3-6536-4bf5-8dba-0234d5090f80','65c23155-a575-4a10-9499-224aec8d7b53'),('58b349f3-d7ad-4acc-a869-398a98317cab','bf8ea9d0-f678-4d21-bb0b-9e6ce683f62a');
/*!40000 ALTER TABLE `_ProductCategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_SimilarProducts`
--

DROP TABLE IF EXISTS `_SimilarProducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_SimilarProducts` (
  `A` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
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
/*!40000 ALTER TABLE `_SimilarProducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_SubcategoryProducts`
--

DROP TABLE IF EXISTS `_SubcategoryProducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_SubcategoryProducts` (
  `A` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
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
INSERT INTO `_prisma_migrations` VALUES ('02bc4692-b1ae-40bb-bf62-4960c0df3b6d','0011f11eaa02c5247b7aef05eeaeb8750dcfcb2d07431c8aa46d8c2dfddc486e','2024-11-25 12:25:59.289','20241125122559_add_on_delete_cascade',NULL,NULL,'2024-11-25 12:25:59.224',1),('0318cbaa-9f7a-4ed2-b42b-5a59a7666f22','79cd8419f41f48779ace8f7ff5a058e3ae3b6c2c4bfa37ae83a1026f85069bd6','2024-11-22 16:32:07.861','20241116073208_change_shop_by_occasion_model',NULL,NULL,'2024-11-22 16:32:07.825',1),('07f39535-70ab-44f5-b8d3-53343608a3ae','46a8a70fa2bed2f3a41b864f22b0adee524b50d15f867d1370f185e1535c2dd0','2024-11-22 16:32:07.275','20241113095332_add_on_delete_on_order_details',NULL,NULL,'2024-11-22 16:32:07.168',1),('086b55a9-36f5-4fa3-8b6b-90708e79f791','3b4a14b99a7f68bec8ef9f32c5934f76caa9eadc50f274957be7b24c0169b230','2024-11-25 07:55:52.768','20241125040455_add_new_model_logos',NULL,NULL,'2024-11-25 07:55:52.735',1),('08d1a490-047b-4b03-afc0-6840dd205320','d24bf899b9f6c024183902df014a56e204a7bf9084d7a79bb2711a740346df8a','2024-11-22 16:32:06.295','20241109071322_add_user_id_to_product_model',NULL,NULL,'2024-11-22 16:32:06.177',1),('09055c8e-1b54-423f-9175-a3c4240569ff','1df95adaf85a049785a4ea239bfb44e9291cd1c5cbb31bdb311f93c91fecf00f','2024-11-22 16:32:07.162','20241113092236_add_size_id_to_order_item_model',NULL,NULL,'2024-11-22 16:32:07.053',1),('0b0068b4-5dd0-469e-a0a1-d2fef03ba88b','6c4e4ad6a0f1b930f22341c43f62ec06803621f83071dbe9a13c200c865e3145','2024-11-22 16:32:04.482','20241104061319_new_models',NULL,NULL,'2024-11-22 16:32:03.109',1),('0e863910-9b9f-4286-9f98-85c5a17e290e','a66a026cc4f684424b632a8af304662eaaf7c293b665428c77fb8ff58afbfa8b','2024-11-22 16:32:08.159','20241118041510_regenerate_everyhting',NULL,NULL,'2024-11-22 16:32:08.012',1),('12ad28a4-3702-4cd8-b563-58b451acb6ea','b48cbe7680b47968f3fe46b334cc5361e78d25715a0b5c425a14c0cefe2be878','2024-11-22 16:32:09.208','20241121061501_add_enum_on_order_status',NULL,NULL,'2024-11-22 16:32:09.142',1),('1825e633-58ea-4788-9b29-5d72e6993b59','7e876a4c3468baf4692c9f999f3db639a25fa441c3547b9d8069739e3c41bad7','2024-11-22 16:32:08.583','20241120041842_add_new_model_shop_by_season',NULL,NULL,'2024-11-22 16:32:08.477',1),('199b4aad-d652-4474-8179-9fbfe21ddf29','dd89235552ff1b624e45538e7fad3892a0424bcdeed12a4b8983ca9094ac937e','2024-11-22 16:32:07.968','20241116092652_add_profile_url_field_on_user_model',NULL,NULL,'2024-11-22 16:32:07.864',1),('1b1dfef3-16a1-464f-9e64-d25ee7d11144','d79b822aaf25216bfe382ed64334154eb986ae539ecc808b8862a9d4aef33b6c','2024-11-22 16:32:09.761','20241122113515_add_new_fields_to_new_arrival_products',NULL,NULL,'2024-11-22 16:32:09.718',1),('1c1309e6-46a4-4250-9420-1dc89a7f21da','15d321eb59cd46ce1dbcd4336cf29441c6f0efd2c286a51122366cb75341d364','2024-11-22 16:32:06.793','20241112105151_change_add_minprice_max_price_on_discount',NULL,NULL,'2024-11-22 16:32:06.770',1),('20376f72-e0a2-4c20-93a1-3d57c87c647b','93bd6e9f735f922ef8f21317e1d4409d3a15fdaf660ccf0937c20cce864ca3f8','2024-11-22 16:32:06.679','20241111071014_change_field_names_in_product_model',NULL,NULL,'2024-11-22 16:32:06.298',1),('2d26c69f-de90-46e0-8011-e9a6864319c9','06f35f94e120bb0b201e2d399eb6bcaed39ac4ee4d76ca1d506c5c8310461849','2024-11-22 16:32:04.822','20241106075030_new_models',NULL,NULL,'2024-11-22 16:32:04.486',1),('3534046e-090d-40c3-ad0e-2f80510d9389','f4bad4706b4cd647c586bae61f0a20c9dd1c950fe038415edd9b31f5b21f3dc4','2024-11-22 16:32:06.122','20241108101052_add_hero_sliders_model',NULL,NULL,'2024-11-22 16:32:06.097',1),('38b4bb75-fef1-445d-8254-65ec1cff271e','a2003a4d06e6d7b1b036c93ab98c8e48c58e41d62b93e01b08cf6e4b41242c43','2024-11-23 07:48:10.124','20241123062231_add_new_model_product_week_image_week',NULL,NULL,'2024-11-23 07:48:10.075',1),('3e93ce28-78dd-4e8c-9806-a83f16c64443','35ab1f7df8b66bac7cf8891a3982f6f9b7e00ebfe22fe391df9d12347ca3b69f','2024-11-23 07:48:10.070','20241123053441_update_model_exclusive_collection',NULL,NULL,'2024-11-23 07:48:10.043',1),('44404903-38a2-4219-a1f7-344e90af86e9','da57554659c5297ecf5f9022c3fbdc434c90e2236f3bd99db4ee97b0f550a183','2024-11-22 16:32:09.607','20241122054111_change_sub_category_unique_to_normal',NULL,NULL,'2024-11-22 16:32:09.561',1),('466b1188-08c8-4864-965a-6996a3a586d7','64c1701160ddd5c6a42b4a11eca7f7a3d5e5781185b805a6c28006a16169ee03','2024-11-22 16:32:08.351','20241118075346_add_new_fields_to_product_model_display_price',NULL,NULL,'2024-11-22 16:32:08.279',1),('480b73ea-fba2-438f-b575-32b218f93755','35f43abc8c300b3c342dd11255220166e6b51cad6199cfb62f7d7081b6434998','2024-11-22 16:32:06.768','20241112061430_change_type_of_description_field_in_product_model',NULL,NULL,'2024-11-22 16:32:06.685',1),('49c759c5-aab1-4ddc-90e6-025ab01ccc82','ea3db74cb3dcede6a54c653a3d82141797cbb97a77159c98c9100172ab3f0aba','2024-11-25 07:55:52.797','20241125041801_add_new_field_to_logos_alt_text',NULL,NULL,'2024-11-25 07:55:52.771',1),('4cfec501-a914-40c6-8822-a7e7011fdeff','54d36dff41f30bb85926a8b1dc816a397b9c4b1214bade8a624f56789dfafa21','2024-11-22 16:32:05.774','20241107051516_add_new_model_review_product_notification_tags_audit_logs_return_request_wish_list_item',NULL,NULL,'2024-11-22 16:32:04.877',1),('4d95f770-3e89-4740-8e85-aebc80db882c','2e51f89b9e22909f601773acf745a9fdbff9600f5a96e8f5f07c0425d9edf8a7','2024-11-22 16:32:08.277','20241118064742_add_new_fields_to_user_model_search_queries_and_product_model_views',NULL,NULL,'2024-11-22 16:32:08.161',1),('57d17a91-ca5d-4acb-8bef-249e46b3cf57','b105d54a938e8e7b8842a3f984b1d0c44b8da11f4962594b8a27fd022f540305','2024-11-22 16:32:09.556','20241121110337_add_new_model_sub_category',NULL,NULL,'2024-11-22 16:32:09.351',1),('59dd0eef-34ef-48fe-8442-5b6e66607802','7c55e91b88c2146eb4377fa2b23c379d93e061381d3d2651fb2045ed88287f0f','2024-11-25 07:55:52.923','20241125055647_update_model_shop_by_occasion',NULL,NULL,'2024-11-25 07:55:52.800',1),('5b8cf826-f0bd-40e3-b478-9f615326bde3','90e288ea87599885a4a512d88aad8f2dd0886a76ff52dcecf6d487dd74c78bee','2024-11-22 16:32:07.823','20241116070644_change_shop_by_occasion_model',NULL,NULL,'2024-11-22 16:32:07.692',1),('6062a8b8-0f4b-4377-bb5f-a539d1c0ad05','372114e7ed0e3837112ae94eda8d00452ed637fcb37a8fa017b0d8ee54e8805d','2024-11-22 16:32:07.328','20241113103620_add_on_delete_on_order_details',NULL,NULL,'2024-11-22 16:32:07.279',1),('64348104-ec64-49a1-92f4-7f47f1107968','e25025b3bf2f095d42fcdc88a7db6e978407a08465b8a28cbbf59350ee12a5a1','2024-11-22 16:32:06.095','20241108084817_add_showcases_model',NULL,NULL,'2024-11-22 16:32:06.070',1),('652a4c96-57ab-4c45-a40b-38c806f63965','b4287e357fb691ca8f7c60d9adcda7e24243ab77f94571d9eeb7f3c6b40b5029','2024-11-22 16:32:09.683','20241122072059_add_subcategories_to_procuts',NULL,NULL,'2024-11-22 16:32:09.635',1),('6811c2bb-4a7a-40fb-b313-721c9f30fc1c','daee0a5fd6fcb7495926bbf55c2e20e73afbeb9e295a017b262d9cd97cc106cd','2024-11-22 16:32:08.909','20241120043836_add_field_in_shop_by_season_model_created_at_updated_at',NULL,NULL,'2024-11-22 16:32:08.585',1),('695fc60b-410d-4406-a3b3-27e3ca241dd8','2484670832727fc28c09c07b04776cc767f9ba57e85c70b94516e514b13c49bd','2024-11-22 16:32:07.434','20241114130008_update_payment_details_model',NULL,NULL,'2024-11-22 16:32:07.389',1),('6c979dee-e18d-45b3-a247-6a4a60ff63ec','d670e79ed3e0f763fed3f24f10454656f4e7580e3c4c7c03d319551c1f3358f7','2024-11-22 16:32:07.582','20241115100915_update_product_review_field_increase_space',NULL,NULL,'2024-11-22 16:32:07.498',1),('6f76863b-4936-4208-aa20-dba21a98986c','bdd7d6c3138ebe4348c3e6db8107b46e90db40a6fb8a9b3ff64964178397bf10','2024-11-22 16:32:07.386','20241113112043_add_order_id_field',NULL,NULL,'2024-11-22 16:32:07.331',1),('73527ade-245b-4a9c-aeb0-c20f126d92f0','08806ddfa6afa424a046cd08dc5d18c5faf4c3a2656957c2cec05e99d399ef4b','2024-11-22 16:32:06.912','20241113042326_remove_shopping_session_model',NULL,NULL,'2024-11-22 16:32:06.829',1),('80be69c0-9500-44e9-8b4e-11f817c7c6a4','b380c40830ebf88da15e22c551c8898a291f3f64672fe25a219e054e6bad3b0c','2024-11-22 16:32:09.633','20241122060213_change_sub_category_unique_to_normal',NULL,NULL,'2024-11-22 16:32:09.610',1),('840ad26f-ecbc-4da3-b098-982736d68e27','7631f1fa565ac627042f1cbb443e73957a0fe6eaeabd51c2dd51faf15db680e8','2024-11-22 16:32:04.874','20241106075651_add_new_field_role',NULL,NULL,'2024-11-22 16:32:04.825',1),('84c8ae3b-1681-4e2b-b533-3225b8e0035c','8d4b8759090625bb058ac82ca54d1cd34997c5ad8535400c79217ab784761a76','2024-11-25 07:55:52.732','20241123100713_add_new_model_blogs_social_links',NULL,NULL,'2024-11-25 07:55:52.678',1),('9cb5652c-a0ae-4264-8741-b1464b1db9ae','dc34db4be02fd3170626e098a62177e59d85d122940cd94732dad63b8ff868e5','2024-11-22 16:32:07.050','20241113091742_add_is_default_field_in_address_model',NULL,NULL,'2024-11-22 16:32:06.940',1),('9cbb91ec-abb2-41d6-a898-1de89773a1ff','8e1c971d87285017a4c3ca400b9bc5f825e32716c007d3bc81032d85293deee4','2024-11-22 16:32:09.082','20241120045150_add_field_in_shop_by_season_model_created_at_updated_at',NULL,NULL,'2024-11-22 16:32:09.034',1),('9d376fbe-8b9c-4058-a391-f9f09b03d793','012aa56841c26ead671a27547141a0faf341f232a7c56f90b0929017975fea66','2024-11-22 16:32:06.068','20241108064917_add_size_color_customertype_model',NULL,NULL,'2024-11-22 16:32:05.776',1),('a0b563a1-6f0b-4665-a831-3a09b269658c','db097726ab0325687088ff86d99d62b47751159e492eabfa52000fb00a723bd8','2024-11-22 16:32:08.454','20241118094718_remove_product_tag_model',NULL,NULL,'2024-11-22 16:32:08.354',1),('a0f24484-44ed-42b7-8d43-da91824357ec','82ef9d1920febf73b5b7fe68266cc7edfa62a7e2b95860bf65ee7a401e34a3b3','2024-11-22 16:32:08.010','20241116093058_add_profile_url_field_on_user_model',NULL,NULL,'2024-11-22 16:32:07.971',1),('a42ade9b-463e-49f7-ad93-335eff960257','36cbfe4ed0c26689d6d8cc722c14bbc2f38adbb9901a4fa571b55d137f271e43','2024-11-22 16:32:09.796','20241122120359_add_new_model',NULL,NULL,'2024-11-22 16:32:09.763',1),('a5b2f997-e12c-4e55-8038-3e361ee43307','9b47974d6bec6be4cccf942f60a35a85c8c9545c16e28c6089d254328bc508a5','2024-11-22 16:32:09.348','20241121101910_update_model_name_to_new_arrivals',NULL,NULL,'2024-11-22 16:32:09.211',1),('a85c7da3-67c3-4f03-bc44-5f0b3df315d6','ebea773af5c81adf7124a1904e28569659e5d0fe51b062eed552de5b5ae43c75','2024-11-23 07:48:10.154','20241123065246_add_new_model_button',NULL,NULL,'2024-11-23 07:48:10.127',1),('a9b0bf99-e7c7-48b3-8488-2b71c013a891','fbb983993b1ff0288997a5b83fe78783438a7e315ceb17659996e0a819aead30','2024-11-22 16:32:09.716','20241122083709_change_field_names_in_discount_model',NULL,NULL,'2024-11-22 16:32:09.685',1),('ab2cb3d8-7a30-4ffa-99a0-3463fdbf734b','26923fa730cf496d190e6d04b8604f15ae723a2bb9fce63280e4e50a61d0c4cb','2024-11-22 16:32:06.174','20241108121133_update_slug_field_make_it_as_unique',NULL,NULL,'2024-11-22 16:32:06.125',1),('b979b14d-cbbc-43ce-be53-8589f15ad577','fcd2b67a6d4618a4fe0e53398404b30a6cf87626f665bfcc06f3485d3adb625e','2024-11-22 16:32:08.475','20241119055205_add_new_fields_to_product_model_min_quantity',NULL,NULL,'2024-11-22 16:32:08.456',1),('c64060cb-cd7a-46a7-a2ad-567e9119a509','ac19b48c3820184f0aee39dcfdfe95600d6503204f6ec2a9b24d3fa26d0f5686','2024-11-25 12:25:27.630','20241125110258_update_model_product_add_on_delete_cascade',NULL,NULL,'2024-11-25 12:25:27.297',1),('cc92fef2-f6b2-4dce-9913-e71ab629a31c','72a72274e650ef43c4bd603349c72702c42ce51402fd6666b5b31d895d8d7258','2024-11-23 09:22:51.348','20241123075659_add_new_model_searchhit_trndinglink_arrivalslink_collectionlink',NULL,NULL,'2024-11-23 09:22:51.278',1),('d9fd3231-fba5-4359-a726-4b07fb2b3d70','8d07ab4420e7976b887ee1327fda03ff20f2a1251e130be8b48e53d22b8bdb94','2024-11-22 16:32:06.938','20241113065457_add_is_default_field_in_address_model',NULL,NULL,'2024-11-22 16:32:06.914',1),('e27d7ffd-38c8-4df3-b98c-2b07f594f087','23537c1278c3f91625075dfc6ec508a598c270c10d4fc8e90543562aaa86060b','2024-11-22 16:32:06.827','20241112111528_add_isactive_field_on_discount',NULL,NULL,'2024-11-22 16:32:06.796',1),('e360e98f-46f3-4024-b84a-d19643d5afdd','48983357ff7076fab92856f9b47b0458877f7c52ccdf57803cf723106cbf78cb','2024-11-22 16:32:09.032','20241120044359_add_field_in_shop_by_season_model_created_at_updated_at',NULL,NULL,'2024-11-22 16:32:08.912',1),('f006c5c1-c7f3-4e30-8bfe-95bc8a7793e5','258fe129634152230245755c17c158686cbce4a0f03d05f0db7992dcfeb3d384','2024-11-22 16:32:07.495','20241115064243_add_new_field_on_user_status',NULL,NULL,'2024-11-22 16:32:07.436',1),('f19a5b5c-2d32-4e54-9409-9ebf73130934','3e5ac55344b4da62079f55313bddd9c92ea336cf31664404ed45effc325ea001','2024-11-22 16:32:09.139','20241121055658_add_field_in_order_details',NULL,NULL,'2024-11-22 16:32:09.085',1),('f1d0665d-8237-40a4-aa4a-6f97237f61ed','527b567f267010add49518b0f6809aeee6b01c39c1b64c2f9f69d4a6369818c5','2024-11-22 16:32:07.689','20241116060623_add_new_model_trending_shopbyoccasshio_exclusive_collection_new_arrival',NULL,NULL,'2024-11-22 16:32:07.584',1);
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

-- Dump completed on 2024-12-06 11:05:10

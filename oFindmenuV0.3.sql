-- MySQL dump 10.13  Distrib 5.7.18, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: oFindmenu
-- ------------------------------------------------------
-- Server version	5.7.18-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `COORDINATES`
--

DROP TABLE IF EXISTS `COORDINATES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `COORDINATES` (
  `coordinatesId` int(11) NOT NULL AUTO_INCREMENT,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  PRIMARY KEY (`coordinatesId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COORDINATES`
--

LOCK TABLES `COORDINATES` WRITE;
/*!40000 ALTER TABLE `COORDINATES` DISABLE KEYS */;
INSERT INTO `COORDINATES` VALUES (1,38.8103,-0.604304),(2,38.8182,-0.605379),(3,38.8188,-0.606853),(4,38.8212,-0.600466),(5,38.8182,-0.605379),(6,38.8188,-0.606853),(7,38.8212,-0.600466);
/*!40000 ALTER TABLE `COORDINATES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FOLLOWING`
--

DROP TABLE IF EXISTS `FOLLOWING`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FOLLOWING` (
  `followUserId` int(11) NOT NULL,
  `followFoodId` int(11) NOT NULL,
  `followSince` date NOT NULL,
  PRIMARY KEY (`followUserId`,`followFoodId`),
  KEY `fk_followFood_id` (`followFoodId`),
  CONSTRAINT `fk_followFood_id` FOREIGN KEY (`followFoodId`) REFERENCES `FOOD` (`foodId`),
  CONSTRAINT `fk_followUser_id` FOREIGN KEY (`followUserId`) REFERENCES `USERS` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FOLLOWING`
--

LOCK TABLES `FOLLOWING` WRITE;
/*!40000 ALTER TABLE `FOLLOWING` DISABLE KEYS */;
INSERT INTO `FOLLOWING` VALUES (102,1,'2017-05-21'),(103,1,'2017-05-21'),(103,3,'2017-05-21'),(103,4,'2017-05-21'),(104,1,'2017-05-21'),(104,2,'2017-05-21'),(104,3,'2017-05-21');
/*!40000 ALTER TABLE `FOLLOWING` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FOOD`
--

DROP TABLE IF EXISTS `FOOD`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FOOD` (
  `foodId` int(11) NOT NULL AUTO_INCREMENT,
  `foodCoordinatesId` int(11) DEFAULT NULL,
  `foodUserId` int(11) NOT NULL,
  `foodAdded` datetime DEFAULT NULL,
  `foodDescription` varchar(80) COLLATE utf8_spanish_ci DEFAULT NULL,
  `foodDrinkIncluded` tinyint(1) DEFAULT '0',
  `foodName` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `foodPrice` float DEFAULT '0',
  `foodPriceVar1` float DEFAULT '0',
  `foodPriceVar2` float DEFAULT '0',
  `foodPrincipalIngredient` varchar(45) COLLATE utf8_spanish_ci DEFAULT 'none',
  `foodPromoted` tinyint(1) DEFAULT '0',
  `foodSecondaryIngredient` varchar(45) COLLATE utf8_spanish_ci DEFAULT 'none',
  `foodVariation1` varchar(45) COLLATE utf8_spanish_ci DEFAULT 'none',
  PRIMARY KEY (`foodId`,`foodUserId`),
  KEY `fk_coordinates_id` (`foodCoordinatesId`),
  KEY `fk_user_id` (`foodUserId`),
  CONSTRAINT `fk_coordinates_id` FOREIGN KEY (`foodCoordinatesId`) REFERENCES `COORDINATES` (`coordinatesId`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`foodUserId`) REFERENCES `USERS` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FOOD`
--

LOCK TABLES `FOOD` WRITE;
/*!40000 ALTER TABLE `FOOD` DISABLE KEYS */;
INSERT INTO `FOOD` VALUES (1,1,99,'2017-05-21 02:49:50','Bocadillo de la casa',0,'Bocadillo',0,0,0,'Bread',0,'none','none'),(2,2,100,'2017-05-21 02:49:50','Pizza de 4 quesos masa fina',0,'Pizza de queso',0,0,0,'pizza',0,'none','none'),(3,3,101,'2017-05-21 02:49:50',' Estupenda mariscada de percebes y necoras ',0,'Mariscada',0,0,0,'seafood',0,'none','none'),(4,3,101,'2017-05-21 02:49:50',' Ración de pulpo a feira ',0,'Ración de pulpo',0,0,0,'osctopus',1,'none','none');
/*!40000 ALTER TABLE `FOOD` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FOODIMAGES`
--

DROP TABLE IF EXISTS `FOODIMAGES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FOODIMAGES` (
  `fooimgFoodId` int(11) NOT NULL,
  `fooimgImageId` int(11) NOT NULL,
  PRIMARY KEY (`fooimgFoodId`,`fooimgImageId`),
  KEY `fk_fooimgImage_id` (`fooimgImageId`),
  CONSTRAINT `fk_fooimgFood_id` FOREIGN KEY (`fooimgFoodId`) REFERENCES `FOOD` (`foodId`),
  CONSTRAINT `fk_fooimgImage_id` FOREIGN KEY (`fooimgImageId`) REFERENCES `IMAGES` (`imageId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FOODIMAGES`
--

LOCK TABLES `FOODIMAGES` WRITE;
/*!40000 ALTER TABLE `FOODIMAGES` DISABLE KEYS */;
INSERT INTO `FOODIMAGES` VALUES (1,300),(2,300),(3,300),(4,300);
/*!40000 ALTER TABLE `FOODIMAGES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `IMAGES`
--

DROP TABLE IF EXISTS `IMAGES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `IMAGES` (
  `imageId` int(11) NOT NULL AUTO_INCREMENT,
  `imageName` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `imagePath` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `imageAdded` date DEFAULT NULL,
  `imageDescription` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`imageId`)
) ENGINE=InnoDB AUTO_INCREMENT=301 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `IMAGES`
--

LOCK TABLES `IMAGES` WRITE;
/*!40000 ALTER TABLE `IMAGES` DISABLE KEYS */;
INSERT INTO `IMAGES` VALUES (300,'default','default-avatar.jpg','2017-05-21','');
INSERT INTO `IMAGES` VALUES (301,'Mariscada','mariscada.jpg','2017-05-21','');
INSERT INTO `IMAGES` VALUES (302,'bocadillo','bocadillo.jpg','2017-05-21','');
INSERT INTO `IMAGES` VALUES (303,'pizza','pizza.jpg','2017-05-21','');
/*!40000 ALTER TABLE `IMAGES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USERS`
--

DROP TABLE IF EXISTS `USERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USERS` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `coordinatesId` int(11) DEFAULT NULL,
  `userFacebookId` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `userTwitterId` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `userGooglePlusId` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `userActive` tinyint(1) DEFAULT '0',
  `userTypeOf` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `userPassword` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `userName` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `userAvatar` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `userEmail` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `userToken` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`userId`),
  KEY `fk_id_coordinates` (`coordinatesId`),
  CONSTRAINT `fk_id_coordinates` FOREIGN KEY (`coordinatesId`) REFERENCES `COORDINATES` (`coordinatesId`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USERS`
--

LOCK TABLES `USERS` WRITE;
/*!40000 ALTER TABLE `USERS` DISABLE KEYS */;
INSERT INTO `USERS` VALUES (99,1,'none','none','none',0,'admin','none','admin','none','oscar.otero.millan@gmail.com','none'),(100,2,'none','none','none',0,'sponsor','none','sponsor','none','sponsormail@gmail.com','none'),(101,3,'none','none','none',0,'offerer','none','offerer','none','offerermail@gmail.com','none'),(102,4,'none','none','none',0,'diner','none','test user','none','osblue05@gmail.com','none'),(103,5,'none','none','none',0,'diner','none','test user 2','none','mail2@gmail.com','none'),(104,6,'none','none','none',0,'diner','none','test user 3','none','mail305@gmail.com','none'),(105,NULL,NULL,NULL,NULL,0,'guest','$2a$10$EDPwKYgIdgApZARsbR9VBeyVl1ZD0WU3QBP3E.6kexANpntAgrOVG','user','','usermail@mail.com',NULL),(106,NULL,NULL,NULL,NULL,0,'guest','$2a$10$qDxmIL4b3WgNpkm/5yACxO65F7XyQfBLydkAqBqFUUhm2Kr2WXmVe','Oscar','','osblue05@gmail.com',NULL),(107,NULL,NULL,NULL,NULL,0,'guest','$2a$10$tvmdkz5WNZ8dy9JpSwFv4OrjWT9IxbjNf7jxq9KBfUv3J.D0q7Gm2','rtyrtyrt','','userhtmail@mail.com',NULL),(108,NULL,NULL,NULL,NULL,0,'guest','$2a$10$M.hYUQYj1G0HTY6PNTseMubizKZfoPb7lOZtKOVwnWFwncuumFX/G','test','','testuser@mail.com',NULL);
/*!40000 ALTER TABLE `USERS` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-31  3:40:27

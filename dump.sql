-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: GutiDB
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Current Database: `GutiDB`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `GutiDB` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `GutiDB`;

--
-- Table structure for table `GGuild`
--

DROP TABLE IF EXISTS `GGuild`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GGuild` (
  `GGuildID` int NOT NULL AUTO_INCREMENT,
  `GGGuildID` varchar(45) NOT NULL,
  `GGName` varchar(100) NOT NULL,
  `GGPrefix` varchar(10) NOT NULL DEFAULT '%',
  `GGStatus` tinyint NOT NULL DEFAULT (1),
  PRIMARY KEY (`GGuildID`),
  UNIQUE KEY `GGGuildID_UNIQUE` (`GGGuildID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GGuild`
--

LOCK TABLES `GGuild` WRITE;
/*!40000 ALTER TABLE `GGuild` DISABLE KEYS */;
INSERT INTO `GGuild` VALUES (5,'426584294874415105','Hachimitsu Academy','!',1),(6,'817097329147379783','Servidor de Luks','!',1),(8,'648016757902147600','DevHootohf','!',1);
/*!40000 ALTER TABLE `GGuild` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GGuildTitle`
--

DROP TABLE IF EXISTS `GGTitle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GGTitle` (
  `GGTitleID` int NOT NULL AUTO_INCREMENT,
  `GGGuildID` varchar(45) NOT NULL,
  `GGTTitle` varchar(45) NOT NULL,
  PRIMARY KEY (`GGTitleID`),
  KEY `GGGuildID` (`GGGuildID`),
  CONSTRAINT `GGTitle_ibfk_1` FOREIGN KEY (`GGGuildID`) REFERENCES `GGuild` (`GGGuildID`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `GGTitleUser`
--

DROP TABLE IF EXISTS `GGTitleUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GGTitleUser` (
  `GGTitleUserID` int NOT NULL AUTO_INCREMENT,
  `GGGuildID` varchar(45) NOT NULL,
  `GGTUUserID` varchar(45) NOT NULL,
  `GGTitleID` int NOT NULL,
  PRIMARY KEY (`GGTitleUserID`),
  UNIQUE KEY `unique_user_title` (`GGGuildID`,`GGTUUserID`,`GGTitleID`),
  KEY `GGTitleID` (`GGTitleID`),
  CONSTRAINT `GGTitleUser_ibfk_1` FOREIGN KEY (`GGGuildID`) REFERENCES `GGuild` (`GGGuildID`),
  CONSTRAINT `GGTitleUser_ibfk_2` FOREIGN KEY (`GGTitleID`) REFERENCES `GGTitle` (`GGTitleID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-09 21:00:41

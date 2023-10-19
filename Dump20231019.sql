-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: localhost    Database: Library_DB
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrator` (
  `aid` int NOT NULL,
  `afname` varchar(16) NOT NULL,
  `amname` varchar(16) DEFAULT NULL,
  `alname` varchar(16) NOT NULL,
  `apassword` varchar(16) NOT NULL,
  PRIMARY KEY (`aid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_fine`
--

DROP TABLE IF EXISTS `book_fine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_fine` (
  `bfid` int NOT NULL,
  `bfreason` varchar(45) NOT NULL,
  `bfoverdue` int NOT NULL,
  `bflost` int NOT NULL,
  `bfdamaged` int NOT NULL,
  `bfownerid` int NOT NULL,
  `bborrow_id` int DEFAULT NULL,
  PRIMARY KEY (`bfid`),
  KEY `bfownerid_idx` (`bfownerid`),
  KEY `bborrow_id_idx` (`bborrow_id`),
  CONSTRAINT `bborrow_id` FOREIGN KEY (`bborrow_id`) REFERENCES `borrow_history` (`hisid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `bfownerid` FOREIGN KEY (`bfownerid`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_fine`
--

LOCK TABLES `book_fine` WRITE;
/*!40000 ALTER TABLE `book_fine` DISABLE KEYS */;
/*!40000 ALTER TABLE `book_fine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `bid` int NOT NULL,
  `btitle` tinytext NOT NULL,
  `isbn` int NOT NULL,
  `author_fname` varchar(45) NOT NULL,
  `author_mname` varchar(45) DEFAULT NULL,
  `author_lname` varchar(45) NOT NULL,
  `genre` varchar(45) NOT NULL,
  PRIMARY KEY (`bid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrow_history`
--

DROP TABLE IF EXISTS `borrow_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `borrow_history` (
  `hisid` int NOT NULL,
  `his_borrower_id` int NOT NULL,
  `bhbook_id` int DEFAULT NULL,
  `bhmedia_id` int DEFAULT NULL,
  `bhdevices_id` int DEFAULT NULL,
  PRIMARY KEY (`hisid`),
  KEY `borrower_id_idx` (`his_borrower_id`),
  KEY `bhbook_id_idx` (`bhbook_id`),
  KEY `bhmedia_id_idx` (`bhmedia_id`),
  KEY `bhdevices_id_idx` (`bhdevices_id`),
  CONSTRAINT `bhbook_id` FOREIGN KEY (`bhbook_id`) REFERENCES `books` (`bid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `bhdevices_id` FOREIGN KEY (`bhdevices_id`) REFERENCES `devices` (`did`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `bhmedia_id` FOREIGN KEY (`bhmedia_id`) REFERENCES `media` (`mid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `borrower_id1` FOREIGN KEY (`his_borrower_id`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrow_history`
--

LOCK TABLES `borrow_history` WRITE;
/*!40000 ALTER TABLE `borrow_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `borrow_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrows`
--

DROP TABLE IF EXISTS `borrows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `borrows` (
  `boid` int NOT NULL,
  `borrower_id` int NOT NULL,
  `bdue_date` date NOT NULL,
  `bitem_id` int NOT NULL,
  `bbook_id` int DEFAULT NULL,
  `bmedia_id` int DEFAULT NULL,
  `bdevices_id` int DEFAULT NULL,
  PRIMARY KEY (`boid`),
  KEY `borrower_id_idx` (`borrower_id`),
  KEY `bbook_id_idx` (`bbook_id`),
  KEY `bmedia_id_idx` (`bmedia_id`),
  KEY `bdevices_id_idx` (`bdevices_id`),
  CONSTRAINT `bbook_id` FOREIGN KEY (`bbook_id`) REFERENCES `books` (`bid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `bdevices_id` FOREIGN KEY (`bdevices_id`) REFERENCES `devices` (`did`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `bmedia_id` FOREIGN KEY (`bmedia_id`) REFERENCES `media` (`mid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `borrower_id` FOREIGN KEY (`borrower_id`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrows`
--

LOCK TABLES `borrows` WRITE;
/*!40000 ALTER TABLE `borrows` DISABLE KEYS */;
/*!40000 ALTER TABLE `borrows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device_fine`
--

DROP TABLE IF EXISTS `device_fine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `device_fine` (
  `fid` int NOT NULL,
  `freason` varchar(45) NOT NULL,
  `dflost` int NOT NULL,
  `dfdamaged` int NOT NULL,
  `dfoverdue` int NOT NULL,
  `dfownerid` int NOT NULL,
  `dborrow_id` int DEFAULT NULL,
  PRIMARY KEY (`fid`),
  KEY `bfownerid_idx` (`dfownerid`),
  KEY `dborrow_id_idx` (`dborrow_id`),
  CONSTRAINT `dborrow_id` FOREIGN KEY (`dborrow_id`) REFERENCES `borrow_history` (`hisid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `dfownerid` FOREIGN KEY (`dfownerid`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_fine`
--

LOCK TABLES `device_fine` WRITE;
/*!40000 ALTER TABLE `device_fine` DISABLE KEYS */;
/*!40000 ALTER TABLE `device_fine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devices` (
  `did` int NOT NULL,
  `dtitle` tinytext NOT NULL,
  `dcategory` varchar(16) NOT NULL,
  PRIMARY KEY (`did`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `holds`
--

DROP TABLE IF EXISTS `holds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `holds` (
  `hid` int NOT NULL,
  `holder_id` int NOT NULL,
  `hdue_date` date NOT NULL,
  PRIMARY KEY (`hid`),
  KEY `borrower_id_idx` (`holder_id`),
  CONSTRAINT `borrower_id0` FOREIGN KEY (`holder_id`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `holds`
--

LOCK TABLES `holds` WRITE;
/*!40000 ALTER TABLE `holds` DISABLE KEYS */;
/*!40000 ALTER TABLE `holds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `mid` int NOT NULL,
  `mtitle` tinytext NOT NULL,
  `mcategory` varchar(16) NOT NULL,
  PRIMARY KEY (`mid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media_fine`
--

DROP TABLE IF EXISTS `media_fine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media_fine` (
  `fid` int NOT NULL,
  `freason` varchar(45) NOT NULL,
  `mflost` int NOT NULL,
  `mfoverdue` int NOT NULL,
  `mfdamaged` int NOT NULL,
  `mfownerid` int NOT NULL,
  `mborrow_id` int DEFAULT NULL,
  PRIMARY KEY (`fid`),
  KEY `mfownerid_idx` (`mfownerid`),
  KEY `mborrow_idx` (`mborrow_id`),
  CONSTRAINT `mborrow` FOREIGN KEY (`mborrow_id`) REFERENCES `borrow_history` (`hisid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `mfownerid` FOREIGN KEY (`mfownerid`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media_fine`
--

LOCK TABLES `media_fine` WRITE;
/*!40000 ALTER TABLE `media_fine` DISABLE KEYS */;
/*!40000 ALTER TABLE `media_fine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `uid` int NOT NULL,
  `fname` varchar(16) NOT NULL,
  `mname` varchar(16) DEFAULT NULL,
  `lname` varchar(16) NOT NULL,
  `password` varchar(16) NOT NULL,
  `is_faculty` tinyint NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-19 12:03:01

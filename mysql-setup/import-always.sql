-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: chickenAirlines
-- ------------------------------------------------------
-- Server version	9.2.0

DROP DATABASE  chickenAirlines;
CREATE DATABASE chickenAirlines CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE chickenAirlines;

SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT;
SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS;
SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION;
SET NAMES utf8mb4;
SET @OLD_TIME_ZONE=@@TIME_ZONE;
SET TIME_ZONE='+00:00';
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS;
SET UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE;
SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO';
SET @OLD_SQL_NOTES=@@SQL_NOTES;
SET SQL_NOTES=0;
--
-- Table structure for table `Airports`
--

DROP TABLE IF EXISTS `Airports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Airports` (
  `airportID` varchar(100) NOT NULL,
  `cityID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `airportLabel` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `code` varchar(100) NOT NULL,
  PRIMARY KEY (`airportID`),
  KEY `Airports_Citys_FK` (`cityID`),
  CONSTRAINT `Airports_Citys_FK` FOREIGN KEY (`cityID`) REFERENCES `Citys` (`cityID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Airports`
--

LOCK TABLES `Airports` WRITE;
/*!40000 ALTER TABLE `Airports` DISABLE KEYS */;
INSERT INTO `Airports` VALUES ('A001','C001','Suvarnabhumi Airport','BKK'),('A002','C002','Narita International','NRT'),('A003','C003','Heathrow Airport','LHR'),('A004','C004','Changi Airport','SIN'),('A005','C005','JFK International','JFK');
/*!40000 ALTER TABLE `Airports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Baggages`
--

DROP TABLE IF EXISTS `Baggages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Baggages` (
  `baggageID` varchar(100) NOT NULL,
  `passengerID` varchar(100) DEFAULT NULL,
  `flightID` varchar(100) DEFAULT NULL,
  `weight` decimal(5,2) NOT NULL,
  `type` enum('carryON','checked') NOT NULL,
  `status` enum('checkedIN','onBoard','lost') NOT NULL,
  PRIMARY KEY (`baggageID`),
  KEY `Baggages_Passengers_FK` (`passengerID`),
  KEY `Baggages_Flights_FK` (`flightID`),
  CONSTRAINT `Baggages_Flights_FK` FOREIGN KEY (`flightID`) REFERENCES `Flights` (`flightID`),
  CONSTRAINT `Baggages_Passengers_FK` FOREIGN KEY (`passengerID`) REFERENCES `Passengers` (`passengerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Baggages`
--

LOCK TABLES `Baggages` WRITE;
/*!40000 ALTER TABLE `Baggages` DISABLE KEYS */;
INSERT INTO `Baggages` VALUES ('BG001','P001','F001',7.50,'carryON','checkedIN'),('BG002','P002','F003',15.00,'checked','onBoard'),('BG003','P005','F002',20.75,'checked','lost'),('BG004','P004','F004',5.00,'carryON','onBoard'),('BG005','P003','F005',18.25,'checked','checkedIN');
/*!40000 ALTER TABLE `Baggages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BookingPassengers`
--

DROP TABLE IF EXISTS `BookingPassengers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BookingPassengers` (
  `bookingPassengerID` varchar(100) NOT NULL,
  `bookingID` varchar(100) NOT NULL,
  `passengerID` varchar(100) NOT NULL,
  `seatNumber` varchar(100) NOT NULL,
  PRIMARY KEY (`bookingPassengerID`),
  KEY `BookingPassengers_Bookings_FK` (`bookingID`),
  KEY `BookingPassengers_Passengers_FK` (`passengerID`),
  CONSTRAINT `BookingPassengers_Bookings_FK` FOREIGN KEY (`bookingID`) REFERENCES `Bookings` (`bookingID`),
  CONSTRAINT `BookingPassengers_Passengers_FK` FOREIGN KEY (`passengerID`) REFERENCES `Passengers` (`passengerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BookingPassengers`
--

LOCK TABLES `BookingPassengers` WRITE;
/*!40000 ALTER TABLE `BookingPassengers` DISABLE KEYS */;
INSERT INTO `BookingPassengers` VALUES ('BP001','B001','P001','12A'),('BP002','B002','P002','14C'),('BP003','B003','P005','1B'),('BP004','B004','P004','16D'),('BP005','B005','P003','2A');
/*!40000 ALTER TABLE `BookingPassengers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Bookings`
--

DROP TABLE IF EXISTS `Bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Bookings` (
  `bookingID` varchar(100) NOT NULL,
  `userID` varchar(100) NOT NULL,
  `flightID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `bookingDate` datetime NOT NULL,
  `bookingStatus` enum('confirmed','pending','canceled') NOT NULL,
  PRIMARY KEY (`bookingID`),
  KEY `Bookings_Users_FK` (`userID`),
  KEY `Bookings_Flights_FK` (`flightID`),
  CONSTRAINT `Bookings_Flights_FK` FOREIGN KEY (`flightID`) REFERENCES `Flights` (`flightID`),
  CONSTRAINT `Bookings_Users_FK` FOREIGN KEY (`userID`) REFERENCES `Users` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bookings`
--

LOCK TABLES `Bookings` WRITE;
/*!40000 ALTER TABLE `Bookings` DISABLE KEYS */;
INSERT INTO `Bookings` VALUES ('B001','U001','F001','2025-04-10 12:00:00','confirmed'),('B002','U003','F003','2025-04-12 14:30:00','pending'),('B003','U005','F002','2025-04-15 10:00:00','canceled'),('B004','U004','F004','2025-04-16 09:15:00','confirmed'),('B005','U002','F005','2025-04-17 08:45:00','confirmed');
/*!40000 ALTER TABLE `Bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Citys`
--

DROP TABLE IF EXISTS `Citys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Citys` (
  `cityID` varchar(100) NOT NULL,
  `cityName` varchar(100) NOT NULL,
  PRIMARY KEY (`cityID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Citys`
--

LOCK TABLES `Citys` WRITE;
/*!40000 ALTER TABLE `Citys` DISABLE KEYS */;
INSERT INTO `Citys` VALUES ('C001','Bangkok'),('C002','Tokyo'),('C003','London'),('C004','Singapore'),('C005','New York');
/*!40000 ALTER TABLE `Citys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FlightSchedules`
--

DROP TABLE IF EXISTS `FlightSchedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FlightSchedules` (
  `scheduleID` varchar(100) NOT NULL,
  `flightID` varchar(100) NOT NULL,
  `scheduleDate` datetime DEFAULT NULL,
  PRIMARY KEY (`scheduleID`),
  KEY `FlightSchedules_Flights_FK` (`flightID`),
  CONSTRAINT `FlightSchedules_Flights_FK` FOREIGN KEY (`flightID`) REFERENCES `Flights` (`flightID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FlightSchedules`
--

LOCK TABLES `FlightSchedules` WRITE;
/*!40000 ALTER TABLE `FlightSchedules` DISABLE KEYS */;
INSERT INTO `FlightSchedules` VALUES ('S001','F001','2025-05-01 00:00:00'),('S002','F002','2025-05-02 00:00:00'),('S003','F003','2025-05-03 00:00:00'),('S004','F004','2025-05-04 00:00:00'),('S005','F005','2025-05-05 00:00:00');
/*!40000 ALTER TABLE `FlightSchedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Flights`
--

DROP TABLE IF EXISTS `Flights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Flights` (
  `flightID` varchar(100) NOT NULL,
  `label` varchar(100) NOT NULL,
  `source` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `destination` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `departTime` datetime DEFAULT NULL,
  `arrivalTime` datetime DEFAULT NULL,
  `availableSeats` int NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `seat` enum('businessClass','economyClass','premiumClass','firstClass') NOT NULL,
  PRIMARY KEY (`flightID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Flights`
--

LOCK TABLES `Flights` WRITE;
/*!40000 ALTER TABLE `Flights` DISABLE KEYS */;
INSERT INTO `Flights` VALUES ('F001','TG101','A001','A002','2025-05-01 08:00:00','2025-05-01 16:00:00',120,300,'economyClass'),('F002','SQ202','A004','A003','2025-05-02 10:30:00','2025-05-02 18:30:00',90,450,'businessClass'),('F003','JL303','A002','A005','2025-05-03 12:00:00','2025-05-03 20:00:00',80,550,'premiumClass'),('F004','BA404','A003','A001','2025-05-04 07:15:00','2025-05-04 14:30:00',70,400,'economyClass'),('F005','UA505','A005','A004','2025-05-05 15:00:00','2025-05-06 00:30:00',60,600,'firstClass');
/*!40000 ALTER TABLE `Flights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Gates`
--

DROP TABLE IF EXISTS `Gates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Gates` (
  `gateID` varchar(100) NOT NULL,
  `terminalID` varchar(100) NOT NULL,
  `gateName` varchar(100) NOT NULL,
  PRIMARY KEY (`gateID`),
  KEY `Gates_Terminals_FK` (`terminalID`),
  CONSTRAINT `Gates_Terminals_FK` FOREIGN KEY (`terminalID`) REFERENCES `Terminals` (`terminalID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Gates`
--

LOCK TABLES `Gates` WRITE;
/*!40000 ALTER TABLE `Gates` DISABLE KEYS */;
INSERT INTO `Gates` VALUES ('G001','T001','Gate A1'),('G002','T002','Gate B2'),('G003','T003','Gate C3'),('G004','T004','Gate D4'),('G005','T005','Gate E5');
/*!40000 ALTER TABLE `Gates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Passengers`
--

DROP TABLE IF EXISTS `Passengers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Passengers` (
  `passengerID` varchar(100) NOT NULL,
  `passengerFirstname` varchar(50) NOT NULL,
  `passengerLastname` varchar(50) NOT NULL,
  `sex` enum('male','female') NOT NULL,
  `birthDate` date DEFAULT NULL,
  `nationality` varchar(100) NOT NULL,
  `phoneNumber` varchar(10) NOT NULL,
  PRIMARY KEY (`passengerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Passengers`
--

LOCK TABLES `Passengers` WRITE;
/*!40000 ALTER TABLE `Passengers` DISABLE KEYS */;
INSERT INTO `Passengers` VALUES ('P001','John','Doe','male','1990-05-20','American','123456789'),('P002','Jane','Doe','female','1995-07-15','American','987654321'),('P003','Alice','Smith','female','1988-03-10','British','555123456'),('P004','Caral','Linema','female','1990-05-19','Thailand','0656115234'),('P005','John','Doe','male','1990-05-12','USA','0123456789'),('P006','Jane','Smith','female','1985-09-20','UK','1122334455'),('P007','Hiroshi','Tanaka','male','1992-07-18','Japan','0022446688'),('P008','Maria','Garcia','female','1994-03-05','Spain','1133557799'),('P009','Alice','Wong','female','1988-11-30','Singapore','9876543210');
/*!40000 ALTER TABLE `Passengers` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `before_insert_passengers` BEFORE INSERT ON `Passengers` FOR EACH ROW BEGIN
  -- คำนวณ max_user_id โดยการใช้ SELECT
  SET NEW.passengerID = IFNULL(
    (SELECT CONCAT('P', LPAD(MAX(CAST(SUBSTRING(passengerID, 2) AS UNSIGNED)) + 1, 3, '0'))
     FROM Passengers),
    'P001'
  );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `passengerTrigger` BEFORE INSERT ON `Passengers` FOR EACH ROW BEGIN
  -- คำนวณ max_user_id โดยการใช้ SELECT
  SET NEW.passengerID = IFNULL(
    (SELECT CONCAT('P', LPAD(MAX(CAST(SUBSTRING(passengerID, 2) AS UNSIGNED)) + 1, 3, '0'))
     FROM Passengers),
    'P001'
  );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Payments`
--

DROP TABLE IF EXISTS `Payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payments` (
  `paymentID` varchar(100) NOT NULL,
  `bookingID` varchar(100) NOT NULL,
  `paymentDate` datetime DEFAULT NULL,
  `amount` decimal(10,0) DEFAULT NULL,
  `paymentMethod` enum('bank','creditCard','transfer') DEFAULT NULL,
  `paymentStatus` enum('paid','pending','failed') DEFAULT NULL,
  PRIMARY KEY (`paymentID`),
  KEY `Payments_Bookings_FK` (`bookingID`),
  CONSTRAINT `Payments_Bookings_FK` FOREIGN KEY (`bookingID`) REFERENCES `Bookings` (`bookingID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payments`
--

LOCK TABLES `Payments` WRITE;
/*!40000 ALTER TABLE `Payments` DISABLE KEYS */;
INSERT INTO `Payments` VALUES ('PM001','B001','2025-04-10 13:00:00',300,'creditCard','paid'),('PM002','B002','2025-04-12 15:00:00',550,'bank','pending'),('PM003','B003','2025-04-15 11:00:00',450,'transfer','failed'),('PM004','B004','2025-04-16 10:00:00',400,'creditCard','paid'),('PM005','B005','2025-04-17 09:30:00',600,'transfer','paid');
/*!40000 ALTER TABLE `Payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Terminals`
--

DROP TABLE IF EXISTS `Terminals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Terminals` (
  `terminalID` varchar(100) NOT NULL,
  `airportID` varchar(100) NOT NULL,
  `terminalName` varchar(100) NOT NULL,
  PRIMARY KEY (`terminalID`),
  KEY `Terminals_Airports_FK` (`airportID`),
  CONSTRAINT `Terminals_Airports_FK` FOREIGN KEY (`airportID`) REFERENCES `Airports` (`airportID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Terminals`
--

LOCK TABLES `Terminals` WRITE;
/*!40000 ALTER TABLE `Terminals` DISABLE KEYS */;
INSERT INTO `Terminals` VALUES ('T001','A001','Terminal 1'),('T002','A002','Terminal 2'),('T003','A003','Terminal A'),('T004','A004','Terminal B'),('T005','A005','Terminal C');
/*!40000 ALTER TABLE `Terminals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tickets`
--

DROP TABLE IF EXISTS `Tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Tickets` (
  `ticketID` varchar(100) NOT NULL,
  `bookingID` varchar(100) NOT NULL,
  `passengerID` varchar(100) NOT NULL,
  `flightID` varchar(100) NOT NULL,
  `ticketStatus` enum('valid','used','canceled') NOT NULL,
  PRIMARY KEY (`ticketID`),
  KEY `Tickets_Bookings_FK` (`bookingID`),
  KEY `Tickets_Flights_FK` (`flightID`),
  KEY `Tickets_Passengers_FK` (`passengerID`),
  CONSTRAINT `Tickets_Bookings_FK` FOREIGN KEY (`bookingID`) REFERENCES `Bookings` (`bookingID`),
  CONSTRAINT `Tickets_Flights_FK` FOREIGN KEY (`flightID`) REFERENCES `Flights` (`flightID`),
  CONSTRAINT `Tickets_Passengers_FK` FOREIGN KEY (`passengerID`) REFERENCES `Passengers` (`passengerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tickets`
--

LOCK TABLES `Tickets` WRITE;
/*!40000 ALTER TABLE `Tickets` DISABLE KEYS */;
INSERT INTO `Tickets` VALUES ('T001','B001','P001','F001','valid'),('T002','B002','P002','F003','valid'),('T003','B003','P005','F002','canceled'),('T004','B004','P004','F004','used'),('T005','B005','P003','F005','valid');
/*!40000 ALTER TABLE `Tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserPassengers`
--

DROP TABLE IF EXISTS `UserPassengers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserPassengers` (
  `userPassengerID` varchar(100) NOT NULL,
  `userID` varchar(100) NOT NULL,
  `passengerID` varchar(100) NOT NULL,
  PRIMARY KEY (`userPassengerID`),
  KEY `UserPassengers_Users_FK` (`userID`),
  KEY `UserPassengers_Passengers_FK` (`passengerID`),
  CONSTRAINT `UserPassengers_Passengers_FK` FOREIGN KEY (`passengerID`) REFERENCES `Passengers` (`passengerID`),
  CONSTRAINT `UserPassengers_Users_FK` FOREIGN KEY (`userID`) REFERENCES `Users` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserPassengers`
--

LOCK TABLES `UserPassengers` WRITE;
/*!40000 ALTER TABLE `UserPassengers` DISABLE KEYS */;
INSERT INTO `UserPassengers` VALUES ('UP001','U001','P001'),('UP002','U003','P002'),('UP003','U005','P005'),('UP004','U004','P004'),('UP005','U002','P003');
/*!40000 ALTER TABLE `UserPassengers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `userID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('superAdmin','admin','person') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'person',
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES ('U001','john_doe','123456','john@example.com','person'),('U002','admin01','adminpass','admin@airline.com','admin'),('U003','jane_smith','pass789','jane.smith@gmail.com','person'),('U004','superman','krypton','super@admin.com','superAdmin'),('U005','alice','wonder123','alice@mail.com','person');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `before_insert_users` BEFORE INSERT ON `Users` FOR EACH ROW BEGIN
  -- คำนวณ max_user_id โดยการใช้ SELECT
  SET NEW.userID = IFNULL(
    (SELECT CONCAT('U', LPAD(MAX(CAST(SUBSTRING(userID, 2) AS UNSIGNED)) + 1, 3, '0'))
     FROM Users),
    'U001'
  );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `userTrigger` BEFORE INSERT ON `Users` FOR EACH ROW BEGIN
  -- คำนวณ max_user_id โดยการใช้ SELECT
  SET NEW.userID = IFNULL(
    (SELECT CONCAT('U', LPAD(MAX(CAST(SUBSTRING(userID, 2) AS UNSIGNED)) + 1, 3, '0'))
     FROM Users),
    'U001'
  );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping routines for database 'chickenAirlines'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-16 20:34:18

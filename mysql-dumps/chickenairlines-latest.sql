-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: chickenAirlines
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Current Database: `chickenAirlines`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `chickenAirlines` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `chickenAirlines`;

--
-- Dumping data for table `Airports`
--

/*!40000 ALTER TABLE `Airports` DISABLE KEYS */;
INSERT INTO `Airports` VALUES ('A001','C001','Suvarnabhumi Airport','BKK'),('A002','C002','Narita International','NRT'),('A003','C003','Heathrow Airport','LHR'),('A004','C004','Changi Airport','SIN'),('A005','C005','JFK International','JFK');
/*!40000 ALTER TABLE `Airports` ENABLE KEYS */;

--
-- Dumping data for table `Baggages`
--

/*!40000 ALTER TABLE `Baggages` DISABLE KEYS */;
INSERT INTO `Baggages` VALUES ('BG001','P001','F001',7.50,'carryON','checkedIN'),('BG002','P002','F003',15.00,'checked','onBoard'),('BG003','P005','F002',20.75,'checked','lost'),('BG004','P004','F004',5.00,'carryON','onBoard'),('BG005','P003','F005',18.25,'checked','checkedIN');
/*!40000 ALTER TABLE `Baggages` ENABLE KEYS */;

--
-- Dumping data for table `BookingPassengers`
--

/*!40000 ALTER TABLE `BookingPassengers` DISABLE KEYS */;
INSERT INTO `BookingPassengers` VALUES ('BP001','B001','P001','12A'),('BP002','B002','P002','14C'),('BP003','B003','P005','1B'),('BP004','B004','P004','16D'),('BP005','B005','P003','2A');
/*!40000 ALTER TABLE `BookingPassengers` ENABLE KEYS */;

--
-- Dumping data for table `Bookings`
--

/*!40000 ALTER TABLE `Bookings` DISABLE KEYS */;
INSERT INTO `Bookings` VALUES ('B001','U001','F001','2025-04-10 12:00:00','confirmed'),('B002','U003','F003','2025-04-12 14:30:00','pending'),('B003','U005','F002','2025-04-15 10:00:00','canceled'),('B004','U004','F004','2025-04-16 09:15:00','confirmed'),('B005','U002','F005','2025-04-17 08:45:00','confirmed');
/*!40000 ALTER TABLE `Bookings` ENABLE KEYS */;

--
-- Dumping data for table `Citys`
--

/*!40000 ALTER TABLE `Citys` DISABLE KEYS */;
INSERT INTO `Citys` VALUES ('C001','Bangkok'),('C002','Tokyo'),('C003','London'),('C004','Singapore'),('C005','New York');
/*!40000 ALTER TABLE `Citys` ENABLE KEYS */;

--
-- Dumping data for table `FlightSchedules`
--

/*!40000 ALTER TABLE `FlightSchedules` DISABLE KEYS */;
INSERT INTO `FlightSchedules` VALUES ('S001','F001','2025-05-01 00:00:00'),('S002','F002','2025-05-02 00:00:00'),('S003','F003','2025-05-03 00:00:00'),('S004','F004','2025-05-04 00:00:00'),('S005','F005','2025-05-05 00:00:00');
/*!40000 ALTER TABLE `FlightSchedules` ENABLE KEYS */;

--
-- Dumping data for table `Flights`
--

/*!40000 ALTER TABLE `Flights` DISABLE KEYS */;
INSERT INTO `Flights` VALUES ('F001','TG101','A001','A002','2025-05-01 08:00:00','2025-05-01 16:00:00',120,300,'economyClass'),('F002','SQ202','A004','A003','2025-05-02 10:30:00','2025-05-02 18:30:00',90,450,'businessClass'),('F003','JL303','A002','A005','2025-05-03 12:00:00','2025-05-03 20:00:00',80,550,'premiumClass'),('F004','BA404','A003','A001','2025-05-04 07:15:00','2025-05-04 14:30:00',70,400,'economyClass'),('F005','UA505','A005','A004','2025-05-05 15:00:00','2025-05-06 00:30:00',60,600,'firstClass');
/*!40000 ALTER TABLE `Flights` ENABLE KEYS */;

--
-- Dumping data for table `Gates`
--

/*!40000 ALTER TABLE `Gates` DISABLE KEYS */;
INSERT INTO `Gates` VALUES ('G001','T001','Gate A1'),('G002','T002','Gate B2'),('G003','T003','Gate C3'),('G004','T004','Gate D4'),('G005','T005','Gate E5');
/*!40000 ALTER TABLE `Gates` ENABLE KEYS */;

--
-- Dumping data for table `Passengers`
--

/*!40000 ALTER TABLE `Passengers` DISABLE KEYS */;
INSERT INTO `Passengers` VALUES ('P001','John','Doe','male','1990-05-20','American','123456789'),('P002','Jane','Doe','female','1995-07-15','American','987654321'),('P003','Alice','Smith','female','1988-03-10','British','555123456'),('P004','Caral','Linema','female','1990-05-19','Thailand','0656115234'),('P005','John','Doe','male','1990-05-12','USA','0123456789'),('P006','Jane','Smith','female','1985-09-20','UK','1122334455'),('P007','Hiroshi','Tanaka','male','1992-07-18','Japan','0022446688'),('P008','Maria','Garcia','female','1994-03-05','Spain','1133557799'),('P009','Alice','Wong','female','1988-11-30','Singapore','9876543210');
/*!40000 ALTER TABLE `Passengers` ENABLE KEYS */;

--
-- Dumping data for table `Payments`
--

/*!40000 ALTER TABLE `Payments` DISABLE KEYS */;
INSERT INTO `Payments` VALUES ('PM001','B001','2025-04-10 13:00:00',300,'creditCard','paid'),('PM002','B002','2025-04-12 15:00:00',550,'bank','pending'),('PM003','B003','2025-04-15 11:00:00',450,'transfer','failed'),('PM004','B004','2025-04-16 10:00:00',400,'creditCard','paid'),('PM005','B005','2025-04-17 09:30:00',600,'transfer','paid');
/*!40000 ALTER TABLE `Payments` ENABLE KEYS */;

--
-- Dumping data for table `Terminals`
--

/*!40000 ALTER TABLE `Terminals` DISABLE KEYS */;
INSERT INTO `Terminals` VALUES ('T001','A001','Terminal 1'),('T002','A002','Terminal 2'),('T003','A003','Terminal A'),('T004','A004','Terminal B'),('T005','A005','Terminal C');
/*!40000 ALTER TABLE `Terminals` ENABLE KEYS */;

--
-- Dumping data for table `Tickets`
--

/*!40000 ALTER TABLE `Tickets` DISABLE KEYS */;
INSERT INTO `Tickets` VALUES ('T001','B001','P001','F001','valid'),('T002','B002','P002','F003','valid'),('T003','B003','P005','F002','canceled'),('T004','B004','P004','F004','used'),('T005','B005','P003','F005','valid');
/*!40000 ALTER TABLE `Tickets` ENABLE KEYS */;

--
-- Dumping data for table `UserPassengers`
--

/*!40000 ALTER TABLE `UserPassengers` DISABLE KEYS */;
INSERT INTO `UserPassengers` VALUES ('UP001','U001','P001'),('UP002','U003','P002'),('UP003','U005','P005'),('UP004','U004','P004'),('UP005','U002','P003');
/*!40000 ALTER TABLE `UserPassengers` ENABLE KEYS */;

--
-- Dumping data for table `Users`
--

/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES ('U001','john_doe','123456','john@example.com','person'),('U002','admin01','adminpass','admin@airline.com','admin'),('U003','jane_smith','pass789','jane.smith@gmail.com','person'),('U004','superman','krypton','super@admin.com','superAdmin'),('U005','alice','wonder123','alice@mail.com','person'),('U006','mike_jones','mike123','mike.jones@example.com','person'),('U007','sara_kelly','sara789','sara.kelly@mail.com','admin'),('U008','kevin_brown','kevinpass','kevin.brown@domain.com','superAdmin');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-17 13:19:11

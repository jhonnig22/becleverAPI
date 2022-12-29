-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-12-2022 a las 03:44:52
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `becleverapi`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `businesslocations`
--

CREATE TABLE `businesslocations` (
  `id_businessLocation` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `businesslocations`
--

INSERT INTO `businesslocations` (`id_businessLocation`, `name`, `active`) VALUES
(1, 'Argentina', 1),
(2, 'Brasil', 1),
(3, 'España', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `employees`
--

CREATE TABLE `employees` (
  `id_employee` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `id_genero` int(11) DEFAULT NULL,
  `id_businessLocation` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `employees`
--

INSERT INTO `employees` (`id_employee`, `name`, `surname`, `id_genero`, `id_businessLocation`) VALUES
(1, 'Pedro', 'Peralta', 1, 1),
(2, 'Josefa', 'Paredes', 2, 1),
(3, 'Nahuel', 'sierra', 1, 1),
(4, 'Josefa', 'tello', 2, 1),
(5, 'Emanuel', 'Trujillo', 1, 3),
(6, 'Lucia', 'Gonzales', 2, 3),
(7, 'Jose', 'perez', 1, 3),
(8, 'Maria', 'Cabrera', 2, 3),
(9, 'Lucas', 'Quiroga', 1, 2),
(10, 'Anto', 'Gonzales', 2, 2),
(11, 'Hernesto', 'perez', 1, 2),
(12, 'Maria', 'Torres', 2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `generos`
--

CREATE TABLE `generos` (
  `id_genero` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `generos`
--

INSERT INTO `generos` (`id_genero`, `name`) VALUES
(1, 'Masculino'),
(2, 'Femenino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registers`
--

CREATE TABLE `registers` (
  `id_register` int(11) NOT NULL,
  `id_employee` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `id_register_type` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `registers`
--

INSERT INTO `registers` (`id_register`, `id_employee`, `date`, `id_register_type`) VALUES
(14, 1, '1993-12-02', 1),
(15, 2, '2022-12-28', 1),
(16, 2, '1993-12-02', 1),
(17, 3, '1993-12-02', 1),
(18, 3, '1993-12-02', 2),
(19, 1, '1993-12-02', 2),
(20, 2, '1993-12-02', 2),
(21, 2, '1993-12-02', 2),
(22, 3, '1993-12-02', 1),
(23, 4, '1993-12-02', 1),
(24, 3, '1993-12-02', 2),
(25, 4, '1993-12-02', 2),
(26, 5, '1993-12-02', 2),
(27, 5, '1993-12-02', 1),
(28, 6, '1993-12-02', 1),
(29, 7, '1993-12-02', 1),
(30, 8, '1993-12-02', 1),
(31, 9, '1993-12-02', 1),
(32, 1, '1993-12-03', 2),
(33, 2, '1993-12-02', 1),
(34, 2, '1993-12-02', 2),
(35, 2, '1993-12-02', 1),
(36, 2, '1993-12-02', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registertypes`
--

CREATE TABLE `registertypes` (
  `id_register_type` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `registertypes`
--

INSERT INTO `registertypes` (`id_register_type`, `name`) VALUES
(1, 'Ingreso'),
(2, 'Egreso');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `businesslocations`
--
ALTER TABLE `businesslocations`
  ADD PRIMARY KEY (`id_businessLocation`);

--
-- Indices de la tabla `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id_employee`),
  ADD KEY `id_genero` (`id_genero`),
  ADD KEY `id_businessLocation` (`id_businessLocation`);

--
-- Indices de la tabla `generos`
--
ALTER TABLE `generos`
  ADD PRIMARY KEY (`id_genero`);

--
-- Indices de la tabla `registers`
--
ALTER TABLE `registers`
  ADD PRIMARY KEY (`id_register`),
  ADD KEY `id_employee` (`id_employee`),
  ADD KEY `id_register_type` (`id_register_type`);

--
-- Indices de la tabla `registertypes`
--
ALTER TABLE `registertypes`
  ADD PRIMARY KEY (`id_register_type`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `businesslocations`
--
ALTER TABLE `businesslocations`
  MODIFY `id_businessLocation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `employees`
--
ALTER TABLE `employees`
  MODIFY `id_employee` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `generos`
--
ALTER TABLE `generos`
  MODIFY `id_genero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `registers`
--
ALTER TABLE `registers`
  MODIFY `id_register` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `registertypes`
--
ALTER TABLE `registertypes`
  MODIFY `id_register_type` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`id_genero`) REFERENCES `generos` (`id_genero`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employees_ibfk_2` FOREIGN KEY (`id_businessLocation`) REFERENCES `businesslocations` (`id_businessLocation`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `registers`
--
ALTER TABLE `registers`
  ADD CONSTRAINT `registers_ibfk_1` FOREIGN KEY (`id_employee`) REFERENCES `employees` (`id_employee`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `registers_ibfk_2` FOREIGN KEY (`id_register_type`) REFERENCES `registertypes` (`id_register_type`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

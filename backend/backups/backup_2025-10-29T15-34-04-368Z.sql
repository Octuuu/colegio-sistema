-- Backup de la base de datos escuela - 29/10/2025, 12:34:04 p. m.

CREATE TABLE `alumno_tutor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alumno_id` int(11) NOT NULL,
  `tutor_id` int(11) NOT NULL,
  `relacion` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `alumno_id` (`alumno_id`),
  KEY `tutor_id` (`tutor_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

INSERT INTO `alumno_tutor` (`id`, `alumno_id`, `tutor_id`, `relacion`) VALUES ('1', '1', '1', NULL);

CREATE TABLE `alumnos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `cedula` varchar(20) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cedula` (`cedula`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

INSERT INTO `alumnos` (`id`, `nombre`, `apellido`, `cedula`, `fecha_nacimiento`, `telefono`, `direccion`, `email`, `created_at`, `updated_at`) VALUES ('1', 'Octavrwerwdadasdsdasdasfsdfasdsdasdasdfddasdsfsd', 'Lugoodasd', '5283809dasd', 'Mon Sep 15 2025 00:00:00 GMT-0300 (GMT-03:00)', '0984974767', 'c capitan alfonso', 'octald12345@gmail.com', 'Tue Sep 16 2025 11:54:41 GMT-0300 (GMT-03:00)', 'Mon Sep 22 2025 12:54:52 GMT-0300 (GMT-03:00)');
INSERT INTO `alumnos` (`id`, `nombre`, `apellido`, `cedula`, `fecha_nacimiento`, `telefono`, `direccion`, `email`, `created_at`, `updated_at`) VALUES ('3', 'Octavio', 'Lugo', '5283801', 'Mon Sep 15 2025 00:00:00 GMT-0300 (GMT-03:00)', '0984974767', 'c capitan alfonso', 'octald1245@gmail.com', 'Tue Sep 16 2025 11:56:47 GMT-0300 (GMT-03:00)', 'Tue Sep 16 2025 11:56:47 GMT-0300 (GMT-03:00)');
INSERT INTO `alumnos` (`id`, `nombre`, `apellido`, `cedula`, `fecha_nacimiento`, `telefono`, `direccion`, `email`, `created_at`, `updated_at`) VALUES ('5', 'Octavio', 'Lugo', '6083801', 'Mon Sep 15 2025 00:00:00 GMT-0300 (GMT-03:00)', '0984974767', 'c capitan alfonso', 'octald45@gmail.com', 'Tue Sep 16 2025 11:58:07 GMT-0300 (GMT-03:00)', 'Tue Sep 16 2025 11:58:07 GMT-0300 (GMT-03:00)');
INSERT INTO `alumnos` (`id`, `nombre`, `apellido`, `cedula`, `fecha_nacimiento`, `telefono`, `direccion`, `email`, `created_at`, `updated_at`) VALUES ('7', 'OSVLDO', 'LUGO', '528380hj', 'Thu Sep 11 2025 00:00:00 GMT-0300 (GMT-03:00)', '0984974767', 'San Ignacio', 'bichito123@gmail.com', 'Fri Sep 19 2025 10:04:49 GMT-0300 (GMT-03:00)', 'Fri Sep 19 2025 10:04:49 GMT-0300 (GMT-03:00)');
INSERT INTO `alumnos` (`id`, `nombre`, `apellido`, `cedula`, `fecha_nacimiento`, `telefono`, `direccion`, `email`, `created_at`, `updated_at`) VALUES ('8', 'dasda', 'dasd', 'dasd', 'Wed Sep 03 2025 00:00:00 GMT-0300 (GMT-03:00)', 'dasdas', 'asdasd', 'octald12dasd345@gmail.com', 'Fri Sep 19 2025 10:16:33 GMT-0300 (GMT-03:00)', 'Fri Sep 19 2025 10:16:33 GMT-0300 (GMT-03:00)');
INSERT INTO `alumnos` (`id`, `nombre`, `apellido`, `cedula`, `fecha_nacimiento`, `telefono`, `direccion`, `email`, `created_at`, `updated_at`) VALUES ('10', 'hjggj', 'kjhgk', '5522464848hjbv', 'Wed Sep 03 2025 00:00:00 GMT-0300 (GMT-03:00)', '0984974767', 'c capitan alfonso', 'bichito123hjhf@gmail.com', 'Fri Sep 19 2025 10:48:38 GMT-0300 (GMT-03:00)', 'Fri Sep 19 2025 10:48:38 GMT-0300 (GMT-03:00)');
INSERT INTO `alumnos` (`id`, `nombre`, `apellido`, `cedula`, `fecha_nacimiento`, `telefono`, `direccion`, `email`, `created_at`, `updated_at`) VALUES ('11', 'hvhgfhgfhg', 'Lugo', '65444564gh', 'Thu Sep 04 2025 00:00:00 GMT-0300 (GMT-03:00)', '0984974767', 'c capitan alfonso', 'bichito123@gmail.comhjgh', 'Fri Sep 19 2025 10:49:21 GMT-0300 (GMT-03:00)', 'Fri Sep 19 2025 10:49:21 GMT-0300 (GMT-03:00)');
INSERT INTO `alumnos` (`id`, `nombre`, `apellido`, `cedula`, `fecha_nacimiento`, `telefono`, `direccion`, `email`, `created_at`, `updated_at`) VALUES ('15', 'hjghfh', 'gvghch', 'hjghjhgj', 'Tue Sep 02 2025 00:00:00 GMT-0300 (GMT-03:00)', 'yyfyuuy', 'hfftft', 'adghddrttdrmin@ejemplo.com', 'Fri Sep 19 2025 10:53:56 GMT-0300 (GMT-03:00)', 'Fri Sep 19 2025 10:53:56 GMT-0300 (GMT-03:00)');
INSERT INTO `alumnos` (`id`, `nombre`, `apellido`, `cedula`, `fecha_nacimiento`, `telefono`, `direccion`, `email`, `created_at`, `updated_at`) VALUES ('17', 'sdfsd', 'Lugo', 'fsdfsa', 'Tue Sep 02 2025 00:00:00 GMT-0300 (GMT-03:00)', '0984974767', 'c capitan alfonso', 'admdasdasdin@ejemplo.com', 'Fri Sep 19 2025 10:59:01 GMT-0300 (GMT-03:00)', 'Fri Sep 19 2025 10:59:01 GMT-0300 (GMT-03:00)');
INSERT INTO `alumnos` (`id`, `nombre`, `apellido`, `cedula`, `fecha_nacimiento`, `telefono`, `direccion`, `email`, `created_at`, `updated_at`) VALUES ('18', 'fsdf', 'fsd', 'fsdf', 'Tue Sep 02 2025 00:00:00 GMT-0300 (GMT-03:00)', 'fdsf', 'c capitan alfonso', 'adminfsdfs@ejemplo.com', 'Fri Sep 19 2025 11:14:53 GMT-0300 (GMT-03:00)', 'Fri Sep 19 2025 11:14:53 GMT-0300 (GMT-03:00)');
INSERT INTO `alumnos` (`id`, `nombre`, `apellido`, `cedula`, `fecha_nacimiento`, `telefono`, `direccion`, `email`, `created_at`, `updated_at`) VALUES ('19', 'Octavio', 'Lugo', 'yjggygyyg', 'Tue Sep 02 2025 00:00:00 GMT-0300 (GMT-03:00)', '0984974767', 'c capitan alfonso', 'admhhjvhhin@ejemplo.com', 'Fri Sep 19 2025 11:24:19 GMT-0300 (GMT-03:00)', 'Fri Sep 19 2025 11:24:19 GMT-0300 (GMT-03:00)');

CREATE TABLE `asistencias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alumno_id` int(11) NOT NULL,
  `materia_id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `presente` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `alumno_id` (`alumno_id`),
  KEY `materia_id` (`materia_id`),
  CONSTRAINT `asistencias_ibfk_1` FOREIGN KEY (`alumno_id`) REFERENCES `alumnos` (`id`),
  CONSTRAINT `asistencias_ibfk_2` FOREIGN KEY (`materia_id`) REFERENCES `materias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

INSERT INTO `asistencias` (`id`, `alumno_id`, `materia_id`, `fecha`, `presente`) VALUES ('17', '3', '2', 'Wed Sep 03 2025 00:00:00 GMT-0300 (GMT-03:00)', '1');
INSERT INTO `asistencias` (`id`, `alumno_id`, `materia_id`, `fecha`, `presente`) VALUES ('18', '4', '2', 'Wed Sep 03 2025 00:00:00 GMT-0300 (GMT-03:00)', '1');
INSERT INTO `asistencias` (`id`, `alumno_id`, `materia_id`, `fecha`, `presente`) VALUES ('19', '5', '2', 'Wed Sep 03 2025 00:00:00 GMT-0300 (GMT-03:00)', '1');
INSERT INTO `asistencias` (`id`, `alumno_id`, `materia_id`, `fecha`, `presente`) VALUES ('20', '6', '2', 'Wed Sep 03 2025 00:00:00 GMT-0300 (GMT-03:00)', '1');
INSERT INTO `asistencias` (`id`, `alumno_id`, `materia_id`, `fecha`, `presente`) VALUES ('21', '7', '2', 'Wed Sep 03 2025 00:00:00 GMT-0300 (GMT-03:00)', '1');
INSERT INTO `asistencias` (`id`, `alumno_id`, `materia_id`, `fecha`, `presente`) VALUES ('22', '6', '2', 'Sat Sep 13 2025 00:00:00 GMT-0300 (GMT-03:00)', '1');
INSERT INTO `asistencias` (`id`, `alumno_id`, `materia_id`, `fecha`, `presente`) VALUES ('23', '7', '2', 'Sat Sep 13 2025 00:00:00 GMT-0300 (GMT-03:00)', '0');
INSERT INTO `asistencias` (`id`, `alumno_id`, `materia_id`, `fecha`, `presente`) VALUES ('24', '14', '2', 'Sat Sep 13 2025 00:00:00 GMT-0300 (GMT-03:00)', '0');

CREATE TABLE `auditoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) DEFAULT NULL,
  `modulo` varchar(100) NOT NULL,
  `accion` varchar(100) NOT NULL,
  `descripcion` text,
  `ip_usuario` varchar(45) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `auditoria_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

INSERT INTO `auditoria` (`id`, `usuario_id`, `modulo`, `accion`, `descripcion`, `ip_usuario`, `fecha`) VALUES ('1', '2', 'PRODUCTOS', 'LISTAR PRODUCTOS', 'Se listaron todos los productos', '::1', 'Wed Oct 29 2025 10:57:47 GMT-0300 (GMT-03:00)');
INSERT INTO `auditoria` (`id`, `usuario_id`, `modulo`, `accion`, `descripcion`, `ip_usuario`, `fecha`) VALUES ('2', '2', 'PROVEEDORES', 'LISTAR PROVEEDORES', 'Se listaron todos los proveedores', '::1', 'Wed Oct 29 2025 10:57:47 GMT-0300 (GMT-03:00)');
INSERT INTO `auditoria` (`id`, `usuario_id`, `modulo`, `accion`, `descripcion`, `ip_usuario`, `fecha`) VALUES ('3', '2', 'PROVEEDORES', 'LISTAR PROVEEDORES', 'Se listaron todos los proveedores', '::1', 'Wed Oct 29 2025 10:57:47 GMT-0300 (GMT-03:00)');
INSERT INTO `auditoria` (`id`, `usuario_id`, `modulo`, `accion`, `descripcion`, `ip_usuario`, `fecha`) VALUES ('4', '2', 'PRODUCTOS', 'LISTAR PRODUCTOS', 'Se listaron todos los productos', '::1', 'Wed Oct 29 2025 10:57:47 GMT-0300 (GMT-03:00)');
INSERT INTO `auditoria` (`id`, `usuario_id`, `modulo`, `accion`, `descripcion`, `ip_usuario`, `fecha`) VALUES ('5', '2', 'PRODUCTO', 'CREAR PRODUCTO', 'Se creó un producto', '::1', 'Wed Oct 29 2025 10:58:02 GMT-0300 (GMT-03:00)');
INSERT INTO `auditoria` (`id`, `usuario_id`, `modulo`, `accion`, `descripcion`, `ip_usuario`, `fecha`) VALUES ('6', '2', 'PRODUCTOS', 'LISTAR PRODUCTOS', 'Se listaron todos los productos', '::1', 'Wed Oct 29 2025 10:58:02 GMT-0300 (GMT-03:00)');
INSERT INTO `auditoria` (`id`, `usuario_id`, `modulo`, `accion`, `descripcion`, `ip_usuario`, `fecha`) VALUES ('7', '2', 'TODOS', 'LISTAR TODOS LOS PAGOS', 'Se listaron todos los pagos de mensualidades', '::1', 'Wed Oct 29 2025 11:18:36 GMT-0300 (GMT-03:00)');
INSERT INTO `auditoria` (`id`, `usuario_id`, `modulo`, `accion`, `descripcion`, `ip_usuario`, `fecha`) VALUES ('8', '2', 'TODOS', 'LISTAR TODOS LOS PAGOS', 'Se listaron todos los pagos de mensualidades', '::1', 'Wed Oct 29 2025 11:18:36 GMT-0300 (GMT-03:00)');

CREATE TABLE `caja` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `tipo_movimiento` enum('apertura','cierre','ingreso','egreso') NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `pago_matricula_id` int(11) DEFAULT NULL,
  `pago_mensualidad_id` int(11) DEFAULT NULL,
  `venta_id` int(11) DEFAULT NULL,
  `compra_id` int(11) DEFAULT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `caja_apertura_id` int(11) DEFAULT NULL,
  `registrado_por` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `registrado_por` (`registrado_por`),
  KEY `caja_apertura_cierre` (`caja_apertura_id`),
  KEY `pagos_matricula` (`pago_matricula_id`),
  KEY `pagos_mensualidad` (`pago_mensualidad_id`),
  KEY `venta_id` (`venta_id`),
  KEY `compras_caja` (`compra_id`),
  CONSTRAINT `caja_apertura_cierre` FOREIGN KEY (`caja_apertura_id`) REFERENCES `cajas_apertura_cierre` (`id`),
  CONSTRAINT `caja_ibfk_1` FOREIGN KEY (`registrado_por`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL,
  CONSTRAINT `caja_ibfk_2` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`),
  CONSTRAINT `compras_caja` FOREIGN KEY (`compra_id`) REFERENCES `compras` (`id`),
  CONSTRAINT `pagos_matricula` FOREIGN KEY (`pago_matricula_id`) REFERENCES `pagos_matricula` (`id`),
  CONSTRAINT `pagos_mensualidad` FOREIGN KEY (`pago_mensualidad_id`) REFERENCES `pagos_mensualidad` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=latin1;

INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('14', 'Mon Oct 20 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Saldo inicial', NULL, NULL, NULL, NULL, '20000.00', '19', '2', 'Mon Oct 20 2025 15:45:15 GMT-0300 (GMT-03:00)', 'Mon Oct 20 2025 15:45:15 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('15', 'Mon Oct 20 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Saldo inicial', NULL, NULL, NULL, NULL, '2000.00', '20', '2', 'Mon Oct 20 2025 15:46:37 GMT-0300 (GMT-03:00)', 'Mon Oct 20 2025 15:46:37 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('16', 'Mon Oct 20 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Saldo inicial', NULL, NULL, NULL, NULL, '200000.00', '21', '2', 'Mon Oct 20 2025 16:03:14 GMT-0300 (GMT-03:00)', 'Mon Oct 20 2025 16:03:14 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('17', 'Tue Oct 21 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Saldo inicial', NULL, NULL, NULL, NULL, '50000.00', '22', '2', 'Tue Oct 21 2025 19:57:04 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 19:57:04 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('19', 'Tue Oct 21 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'dasda', NULL, NULL, NULL, NULL, '5000.00', NULL, NULL, 'Tue Oct 21 2025 20:09:23 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 20:09:23 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('20', 'Tue Oct 21 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'dwdwq', NULL, NULL, NULL, NULL, '5000.00', NULL, NULL, 'Tue Oct 21 2025 20:09:35 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 20:09:35 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('21', 'Tue Oct 21 2025 00:00:00 GMT-0300 (GMT-03:00)', 'egreso', 'fsdfs', NULL, NULL, NULL, NULL, '5000.00', NULL, NULL, 'Tue Oct 21 2025 20:09:47 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 20:09:47 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('22', 'Tue Oct 21 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Venta N° 47', NULL, NULL, '47', NULL, '648468.00', '22', NULL, 'Tue Oct 21 2025 20:12:03 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 20:12:03 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('23', 'Tue Oct 21 2025 00:00:00 GMT-0300 (GMT-03:00)', 'egreso', 'Compra N° 34', NULL, NULL, NULL, '34', '0.00', '22', NULL, 'Tue Oct 21 2025 20:12:29 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 20:12:29 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('24', 'Wed Oct 22 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Saldo inicial', NULL, NULL, NULL, NULL, '2000.00', '23', '2', 'Tue Oct 21 2025 21:24:34 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 21:24:34 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('25', 'Wed Oct 22 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', '2000', NULL, NULL, NULL, NULL, '2000.00', NULL, NULL, 'Tue Oct 21 2025 21:24:45 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 21:24:45 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('26', 'Wed Oct 22 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Saldo inicial', NULL, NULL, NULL, NULL, '20000.00', '24', '2', 'Tue Oct 21 2025 21:25:36 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 21:25:36 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('27', 'Wed Oct 22 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'dasdas', NULL, NULL, NULL, NULL, '30000.00', NULL, NULL, 'Tue Oct 21 2025 21:25:44 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 21:25:44 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('28', 'Wed Oct 22 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Saldo inicial', NULL, NULL, NULL, NULL, '200.00', '25', '2', 'Tue Oct 21 2025 21:26:16 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 21:26:16 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('29', 'Wed Oct 22 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'ewq', NULL, NULL, NULL, NULL, '10000.00', NULL, NULL, 'Tue Oct 21 2025 21:26:35 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 21:26:35 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('30', 'Wed Oct 22 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Saldo inicial', NULL, NULL, NULL, NULL, '8000.00', '26', '2', 'Tue Oct 21 2025 21:28:26 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 21:28:26 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('31', 'Wed Oct 22 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', '13123', NULL, NULL, NULL, NULL, '12323.00', NULL, NULL, 'Tue Oct 21 2025 21:28:39 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 21:28:39 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('32', 'Wed Oct 22 2025 00:00:00 GMT-0300 (GMT-03:00)', 'egreso', '123213', NULL, NULL, NULL, NULL, '13233.00', NULL, NULL, 'Tue Oct 21 2025 21:28:53 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 21:28:53 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('33', 'Wed Oct 22 2025 00:00:00 GMT-0300 (GMT-03:00)', 'egreso', 'fdgd', NULL, NULL, NULL, NULL, '2322.00', NULL, NULL, 'Tue Oct 21 2025 21:29:10 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 21:29:10 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('34', 'Wed Oct 22 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Saldo inicial', NULL, NULL, NULL, NULL, '20000.00', '27', '2', 'Tue Oct 21 2025 21:55:04 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 21:55:04 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('35', 'Wed Oct 22 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'jhhbj', NULL, NULL, NULL, NULL, '2000.00', NULL, NULL, 'Tue Oct 21 2025 21:55:13 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 21:55:13 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('36', 'Wed Oct 22 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Saldo inicial', NULL, NULL, NULL, NULL, '32000.00', '28', '2', 'Tue Oct 21 2025 22:01:32 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 22:01:32 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('37', 'Wed Oct 22 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', '32ewwe', NULL, NULL, NULL, NULL, '1000.00', NULL, NULL, 'Tue Oct 21 2025 22:01:44 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 22:01:44 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('38', 'Wed Oct 22 2025 00:00:00 GMT-0300 (GMT-03:00)', 'egreso', 'dsadas ', NULL, NULL, NULL, NULL, '10000.00', NULL, NULL, 'Tue Oct 21 2025 22:01:51 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 22:01:51 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('39', 'Fri Oct 24 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Saldo inicial', NULL, NULL, NULL, NULL, '50000.00', '29', '2', 'Fri Oct 24 2025 14:23:39 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 14:23:39 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('42', 'Fri Oct 24 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Pago de mensualidad 9/2025', NULL, '7', NULL, NULL, '45000.00', '29', '2', 'Fri Oct 24 2025 14:49:21 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 14:49:21 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('43', 'Thu Oct 23 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Pago de matrícula', '9', NULL, NULL, NULL, '450000.00', '29', '2', 'Fri Oct 24 2025 15:17:50 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:17:50 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('44', 'Sat Feb 24 2024 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Pago de matrícula', '10', NULL, NULL, NULL, '50000.00', '29', '2', 'Fri Oct 24 2025 15:21:04 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:21:04 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('45', 'Thu Oct 30 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Pago de matrícula', '11', NULL, NULL, NULL, '45000.00', '29', '2', 'Fri Oct 24 2025 15:28:08 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:28:08 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('46', 'Fri Oct 24 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Pago de mensualidad 2/2025', NULL, '8', NULL, NULL, '450000.00', '29', '2', 'Fri Oct 24 2025 15:28:52 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:28:52 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('47', 'Fri Oct 24 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Pago de mensualidad 4/2025', NULL, '9', NULL, NULL, '450000.00', '29', '2', 'Fri Oct 24 2025 15:28:52 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:28:52 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('48', 'Tue Jan 23 2024 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Pago de matrícula', '12', NULL, NULL, NULL, '45000.00', '29', '2', 'Fri Oct 24 2025 15:29:39 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:29:39 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('49', 'Thu Oct 23 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Pago de matrícula', '13', NULL, NULL, NULL, '450000.00', '29', '2', 'Fri Oct 24 2025 15:38:28 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:38:28 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('50', 'Wed Jan 23 2008 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Pago de matrícula del alumno ID 3', '14', NULL, NULL, NULL, '450000.00', '29', '2', 'Fri Oct 24 2025 15:41:54 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:41:54 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('51', 'Fri Oct 24 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Pago de mensualidad 2/2025', NULL, '10', NULL, NULL, '4500.00', '29', '2', 'Fri Oct 24 2025 15:42:31 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:42:31 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('52', 'Fri Oct 24 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Pago de mensualidad 3/2025', NULL, '11', NULL, NULL, '4500.00', '29', '2', 'Fri Oct 24 2025 15:42:31 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:42:31 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('53', 'Fri Oct 24 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Venta N° 48', NULL, NULL, '48', NULL, '972702.00', NULL, NULL, 'Fri Oct 24 2025 15:52:28 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:52:28 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('54', 'Fri Oct 24 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Venta N° 49', NULL, NULL, '49', NULL, '324234.00', NULL, NULL, 'Fri Oct 24 2025 15:53:42 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:53:42 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('55', 'Fri Oct 24 2025 00:00:00 GMT-0300 (GMT-03:00)', 'egreso', 'Compra N° 35', NULL, NULL, NULL, '35', '1296936.00', NULL, NULL, 'Fri Oct 24 2025 15:54:00 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:54:00 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('56', 'Fri Oct 24 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Venta N° 50', NULL, NULL, '50', NULL, '1296936.00', NULL, NULL, 'Fri Oct 24 2025 15:54:38 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:54:38 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('57', 'Fri Oct 24 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Venta N° 51', NULL, NULL, '51', NULL, '1296936.00', NULL, NULL, 'Fri Oct 24 2025 15:58:00 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:58:00 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('58', 'Fri Oct 24 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Venta N° 52', NULL, NULL, '52', NULL, '972702.00', NULL, NULL, 'Fri Oct 24 2025 16:02:10 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 16:02:10 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('59', 'Fri Oct 24 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Venta N° 53', NULL, NULL, '53', NULL, '972702.00', NULL, NULL, 'Fri Oct 24 2025 16:05:32 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 16:05:32 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('60', 'Fri Oct 24 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Venta N° 54', NULL, NULL, '54', NULL, '972702.00', NULL, NULL, 'Fri Oct 24 2025 16:09:09 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 16:09:09 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('61', 'Wed Oct 29 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Pago de mensualidad 5/2025', NULL, '13', NULL, NULL, '56756.00', NULL, '2', 'Wed Oct 29 2025 10:41:54 GMT-0300 (GMT-03:00)', 'Wed Oct 29 2025 10:41:54 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('62', 'Wed Oct 29 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Pago de mensualidad 6/2025', NULL, '14', NULL, NULL, '45000.00', NULL, '2', 'Wed Oct 29 2025 10:46:36 GMT-0300 (GMT-03:00)', 'Wed Oct 29 2025 10:46:36 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('63', 'Wed Oct 29 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Pago de mensualidad 7/2025', NULL, '15', NULL, NULL, '45000.00', NULL, '2', 'Wed Oct 29 2025 10:46:36 GMT-0300 (GMT-03:00)', 'Wed Oct 29 2025 10:46:36 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('64', 'Wed Oct 29 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Pago de mensualidad 8/2025', NULL, '16', NULL, NULL, '45000.00', NULL, '2', 'Wed Oct 29 2025 10:47:21 GMT-0300 (GMT-03:00)', 'Wed Oct 29 2025 10:47:21 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('65', 'Wed Oct 29 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Pago de mensualidad 9/2025', NULL, '17', NULL, NULL, '45000.00', NULL, '2', 'Wed Oct 29 2025 10:47:21 GMT-0300 (GMT-03:00)', 'Wed Oct 29 2025 10:47:21 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('66', 'Wed Oct 29 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Pago de mensualidad 2/2025', NULL, '18', NULL, NULL, '45000.00', NULL, '2', 'Wed Oct 29 2025 10:47:58 GMT-0300 (GMT-03:00)', 'Wed Oct 29 2025 10:47:58 GMT-0300 (GMT-03:00)');
INSERT INTO `caja` (`id`, `fecha`, `tipo_movimiento`, `descripcion`, `pago_matricula_id`, `pago_mensualidad_id`, `venta_id`, `compra_id`, `monto`, `caja_apertura_id`, `registrado_por`, `created_at`, `updated_at`) VALUES ('67', 'Wed Oct 29 2025 00:00:00 GMT-0300 (GMT-03:00)', 'ingreso', 'Pago de mensualidad 4/2025', NULL, '19', NULL, NULL, '45000.00', NULL, '2', 'Wed Oct 29 2025 10:47:58 GMT-0300 (GMT-03:00)', 'Wed Oct 29 2025 10:47:58 GMT-0300 (GMT-03:00)');

CREATE TABLE `cajas_apertura_cierre` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_apertura` datetime NOT NULL,
  `monto_apertura` decimal(12,2) NOT NULL DEFAULT '0.00',
  `usuario_apertura_id` int(11) NOT NULL,
  `fecha_cierre` datetime DEFAULT NULL,
  `monto_cierre` decimal(12,2) DEFAULT NULL,
  `usuario_cierre_id` int(11) DEFAULT NULL,
  `estado` enum('abierta','cerrada') NOT NULL DEFAULT 'abierta',
  `descripcion` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

INSERT INTO `cajas_apertura_cierre` (`id`, `fecha_apertura`, `monto_apertura`, `usuario_apertura_id`, `fecha_cierre`, `monto_cierre`, `usuario_cierre_id`, `estado`, `descripcion`, `created_at`, `updated_at`) VALUES ('19', 'Mon Oct 20 2025 18:45:15 GMT-0300 (GMT-03:00)', '20000.00', '2', 'Mon Oct 20 2025 18:45:25 GMT-0300 (GMT-03:00)', '0.00', '2', 'cerrada', 'Apertura de caja
Cierre: ', 'Mon Oct 20 2025 15:45:15 GMT-0300 (GMT-03:00)', 'Mon Oct 20 2025 15:45:25 GMT-0300 (GMT-03:00)');
INSERT INTO `cajas_apertura_cierre` (`id`, `fecha_apertura`, `monto_apertura`, `usuario_apertura_id`, `fecha_cierre`, `monto_cierre`, `usuario_cierre_id`, `estado`, `descripcion`, `created_at`, `updated_at`) VALUES ('20', 'Mon Oct 20 2025 18:46:37 GMT-0300 (GMT-03:00)', '2000.00', '2', 'Mon Oct 20 2025 18:47:06 GMT-0300 (GMT-03:00)', '0.00', '2', 'cerrada', 'Apertura de caja
Cierre: ', 'Mon Oct 20 2025 15:46:37 GMT-0300 (GMT-03:00)', 'Mon Oct 20 2025 15:47:06 GMT-0300 (GMT-03:00)');
INSERT INTO `cajas_apertura_cierre` (`id`, `fecha_apertura`, `monto_apertura`, `usuario_apertura_id`, `fecha_cierre`, `monto_cierre`, `usuario_cierre_id`, `estado`, `descripcion`, `created_at`, `updated_at`) VALUES ('21', 'Mon Oct 20 2025 19:03:14 GMT-0300 (GMT-03:00)', '200000.00', '2', 'Mon Oct 20 2025 19:03:18 GMT-0300 (GMT-03:00)', '0.00', '2', 'cerrada', 'Apertura de caja
Cierre: ', 'Mon Oct 20 2025 16:03:14 GMT-0300 (GMT-03:00)', 'Mon Oct 20 2025 16:03:18 GMT-0300 (GMT-03:00)');
INSERT INTO `cajas_apertura_cierre` (`id`, `fecha_apertura`, `monto_apertura`, `usuario_apertura_id`, `fecha_cierre`, `monto_cierre`, `usuario_cierre_id`, `estado`, `descripcion`, `created_at`, `updated_at`) VALUES ('22', 'Tue Oct 21 2025 22:57:04 GMT-0300 (GMT-03:00)', '50000.00', '2', 'Tue Oct 21 2025 23:20:52 GMT-0300 (GMT-03:00)', '0.00', '2', 'cerrada', 'Apertura de caja
Cierre: ', 'Tue Oct 21 2025 19:57:04 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 20:20:52 GMT-0300 (GMT-03:00)');
INSERT INTO `cajas_apertura_cierre` (`id`, `fecha_apertura`, `monto_apertura`, `usuario_apertura_id`, `fecha_cierre`, `monto_cierre`, `usuario_cierre_id`, `estado`, `descripcion`, `created_at`, `updated_at`) VALUES ('23', 'Wed Oct 22 2025 00:24:34 GMT-0300 (GMT-03:00)', '2000.00', '2', 'Wed Oct 22 2025 00:24:48 GMT-0300 (GMT-03:00)', '0.00', '2', 'cerrada', 'Apertura de caja
Cierre: ', 'Tue Oct 21 2025 21:24:34 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 21:24:48 GMT-0300 (GMT-03:00)');
INSERT INTO `cajas_apertura_cierre` (`id`, `fecha_apertura`, `monto_apertura`, `usuario_apertura_id`, `fecha_cierre`, `monto_cierre`, `usuario_cierre_id`, `estado`, `descripcion`, `created_at`, `updated_at`) VALUES ('24', 'Wed Oct 22 2025 00:25:36 GMT-0300 (GMT-03:00)', '20000.00', '2', 'Wed Oct 22 2025 00:25:56 GMT-0300 (GMT-03:00)', '20000.00', '2', 'cerrada', 'Apertura de caja
Cierre: ', 'Tue Oct 21 2025 21:25:36 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 21:25:56 GMT-0300 (GMT-03:00)');
INSERT INTO `cajas_apertura_cierre` (`id`, `fecha_apertura`, `monto_apertura`, `usuario_apertura_id`, `fecha_cierre`, `monto_cierre`, `usuario_cierre_id`, `estado`, `descripcion`, `created_at`, `updated_at`) VALUES ('25', 'Wed Oct 22 2025 00:26:16 GMT-0300 (GMT-03:00)', '200.00', '2', 'Wed Oct 22 2025 00:26:45 GMT-0300 (GMT-03:00)', '200.00', '2', 'cerrada', 'Apertura de caja
Cierre: ', 'Tue Oct 21 2025 21:26:16 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 21:26:45 GMT-0300 (GMT-03:00)');
INSERT INTO `cajas_apertura_cierre` (`id`, `fecha_apertura`, `monto_apertura`, `usuario_apertura_id`, `fecha_cierre`, `monto_cierre`, `usuario_cierre_id`, `estado`, `descripcion`, `created_at`, `updated_at`) VALUES ('26', 'Wed Oct 22 2025 00:28:26 GMT-0300 (GMT-03:00)', '8000.00', '2', 'Wed Oct 22 2025 00:29:19 GMT-0300 (GMT-03:00)', '8000.00', '2', 'cerrada', 'Apertura de caja
Cierre: ', 'Tue Oct 21 2025 21:28:26 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 21:29:19 GMT-0300 (GMT-03:00)');
INSERT INTO `cajas_apertura_cierre` (`id`, `fecha_apertura`, `monto_apertura`, `usuario_apertura_id`, `fecha_cierre`, `monto_cierre`, `usuario_cierre_id`, `estado`, `descripcion`, `created_at`, `updated_at`) VALUES ('27', 'Wed Oct 22 2025 00:55:04 GMT-0300 (GMT-03:00)', '20000.00', '2', 'Wed Oct 22 2025 00:55:19 GMT-0300 (GMT-03:00)', '20000.00', '2', 'cerrada', 'Apertura de caja
Cierre: ', 'Tue Oct 21 2025 21:55:04 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 21:55:19 GMT-0300 (GMT-03:00)');
INSERT INTO `cajas_apertura_cierre` (`id`, `fecha_apertura`, `monto_apertura`, `usuario_apertura_id`, `fecha_cierre`, `monto_cierre`, `usuario_cierre_id`, `estado`, `descripcion`, `created_at`, `updated_at`) VALUES ('28', 'Wed Oct 22 2025 01:01:32 GMT-0300 (GMT-03:00)', '32000.00', '2', 'Wed Oct 22 2025 01:01:54 GMT-0300 (GMT-03:00)', '64000.00', '2', 'cerrada', 'Apertura de caja
Cierre: ', 'Tue Oct 21 2025 22:01:32 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 22:01:54 GMT-0300 (GMT-03:00)');
INSERT INTO `cajas_apertura_cierre` (`id`, `fecha_apertura`, `monto_apertura`, `usuario_apertura_id`, `fecha_cierre`, `monto_cierre`, `usuario_cierre_id`, `estado`, `descripcion`, `created_at`, `updated_at`) VALUES ('29', 'Fri Oct 24 2025 17:23:39 GMT-0300 (GMT-03:00)', '50000.00', '2', 'Fri Oct 24 2025 18:50:24 GMT-0300 (GMT-03:00)', '2544000.00', '2', 'cerrada', 'Apertura de caja
Cierre: ', 'Fri Oct 24 2025 14:23:39 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:50:24 GMT-0300 (GMT-03:00)');

CREATE TABLE `calificaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alumno_id` int(11) NOT NULL,
  `materia_id` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `nota` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `alumno_id` (`alumno_id`),
  KEY `materia_id` (`materia_id`),
  CONSTRAINT `calificaciones_ibfk_1` FOREIGN KEY (`alumno_id`) REFERENCES `alumnos` (`id`),
  CONSTRAINT `calificaciones_ibfk_2` FOREIGN KEY (`materia_id`) REFERENCES `materias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

INSERT INTO `calificaciones` (`id`, `alumno_id`, `materia_id`, `fecha`, `nota`) VALUES ('1', '7', '2', 'Wed Sep 03 2025 00:00:00 GMT-0300 (GMT-03:00)', '5.00');
INSERT INTO `calificaciones` (`id`, `alumno_id`, `materia_id`, `fecha`, `nota`) VALUES ('2', '6', '2', 'Sat Sep 06 2025 00:00:00 GMT-0300 (GMT-03:00)', '5.00');
INSERT INTO `calificaciones` (`id`, `alumno_id`, `materia_id`, `fecha`, `nota`) VALUES ('3', '7', '2', 'Sat Sep 06 2025 00:00:00 GMT-0300 (GMT-03:00)', '5.00');
INSERT INTO `calificaciones` (`id`, `alumno_id`, `materia_id`, `fecha`, `nota`) VALUES ('4', '14', '2', 'Sat Sep 06 2025 00:00:00 GMT-0300 (GMT-03:00)', '5.00');

CREATE TABLE `compras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `proveedor_id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `estado` enum('pendiente','pagada') DEFAULT 'pendiente',
  PRIMARY KEY (`id`),
  KEY `proveedor_id` (`proveedor_id`),
  CONSTRAINT `compras_ibfk_1` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedores` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('1', '3', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '1945404.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('2', '3', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '1022702.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('3', '3', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '200000.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('4', '3', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '1621170.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('5', '3', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '1621170.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('6', '3', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '200000.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('7', '3', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '1621170.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('8', '3', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '1945404.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('9', '3', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '1621170.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('10', '3', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '524234.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('11', '3', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '1945404.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('12', '3', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '1296936.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('13', '3', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '50000.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('14', '3', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '1296936.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('15', '3', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '1621170.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('16', '3', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '1296936.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('17', '3', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '972702.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('18', '3', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '1621170.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('19', '3', 'Fri Oct 03 2025 00:00:00 GMT-0300 (GMT-03:00)', '0.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('20', '3', 'Fri Oct 03 2025 00:00:00 GMT-0300 (GMT-03:00)', '0.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('21', '3', 'Fri Oct 03 2025 00:00:00 GMT-0300 (GMT-03:00)', '0.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('22', '3', 'Fri Oct 03 2025 00:00:00 GMT-0300 (GMT-03:00)', '22000.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('23', '3', 'Fri Oct 03 2025 00:00:00 GMT-0300 (GMT-03:00)', '1296936.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('24', '3', 'Fri Oct 03 2025 00:00:00 GMT-0300 (GMT-03:00)', '1296936.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('25', '3', 'Fri Oct 03 2025 00:00:00 GMT-0300 (GMT-03:00)', '0.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('26', '3', 'Fri Oct 03 2025 00:00:00 GMT-0300 (GMT-03:00)', '0.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('27', '3', 'Fri Oct 10 2025 00:00:00 GMT-0300 (GMT-03:00)', '1945404.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('28', '3', 'Fri Oct 10 2025 00:00:00 GMT-0300 (GMT-03:00)', '5836212.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('29', '3', 'Fri Oct 10 2025 00:00:00 GMT-0300 (GMT-03:00)', '2269638.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('30', '3', 'Fri Oct 10 2025 00:00:00 GMT-0300 (GMT-03:00)', '1621170.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('31', '3', 'Fri Oct 10 2025 00:00:00 GMT-0300 (GMT-03:00)', '1945404.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('32', '3', 'Fri Oct 10 2025 00:00:00 GMT-0300 (GMT-03:00)', '1621170.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('33', '3', 'Mon Oct 20 2025 00:00:00 GMT-0300 (GMT-03:00)', '50000.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('34', '3', 'Tue Oct 21 2025 00:00:00 GMT-0300 (GMT-03:00)', '0.00', 'pagada');
INSERT INTO `compras` (`id`, `proveedor_id`, `fecha`, `total`, `estado`) VALUES ('35', '3', 'Fri Oct 24 2025 00:00:00 GMT-0300 (GMT-03:00)', '1296936.00', 'pagada');

CREATE TABLE `configuraciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `anio_lectivo` year(4) NOT NULL,
  `concepto` varchar(50) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE `cursos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `anio` int(11) NOT NULL,
  `bachillerato` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

INSERT INTO `cursos` (`id`, `anio`, `bachillerato`) VALUES ('1', '1', 'Informaticaaa');
INSERT INTO `cursos` (`id`, `anio`, `bachillerato`) VALUES ('2', '2', 'Informatica');
INSERT INTO `cursos` (`id`, `anio`, `bachillerato`) VALUES ('3', '3', 'Informatica');
INSERT INTO `cursos` (`id`, `anio`, `bachillerato`) VALUES ('5', '1', 'industrial');
INSERT INTO `cursos` (`id`, `anio`, `bachillerato`) VALUES ('6', '2', 'industrial');
INSERT INTO `cursos` (`id`, `anio`, `bachillerato`) VALUES ('7', '2', 'batan');
INSERT INTO `cursos` (`id`, `anio`, `bachillerato`) VALUES ('9', '2', 'batandsa');
INSERT INTO `cursos` (`id`, `anio`, `bachillerato`) VALUES ('10', '2', 'dasdas');
INSERT INTO `cursos` (`id`, `anio`, `bachillerato`) VALUES ('11', '2', 'adsasd');
INSERT INTO `cursos` (`id`, `anio`, `bachillerato`) VALUES ('12', '5', 'batan');
INSERT INTO `cursos` (`id`, `anio`, `bachillerato`) VALUES ('13', '12', 'dasdas');
INSERT INTO `cursos` (`id`, `anio`, `bachillerato`) VALUES ('14', '5', 'dsadas');

CREATE TABLE `detalle_compra` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `compra_id` int(11) NOT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `insumo_id` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `compra_id` (`compra_id`),
  KEY `producto_id` (`producto_id`),
  KEY `fk_detalle_compra_insumo` (`insumo_id`),
  CONSTRAINT `detalle_compra_ibfk_1` FOREIGN KEY (`compra_id`) REFERENCES `compras` (`id`) ON DELETE CASCADE,
  CONSTRAINT `detalle_compra_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_detalle_compra_insumo` FOREIGN KEY (`insumo_id`) REFERENCES `insumos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('1', '1', '3', '0', '6', '324234.00', '1945404.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('2', '2', '3', '0', '3', '324234.00', '972702.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('3', '2', '1', '0', '1', '50000.00', '50000.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('4', '3', '1', '0', '4', '50000.00', '200000.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('5', '4', '3', '0', '5', '324234.00', '1621170.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('6', '5', '3', '0', '5', '324234.00', '1621170.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('7', '6', '1', '0', '4', '50000.00', '200000.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('8', '7', '3', '0', '5', '324234.00', '1621170.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('9', '8', '3', '0', '6', '324234.00', '1945404.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('10', '9', '3', '0', '5', '324234.00', '1621170.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('11', '10', '3', '0', '1', '324234.00', '324234.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('12', '10', '1', '0', '4', '50000.00', '200000.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('13', '11', '3', '0', '6', '324234.00', '1945404.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('14', '12', '3', '0', '4', '324234.00', '1296936.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('15', '13', '1', '0', '1', '50000.00', '50000.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('16', '14', '3', '0', '4', '324234.00', '1296936.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('17', '15', '3', '0', '5', '324234.00', '1621170.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('18', '16', '3', '0', '4', '324234.00', '1296936.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('19', '17', '3', '0', '3', '324234.00', '972702.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('20', '18', '3', '0', '5', '324234.00', '1621170.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('21', '22', '2', NULL, '4', '5500.00', '22000.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('22', '23', '3', NULL, '4', '324234.00', '1296936.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('23', '24', '3', NULL, '4', '324234.00', '1296936.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('24', '25', NULL, '4', '5', '0.00', '0.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('25', '26', NULL, '5', '6', '0.00', '0.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('26', '27', '3', NULL, '6', '324234.00', '1945404.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('27', '28', '3', NULL, '18', '324234.00', '5836212.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('28', '29', '3', NULL, '7', '324234.00', '2269638.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('29', '30', '3', NULL, '5', '324234.00', '1621170.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('30', '31', '3', NULL, '6', '324234.00', '1945404.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('31', '32', '3', NULL, '5', '324234.00', '1621170.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('32', '33', '1', NULL, '1', '50000.00', '50000.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('33', '34', NULL, '5', '5', '0.00', '0.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('34', '34', NULL, '4', '1', '0.00', '0.00');
INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `insumo_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('35', '35', '3', NULL, '4', '324234.00', '1296936.00');

CREATE TABLE `detalle_factura_compra` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `factura_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `factura_id` (`factura_id`),
  KEY `producto_id` (`producto_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

INSERT INTO `detalle_factura_compra` (`id`, `factura_id`, `producto_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('1', '1', '3', '3', '324234.00', '972702.00');
INSERT INTO `detalle_factura_compra` (`id`, `factura_id`, `producto_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('2', '1', '1', '1', '50000.00', '50000.00');
INSERT INTO `detalle_factura_compra` (`id`, `factura_id`, `producto_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('3', '2', '1', '4', '50000.00', '200000.00');
INSERT INTO `detalle_factura_compra` (`id`, `factura_id`, `producto_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('4', '3', '3', '5', '324234.00', '1621170.00');
INSERT INTO `detalle_factura_compra` (`id`, `factura_id`, `producto_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('5', '4', '3', '5', '324234.00', '1621170.00');
INSERT INTO `detalle_factura_compra` (`id`, `factura_id`, `producto_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('6', '5', '1', '4', '50000.00', '200000.00');
INSERT INTO `detalle_factura_compra` (`id`, `factura_id`, `producto_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('7', '6', '3', '5', '324234.00', '1621170.00');
INSERT INTO `detalle_factura_compra` (`id`, `factura_id`, `producto_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('8', '7', '3', '6', '324234.00', '1945404.00');
INSERT INTO `detalle_factura_compra` (`id`, `factura_id`, `producto_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('9', '8', '3', '5', '324234.00', '1621170.00');
INSERT INTO `detalle_factura_compra` (`id`, `factura_id`, `producto_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('10', '9', '3', '1', '324234.00', '324234.00');
INSERT INTO `detalle_factura_compra` (`id`, `factura_id`, `producto_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('11', '9', '1', '4', '50000.00', '200000.00');
INSERT INTO `detalle_factura_compra` (`id`, `factura_id`, `producto_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('12', '10', '3', '6', '324234.00', '1945404.00');
INSERT INTO `detalle_factura_compra` (`id`, `factura_id`, `producto_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('13', '11', '3', '4', '324234.00', '1296936.00');
INSERT INTO `detalle_factura_compra` (`id`, `factura_id`, `producto_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('14', '12', '1', '1', '50000.00', '50000.00');
INSERT INTO `detalle_factura_compra` (`id`, `factura_id`, `producto_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('15', '13', '3', '4', '324234.00', '1296936.00');
INSERT INTO `detalle_factura_compra` (`id`, `factura_id`, `producto_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('16', '14', '3', '5', '324234.00', '1621170.00');
INSERT INTO `detalle_factura_compra` (`id`, `factura_id`, `producto_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('17', '15', '3', '4', '324234.00', '1296936.00');
INSERT INTO `detalle_factura_compra` (`id`, `factura_id`, `producto_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('18', '16', '3', '3', '324234.00', '972702.00');
INSERT INTO `detalle_factura_compra` (`id`, `factura_id`, `producto_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('19', '17', '3', '5', '324234.00', '1621170.00');

CREATE TABLE `detalle_factura_venta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `factura_id` int(11) NOT NULL,
  `producto_servicio` varchar(100) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `factura_id` (`factura_id`),
  CONSTRAINT `detalle_factura_venta_ibfk_1` FOREIGN KEY (`factura_id`) REFERENCES `facturas_ventas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;

INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('1', '1', '1', '2', '0.00', '0.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('2', '2', '1', '9', '0.00', '0.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('3', '3', '1', '1', '0.00', '0.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('4', '4', '1', '2', '0.00', '0.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('5', '5', '1', '4', '0.00', '0.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('6', '6', '1', '2', '0.00', '0.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('7', '7', '1', '5', '0.00', '0.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('8', '8', '1', '1', '0.00', '0.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('9', '9', '1', '2', '0.00', '0.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('10', '10', '1', '1', '0.00', '0.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('11', '11', '1', '3', '0.00', '0.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('12', '12', '1', '3', '0.00', '0.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('13', '13', '1', '2', '0.00', '0.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('14', '14', '1', '1', '0.00', '0.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('15', '15', '1', '1', '0.00', '0.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('16', '16', '1', '1', '0.00', '0.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('17', '17', '1', '2', '0.00', '0.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('18', '18', '1', '15', '0.00', '0.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('19', '19', '1', '5', '0.00', '0.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('20', '20', '1', '2', '0.00', '0.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('21', '21', '1', '7', '0.00', '0.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('22', '22', '1', '6', '0.00', '0.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('23', '23', '1', '8', '0.00', '0.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('24', '24', '2', '4', '321312.00', '1285248.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('25', '24', '1', '3', '50000.00', '150000.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('26', '25', '2', '9', '50000.00', '450000.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('27', '26', '2', '5', '5500.00', '27500.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('28', '27', '2', '5', '5500.00', '27500.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('29', '27', '1', '1', '50000.00', '50000.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('30', '28', '3', '10', '324234.00', '3242340.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('31', '29', '2', '5', '5500.00', '27500.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('32', '30', '3', '5', '324234.00', '1621170.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('33', '30', '2', '2', '5500.00', '11000.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('34', '31', '3', '5', '324234.00', '1621170.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('35', '31', '2', '1', '5500.00', '5500.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('36', '32', '3', '7', '324234.00', '2269638.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('37', '33', '3', '5', '324234.00', '1621170.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('38', '34', '3', '4', '324234.00', '1296936.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('39', '35', '3', '4', '324234.00', '1296936.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('40', '36', '3', '5', '324234.00', '1621170.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('41', '37', '3', '7', '324234.00', '2269638.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('42', '38', '3', '2', '324234.00', '648468.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('43', '39', '3', '3', '324234.00', '972702.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('44', '40', '3', '2', '324234.00', '648468.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('45', '41', '3', '3', '324234.00', '972702.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('46', '42', '3', '1', '324234.00', '324234.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('47', '43', '3', '4', '324234.00', '1296936.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('48', '44', '3', '4', '324234.00', '1296936.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('49', '45', '3', '3', '324234.00', '972702.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('50', '46', '3', '3', '324234.00', '972702.00');
INSERT INTO `detalle_factura_venta` (`id`, `factura_id`, `producto_servicio`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('51', '47', '3', '3', '324234.00', '972702.00');

CREATE TABLE `detalle_venta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `venta_id` int(11) NOT NULL,
  `insumo_id` int(11) DEFAULT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `servicio_id` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_detalleventa_venta` (`venta_id`),
  KEY `fk_detalleventa_producto` (`producto_id`),
  KEY `fk_detalleventa_insumo` (`insumo_id`),
  KEY `fk_detalleventa_servicio` (`servicio_id`),
  CONSTRAINT `fk_detalleventa_insumo` FOREIGN KEY (`insumo_id`) REFERENCES `insumos` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_detalleventa_producto` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_detalleventa_servicio` FOREIGN KEY (`servicio_id`) REFERENCES `servicios` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_detalleventa_venta` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;

INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('1', '8', NULL, '1', NULL, '2', '0.00', '0.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('2', '9', NULL, '1', NULL, '9', '0.00', '0.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('3', '10', NULL, '1', NULL, '1', '0.00', '0.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('4', '11', NULL, '1', NULL, '2', '0.00', '0.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('5', '12', NULL, '1', NULL, '4', '0.00', '0.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('6', '13', NULL, '1', NULL, '2', '0.00', '0.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('7', '14', NULL, '1', NULL, '5', '0.00', '0.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('8', '15', NULL, '1', NULL, '1', '0.00', '0.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('9', '16', NULL, '1', NULL, '2', '0.00', '0.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('10', '17', NULL, '1', NULL, '1', '0.00', '0.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('11', '18', NULL, '1', NULL, '3', '0.00', '0.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('12', '19', NULL, '1', NULL, '3', '0.00', '0.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('13', '20', NULL, '1', NULL, '2', '0.00', '0.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('14', '21', NULL, '1', NULL, '1', '0.00', '0.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('15', '22', NULL, '1', NULL, '1', '0.00', '0.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('16', '23', NULL, '1', NULL, '1', '0.00', '0.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('17', '24', NULL, '1', NULL, '2', '0.00', '0.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('18', '25', NULL, '1', NULL, '15', '0.00', '0.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('19', '26', NULL, '1', NULL, '5', '0.00', '0.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('20', '27', NULL, '1', NULL, '2', '0.00', '0.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('21', '28', NULL, '1', NULL, '7', '0.00', '0.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('22', '29', NULL, '1', NULL, '6', '0.00', '0.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('23', '30', NULL, '1', NULL, '8', '0.00', '0.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('24', '31', NULL, '2', NULL, '4', '321312.00', '1285248.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('25', '31', NULL, '1', NULL, '3', '50000.00', '150000.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('26', '32', NULL, '2', NULL, '9', '50000.00', '450000.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('27', '33', NULL, '2', NULL, '5', '5500.00', '27500.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('28', '34', NULL, '2', NULL, '5', '5500.00', '27500.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('29', '34', NULL, '1', NULL, '1', '50000.00', '50000.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('30', '35', NULL, '3', NULL, '10', '324234.00', '3242340.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('31', '36', NULL, '2', NULL, '5', '5500.00', '27500.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('32', '37', NULL, '3', NULL, '5', '324234.00', '1621170.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('33', '37', NULL, '2', NULL, '2', '5500.00', '11000.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('34', '38', NULL, '3', NULL, '5', '324234.00', '1621170.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('35', '38', NULL, '2', NULL, '1', '5500.00', '5500.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('36', '39', NULL, '3', NULL, '7', '324234.00', '2269638.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('37', '40', NULL, '3', NULL, '5', '324234.00', '1621170.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('38', '41', NULL, '3', NULL, '4', '324234.00', '1296936.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('39', '42', NULL, '3', NULL, '4', '324234.00', '1296936.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('40', '43', NULL, '3', NULL, '5', '324234.00', '1621170.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('41', '44', NULL, '3', NULL, '7', '324234.00', '2269638.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('42', '45', NULL, '3', NULL, '2', '324234.00', '648468.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('43', '46', NULL, '3', NULL, '3', '324234.00', '972702.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('44', '47', NULL, '3', NULL, '2', '324234.00', '648468.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('45', '48', NULL, '3', NULL, '3', '324234.00', '972702.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('46', '49', NULL, '3', NULL, '1', '324234.00', '324234.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('47', '50', NULL, '3', NULL, '4', '324234.00', '1296936.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('48', '51', NULL, '3', NULL, '4', '324234.00', '1296936.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('49', '52', NULL, '3', NULL, '3', '324234.00', '972702.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('50', '53', NULL, '3', NULL, '3', '324234.00', '972702.00');
INSERT INTO `detalle_venta` (`id`, `venta_id`, `insumo_id`, `producto_id`, `servicio_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES ('51', '54', NULL, '3', NULL, '3', '324234.00', '972702.00');

CREATE TABLE `facturas_compras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `compra_id` int(11) NOT NULL,
  `numero_factura` varchar(50) NOT NULL,
  `fecha` date NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `estado` enum('pendiente','pagada') DEFAULT 'pendiente',
  PRIMARY KEY (`id`),
  KEY `compra_id` (`compra_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('1', '2', 'FC-000002', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '1022702.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('2', '3', 'FC-000003', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '200000.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('3', '4', 'FC-000004', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '1621170.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('4', '5', 'FC-000005', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '1621170.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('5', '6', 'FC-000006', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '200000.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('6', '7', 'FC-000007', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '1621170.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('7', '8', 'FC-000008', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '1945404.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('8', '9', 'FC-000009', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '1621170.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('9', '10', 'FC-000010', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '524234.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('10', '11', 'FC-000011', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '1945404.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('11', '12', 'FC-000012', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '1296936.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('12', '13', 'FC-000013', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '50000.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('13', '14', 'FC-000014', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '1296936.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('14', '15', 'FC-000015', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '1621170.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('15', '16', 'FC-000016', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '1296936.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('16', '17', 'FC-000017', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '972702.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('17', '18', 'FC-000018', 'Fri Sep 26 2025 00:00:00 GMT-0300 (GMT-03:00)', '1621170.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('18', '22', 'FC-000022', 'Fri Oct 03 2025 00:00:00 GMT-0300 (GMT-03:00)', '22000.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('19', '23', 'FC-000023', 'Fri Oct 03 2025 00:00:00 GMT-0300 (GMT-03:00)', '1296936.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('20', '24', 'FC-000024', 'Fri Oct 03 2025 00:00:00 GMT-0300 (GMT-03:00)', '1296936.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('21', '25', 'FC-000025', 'Fri Oct 03 2025 00:00:00 GMT-0300 (GMT-03:00)', '0.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('22', '26', 'FC-000026', 'Fri Oct 03 2025 00:00:00 GMT-0300 (GMT-03:00)', '0.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('23', '27', 'FC-000027', 'Fri Oct 10 2025 00:00:00 GMT-0300 (GMT-03:00)', '1945404.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('24', '28', 'FC-000028', 'Fri Oct 10 2025 00:00:00 GMT-0300 (GMT-03:00)', '5836212.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('25', '29', 'FC-000029', 'Fri Oct 10 2025 00:00:00 GMT-0300 (GMT-03:00)', '2269638.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('26', '30', 'FC-000030', 'Fri Oct 10 2025 00:00:00 GMT-0300 (GMT-03:00)', '1621170.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('27', '31', 'FC-000031', 'Fri Oct 10 2025 00:00:00 GMT-0300 (GMT-03:00)', '1945404.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('28', '32', 'FC-000032', 'Fri Oct 10 2025 00:00:00 GMT-0300 (GMT-03:00)', '1621170.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('29', '33', 'FC-000033', 'Mon Oct 20 2025 00:00:00 GMT-0300 (GMT-03:00)', '50000.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('30', '34', 'FC-000034', 'Tue Oct 21 2025 00:00:00 GMT-0300 (GMT-03:00)', '0.00', 'pagada');
INSERT INTO `facturas_compras` (`id`, `compra_id`, `numero_factura`, `fecha`, `total`, `estado`) VALUES ('31', '35', 'FC-000035', 'Fri Oct 24 2025 00:00:00 GMT-0300 (GMT-03:00)', '1296936.00', 'pagada');

CREATE TABLE `facturas_ventas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `venta_id` int(11) NOT NULL,
  `numero_factura` varchar(50) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total` decimal(12,2) DEFAULT '0.00',
  `estado` enum('emitida','pagada','anulada') DEFAULT 'emitida',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `numero_factura` (`numero_factura`),
  KEY `fk_factura_venta` (`venta_id`),
  CONSTRAINT `fk_factura_venta` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4;

INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('1', '8', 'FV-000008', 'Thu Sep 18 2025 13:14:46 GMT-0300 (GMT-03:00)', '0.00', 'pagada', 'Thu Sep 18 2025 13:14:46 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:14:46 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('2', '9', 'FV-000009', 'Thu Sep 18 2025 13:15:25 GMT-0300 (GMT-03:00)', '0.00', 'pagada', 'Thu Sep 18 2025 13:15:25 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:15:25 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('3', '10', 'FV-000010', 'Thu Sep 18 2025 13:25:15 GMT-0300 (GMT-03:00)', '0.00', 'pagada', 'Thu Sep 18 2025 13:25:15 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:25:15 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('4', '11', 'FV-000011', 'Thu Sep 18 2025 13:31:00 GMT-0300 (GMT-03:00)', '0.00', 'pagada', 'Thu Sep 18 2025 13:31:00 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:31:00 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('5', '12', 'FV-000012', 'Thu Sep 18 2025 13:32:50 GMT-0300 (GMT-03:00)', '0.00', 'pagada', 'Thu Sep 18 2025 13:32:50 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:32:50 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('6', '13', 'FV-000013', 'Thu Sep 18 2025 13:34:43 GMT-0300 (GMT-03:00)', '0.00', 'pagada', 'Thu Sep 18 2025 13:34:43 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:34:43 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('7', '14', 'FV-000014', 'Thu Sep 18 2025 13:36:13 GMT-0300 (GMT-03:00)', '0.00', 'pagada', 'Thu Sep 18 2025 13:36:13 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:36:13 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('8', '15', 'FV-000015', 'Thu Sep 18 2025 13:37:53 GMT-0300 (GMT-03:00)', '0.00', 'pagada', 'Thu Sep 18 2025 13:37:53 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:37:53 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('9', '16', 'FV-000016', 'Thu Sep 18 2025 13:38:48 GMT-0300 (GMT-03:00)', '0.00', 'pagada', 'Thu Sep 18 2025 13:38:48 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:38:48 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('10', '17', 'FV-000017', 'Thu Sep 18 2025 13:43:08 GMT-0300 (GMT-03:00)', '0.00', 'pagada', 'Thu Sep 18 2025 13:43:08 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:43:08 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('11', '18', 'FV-000018', 'Thu Sep 18 2025 13:44:38 GMT-0300 (GMT-03:00)', '0.00', 'pagada', 'Thu Sep 18 2025 13:44:38 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:44:38 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('12', '19', 'FV-000019', 'Thu Sep 18 2025 13:44:50 GMT-0300 (GMT-03:00)', '0.00', 'pagada', 'Thu Sep 18 2025 13:44:50 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:44:50 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('13', '20', 'FV-000020', 'Thu Sep 18 2025 13:47:04 GMT-0300 (GMT-03:00)', '0.00', 'pagada', 'Thu Sep 18 2025 13:47:04 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:47:04 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('14', '21', 'FV-000021', 'Thu Sep 18 2025 13:47:14 GMT-0300 (GMT-03:00)', '0.00', 'pagada', 'Thu Sep 18 2025 13:47:14 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:47:14 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('15', '22', 'FV-000022', 'Thu Sep 18 2025 13:47:56 GMT-0300 (GMT-03:00)', '0.00', 'pagada', 'Thu Sep 18 2025 13:47:56 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:47:56 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('16', '23', 'FV-000023', 'Thu Sep 18 2025 13:49:00 GMT-0300 (GMT-03:00)', '0.00', 'pagada', 'Thu Sep 18 2025 13:49:00 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:49:00 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('17', '24', 'FV-000024', 'Thu Sep 18 2025 13:51:48 GMT-0300 (GMT-03:00)', '0.00', 'pagada', 'Thu Sep 18 2025 13:51:48 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:51:48 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('18', '25', 'FV-000025', 'Fri Sep 19 2025 00:53:43 GMT-0300 (GMT-03:00)', '0.00', 'pagada', 'Fri Sep 19 2025 00:53:43 GMT-0300 (GMT-03:00)', 'Fri Sep 19 2025 00:53:43 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('19', '26', 'FV-000026', 'Fri Sep 19 2025 01:15:58 GMT-0300 (GMT-03:00)', '0.00', 'pagada', 'Fri Sep 19 2025 01:15:58 GMT-0300 (GMT-03:00)', 'Fri Sep 19 2025 01:15:58 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('20', '27', 'FV-000027', 'Fri Sep 19 2025 01:22:00 GMT-0300 (GMT-03:00)', '0.00', 'pagada', 'Fri Sep 19 2025 01:22:00 GMT-0300 (GMT-03:00)', 'Fri Sep 19 2025 01:22:00 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('21', '28', 'FV-000028', 'Fri Sep 19 2025 01:22:19 GMT-0300 (GMT-03:00)', '0.00', 'pagada', 'Fri Sep 19 2025 01:22:19 GMT-0300 (GMT-03:00)', 'Fri Sep 19 2025 01:22:19 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('22', '29', 'FV-000029', 'Fri Sep 19 2025 01:26:16 GMT-0300 (GMT-03:00)', '0.00', 'pagada', 'Fri Sep 19 2025 01:26:16 GMT-0300 (GMT-03:00)', 'Fri Sep 19 2025 01:26:16 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('23', '30', 'FV-000030', 'Fri Sep 19 2025 11:55:06 GMT-0300 (GMT-03:00)', '0.00', 'pagada', 'Fri Sep 19 2025 11:55:06 GMT-0300 (GMT-03:00)', 'Fri Sep 19 2025 11:55:06 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('24', '31', 'FV-000031', 'Mon Sep 22 2025 19:03:18 GMT-0300 (GMT-03:00)', '1435248.00', 'pagada', 'Mon Sep 22 2025 19:03:18 GMT-0300 (GMT-03:00)', 'Mon Sep 22 2025 19:03:18 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('25', '32', 'FV-000032', 'Mon Sep 22 2025 19:06:52 GMT-0300 (GMT-03:00)', '450000.00', 'pagada', 'Mon Sep 22 2025 19:06:52 GMT-0300 (GMT-03:00)', 'Mon Sep 22 2025 19:06:52 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('26', '33', 'FV-000033', 'Mon Sep 22 2025 19:15:34 GMT-0300 (GMT-03:00)', '27500.00', 'pagada', 'Mon Sep 22 2025 19:15:34 GMT-0300 (GMT-03:00)', 'Mon Sep 22 2025 19:15:34 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('27', '34', 'FV-000034', 'Fri Sep 26 2025 12:48:56 GMT-0300 (GMT-03:00)', '77500.00', 'pagada', 'Fri Sep 26 2025 12:48:56 GMT-0300 (GMT-03:00)', 'Fri Sep 26 2025 12:48:56 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('28', '35', 'FV-000035', 'Fri Sep 26 2025 19:56:57 GMT-0300 (GMT-03:00)', '3242340.00', 'pagada', 'Fri Sep 26 2025 19:56:57 GMT-0300 (GMT-03:00)', 'Fri Sep 26 2025 19:56:57 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('29', '36', 'FV-000036', 'Fri Oct 03 2025 17:46:53 GMT-0300 (GMT-03:00)', '27500.00', 'pagada', 'Fri Oct 03 2025 17:46:53 GMT-0300 (GMT-03:00)', 'Fri Oct 03 2025 17:46:53 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('30', '37', 'FV-000037', 'Fri Oct 10 2025 15:56:24 GMT-0300 (GMT-03:00)', '1632170.00', 'pagada', 'Fri Oct 10 2025 15:56:24 GMT-0300 (GMT-03:00)', 'Fri Oct 10 2025 15:56:24 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('31', '38', 'FV-000038', 'Fri Oct 10 2025 16:04:06 GMT-0300 (GMT-03:00)', '1626670.00', 'pagada', 'Fri Oct 10 2025 16:04:06 GMT-0300 (GMT-03:00)', 'Fri Oct 10 2025 16:04:06 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('32', '39', 'FV-000039', 'Fri Oct 10 2025 16:19:56 GMT-0300 (GMT-03:00)', '2269638.00', 'pagada', 'Fri Oct 10 2025 16:19:56 GMT-0300 (GMT-03:00)', 'Fri Oct 10 2025 16:19:56 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('33', '40', 'FV-000040', 'Fri Oct 10 2025 16:23:01 GMT-0300 (GMT-03:00)', '1621170.00', 'pagada', 'Fri Oct 10 2025 16:23:01 GMT-0300 (GMT-03:00)', 'Fri Oct 10 2025 16:23:01 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('34', '41', 'FV-000041', 'Fri Oct 10 2025 16:23:30 GMT-0300 (GMT-03:00)', '1296936.00', 'pagada', 'Fri Oct 10 2025 16:23:30 GMT-0300 (GMT-03:00)', 'Fri Oct 10 2025 16:23:30 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('35', '42', 'FV-000042', 'Fri Oct 10 2025 16:49:59 GMT-0300 (GMT-03:00)', '1296936.00', 'pagada', 'Fri Oct 10 2025 16:49:59 GMT-0300 (GMT-03:00)', 'Fri Oct 10 2025 16:49:59 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('36', '43', 'FV-000043', 'Fri Oct 10 2025 16:50:21 GMT-0300 (GMT-03:00)', '1621170.00', 'pagada', 'Fri Oct 10 2025 16:50:21 GMT-0300 (GMT-03:00)', 'Fri Oct 10 2025 16:50:21 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('37', '44', 'FV-000044', 'Fri Oct 10 2025 16:50:50 GMT-0300 (GMT-03:00)', '2269638.00', 'pagada', 'Fri Oct 10 2025 16:50:50 GMT-0300 (GMT-03:00)', 'Fri Oct 10 2025 16:50:50 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('38', '45', 'FV-000045', 'Mon Oct 20 2025 14:17:51 GMT-0300 (GMT-03:00)', '648468.00', 'pagada', 'Mon Oct 20 2025 14:17:51 GMT-0300 (GMT-03:00)', 'Mon Oct 20 2025 14:17:51 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('39', '46', 'FV-000046', 'Mon Oct 20 2025 17:21:47 GMT-0300 (GMT-03:00)', '972702.00', 'pagada', 'Mon Oct 20 2025 14:21:47 GMT-0300 (GMT-03:00)', 'Mon Oct 20 2025 14:21:47 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('40', '47', 'FV-000047', 'Tue Oct 21 2025 23:12:03 GMT-0300 (GMT-03:00)', '648468.00', 'pagada', 'Tue Oct 21 2025 20:12:03 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 20:12:03 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('41', '48', 'FV-000048', 'Fri Oct 24 2025 18:52:28 GMT-0300 (GMT-03:00)', '972702.00', 'pagada', 'Fri Oct 24 2025 15:52:28 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:52:28 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('42', '49', 'FV-000049', 'Fri Oct 24 2025 18:53:42 GMT-0300 (GMT-03:00)', '324234.00', 'pagada', 'Fri Oct 24 2025 15:53:42 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:53:42 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('43', '50', 'FV-000050', 'Fri Oct 24 2025 18:54:38 GMT-0300 (GMT-03:00)', '1296936.00', 'pagada', 'Fri Oct 24 2025 15:54:38 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:54:38 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('44', '51', 'FV-000051', 'Fri Oct 24 2025 18:58:00 GMT-0300 (GMT-03:00)', '1296936.00', 'pagada', 'Fri Oct 24 2025 15:58:00 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:58:00 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('45', '52', 'FV-000052', 'Fri Oct 24 2025 19:02:10 GMT-0300 (GMT-03:00)', '972702.00', 'pagada', 'Fri Oct 24 2025 16:02:10 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 16:02:10 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('46', '53', 'FV-000053', 'Fri Oct 24 2025 19:05:32 GMT-0300 (GMT-03:00)', '972702.00', 'pagada', 'Fri Oct 24 2025 16:05:32 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 16:05:32 GMT-0300 (GMT-03:00)');
INSERT INTO `facturas_ventas` (`id`, `venta_id`, `numero_factura`, `fecha`, `total`, `estado`, `created_at`, `updated_at`) VALUES ('47', '54', 'FV-000054', 'Fri Oct 24 2025 19:09:09 GMT-0300 (GMT-03:00)', '972702.00', 'pagada', 'Fri Oct 24 2025 16:09:09 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 16:09:09 GMT-0300 (GMT-03:00)');

CREATE TABLE `inscripciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alumno_id` int(11) NOT NULL,
  `curso_id` int(11) NOT NULL,
  `anio_lectivo` int(11) NOT NULL,
  `fecha_inscripcion` date DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  PRIMARY KEY (`id`),
  KEY `alumno_id` (`alumno_id`),
  KEY `curso_id` (`curso_id`),
  CONSTRAINT `inscripciones_ibfk_1` FOREIGN KEY (`alumno_id`) REFERENCES `alumnos` (`id`),
  CONSTRAINT `inscripciones_ibfk_2` FOREIGN KEY (`curso_id`) REFERENCES `cursos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

INSERT INTO `inscripciones` (`id`, `alumno_id`, `curso_id`, `anio_lectivo`, `fecha_inscripcion`, `estado`) VALUES ('1', '1', '1', '2023', 'Tue Sep 16 2025 00:00:00 GMT-0300 (GMT-03:00)', 'activo');
INSERT INTO `inscripciones` (`id`, `alumno_id`, `curso_id`, `anio_lectivo`, `fecha_inscripcion`, `estado`) VALUES ('2', '3', '1', '2025', 'Thu Sep 18 2025 00:00:00 GMT-0300 (GMT-03:00)', 'activo');
INSERT INTO `inscripciones` (`id`, `alumno_id`, `curso_id`, `anio_lectivo`, `fecha_inscripcion`, `estado`) VALUES ('3', '5', '1', '2025', 'Thu Sep 18 2025 00:00:00 GMT-0300 (GMT-03:00)', 'inactivo');
INSERT INTO `inscripciones` (`id`, `alumno_id`, `curso_id`, `anio_lectivo`, `fecha_inscripcion`, `estado`) VALUES ('4', '8', '1', '2025', 'Fri Sep 19 2025 00:00:00 GMT-0300 (GMT-03:00)', 'inactivo');
INSERT INTO `inscripciones` (`id`, `alumno_id`, `curso_id`, `anio_lectivo`, `fecha_inscripcion`, `estado`) VALUES ('5', '15', '1', '2025', 'Fri Sep 19 2025 00:00:00 GMT-0300 (GMT-03:00)', 'inactivo');

CREATE TABLE `insumos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `cantidad` int(11) NOT NULL DEFAULT '0',
  `unidad` varchar(50) DEFAULT NULL,
  `proveedor_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_insumos_proveedor` (`proveedor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

INSERT INTO `insumos` (`id`, `nombre`, `descripcion`, `cantidad`, `unidad`, `proveedor_id`, `created_at`, `updated_at`) VALUES ('4', 'dsdasdafdsdf', 'dasdasd', '429', 'kg', '2', 'Fri Sep 19 2025 01:20:45 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 20:12:29 GMT-0300 (GMT-03:00)');
INSERT INTO `insumos` (`id`, `nombre`, `descripcion`, `cantidad`, `unidad`, `proveedor_id`, `created_at`, `updated_at`) VALUES ('5', 'Impresoraa', 'dasda', '16', 'unidades', '3', 'Thu Oct 02 2025 23:02:50 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 20:12:29 GMT-0300 (GMT-03:00)');

CREATE TABLE `insumos_movimientos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `insumo_id` int(11) NOT NULL,
  `tipo` enum('entrada','salida') NOT NULL,
  `cantidad` decimal(10,2) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `descripcion` text,
  PRIMARY KEY (`id`),
  KEY `insumo_id` (`insumo_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

INSERT INTO `insumos_movimientos` (`id`, `insumo_id`, `tipo`, `cantidad`, `fecha`, `descripcion`) VALUES ('1', '1', 'entrada', '10.00', 'Wed Sep 17 2025 19:54:46 GMT-0300 (GMT-03:00)', 'gtyhtyhtyh');

CREATE TABLE `materiales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `cantidad` int(11) DEFAULT '0',
  `precio` decimal(10,2) DEFAULT NULL,
  `proveedor_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `proveedor_id` (`proveedor_id`),
  CONSTRAINT `materiales_ibfk_1` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedores` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `materias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

INSERT INTO `materias` (`id`, `nombre`, `descripcion`) VALUES ('2', 'Matematica IIIvvdfvdf', 'matematicaaaa');
INSERT INTO `materias` (`id`, `nombre`, `descripcion`) VALUES ('3', 'fisicadasdas', 'leyes de la fisica');
INSERT INTO `materias` (`id`, `nombre`, `descripcion`) VALUES ('4', 'Quimica', 'todo sobre quimica');
INSERT INTO `materias` (`id`, `nombre`, `descripcion`) VALUES ('5', 'Base de datos', 'consultas y relacioens de bd');
INSERT INTO `materias` (`id`, `nombre`, `descripcion`) VALUES ('6', 'castellano II', 'materia de castellano');
INSERT INTO `materias` (`id`, `nombre`, `descripcion`) VALUES ('7', 'educacion vial', 'materia de educ vial');
INSERT INTO `materias` (`id`, `nombre`, `descripcion`) VALUES ('8', 'introduccion al analisis', 'skibid');
INSERT INTO `materias` (`id`, `nombre`, `descripcion`) VALUES ('9', 'Programacion', 'dasdasdasdasd');
INSERT INTO `materias` (`id`, `nombre`, `descripcion`) VALUES ('10', 'oinnyuv', 'dcsdscsdc');
INSERT INTO `materias` (`id`, `nombre`, `descripcion`) VALUES ('11', 'dsadda', 'dasdas');
INSERT INTO `materias` (`id`, `nombre`, `descripcion`) VALUES ('12', '12', 'fdsfsd');

CREATE TABLE `materias_curso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `curso_id` int(11) NOT NULL,
  `materia_id` int(11) NOT NULL,
  `profesor_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_mc_curso` (`curso_id`),
  KEY `fk_mc_materia` (`materia_id`),
  KEY `fk_mc_profesor` (`profesor_id`),
  CONSTRAINT `fk_mc_curso` FOREIGN KEY (`curso_id`) REFERENCES `cursos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_mc_materia` FOREIGN KEY (`materia_id`) REFERENCES `materias` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_mc_profesor` FOREIGN KEY (`profesor_id`) REFERENCES `profesores` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

INSERT INTO `materias_curso` (`id`, `curso_id`, `materia_id`, `profesor_id`, `created_at`, `updated_at`) VALUES ('1', '1', '2', '15', 'Fri Sep 19 2025 00:11:29 GMT-0300 (GMT-03:00)', 'Fri Sep 19 2025 00:11:29 GMT-0300 (GMT-03:00)');

CREATE TABLE `movimientos_stock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `producto_id` int(11) NOT NULL,
  `tipo` enum('entrada','salida') NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `movimientos_stock_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `pagos_matricula` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alumno_id` int(11) NOT NULL,
  `fecha_pago` date NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `metodo_pago` enum('efectivo','tarjeta','transferencia') NOT NULL,
  `recibido_por` varchar(100) NOT NULL,
  `estado` varchar(50) NOT NULL DEFAULT 'pagado',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_pago_alumno` (`alumno_id`),
  CONSTRAINT `fk_pago_alumno` FOREIGN KEY (`alumno_id`) REFERENCES `alumnos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

INSERT INTO `pagos_matricula` (`id`, `alumno_id`, `fecha_pago`, `monto`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('2', '3', 'Wed Oct 08 2025 00:00:00 GMT-0300 (GMT-03:00)', '312124.00', 'tarjeta', 'O lugo', 'pendiente', 'Thu Oct 02 2025 17:20:02 GMT-0300 (GMT-03:00)', 'Thu Oct 02 2025 17:20:02 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_matricula` (`id`, `alumno_id`, `fecha_pago`, `monto`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('3', '3', 'Wed Oct 01 2025 00:00:00 GMT-0300 (GMT-03:00)', '5.00', 'tarjeta', 'klm', 'pendiente', 'Thu Oct 02 2025 17:22:18 GMT-0300 (GMT-03:00)', 'Thu Oct 02 2025 17:22:18 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_matricula` (`id`, `alumno_id`, `fecha_pago`, `monto`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('4', '1', 'Fri Oct 10 2025 00:00:00 GMT-0300 (GMT-03:00)', '44456.00', 'tarjeta', 'jknkj', 'pendiente', 'Thu Oct 02 2025 17:23:27 GMT-0300 (GMT-03:00)', 'Thu Oct 02 2025 17:23:27 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_matricula` (`id`, `alumno_id`, `fecha_pago`, `monto`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('5', '1', 'Thu Oct 02 2025 00:00:00 GMT-0300 (GMT-03:00)', '454654.00', 'tarjeta', 'O lugo', 'pagado', 'Thu Oct 02 2025 17:45:16 GMT-0300 (GMT-03:00)', 'Thu Oct 02 2025 17:45:16 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_matricula` (`id`, `alumno_id`, `fecha_pago`, `monto`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('6', '8', 'Tue Oct 21 2025 00:00:00 GMT-0300 (GMT-03:00)', '456456.00', 'tarjeta', 'O lugo', 'pagado', 'Fri Oct 03 2025 17:44:37 GMT-0300 (GMT-03:00)', 'Fri Oct 03 2025 17:44:37 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_matricula` (`id`, `alumno_id`, `fecha_pago`, `monto`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('7', '1', 'Fri Oct 24 2025 00:00:00 GMT-0300 (GMT-03:00)', '450000.00', 'tarjeta', 'dsadsfsdf', 'pagado', 'Fri Oct 24 2025 14:24:19 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 14:24:19 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_matricula` (`id`, `alumno_id`, `fecha_pago`, `monto`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('8', '1', 'Fri Oct 24 2025 00:00:00 GMT-0300 (GMT-03:00)', '450000.00', 'tarjeta', '1', 'pagado', 'Fri Oct 24 2025 14:24:33 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 14:24:33 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_matricula` (`id`, `alumno_id`, `fecha_pago`, `monto`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('9', '1', 'Thu Oct 23 2025 00:00:00 GMT-0300 (GMT-03:00)', '450000.00', 'tarjeta', '2', 'pagado', 'Fri Oct 24 2025 15:17:50 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:17:50 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_matricula` (`id`, `alumno_id`, `fecha_pago`, `monto`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('10', '7', 'Sat Feb 24 2024 00:00:00 GMT-0300 (GMT-03:00)', '50000.00', 'tarjeta', '2', 'pagado', 'Fri Oct 24 2025 15:21:04 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:21:04 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_matricula` (`id`, `alumno_id`, `fecha_pago`, `monto`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('11', '5', 'Thu Oct 30 2025 00:00:00 GMT-0300 (GMT-03:00)', '45000.00', 'tarjeta', '2', 'pagado', 'Fri Oct 24 2025 15:28:08 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:28:08 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_matricula` (`id`, `alumno_id`, `fecha_pago`, `monto`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('12', '3', 'Tue Jan 23 2024 00:00:00 GMT-0300 (GMT-03:00)', '45000.00', 'tarjeta', '2', 'pagado', 'Fri Oct 24 2025 15:29:39 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:29:39 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_matricula` (`id`, `alumno_id`, `fecha_pago`, `monto`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('13', '1', 'Thu Oct 23 2025 00:00:00 GMT-0300 (GMT-03:00)', '450000.00', 'tarjeta', '2', 'pagado', 'Fri Oct 24 2025 15:38:28 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:38:28 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_matricula` (`id`, `alumno_id`, `fecha_pago`, `monto`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('14', '3', 'Wed Jan 23 2008 00:00:00 GMT-0300 (GMT-03:00)', '450000.00', 'tarjeta', '2', 'pagado', 'Fri Oct 24 2025 15:41:54 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:41:54 GMT-0300 (GMT-03:00)');

CREATE TABLE `pagos_mensualidad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alumno_id` int(11) NOT NULL,
  `mes` varchar(20) NOT NULL,
  `anio` int(11) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `fecha_pago` date DEFAULT NULL,
  `metodo_pago` varchar(50) DEFAULT NULL,
  `recibido_por` varchar(100) DEFAULT NULL,
  `estado` enum('pendiente','pagado') DEFAULT 'pendiente',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `alumno_mes_anio` (`alumno_id`,`mes`,`anio`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

INSERT INTO `pagos_mensualidad` (`id`, `alumno_id`, `mes`, `anio`, `monto`, `fecha_pago`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('2', '1', '3', '2025', '423535.00', 'Fri Oct 03 2025 00:00:00 GMT-0300 (GMT-03:00)', 'tarjeta', 'dass', 'pagado', 'Thu Oct 02 2025 22:23:14 GMT-0300 (GMT-03:00)', 'Thu Oct 02 2025 22:23:14 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_mensualidad` (`id`, `alumno_id`, `mes`, `anio`, `monto`, `fecha_pago`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('3', '1', '5', '2025', '5464654.00', 'Fri Oct 03 2025 00:00:00 GMT-0300 (GMT-03:00)', 'tarjeta', 'olugo', 'pagado', 'Fri Oct 03 2025 17:45:02 GMT-0300 (GMT-03:00)', 'Fri Oct 03 2025 17:45:02 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_mensualidad` (`id`, `alumno_id`, `mes`, `anio`, `monto`, `fecha_pago`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('4', '1', '7', '2025', '5464654.00', 'Fri Oct 03 2025 00:00:00 GMT-0300 (GMT-03:00)', 'tarjeta', 'olugo', 'pagado', 'Fri Oct 03 2025 17:45:02 GMT-0300 (GMT-03:00)', 'Fri Oct 03 2025 17:45:02 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_mensualidad` (`id`, `alumno_id`, `mes`, `anio`, `monto`, `fecha_pago`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('5', '1', '6', '2025', '5464654.00', 'Fri Oct 03 2025 00:00:00 GMT-0300 (GMT-03:00)', 'tarjeta', 'olugo', 'pagado', 'Fri Oct 03 2025 17:45:02 GMT-0300 (GMT-03:00)', 'Fri Oct 03 2025 17:45:02 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_mensualidad` (`id`, `alumno_id`, `mes`, `anio`, `monto`, `fecha_pago`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('6', '1', '8', '2025', '45000.00', 'Fri Oct 24 2025 00:00:00 GMT-0300 (GMT-03:00)', 'tarjeta', '1', 'pagado', 'Fri Oct 24 2025 14:48:49 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 14:48:49 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_mensualidad` (`id`, `alumno_id`, `mes`, `anio`, `monto`, `fecha_pago`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('7', '1', '9', '2025', '45000.00', 'Fri Oct 24 2025 00:00:00 GMT-0300 (GMT-03:00)', 'tarjeta', '2', 'pagado', 'Fri Oct 24 2025 14:49:21 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 14:49:21 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_mensualidad` (`id`, `alumno_id`, `mes`, `anio`, `monto`, `fecha_pago`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('8', '1', '2', '2025', '450000.00', 'Fri Oct 24 2025 00:00:00 GMT-0300 (GMT-03:00)', 'tarjeta', '2', 'pagado', 'Fri Oct 24 2025 15:28:52 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:28:52 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_mensualidad` (`id`, `alumno_id`, `mes`, `anio`, `monto`, `fecha_pago`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('9', '1', '4', '2025', '450000.00', 'Fri Oct 24 2025 00:00:00 GMT-0300 (GMT-03:00)', 'tarjeta', '2', 'pagado', 'Fri Oct 24 2025 15:28:52 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:28:52 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_mensualidad` (`id`, `alumno_id`, `mes`, `anio`, `monto`, `fecha_pago`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('10', '3', '2', '2025', '4500.00', 'Fri Oct 24 2025 00:00:00 GMT-0300 (GMT-03:00)', 'tarjeta', '2', 'pagado', 'Fri Oct 24 2025 15:42:31 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:42:31 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_mensualidad` (`id`, `alumno_id`, `mes`, `anio`, `monto`, `fecha_pago`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('11', '3', '3', '2025', '4500.00', 'Fri Oct 24 2025 00:00:00 GMT-0300 (GMT-03:00)', 'tarjeta', '2', 'pagado', 'Fri Oct 24 2025 15:42:31 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:42:31 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_mensualidad` (`id`, `alumno_id`, `mes`, `anio`, `monto`, `fecha_pago`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('12', '3', '4', '2025', '56756.00', 'Wed Oct 29 2025 00:00:00 GMT-0300 (GMT-03:00)', 'tarjeta', 'djkask', 'pagado', 'Wed Oct 29 2025 10:41:47 GMT-0300 (GMT-03:00)', 'Wed Oct 29 2025 10:41:47 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_mensualidad` (`id`, `alumno_id`, `mes`, `anio`, `monto`, `fecha_pago`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('13', '3', '5', '2025', '56756.00', 'Wed Oct 29 2025 00:00:00 GMT-0300 (GMT-03:00)', 'tarjeta', '2', 'pagado', 'Wed Oct 29 2025 10:41:54 GMT-0300 (GMT-03:00)', 'Wed Oct 29 2025 10:41:54 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_mensualidad` (`id`, `alumno_id`, `mes`, `anio`, `monto`, `fecha_pago`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('14', '3', '6', '2025', '45000.00', 'Wed Oct 29 2025 00:00:00 GMT-0300 (GMT-03:00)', 'tarjeta', '2', 'pagado', 'Wed Oct 29 2025 10:46:36 GMT-0300 (GMT-03:00)', 'Wed Oct 29 2025 10:46:36 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_mensualidad` (`id`, `alumno_id`, `mes`, `anio`, `monto`, `fecha_pago`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('15', '3', '7', '2025', '45000.00', 'Wed Oct 29 2025 00:00:00 GMT-0300 (GMT-03:00)', 'tarjeta', '2', 'pagado', 'Wed Oct 29 2025 10:46:36 GMT-0300 (GMT-03:00)', 'Wed Oct 29 2025 10:46:36 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_mensualidad` (`id`, `alumno_id`, `mes`, `anio`, `monto`, `fecha_pago`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('16', '3', '8', '2025', '45000.00', 'Wed Oct 29 2025 00:00:00 GMT-0300 (GMT-03:00)', 'tarjeta', '2', 'pagado', 'Wed Oct 29 2025 10:47:21 GMT-0300 (GMT-03:00)', 'Wed Oct 29 2025 10:47:21 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_mensualidad` (`id`, `alumno_id`, `mes`, `anio`, `monto`, `fecha_pago`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('17', '3', '9', '2025', '45000.00', 'Wed Oct 29 2025 00:00:00 GMT-0300 (GMT-03:00)', 'tarjeta', '2', 'pagado', 'Wed Oct 29 2025 10:47:21 GMT-0300 (GMT-03:00)', 'Wed Oct 29 2025 10:47:21 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_mensualidad` (`id`, `alumno_id`, `mes`, `anio`, `monto`, `fecha_pago`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('18', '5', '2', '2025', '45000.00', 'Wed Oct 29 2025 00:00:00 GMT-0300 (GMT-03:00)', 'tarjeta', '2', 'pagado', 'Wed Oct 29 2025 10:47:58 GMT-0300 (GMT-03:00)', 'Wed Oct 29 2025 10:47:58 GMT-0300 (GMT-03:00)');
INSERT INTO `pagos_mensualidad` (`id`, `alumno_id`, `mes`, `anio`, `monto`, `fecha_pago`, `metodo_pago`, `recibido_por`, `estado`, `created_at`, `updated_at`) VALUES ('19', '5', '4', '2025', '45000.00', 'Wed Oct 29 2025 00:00:00 GMT-0300 (GMT-03:00)', 'tarjeta', '2', 'pagado', 'Wed Oct 29 2025 10:47:58 GMT-0300 (GMT-03:00)', 'Wed Oct 29 2025 10:47:58 GMT-0300 (GMT-03:00)');

CREATE TABLE `perfiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `dni` varchar(20) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `direccion` text,
  `telefono` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `perfiles_ibfk_1` (`usuario_id`),
  CONSTRAINT `perfiles_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `precio` decimal(10,2) NOT NULL DEFAULT '0.00',
  `stock` int(11) NOT NULL DEFAULT '0',
  `proveedor_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_productos_proveedor` (`proveedor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `stock`, `proveedor_id`, `created_at`, `updated_at`) VALUES ('1', 'silla', 'skibid', '50000.00', '545633', '2', 'Wed Sep 17 2025 14:08:03 GMT-0300 (GMT-03:00)', 'Mon Oct 20 2025 14:22:04 GMT-0300 (GMT-03:00)');
INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `stock`, `proveedor_id`, `created_at`, `updated_at`) VALUES ('2', 'cuadernillo', 'materia de castellano', '5500.00', '0', '3', 'Fri Sep 19 2025 12:51:57 GMT-0300 (GMT-03:00)', 'Fri Oct 10 2025 16:04:06 GMT-0300 (GMT-03:00)');
INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `stock`, `proveedor_id`, `created_at`, `updated_at`) VALUES ('3', 'csdcds', 'csdc', '324234.00', '52', '3', 'Fri Sep 19 2025 12:55:17 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 16:09:09 GMT-0300 (GMT-03:00)');
INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `stock`, `proveedor_id`, `created_at`, `updated_at`) VALUES ('4', 'cuaderno', 'ewrwe', '45000.00', '10', '3', 'Wed Oct 29 2025 10:48:59 GMT-0300 (GMT-03:00)', 'Wed Oct 29 2025 10:48:59 GMT-0300 (GMT-03:00)');
INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `stock`, `proveedor_id`, `created_at`, `updated_at`) VALUES ('5', 'cjkzxjdas', 'skibid', '45446.00', '5', '3', 'Wed Oct 29 2025 10:55:02 GMT-0300 (GMT-03:00)', 'Wed Oct 29 2025 10:55:02 GMT-0300 (GMT-03:00)');
INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `stock`, `proveedor_id`, `created_at`, `updated_at`) VALUES ('6', 'Lactolandadasd', 'skibid', '324234.00', '4', '3', 'Wed Oct 29 2025 10:58:02 GMT-0300 (GMT-03:00)', 'Wed Oct 29 2025 10:58:02 GMT-0300 (GMT-03:00)');

CREATE TABLE `profesores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `telefono` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `cedula` varchar(100) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

INSERT INTO `profesores` (`id`, `nombre`, `apellido`, `telefono`, `correo`, `cedula`, `direccion`, `estado`) VALUES ('12', 'Octavioooo', 'Lugo Duarteadsdas', '0984974767', 'octald12345@gmail.com', '5000000', 'calle 10', '1');
INSERT INTO `profesores` (`id`, `nombre`, `apellido`, `telefono`, `correo`, `cedula`, `direccion`, `estado`) VALUES ('15', 'octaaa', 'dasdassa', '0984974767', 'correo@gmail.com', '4000000', 'c capitan alfonso', '1');
INSERT INTO `profesores` (`id`, `nombre`, `apellido`, `telefono`, `correo`, `cedula`, `direccion`, `estado`) VALUES ('16', 'Octavio', 'Lugo', '0984974767', 'corredadao@gmail.com', '5283809dsad', 'c capitan alfonso', '1');
INSERT INTO `profesores` (`id`, `nombre`, `apellido`, `telefono`, `correo`, `cedula`, `direccion`, `estado`) VALUES ('17', 'dasd', 'dasdas', 'dasd', 'dasd@gmail.com', 'dasd', 'dasd', '1');
INSERT INTO `profesores` (`id`, `nombre`, `apellido`, `telefono`, `correo`, `cedula`, `direccion`, `estado`) VALUES ('18', 'Octavio', 'Lug', '0984974767', 'corredsado@gmail.com', '5522464848dasd', 'c capitan alfonso', '1');

CREATE TABLE `proveedores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `estado` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

INSERT INTO `proveedores` (`id`, `nombre`, `tipo`, `telefono`, `correo`, `direccion`, `created_at`, `updated_at`, `estado`) VALUES ('2', 'Lactolandadasd', 'local', '0984974767', 'correo@gmail.com', 'c capitan alfonso', 'Wed Sep 17 2025 13:24:13 GMT-0300 (GMT-03:00)', 'Thu Sep 25 2025 19:46:17 GMT-0300 (GMT-03:00)', '1');
INSERT INTO `proveedores` (`id`, `nombre`, `tipo`, `telefono`, `correo`, `direccion`, `created_at`, `updated_at`, `estado`) VALUES ('3', 'hjh', 'uggg', '6516514', 'correoygg@gmail.com', 'c capitan alfonso', 'Fri Sep 19 2025 12:08:17 GMT-0300 (GMT-03:00)', 'Thu Sep 25 2025 17:46:33 GMT-0300 (GMT-03:00)', '1');

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

INSERT INTO `roles` (`id`, `nombre`) VALUES ('1', 'admin');
INSERT INTO `roles` (`id`, `nombre`) VALUES ('2', 'profesor');
INSERT INTO `roles` (`id`, `nombre`) VALUES ('3', 'alumno');

CREATE TABLE `servicios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `descripcion` text,
  `costo` decimal(10,2) NOT NULL DEFAULT '0.00',
  `proveedor_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_servicios_proveedor` (`proveedor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `servicios_historial` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `servicio_id` int(11) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `costo` decimal(10,2) NOT NULL,
  `descripcion` text,
  `proveedor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `servicio_id` (`servicio_id`),
  KEY `proveedor_id` (`proveedor_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE `tutores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `apellido` varchar(150) NOT NULL,
  `cedula` varchar(50) DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cedula` (`cedula`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

INSERT INTO `tutores` (`id`, `nombre`, `apellido`, `cedula`, `telefono`, `direccion`, `email`, `created_at`, `updated_at`) VALUES ('1', 'Octavio', 'Lugo', NULL, '0984974767', 'c capitan alfonso', 'admin@ejemplo.com', 'Thu Sep 18 2025 11:08:30 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 11:08:30 GMT-0300 (GMT-03:00)');

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gmail` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `alumno_id` int(11) DEFAULT NULL,
  `profesor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`gmail`),
  KEY `rol_id` (`rol_id`),
  KEY `usuarios_ibfk_3` (`profesor_id`),
  KEY `usuarios_ibfk_2` (`alumno_id`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`alumno_id`) REFERENCES `alumnos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `usuarios_ibfk_3` FOREIGN KEY (`profesor_id`) REFERENCES `profesores` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;

INSERT INTO `usuarios` (`id`, `gmail`, `password_hash`, `rol_id`, `alumno_id`, `profesor_id`) VALUES ('2', 'admin@ejemplo.com', '$2b$10$6FaiX9FpGTmZv2N2Jh58sOTu0E8aqypIRHIhK6ETF.nltPiuo/HC2', '1', NULL, NULL);
INSERT INTO `usuarios` (`id`, `gmail`, `password_hash`, `rol_id`, `alumno_id`, `profesor_id`) VALUES ('3', '5283809@correo.com', '$2b$10$IZxxMrL7RR34./uW8J2wQO9HYs08iyeqjYynUm6I.qYnstPObbKIO', '2', NULL, NULL);
INSERT INTO `usuarios` (`id`, `gmail`, `password_hash`, `rol_id`, `alumno_id`, `profesor_id`) VALUES ('11', '5000001@correo.com', '$2b$10$SXcXlKqeHLj5XI9FIayqaeO9urL3GV8uJgBeaV7yu5/Q/1BVSKjEi', '3', '3', NULL);
INSERT INTO `usuarios` (`id`, `gmail`, `password_hash`, `rol_id`, `alumno_id`, `profesor_id`) VALUES ('12', 'octa@gmail.com', '52838097', '1', NULL, NULL);
INSERT INTO `usuarios` (`id`, `gmail`, `password_hash`, `rol_id`, `alumno_id`, `profesor_id`) VALUES ('15', '5644564@correo.com', '$2b$10$x.SqYz1vt5.W7Z8FQItXeuYmcKOqHx/lgq95FpvM.u4u4HtIHLOrG', '3', '6', NULL);
INSERT INTO `usuarios` (`id`, `gmail`, `password_hash`, `rol_id`, `alumno_id`, `profesor_id`) VALUES ('18', '4000000@correo.com', '$2b$10$3pRaSZ5rNgDCX476Sdszs.B9.4gbg6aCmQxSpBam2Pbb6cnUzCEyG', '2', NULL, '15');
INSERT INTO `usuarios` (`id`, `gmail`, `password_hash`, `rol_id`, `alumno_id`, `profesor_id`) VALUES ('19', '5464564@correo.com', '$2b$10$pNa5u.ukZHFuTypZdSXwMOrrRjcr3whuSNiTssc.5ceijWiPAoANm', '3', '7', NULL);
INSERT INTO `usuarios` (`id`, `gmail`, `password_hash`, `rol_id`, `alumno_id`, `profesor_id`) VALUES ('29', '52838090@correo.com', '$2b$10$KECO8FDnvs0s7LYafBnA0udwZrg44tz9pFSOSzlRCdB6yt9HWmqNy', '3', '17', NULL);
INSERT INTO `usuarios` (`id`, `gmail`, `password_hash`, `rol_id`, `alumno_id`, `profesor_id`) VALUES ('30', '5283800@correo.com', '$2b$10$yrab1MkEKFCEnWDczNs3beWe0u5eZd2edZR0So8eFFhyJP33Ocqzy', '3', '18', NULL);
INSERT INTO `usuarios` (`id`, `gmail`, `password_hash`, `rol_id`, `alumno_id`, `profesor_id`) VALUES ('31', '5283801@correo.com', '$2b$10$NwJppO6medQ2rVqCzlJH7uDkxHJwhrfKqOPLjEEtKvHwAaqB7bD92', '3', '19', NULL);
INSERT INTO `usuarios` (`id`, `gmail`, `password_hash`, `rol_id`, `alumno_id`, `profesor_id`) VALUES ('32', '5283802@correo.com', '$2b$10$IHjbunxpSf7zhux1EOuCUufbz5dSaYw1pztYMFEWQauuxOeMU/Hbu', '3', '20', NULL);
INSERT INTO `usuarios` (`id`, `gmail`, `password_hash`, `rol_id`, `alumno_id`, `profesor_id`) VALUES ('33', '5283803@correo.com', '$2b$10$swvhtm/FICHoVakwbIh28.QlIhM0YOEahEclKsGh5O1g8J.95sQTq', '3', '21', NULL);
INSERT INTO `usuarios` (`id`, `gmail`, `password_hash`, `rol_id`, `alumno_id`, `profesor_id`) VALUES ('34', '5283804@correo.com', '$2b$10$be40LgS3AwJc7n3F6YDX.uPHMwh/kx21A2tbzdJaL1vwGeaXn1Q2G', '3', '22', NULL);
INSERT INTO `usuarios` (`id`, `gmail`, `password_hash`, `rol_id`, `alumno_id`, `profesor_id`) VALUES ('35', '1000000@correo.com', '$2b$10$RFRfWrS57803t/Ndsk9ivOFtoBCzVIx3xTcyPpQVgOLxkxrtK8rLi', '3', '23', NULL);
INSERT INTO `usuarios` (`id`, `gmail`, `password_hash`, `rol_id`, `alumno_id`, `profesor_id`) VALUES ('38', '6083801@correo.com', '$2b$10$iR9UM7wj2hofk7TUN2HXFeZdsyHW.u4X4bMKuhTpjpNBSHeZuBbeu', '3', '5', NULL);
INSERT INTO `usuarios` (`id`, `gmail`, `password_hash`, `rol_id`, `alumno_id`, `profesor_id`) VALUES ('39', '528380hj@correo.com', '$2b$10$12d8Rsfk4CzXcgPQygPeauJhzdko9RfaSve1mSn0PjVcogwxFciJq', '3', '7', NULL);
INSERT INTO `usuarios` (`id`, `gmail`, `password_hash`, `rol_id`, `alumno_id`, `profesor_id`) VALUES ('40', 'dasd@correo.com', '$2b$10$pGlPQzH7Tq1fx2ae3bEXnO38KVlVk5Fd3I4t92lW6QNzhMChCLyxi', '3', '8', NULL);
INSERT INTO `usuarios` (`id`, `gmail`, `password_hash`, `rol_id`, `alumno_id`, `profesor_id`) VALUES ('42', '5522464848hjbv@correo.com', '$2b$10$mQI3dBka9CFRh4IfMdX2yOVfmT7RkiqQifeIQXSeZRdF6k6mzyGQW', '3', '10', NULL);
INSERT INTO `usuarios` (`id`, `gmail`, `password_hash`, `rol_id`, `alumno_id`, `profesor_id`) VALUES ('43', '65444564gh@correo.com', '$2b$10$V4Bu7LRHdQYWRQgRvZ9OU.MgC54zRNlpx9ozQNl5KOYUmeaCUPY96', '3', '11', NULL);
INSERT INTO `usuarios` (`id`, `gmail`, `password_hash`, `rol_id`, `alumno_id`, `profesor_id`) VALUES ('44', 'hjghjhgj@correo.com', '$2b$10$oCGdYTFOOrlPVS33BVN1DeUu7w4w9HF08pMKSivMQ25Aycd3whoPm', '3', '15', NULL);
INSERT INTO `usuarios` (`id`, `gmail`, `password_hash`, `rol_id`, `alumno_id`, `profesor_id`) VALUES ('45', 'fsdfsa@correo.com', '$2b$10$wF9bGtVYfrBtLtpFKRF4Pu3Z3e4j16ElAIJ26nSLtUgKYaAPpTkeK', '3', '17', NULL);
INSERT INTO `usuarios` (`id`, `gmail`, `password_hash`, `rol_id`, `alumno_id`, `profesor_id`) VALUES ('46', 'fsdf@correo.com', '$2b$10$7yKsS5LIB5L52UH3m3Mb2.oORzGsLgbh0mlmbwNIehp24DRZBki2m', '3', '18', NULL);
INSERT INTO `usuarios` (`id`, `gmail`, `password_hash`, `rol_id`, `alumno_id`, `profesor_id`) VALUES ('47', 'yjggygyyg@correo.com', '$2b$10$TjQyiT6JS43dD1ECtZ4goOO6M8IECQa61afy.Zo78HRvkKNWA80p.', '3', '19', NULL);
INSERT INTO `usuarios` (`id`, `gmail`, `password_hash`, `rol_id`, `alumno_id`, `profesor_id`) VALUES ('48', '5283809dsad@correo.com', '$2b$10$/lP2Gq63Q4DSoj9agIhoVOjZn4i1Vy/ZGxJ5NltWX0pkJTYlmbirC', '2', NULL, '16');
INSERT INTO `usuarios` (`id`, `gmail`, `password_hash`, `rol_id`, `alumno_id`, `profesor_id`) VALUES ('50', '5522464848dasd@correo.com', '$2b$10$PyBvNraZ6gepcyFBFsIkneH7cVfCp8sbsPfrcgZ2Zbxp19RECpVSi', '2', NULL, '18');

CREATE TABLE `ventas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alumno_id` int(11) DEFAULT NULL,
  `tutor_id` int(11) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total` decimal(10,2) NOT NULL,
  `metodo_pago` enum('efectivo','tarjeta','transferencia') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_ventas_alumno` (`alumno_id`),
  KEY `fk_ventas_tutor` (`tutor_id`),
  CONSTRAINT `fk_ventas_alumno` FOREIGN KEY (`alumno_id`) REFERENCES `alumnos` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_ventas_tutor` FOREIGN KEY (`tutor_id`) REFERENCES `tutores` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;

INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('7', '1', '1', 'Thu Sep 18 2025 13:10:31 GMT-0300 (GMT-03:00)', '0.00', 'efectivo', 'Thu Sep 18 2025 13:10:31 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:10:31 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('8', '1', '1', 'Thu Sep 18 2025 13:14:46 GMT-0300 (GMT-03:00)', '0.00', 'efectivo', 'Thu Sep 18 2025 13:14:46 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:14:46 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('9', '1', '1', 'Thu Sep 18 2025 13:15:25 GMT-0300 (GMT-03:00)', '0.00', 'efectivo', 'Thu Sep 18 2025 13:15:25 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:15:25 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('10', '1', '1', 'Thu Sep 18 2025 13:25:15 GMT-0300 (GMT-03:00)', '0.00', 'efectivo', 'Thu Sep 18 2025 13:25:15 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:25:15 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('11', '1', '1', 'Thu Sep 18 2025 13:31:00 GMT-0300 (GMT-03:00)', '0.00', 'efectivo', 'Thu Sep 18 2025 13:31:00 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:31:00 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('12', '1', '1', 'Thu Sep 18 2025 13:32:50 GMT-0300 (GMT-03:00)', '0.00', 'efectivo', 'Thu Sep 18 2025 13:32:50 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:32:50 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('13', '1', '1', 'Thu Sep 18 2025 13:34:43 GMT-0300 (GMT-03:00)', '0.00', 'efectivo', 'Thu Sep 18 2025 13:34:43 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:34:43 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('14', '1', '1', 'Thu Sep 18 2025 13:36:13 GMT-0300 (GMT-03:00)', '0.00', 'efectivo', 'Thu Sep 18 2025 13:36:13 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:36:13 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('15', '1', '1', 'Thu Sep 18 2025 13:37:53 GMT-0300 (GMT-03:00)', '0.00', 'efectivo', 'Thu Sep 18 2025 13:37:53 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:37:53 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('16', '1', '1', 'Thu Sep 18 2025 13:38:48 GMT-0300 (GMT-03:00)', '0.00', 'efectivo', 'Thu Sep 18 2025 13:38:48 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:38:48 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('17', '1', '1', 'Thu Sep 18 2025 13:43:08 GMT-0300 (GMT-03:00)', '0.00', 'efectivo', 'Thu Sep 18 2025 13:43:08 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:43:08 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('18', '1', '1', 'Thu Sep 18 2025 13:44:38 GMT-0300 (GMT-03:00)', '0.00', 'efectivo', 'Thu Sep 18 2025 13:44:38 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:44:38 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('19', '1', '1', 'Thu Sep 18 2025 13:44:50 GMT-0300 (GMT-03:00)', '0.00', 'efectivo', 'Thu Sep 18 2025 13:44:50 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:44:50 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('20', '1', '1', 'Thu Sep 18 2025 13:47:04 GMT-0300 (GMT-03:00)', '0.00', 'efectivo', 'Thu Sep 18 2025 13:47:04 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:47:04 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('21', '1', '1', 'Thu Sep 18 2025 13:47:14 GMT-0300 (GMT-03:00)', '0.00', 'efectivo', 'Thu Sep 18 2025 13:47:14 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:47:14 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('22', '1', '1', 'Thu Sep 18 2025 13:47:56 GMT-0300 (GMT-03:00)', '0.00', 'efectivo', 'Thu Sep 18 2025 13:47:56 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:47:56 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('23', '1', '1', 'Thu Sep 18 2025 13:49:00 GMT-0300 (GMT-03:00)', '0.00', 'efectivo', 'Thu Sep 18 2025 13:49:00 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:49:00 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('24', '1', '1', 'Thu Sep 18 2025 13:51:48 GMT-0300 (GMT-03:00)', '0.00', 'efectivo', 'Thu Sep 18 2025 13:51:48 GMT-0300 (GMT-03:00)', 'Thu Sep 18 2025 13:51:48 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('25', '1', '1', 'Fri Sep 19 2025 00:53:43 GMT-0300 (GMT-03:00)', '0.00', 'efectivo', 'Fri Sep 19 2025 00:53:43 GMT-0300 (GMT-03:00)', 'Fri Sep 19 2025 00:53:43 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('26', '1', '1', 'Fri Sep 19 2025 01:15:58 GMT-0300 (GMT-03:00)', '0.00', 'efectivo', 'Fri Sep 19 2025 01:15:58 GMT-0300 (GMT-03:00)', 'Fri Sep 19 2025 01:15:58 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('27', '1', '1', 'Fri Sep 19 2025 01:22:00 GMT-0300 (GMT-03:00)', '0.00', 'efectivo', 'Fri Sep 19 2025 01:22:00 GMT-0300 (GMT-03:00)', 'Fri Sep 19 2025 01:22:00 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('28', '1', '1', 'Fri Sep 19 2025 01:22:19 GMT-0300 (GMT-03:00)', '0.00', 'efectivo', 'Fri Sep 19 2025 01:22:19 GMT-0300 (GMT-03:00)', 'Fri Sep 19 2025 01:22:19 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('29', '1', '1', 'Fri Sep 19 2025 01:26:16 GMT-0300 (GMT-03:00)', '0.00', 'efectivo', 'Fri Sep 19 2025 01:26:16 GMT-0300 (GMT-03:00)', 'Fri Sep 19 2025 01:26:16 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('30', '1', '1', 'Fri Sep 19 2025 11:55:06 GMT-0300 (GMT-03:00)', '0.00', 'efectivo', 'Fri Sep 19 2025 11:55:06 GMT-0300 (GMT-03:00)', 'Fri Sep 19 2025 11:55:06 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('31', '1', '1', 'Mon Sep 22 2025 19:03:18 GMT-0300 (GMT-03:00)', '1435248.00', 'efectivo', 'Mon Sep 22 2025 19:03:18 GMT-0300 (GMT-03:00)', 'Mon Sep 22 2025 19:03:18 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('32', '1', '1', 'Mon Sep 22 2025 19:06:52 GMT-0300 (GMT-03:00)', '450000.00', 'efectivo', 'Mon Sep 22 2025 19:06:52 GMT-0300 (GMT-03:00)', 'Mon Sep 22 2025 19:06:52 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('33', '1', '1', 'Mon Sep 22 2025 19:15:34 GMT-0300 (GMT-03:00)', '27500.00', 'efectivo', 'Mon Sep 22 2025 19:15:34 GMT-0300 (GMT-03:00)', 'Mon Sep 22 2025 19:15:34 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('34', '1', '1', 'Fri Sep 26 2025 12:48:56 GMT-0300 (GMT-03:00)', '77500.00', 'efectivo', 'Fri Sep 26 2025 12:48:56 GMT-0300 (GMT-03:00)', 'Fri Sep 26 2025 12:48:56 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('35', '1', '1', 'Fri Sep 26 2025 19:56:57 GMT-0300 (GMT-03:00)', '3242340.00', 'efectivo', 'Fri Sep 26 2025 19:56:57 GMT-0300 (GMT-03:00)', 'Fri Sep 26 2025 19:56:57 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('36', '1', '1', 'Fri Oct 03 2025 17:46:53 GMT-0300 (GMT-03:00)', '27500.00', 'efectivo', 'Fri Oct 03 2025 17:46:53 GMT-0300 (GMT-03:00)', 'Fri Oct 03 2025 17:46:53 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('37', '1', '1', 'Fri Oct 10 2025 15:56:24 GMT-0300 (GMT-03:00)', '1632170.00', 'efectivo', 'Fri Oct 10 2025 15:56:24 GMT-0300 (GMT-03:00)', 'Fri Oct 10 2025 15:56:24 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('38', '1', '1', 'Fri Oct 10 2025 16:04:06 GMT-0300 (GMT-03:00)', '1626670.00', 'efectivo', 'Fri Oct 10 2025 16:04:06 GMT-0300 (GMT-03:00)', 'Fri Oct 10 2025 16:04:06 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('39', '1', '1', 'Fri Oct 10 2025 16:19:56 GMT-0300 (GMT-03:00)', '2269638.00', 'efectivo', 'Fri Oct 10 2025 16:19:56 GMT-0300 (GMT-03:00)', 'Fri Oct 10 2025 16:19:56 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('40', '1', '1', 'Fri Oct 10 2025 16:23:01 GMT-0300 (GMT-03:00)', '1621170.00', 'efectivo', 'Fri Oct 10 2025 16:23:01 GMT-0300 (GMT-03:00)', 'Fri Oct 10 2025 16:23:01 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('41', '1', '1', 'Fri Oct 10 2025 16:23:30 GMT-0300 (GMT-03:00)', '1296936.00', 'efectivo', 'Fri Oct 10 2025 16:23:30 GMT-0300 (GMT-03:00)', 'Fri Oct 10 2025 16:23:30 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('42', '1', '1', 'Fri Oct 10 2025 16:49:59 GMT-0300 (GMT-03:00)', '1296936.00', 'efectivo', 'Fri Oct 10 2025 16:49:59 GMT-0300 (GMT-03:00)', 'Fri Oct 10 2025 16:49:59 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('43', '1', '1', 'Fri Oct 10 2025 16:50:21 GMT-0300 (GMT-03:00)', '1621170.00', 'efectivo', 'Fri Oct 10 2025 16:50:21 GMT-0300 (GMT-03:00)', 'Fri Oct 10 2025 16:50:21 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('44', '1', '1', 'Fri Oct 10 2025 16:50:50 GMT-0300 (GMT-03:00)', '2269638.00', 'efectivo', 'Fri Oct 10 2025 16:50:50 GMT-0300 (GMT-03:00)', 'Fri Oct 10 2025 16:50:50 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('45', '1', '1', 'Mon Oct 20 2025 14:17:51 GMT-0300 (GMT-03:00)', '648468.00', 'efectivo', 'Mon Oct 20 2025 14:17:51 GMT-0300 (GMT-03:00)', 'Mon Oct 20 2025 14:17:51 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('46', '1', '1', 'Mon Oct 20 2025 17:21:47 GMT-0300 (GMT-03:00)', '972702.00', 'efectivo', 'Mon Oct 20 2025 14:21:47 GMT-0300 (GMT-03:00)', 'Mon Oct 20 2025 14:21:47 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('47', '1', '1', 'Tue Oct 21 2025 23:12:03 GMT-0300 (GMT-03:00)', '648468.00', 'efectivo', 'Tue Oct 21 2025 20:12:03 GMT-0300 (GMT-03:00)', 'Tue Oct 21 2025 20:12:03 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('48', '1', '1', 'Fri Oct 24 2025 18:52:28 GMT-0300 (GMT-03:00)', '972702.00', 'efectivo', 'Fri Oct 24 2025 15:52:28 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:52:28 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('49', '1', '1', 'Fri Oct 24 2025 18:53:42 GMT-0300 (GMT-03:00)', '324234.00', 'efectivo', 'Fri Oct 24 2025 15:53:42 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:53:42 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('50', '1', '1', 'Fri Oct 24 2025 18:54:38 GMT-0300 (GMT-03:00)', '1296936.00', 'efectivo', 'Fri Oct 24 2025 15:54:38 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:54:38 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('51', '1', '1', 'Fri Oct 24 2025 18:58:00 GMT-0300 (GMT-03:00)', '1296936.00', 'efectivo', 'Fri Oct 24 2025 15:58:00 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 15:58:00 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('52', '1', '1', 'Fri Oct 24 2025 19:02:10 GMT-0300 (GMT-03:00)', '972702.00', 'efectivo', 'Fri Oct 24 2025 16:02:10 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 16:02:10 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('53', '1', '1', 'Fri Oct 24 2025 19:05:32 GMT-0300 (GMT-03:00)', '972702.00', 'efectivo', 'Fri Oct 24 2025 16:05:32 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 16:05:32 GMT-0300 (GMT-03:00)');
INSERT INTO `ventas` (`id`, `alumno_id`, `tutor_id`, `fecha`, `total`, `metodo_pago`, `created_at`, `updated_at`) VALUES ('54', '1', '1', 'Fri Oct 24 2025 19:09:09 GMT-0300 (GMT-03:00)', '972702.00', 'efectivo', 'Fri Oct 24 2025 16:09:09 GMT-0300 (GMT-03:00)', 'Fri Oct 24 2025 16:09:09 GMT-0300 (GMT-03:00)');


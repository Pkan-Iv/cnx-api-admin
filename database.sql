USE `ivrdb`;

DROP TABLE IF EXISTS `Accounts`;
CREATE TABLE `Accounts` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(64) NOT NULL,
  `password` BINARY(20) NOT NULL,
  `project_id` INT NULL DEFAULT NULL,
  `role_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `credentials_key` (`username` ASC, `password` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `Acls`;
CREATE TABLE `Acls` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `role_id` int(10) unsigned NOT NULL,
  `resource_id` int(10) unsigned NOT NULL,
  `create` TINYINT NOT NULL DEFAULT 0,
  `read` TINYINT NOT NULL DEFAULT 0,
  `update` TINYINT NOT NULL DEFAULT 0,
  `delete` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `acls_key` (`role_id` ASC, `resource_id` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `Resources`;
CREATE TABLE `Resources` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `Roles`;
CREATE TABLE `Roles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TRIGGER IF EXISTS Roles_insert;

INSERT INTO `Resources` (`id`, `name`) VALUES (1, 'Accounts');
INSERT INTO `Resources` (`id`, `name`) VALUES (2, 'Roles');
INSERT INTO `Resources` (`id`, `name`) VALUES (3, 'Acls');
INSERT INTO `Resources` (`id`, `name`) VALUES (4, 'Projects');
INSERT INTO `Resources` (`id`, `name`) VALUES (5, 'Numbers');
INSERT INTO `Resources` (`id`, `name`) VALUES (6, 'Messages');
INSERT INTO `Resources` (`id`, `name`) VALUES (7, 'Plans');
INSERT INTO `Resources` (`id`, `name`) VALUES (8, 'Pra');

INSERT INTO `Roles` (`id`, `name`) VALUES (1, 'administrator');
INSERT INTO `Roles` (`id`, `name`) VALUES (2, 'exploitation');

INSERT INTO `Acls` (`id`, `role_id`, `resource_id`, `create`, `read`, `update`, `delete`) VALUES (1, 1, 1, 1, 1, 1, 1);
INSERT INTO `Acls` (`id`, `role_id`, `resource_id`, `create`, `read`, `update`, `delete`) VALUES (2, 1, 2, 1, 1, 1, 1);
INSERT INTO `Acls` (`id`, `role_id`, `resource_id`, `create`, `read`, `update`, `delete`) VALUES (3, 1, 3, 1, 1, 1, 1);
INSERT INTO `Acls` (`id`, `role_id`, `resource_id`, `create`, `read`, `update`, `delete`) VALUES (4, 1, 4, 1, 1, 1, 1);
INSERT INTO `Acls` (`id`, `role_id`, `resource_id`, `create`, `read`, `update`, `delete`) VALUES (5, 1, 5, 1, 1, 1, 1);
INSERT INTO `Acls` (`id`, `role_id`, `resource_id`, `create`, `read`, `update`, `delete`) VALUES (6, 1, 6, 1, 1, 1, 1);
INSERT INTO `Acls` (`id`, `role_id`, `resource_id`, `create`, `read`, `update`, `delete`) VALUES (7, 1, 7, 1, 1, 1, 1);
INSERT INTO `Acls` (`id`, `role_id`, `resource_id`, `create`, `read`, `update`, `delete`) VALUES (8, 1, 8, 1, 1, 1, 1);
INSERT INTO `Acls` (`id`, `role_id`, `resource_id`, `create`, `read`, `update`, `delete`) VALUES (9, 2, 4, 1, 1, 1, 1);
INSERT INTO `Acls` (`id`, `role_id`, `resource_id`, `create`, `read`, `update`, `delete`) VALUES (10, 2, 5, 1, 1, 1, 1);
INSERT INTO `Acls` (`id`, `role_id`, `resource_id`, `create`, `read`, `update`, `delete`) VALUES (11, 2, 6, 1, 1, 1, 1);
INSERT INTO `Acls` (`id`, `role_id`, `resource_id`, `create`, `read`, `update`, `delete`) VALUES (12, 2, 7, 1, 1, 1, 1);
INSERT INTO `Acls` (`id`, `role_id`, `resource_id`, `create`, `read`, `update`, `delete`) VALUES (13, 2, 8, 1, 1, 1, 1);

INSERT INTO `Accounts` (`username`, `password`, `project_id`, `role_id`) VALUES ('connectics', UNHEX(SHA1('cnx427!')), 1, 1);

DELIMITER $$

CREATE TRIGGER Roles_insert AFTER INSERT ON `Roles` FOR EACH ROW
BEGIN
  INSERT INTO `Acls` (`role_id`, `resource_id`) SELECT NEW.`id`, R.`id` FROM `Resources` R WHERE R.`name` <> 'Accounts' ORDER BY R.`id` ASC;
END$$

DELIMITER ;

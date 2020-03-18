USE `ivrdb`;

CREATE TABLE `Accounts` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(64) NOT NULL,
  `password` BINARY(20) NOT NULL,
  `project_id` INT NULL DEFAULT NULL,
  `role_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `credentials_key` (`username` ASC, `password` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `Acls` (
  `role_id` int(10) unsigned NOT NULL,
  `resource_id` int(10) unsigned NOT NULL,
  `create` TINYINT NOT NULL DEFAULT 0,
  `read` TINYINT NOT NULL DEFAULT 0,
  `update` TINYINT NOT NULL DEFAULT 0,
  `delete` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`role_id`,`resource_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `Resources` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `Roles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `Resources` (`name`) VALUES ('Accounts');
INSERT INTO `Resources` (`name`) VALUES ('Roles');
INSERT INTO `Resources` (`name`) VALUES ('Acls');
INSERT INTO `Resources` (`name`) VALUES ('Projects');
INSERT INTO `Resources` (`name`) VALUES ('Numbers');
INSERT INTO `Resources` (`name`) VALUES ('Messages');
INSERT INTO `Resources` (`name`) VALUES ('Plans');
INSERT INTO `Resources` (`name`) VALUES ('Pra');

INSERT INTO `Roles` (`name`) VALUES ('administrator');

INSERT INTO `Acls` (`role_id`, `resource_id`, `create`, `read`, `update`, `delete`) VALUES (1, 1, 1, 1, 1, 1);
INSERT INTO `Acls` (`role_id`, `resource_id`, `create`, `read`, `update`, `delete`) VALUES (1, 2, 1, 1, 1, 1);
INSERT INTO `Acls` (`role_id`, `resource_id`, `create`, `read`, `update`, `delete`) VALUES (1, 3, 1, 1, 1, 1);
INSERT INTO `Acls` (`role_id`, `resource_id`, `create`, `read`, `update`, `delete`) VALUES (1, 4, 1, 1, 1, 1);
INSERT INTO `Acls` (`role_id`, `resource_id`, `create`, `read`, `update`, `delete`) VALUES (1, 5, 1, 1, 1, 1);
INSERT INTO `Acls` (`role_id`, `resource_id`, `create`, `read`, `update`, `delete`) VALUES (1, 6, 1, 1, 1, 1);
INSERT INTO `Acls` (`role_id`, `resource_id`, `create`, `read`, `update`, `delete`) VALUES (1, 7, 1, 1, 1, 1);
INSERT INTO `Acls` (`role_id`, `resource_id`, `create`, `read`, `update`, `delete`) VALUES (1, 8, 1, 1, 1, 1);

INSERT INTO `Accounts` (`username`, `password`, `role_id`) VALUES ('connectics', UNHEX(SHA1('cnx427!')), 1);

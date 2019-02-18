CREATE TABLE `lizbazi`.`session`
(
  `id` VARCHAR
(40) NOT NULL,
  `creation_date` DATETIME NULL,
  `device_id` VARCHAR
(255) NOT NULL,
  `expiration_date` DATETIME NULL,
  `ip` VARCHAR
(255) NULL,
  `platform` VARCHAR
(255) NULL,
  `push_id` VARCHAR
(255) NULL,
  `token` VARCHAR
(255) NOT NULL,
  `user_id` VARCHAR
(45) NOT NULL,
  `version_id` VARCHAR
(45) NULL,
  `device_info` VARCHAR
(255) NOT NULL,
  PRIMARY KEY
(`id`));

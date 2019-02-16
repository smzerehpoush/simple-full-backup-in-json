CREATE TABLE `lizbazi`.`version`
(
  `id` VARCHAR
(40) NOT NULL,
  `creation_date` DATETIME NULL,
  `active` BIT
(1) NOT NULL,
  `build_no` BIGINT
(20) NOT NULL,
  `platform` VARCHAR
(255) NOT NULL,
  `published` BIT
(1) NOT NULL,
  `release_note` VARCHAR
(45) NULL,
  `version` VARCHAR
(255) NOT NULL,
  PRIMARY KEY
(`id`));

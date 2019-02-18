CREATE TABLE `lizbazi`.`resort_feature`
(
  `id` VARCHAR
(40) NOT NULL,
  `creation_date` DATETIME NULL,
  `title` VARCHAR
(255) NULL,
  `value` VARCHAR
(255) NULL,
  `icon_media_id` VARCHAR
(45) NULL,
  `resort_id` VARCHAR
(45) NULL,
  `color` VARCHAR
(255) NULL,
  `display_order` INT NULL,
  PRIMARY KEY
(`id`));

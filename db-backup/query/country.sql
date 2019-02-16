CREATE TABLE `lizbazi`.`country`
(
  `id` VARCHAR
(40) NOT NULL,
  `creation_date` DATETIME NULL,
  `country_name` VARCHAR
(255) NOT NULL,
  `pre_code` VARCHAR
(255) NULL,
  `is_sms_active` BIT
(1) NULL,
  `flag_photo_media_id` VARCHAR
(45) NULL,
  PRIMARY KEY
(`id`));

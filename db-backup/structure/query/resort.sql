CREATE TABLE `lizbazi`.`resort`
(
  `id` VARCHAR
(40) NOT NULL,
  `creation_date` DATETIME NULL,
  `latitude` DOUBLE NULL,
  `longitude` DOUBLE NULL,
  `resort_name` VARCHAR
(255) NULL,
  `status` VARCHAR
(255) NULL,
  `country_id` VARCHAR
(45) NULL,
  `map_photo_media_id` VARCHAR
(45) NULL,
  `weather_url` VARCHAR
(255) NULL,
  `description` TEXT
(5000) NULL,
  `description_fa` TEXT
(5000) NULL,
  `order_number` INT NULL,
  PRIMARY KEY
(`id`));

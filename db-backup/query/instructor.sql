CREATE TABLE `lizbazi`.`instructor`
(
  `id` VARCHAR
(40) NOT NULL,
  `creation_date` DATETIME NULL,
  `contact_info_description` VARCHAR
(255) NULL,
  `display_order` INT NOT NULL,
  `email` VARCHAR
(255) NULL,
  `list_description` VARCHAR
(255) NULL,
  `instructor_name` VARCHAR
(255) NOT NULL,
  `phone_number` VARCHAR
(255) NOT NULL,
  `skill` VARCHAR
(255) NULL,
  `sports_field` VARCHAR
(255) NOT NULL,
  `list_photo_media_id` VARCHAR
(45) NULL,
  `contact_info_photo_media_id` VARCHAR
(45) NULL,
  `country_id` VARCHAR
(45) NULL,
  PRIMARY KEY
(`id`));

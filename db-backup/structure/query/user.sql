CREATE TABLE `lizbazi`.`user`
(
  `id` VARCHAR
(40) NOT NULL,
  `creation_date` DATETIME NULL,
  `email` VARCHAR
(255) NULL,
  `full_name` VARCHAR
(255) NULL,
  `hashed_password` VARCHAR
(255) NULL,
  `mobile_no` VARCHAR
(255) NULL,
  `role` VARCHAR
(255) NULL,
  `sport_field` VARCHAR
(255) NULL,
  `username` VARCHAR
(255) NULL,
  `validated` BIT
(1) NOT NULL,
  `country_id` VARCHAR
(45) NULL,
  `profile_picture_media_id` VARCHAR
(45) NULL,
  PRIMARY KEY
(`id`));

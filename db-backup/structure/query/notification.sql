CREATE TABLE `lizbazi`.`notification`
(
  `id` VARCHAR
(40) NOT NULL,
  `creation_date` DATETIME NULL,
  `body` TEXT
(5000) NOT NULL,
  `sub_title` VARCHAR
(255) NULL,
  `title` VARCHAR
(255) NULL,
  `filter_country_id` VARCHAR
(45) NULL,
  `sender_user_id` VARCHAR
(45) NULL,
  PRIMARY KEY
(`id`));

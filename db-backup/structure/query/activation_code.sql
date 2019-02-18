CREATE TABLE `lizbazi`.`activation_code`
(
  `id` VARCHAR
(40) NOT NULL,
  `creation_date` DATETIME NULL,
  `code` VARCHAR
(5) NOT NULL,
  `consume_date` DATETIME NULL,
  `consumed` BIT
(1) NOT NULL,
  `tries_count` INT NULL,
  `user_id` VARCHAR
(45) NOT NULL,
  PRIMARY KEY
(`id`));

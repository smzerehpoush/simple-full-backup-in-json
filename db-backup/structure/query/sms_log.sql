CREATE TABLE `lizbazi`.`sms_log`
(
  `id` VARCHAR
(40) NOT NULL,
  `creation_date` DATETIME NULL,
  `details` VARCHAR
(255) NULL,
  `mobile_no` VARCHAR
(255) NOT NULL,
  `send_status` INT NULL,
  `text` TEXT
(5000) NOT NULL,
  `type` VARCHAR
(255) NULL,
  PRIMARY KEY
(`id`));

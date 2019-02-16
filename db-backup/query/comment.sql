CREATE TABLE `lizbazi`.`comment`
(
  `id` VARCHAR
(40) NOT NULL,
  `creation_date` DATETIME NULL,
  `moderation_status` INT NULL,
  `text` VARCHAR
(255) NULL,
  `authur_user_id` VARCHAR
(45) NOT NULL,
  `learning_video_id` VARCHAR
(45) NULL,
  `moderate_user_id` VARCHAR
(45) NULL,
  PRIMARY KEY
(`id`));

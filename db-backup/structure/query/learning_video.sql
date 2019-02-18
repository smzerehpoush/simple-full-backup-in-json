CREATE TABLE `lizbazi`.`learninig_video`
(
  `id` VARCHAR
(40) NOT NULL,
  `creation_date` DATETIME NULL,
  `caption` VARCHAR
(1000) NULL,
  `level` INT NULL,
  `video_name` VARCHAR
(255) NULL,
  `order_number` INT NOT NULL,
  `sports_field` VARCHAR
(255) NULL,
  `create_user_id` VARCHAR
(45) NOT NULL,
  `eng_video_media_id` VARCHAR
(45) NULL,
  `fa_video_media_id` VARCHAR
(45) NULL,
  `video_length_seconds` INT NULL,
  `cover_photo_media_id` VARCHAR
(45) NULL,
  `en_video_url` VARCHAR
(1000) NULL,
  `fa_video_url` VARCHAR
(5000) NULL,
  `description_fa` VARCHAR
(5000) NULL,
  `en_video_size_megabytes` DOUBLE NULL,
  `fa_video_size_megabytes` DOUBLE NULL,
  PRIMARY KEY
(`id`));

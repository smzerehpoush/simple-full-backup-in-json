CREATE TABLE `lizbazi`.`media`
(   `id` VARCHAR
(40) NOT NULL,   `creation_date` VARCHAR
(45) NULL,   `address` VARCHAR
(1000) NOT NULL,   `file_name` VARCHAR
(255) NOT NULL,   `file_size` BIGINT
(20) NULL,   `type` VARCHAR
(255) NOT NULL,   `owner_user_id` VARCHAR
(45) NULL,   `stored_file_name` VARCHAR
(255) NULL,   PRIMARY KEY
(`id`));
CREATE TABLE `positions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) DEFAULT NULL, 
  `latitude` VARCHAR(255) DEFAULT NULL, 
  `longitude` VARCHAR(255) DEFAULT NULL, 
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`)
);
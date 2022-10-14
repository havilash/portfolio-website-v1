
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
-- flush privileges;

DROP DATABASE IF EXISTS db_havilash_sivaratnam;
CREATE DATABASE IF NOT EXISTS db_havilash_sivaratnam;

USE db_havilash_sivaratnam;

CREATE TABLE users(
	id int NOT NULL UNIQUE AUTO_INCREMENT,
	username VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL UNIQUE,
    
    PRIMARY KEY (id)
);

CREATE DATABASE IF NOT EXISTS Exam;
USE Exam;
CREATE TABLE IF NOT EXISTS
Users(
  Id INT(6) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  Username VARCHAR(15) NOT NULL,
  Password VARCHAR(10) NOT NULL
);

INSERT INTO Users VALUES(1,"Savita",HASHBYTES('Admin@123'));
INSERT INTO Users VALUES(1,"Shilpi",HASHBYTES('Shilpi123@'));

-- question qid 4 option
-- qid ansid
-- userid testid score

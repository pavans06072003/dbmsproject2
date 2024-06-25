CREATE TABLE users (
    Id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(15) NOT NULL,
    Password VARCHAR(10) NOT NULL,
    Name VARCHAR(50) NOT NULL,
    College VARCHAR(100),
    Email VARCHAR(100) UNIQUE,
    Year VARCHAR(20),
    Gender ENUM('Male', 'Female'),
    DOB DATE,
    Branch VARCHAR(50)
);

CREATE TABLE examiner (
    examiner_id INT NOT NULL PRIMARY KEY,
    email VARCHAR(500) NOT NULL,
    password VARCHAR(500) NOT NULL
);

CREATE TABLE branch (
    BranchId INT NOT NULL PRIMARY KEY,
    BranchName VARCHAR(30) NOT NULL
);

CREATE TABLE question (
    Que VARCHAR(50) NOT NULL,
    Op1 VARCHAR(50) NOT NULL,
    Op2 VARCHAR(50) NOT NULL,
    Op3 VARCHAR(50) NOT NULL,
    Op4 VARCHAR(50) NOT NULL,
    BranchId INT NOT NULL,
    eid TEXT NOT NULL
);

CREATE TABLE exam (
    eid TEXT NOT NULL,
    title VARCHAR(100) NOT NULL,
   `right` INT NOT NULL,
    wrong INT NOT NULL,
    total INT NOT NULL,
    time BIGINT NOT NULL,
    scheduled_date DATE,
    branch_id INT,
    scheduled_time TIME NOT NULL);


CREATE TABLE answer (
    Que VARCHAR(50) NOT NULL,
    correct_ans VARCHAR(50) NOT NULL
);

INSERT INTO Branch (BranchId, BranchName) VALUES
(101, 'CSE'),
(102, 'ISE'),
(103, 'ECE'),
(104, 'EEE'),
(105, 'MECH'),
(106, 'AIML');
CREATE DATABASE friendFinder;

USE friendFinder;

CREATE TABLE friends (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name TINYTEXT NOT NULL,
    image TINYTEXT NOT NULL,
    answer1 INT NOT NULL,
    answer2 INT NOT NULL,
    answer3 INT NOT NULL,
    answer4 INT NOT NULL,
    answer5 INT NOT NULL,
    answer6 INT NOT NULL,
    answer7 INT NOT NULL,
    answer8 INT NOT NULL,
    answer9 INT NOT NULL,
    answer10 INT NOT NULL
);

INSERT INTO friends 
(name, image, answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8, answer9, answer10)
VALUES 
('my name', 'someimage.com', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);

SELECT * FROM friends;
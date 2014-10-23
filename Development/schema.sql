CREATE DATABASE note_board;

USE note_board;

CREATE TABLE User
(
	user_id INT NOT NULL AUTO_INCREMENT,
	email VARCHAR(50) NOT NULL,
	UNIQUE(user_id),
	UNIQUE(email),
	PRIMARY KEY(user_id)
);

CREATE TABLE Board
(
	board_id INT NOT NULL AUTO_INCREMENT,
    user INT NOT NULL,
	FOREIGN KEY (user) REFERENCES User(user_id),
	name VARCHAR(100) NOT NULL,
	UNIQUE(board_id),
	PRIMARY KEY(board_id)
);

CREATE TABLE Board_Column
(
	board_column_id INT NOT NULL AUTO_INCREMENT,
    board INT NOT NULL,
	FOREIGN KEY (board) REFERENCES Board(board_id),
	title VARCHAR(100),
	UNIQUE(board_column_id),
	PRIMARY KEY(board_column_id)
);

CREATE TABLE Note
(
	note_id INT NOT NULL AUTO_INCREMENT,
    board_column INT NOT NULL,
	FOREIGN KEY (board_column) REFERENCES Board_Column(board_column_id),
	content TEXT,
	UNIQUE(note_id),
	PRIMARY KEY(note_id)
);
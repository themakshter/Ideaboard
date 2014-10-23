CREATE database note_board;
USE note_board;
CREATE TABLE users
(
	user_id int auto_increment,
	email varchar(50),
	PRIMARY KEY(user_id)
);
CREATE TABLE boards
(
	board_id int auto_increment,
    user int,
	FOREIGN KEY (user) REFERENCES users(user_id),
	name varchar(100),
	PRIMARY KEY(board_id)
);
CREATE TABLE collumns
(
	collumn_id int auto_increment,
    board int,
	FOREIGN KEY (board) REFERENCES boards(board_id),
	title varchar(100),
	PRIMARY KEY(collumn_id)
);
CREATE TABLE notes
(
	note_id int auto_increment,
    collumn int,
	FOREIGN KEY (collumn) REFERENCES collumns(collumn_id),
	content TEXT,
	PRIMARY KEY(note_id)
)
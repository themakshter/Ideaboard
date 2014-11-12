//calling all the required files
var express = require("express");
	db = require("./routes/db.js");
	boards = require("./routes/boards.js");
	columns = require("./routes/columns.js");
	notes = require("./routes/notes");

var app = express();

var port = 3000;

db.openDatabase("ideaboardDB");

//boards
app.get('/boards', boards.findAll);
app.get('/boards/:boardId', boards.findById);
app.post('/boards/',boards.addBoard);
app.put('/boards/:boardId',boards.updateBoard);
app.delete('/boards/:boardId', boards.deleteBoard);

//columns
app.get('/boards/:boardId/columns', columns.findAll);
app.get('/alt/boards/:boardId/columns', columns.findAllAlt);
app.get('/boards/:boardId/columns/:columnId', columns.findById);
app.post('/boards/:boardId/columns',columns.addColumn);
app.put('/boards/:boardId/columns/:columnId',columns.updateColumn);
app.delete('/boards/:boardId/columns/:columnId', columns.deleteColumn);


//notes
app.get('/boards/:boardId/columns/:columnId/notes', notes.findAll);
app.get('/alt/boards/:boardId/columns/:columnId/notes', notes.findAllAlt);
app.get('/boards/:boardId/columns/:columnId/notes/:noteId', notes.findById);
app.post('/boards/:boardId/columns/:columnId/notes',notes.addNote);
app.put('/boards/:boardId/columns/:columnId/notes/:noteId',notes.updateNote);
app.delete('/boards/:boardId/columns/:columnId/notes/:noteId', notes.deleteNote);

app.listen(3000);
console.log("Listening on port " + port);





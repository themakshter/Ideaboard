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
app.get('/boards/:id', boards.findById);
app.post('/boards/',boards.addBoard);
app.put('/boards/:id',boards.updateBoard);
app.delete('/boards/:id', boards.deleteBoard);

//columns
app.get('/boards/:boardId/columns', columns.findAll);
app.get('/alt/boards/:boardId/columns', columns.findAllAlt);


//notes
app.get('/boards/:boardId/columns/:columnId/notes', notes.findAll);
app.get('/alt/boards/:boardId/columns/:columnId/notes', notes.findAllAlt);

app.listen(3000);
console.log("Listening on port " + port);





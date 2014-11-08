
var express = require("express");
	db = require("./routes/db.js");
	boards = require("./routes/boards.js");
	columns = require("./routes/columns.js");

var app = express();

var port = 3000;

db.openDatabase("ideaboardDB");

app.get('/boards', boards.findAll);
app.get('/boards/:id', boards.findById);
app.post('/boards/',boards.addBoard);
app.put('/boards/:id',boards.updateBoard);
app.delete('/boards/:id', boards.deleteBoard);

app.get('/boards/:boardId/columns', columns.findAll);
//app.get('/boards/:boardId/columns/:id', columns.findById);


app.listen(3000);
console.log("Listening on port " + port);





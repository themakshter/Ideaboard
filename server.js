require('newrelic');
//calling all the required files
var express = require("express");
	path = require('path');
	db = require("./routes/db.js");
	boards = require("./routes/boards.js");
	columns = require("./routes/columns.js");
	notes = require("./routes/notes.js");


var port = 3000;

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || port);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname, 'public')));
});

//db.openDatabase("ideaboardDB");
db.connectToDatabase("mongodb://heroku_app32370393:c8sg6ppveh639803aago9vjkn9@ds061370.mongolab.com:61370/heroku_app32370393");


//boards
app.get('/boards', boards.findAll);
app.get('/boards/:boardId', boards.findById);
app.post('/boards/',boards.addBoard);
app.put('/boards/:boardId',boards.updateBoard);
app.delete('/boards/:boardId', boards.deleteBoard);

//columns
app.get('/boards/:boardId/columns', columns.findAll);
app.get('/boards/:boardId/columns/:columnId', columns.findById);
app.post('/boards/:boardId/columns',columns.addColumn);
app.put('/boards/:boardId/columns/:columnId',columns.updateColumn);
app.delete('/boards/:boardId/columns/:columnId', columns.deleteColumn);


//notes
app.get('/boards/:boardId/columns/:columnId/notes', notes.findAll);
app.get('/boards/:boardId/columns/:columnId/notes/:noteId', notes.findById);
app.post('/boards/:boardId/columns/:columnId/notes',notes.addNote);
app.put('/boards/:boardId/columns/:columnId/notes/:noteId',notes.updateNote);
app.delete('/boards/:boardId/columns/:columnId/notes/:noteId', notes.deleteNote);

app.listen(rocess.env.PORT || 3000);
console.log("Listening on port " + port);





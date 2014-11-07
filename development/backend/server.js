
var express= require("express");
	boards = require("./routes/boards.js");

var app = express();

var port = 3000;

app.get('/boards', boards.findAll);
app.get('/boards/:id', boards.findById);
app.post('/boards/',boards.addBoard);
app.put('/boards/:id',boards.updateBoard);
app.delete('/boards/:id', boards.deleteBoard);

app.listen(3000);
console.log("Listening on port " + port);





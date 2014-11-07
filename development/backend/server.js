
var express= require("express");
	boards = require("./routes/boards.js");

var app = express();

var port = 3000;

app.get('/boards', boards.findAll);

app.get('/boards/:boardName', boards.findByName);

app.listen(3000);
console.log("Listening on port " + port);





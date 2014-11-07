//loading the things we need
var express= require("express");

var app = express();

var port = 3000;

app.get('/boards', function(request,response){
	response.send([{boardName : 'testBoard1'},{boardName:'testBoard2'}]);
});

app.get('/boards/:boardName', function(request, response){
	response.send({boardName: request.params.boardName, author:"testBoardAuthor", colour:"blue"});
});

app.listen(3000);
console.log("Listening on port " + port);





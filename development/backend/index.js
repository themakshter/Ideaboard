//loading the things we need
var http = require('http');
var port = 3000;

var server =  http.createServer(function(request,response){
	console.log("Received a request");
	response.writeHead(200, {'Content-type' : 'text/html'});
	response.end('<html><body><h1>Hello World</h1></body></html>');
});

server.listen(port);
console.log("Listening on port " + port);




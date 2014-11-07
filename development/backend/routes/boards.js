exports.findAll = function(request, response){
	response.send([{boardName:"testBoard1"},{boardName:"testBoard2"}]);
};

exports.findByName = function(request, response){
	response.send({boardName: request.params.boardName, author:"testBoard1Author", colour:"blue"});
};
var mongo = require('mongodb');

var	BSON = mongo.BSONPure;

exports.findAll = function(req,res){
	var boardId = req.params.boardId;
	console.log("Columns for board with id: " + boardId);
	db.collection('boards', function(err, collection){
		collection.findOne({'_id': new BSON.ObjectID(boardId)},{fields:['columns']},function(err, item){
			if(err)	{
				console.log(err);
			}else{
				res.send(item);
			}
		});
	});
};
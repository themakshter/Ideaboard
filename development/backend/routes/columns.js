var mongo = require('mongodb');

var	BSON = mongo.BSONPure;

exports.findAllAlt = function(req,res){
	var boardId = req.params.boardId;
	console.log("Columns for board with id: " + boardId);
	db.collection('columns', function(err, collection){
		collection.findOne({'board': new BSON.ObjectID(boardId)},function(err, item){
			if(err)	{
				console.log(err);
			}else{
				res.send(item);
			}
		});
	});
};

exports.findAll = function(req,res){
	var boardId = req.params.boardId;
	console.log("Columns for board with id: " + boardId);
	db.collection('columns', function(err, collection){
		collection.find({'board': new BSON.ObjectID(boardId)}).toArray(function(err,items){
			res.send(items);
		});
	});
};
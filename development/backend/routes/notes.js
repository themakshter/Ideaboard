var mongo = require("mongodb");

var	BSON = mongo.BSONPure;

exports.findAllAlt = function(req, res){
	var boardId = req.params.boardId;
	var columnId = req.params.columnId;
	console.log("Notes for column with id:" + columnId + " for board with id : " + boardId);
	db.collection('notes',function(err, collection){
		collection.findOne({'column': new BSON.ObjectID(columnId)},function(err,item){
			if(err){
				console.log(err);
			}else{
				res.send(item);
			}
		});
	});
};

exports.findAll = function(req, res){
	var boardId = req.params.boardId;
	var columnId = req.params.columnId;
	console.log("Notes for column with id:" + columnId + " for board with id : " + boardId);
	db.collection('notes',function(err, collection){
		collection.find({'column': new BSON.ObjectID(columnId)}).toArray(function(err,items){
			res.send(items);
		});
	});
};
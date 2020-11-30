var mongo = require('mongodb');

var	BSON = mongo.BSONPure;

exports.findById = function(req,res){
	var id = req.params.columnId;
	console.log("Retrieving column : " + id);
	db.collection('columns',function(err, collection){
		collection.findOne({'_id': new mongo.ObjectID(id)}, function(err, item){
			if(err){
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
		collection.find({'board': new mongo.ObjectID(boardId)}).toArray(function(err,items){
			res.send(items);
		});
	});
};

exports.addColumn = function(req, res){
	var column = req.body;
	console.log('Adding column:' + JSON.stringify(column));
	column.board =  new mongo.ObjectID(column.board);
	db.collection('columns', function(err,collection){
		collection.insert(column, {safe:true}, function(err, results){
			if(err){
				res.send({"err":"An error occurred - " + err});
			}else{
				console.log("Success : " + JSON.stringify(results[0]));
				res.send(results[0]);
			}
		});
	});

};

exports.updateColumn = function(req, res){
	var id = req.params.columnId;
	var column = req.body;
	delete column._id;
	column.board = new mongo.ObjectID(column.board);
	console.log("Updating column :" + id);
	console.log(JSON.stringify(column));
	db.collection('columns', function(err, collection){
		collection.update({"_id":new mongo.ObjectID(id)}, column, {safe:true}, function(err, result){
			if(err){
				console.log("Error updating board - " + err);
				res.send({"error": "An error occured - " + err});
			}else{
				console.log("" + result + "document(s) updated");
				res.send(column);
			}
		});
	});
};

exports.deleteColumn = function(req, res){
	var id = req.params.columnId;
	console.log("Deleting column : " + id);
	db.collection('columns', function(err,collection){
		collection.remove({"_id":new mongo.ObjectID(id)},{safe:true}, function(err, result){
			if(err){
				res.send({"error":"An error has occured - " + err});
			}else{
				console.log(result + "document(s) removed");
				res.send(req.body);
			}
		});
	});
};

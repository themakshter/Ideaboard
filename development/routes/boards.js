var mongo = require("mongodb");

var	BSON = mongo.BSONPure;

exports.findById = function(req, res){
	var id = req.params.boardId;
	console.log("Retrieving board : " + id);
	db.collection('boards',function(err, collection){
		collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item){
			if(err){
				console.log(err);
			}else{
				res.send(item);
			}
		});
	});
};

exports.findAll = function(req, res){
	db.collection('boards', function(err, collection){
		collection.find().toArray(function(err,items){
			res.send(items);
		});
	});
};

exports.addBoard = function(req,res){
	var board = req.body;
	console.log('Adding board: ' + JSON.stringify(board));
	db.collection('boards', function(err, collection){
		collection.insert(board, {safe:true},function(err,result){
			if(err){
				res.send({"error":"An error occurred - " + err});
			}else{
				console.log("Success : " + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
};

exports.updateBoard = function(req,res){
	var id = req.params.boardId;
	var board = req.body;
	delete board._id;
	console.log("Updating board: " + id);
	console.log(JSON.stringify(board));
	db.collection('boards', function(err, collection){
		collection.update({"_id":new BSON.ObjectID(id)}, board, {safe:true}, function(err, result){
			if(err){
				console.log("Error updating board - " +err);
				res.send({"error": "An error occurred - " + err});
			}else{
				console.log("" + result + "document(s) updated");
				res.send(board);
			}
		});
	});
};

exports.deleteBoard = function(req,res){
	var id = req.params.boardId;
	console.log("Deleting board : " + id);
	db.collection('boards', function(err, collection){
		collection.remove({"_id":new BSON.ObjectID(id)}, {safe:true}, function(err, result){
			if(err){
				res.send({'error':'An error occurred - ' + err});
			}else{
				console.log('' + result + ' document(s) removed');
				res.send(req.body);
			}
		});
	});
};


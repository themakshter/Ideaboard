var mongo = require("mongodb");

var	BSON = mongo.BSONPure;

exports.findAllAlt = function(req, res){
	var boardId = req.params.boardId;
	var columnId = req.params.columnId;
	console.log("Notes for column with id:" + columnId + " for board with id : " + boardId);
	db.collection('notes',function(err, collection){
		collection.findOne({'column': new mongo.ObjectID(columnId)},function(err,item){
			if(err){
				console.log(err);
			}else{
				res.send(item);
			}
		});
	});
};

exports.findById = function(req, res){
	var id = req.params.noteId;
	console.log("Retrieving note : " + id);
	db.collection('notes', function(err, collection){
		collection.findOne({"_id":new mongo.ObjectID(id)},function(err, item){
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
		collection.find({'column': new mongo.ObjectID(columnId)}).toArray(function(err,items){
			res.send(items);
		});
	});
};

exports.addNote = function(req, res){
	var note = req.body;
	console.log("Adding note : " + JSON.stringify(note));
	note.column = new mongo.ObjectID(note.column);
	db.collection('notes', function(err,collection){
		collection.insert(note,{safe:true},function(err, result){
			if(err){
				res.send({"error":"An error has occurred - " + err});
			}else{
				console.log("Success : " + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
};

exports.updateNote = function(req, res){
	var note = req.body;
	var id = req.params.noteId;
	delete note._id;
	note.column = new mongo.ObjectID(note.column);
	console.log("Updating note : " + id + "\n"+JSON.stringify(note));
	db.collection('notes', function(err, collection){
		collection.update({"_id":new mongo.ObjectID(id)},note,{safe:true},function(err, result){
			if(err){
				console.log(err);
				res.send({"error":"An error has occurred "});
			}else{
				console.log(result + " document(s) updated");
				res.send(note);
			}
		});
	});
};

exports.deleteNote = function(req, res){
	var note = req.body;
	var id = req.params.noteId;
	console.log("Deleting note : " + id);
	db.collection('notes',  function(err, collection){
		collection.remove({"_id":new mongo.ObjectID(id)}, {safe:true}, function(err, result){
			if(err){
				res.send({"error":"An error has occurred - " + err});
			}else{
				console.log(result + " document(s) removed");
				res.send(note);
			}
		});
	});
};

var mongo = require("mongodb");

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server = new Server('localhost',27017, {auto_reconnect: true});

exports.openDatabase = function(dbName){
	db = new Db(dbName,server);
	db.open(function(err, db){
	if(!err){
		console.log("Connected to '" +dbName+ "' database ");
		db.collection('boards',{strict:true}, function(err, collection){
			if(err){
				console.log("The 'boards' collection doesn't exist. Creating it with sample data...");
				populateDB();
			}
		});
	}
});
};

var populateDBalt = function(){
	var boards = [];
	var columns = [];
	var notes = [];
	
	for(var i = 0; i<5;i++){
		var boardId = new BSON.ObjectID();
		boards.push({
			_id:boardId,
			name:"testBoard"+i,
			author:"testAuthor"+i,
			colour:"testColor"+i
		});
		var tempColumns = [];
		for(var j = 0;j < 4; j++){
			var columnId = new BSON.ObjectID();
			tempColumns.push(
			{
				_id: columnId,
				name: "testBoard"+i+"testColumn"+j
			});
			var tempNotes = [];
			for(var k = 0;k < 3;k++){
				var noteId = new BSON.ObjectID();
				tempNotes.push(
				{
					_id: noteId,
					name: "testBoard"+i+"testColumn"+j+"testNote"+k,
					contents: "This <i>is</i>a <u>test</u> <b>note</b>",
					colour: "testColour"+k
				});
			}
			notes.push(
			{
				column: columnId,
				notes : tempNotes
			});
		}
		columns.push(
		{
			board: boardId,
			columns: tempColumns
		});
	}

	db.collection('boards', function(err, collection){
		collection.insert(boards,{safe:true}, function(err, result){});
	});
	db.collection('columns', function(err, collection){
		collection.insert(columns,{safe:true}, function(err, result){});
	});
	db.collection('notes', function(err, collection){
		collection.insert(notes,{safe:true}, function(err, result){});
	});
};

var populateDB = function(){
var boards = [];
	var columns = [];
	var notes = [];
	
	for(var i = 0; i<5;i++){
		var boardId = new BSON.ObjectID();
		boards.push({
			_id: boardId,
			name:"testBoard"+i,
			author:"testAuthor"+i,
			colour:"testColor"+i
		});
		var tempColumns = [];
		for(var j = 0;j < 4; j++){
			var columnId = new BSON.ObjectID();
			columns.push(
			{
				_id: columnId,
				board:boardId,
				name: "testBoard"+i+"testColumn"+j
			});
			for(var k = 0;k < 3;k++){
				var noteId = new BSON.ObjectID();
				notes.push(
				{
					_id: noteId,
					column: columnId,
					name: "testBoard"+i+"testColumn"+j+"testNote"+k,
					contents: "This <i>is</i>a <u>test</u> <b>note</b>",
					colour: "testColour"+k
				});
			}
		}
	}

	db.collection('boards', function(err, collection){
		collection.insert(boards,{safe:true}, function(err, result){});
	});
	db.collection('columns', function(err, collection){
		collection.insert(columns,{safe:true}, function(err, result){});
	});
	db.collection('notes', function(err, collection){
		collection.insert(notes,{safe:true}, function(err, result){});
	});
};
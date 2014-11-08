var mongo = require("mongodb");

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var populateDBalt = function(){
	var boards = [];
	var columns = [];
	var notes = [];
	
	for(var i = 0; i<5;i++){
		var boardId = new BSON.ObjectID();
		boards.push({
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
	console.log(boards);
	console.log(columns);
	console.log(notes);
};

var populateDB = function(){
var boards = [];
	var columns = [];
	var notes = [];
	
	for(var i = 0; i<5;i++){
		var boardId = new BSON.ObjectID();
		boards.push({
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
				board: boardId,
				name: "testBoard"+i+"testColumn"+j
			});
			for(var k = 0;k < 3;k++){
				var noteId = new BSON.ObjectID();
				notes.push(
				{
					_id: noteId,
					column:columnId,
					name: "testBoard"+i+"testColumn"+j+"testNote"+k,
					contents: "This <i>is</i>a <u>test</u> <b>note</b>",
					colour: "testColour"+k
				});
			}
		}
	}
	console.log(boards);
	console.log(columns);
	console.log(notes);
};

populateDBalt();
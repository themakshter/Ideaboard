var mongo = require("mongodb");

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var dbName = 'ideaboardDB';

var server = new Server('localhost',27017, {auto_reconnect: true});
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

exports.findById = function(req, res){
	var id = req.params.id;
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
				res.send({"error":"An error occured - " + err});
			}else{
				console.log("Success : " + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
};

exports.updateBoard = function(req,res){
	var id = req.params.id;
	var board = req.body;
	console.log("Updating board: " + id);
	console.log(JSON.stringify(board));
	db.collection('boards', function(err, collection){
		collection.update({"_id":new BSON.ObjectID(id)}, board, {safe:true}, function(err, result){
			if(err){
				console.log("Error updating board - " +err);
				res.send({"error": "An error occured - " + err});
			}else{
				console.log("" + result + "document(s) updated");
				res.send(board);
			}
		});
	});
};

exports.deleteBoard = function(req,res){
	var id = req.params.id;
	console.log("Deeleting board : " + id);
	db.collection('boards', function(err, collection){
		collection.remove({"_id":new BSON.ObjectID(id)}, {safe:true}, function(err, result){
			if(err){
				res.send({'error':'An error occured - ' + err});
			}else{
				console.log('' + result + ' document(s) removed');
				res.send(req.body);
			}
		});
	});
};

var populateDB = function(){
	var boards = [
		{
			name : "testBoard1",
			author: "testBoard1Author",
			colour : "testColour2",
			columns: [{
				_id : new BSON.ObjectID(),
				name:"testBoard1Column1"
			},{
				_id : new BSON.ObjectID(),
				name:"testBoard1Column2"
			},{
				_id : new BSON.ObjectID(),
				name:"testBoard1Column3"
			}
			]
		},
		{
			name : "testBoard2",
			author: "testBoard2Author",
			colour : "testColour2",
			columns: [{
				_id : new BSON.ObjectID(),
				name:"testBoard2Column1"
			},{
				_id : new BSON.ObjectID(),
				name:"testBoard2Column2"
			},{
				_id : new BSON.ObjectID(),
				name:"testBoard2Column3"
			}
			]
		},
		{
			name : "testBoard3",
			author: "testBoard3Author",
			colour : "testColour3",
			columns: [{
				_id : new BSON.ObjectID(),
				name:"testBoard3Column1"
			},{
				_id : new BSON.ObjectID(),
				name:"testBoard3Column2"
			},{
				_id : new BSON.ObjectID(),
				name:"testBoard3Column3"
			}
			]
		},
		{
			name : "testBoard4",
			author: "testBoard4Author",
			colour : "testColour4",
			columns: [{
				_id : new BSON.ObjectID(),
				name:"testBoard4Column1"
			},{
				_id : new BSON.ObjectID(),
				name:"testBoard4Column2"
			},{
				_id : new BSON.ObjectID(),
				name:"testBoard4Column3"
			}
			]
		},
		{
			name : "testBoard5",
			author: "testBoard5Author",
			colour : "testColour5",
			columns: [{
				_id : new BSON.ObjectID(),
				name:"testBoard5Column1"
			},{
				_id : new BSON.ObjectID(),
				name:"testBoard5Column2"
			},{
				_id : new BSON.ObjectID(),
				name:"testBoard5Column3"
			}
			]
		},
	];

	db.collection('boards', function(err, collection){
		collection.insert(boards,{safe:true}, function(err, result){});
	});
};







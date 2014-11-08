var mongo = require('mongodb');

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var dbName = 'ideaboardDB';

var server = new Server('localhost',27017,{auto_reconnect: true});

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
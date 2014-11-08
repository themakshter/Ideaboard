var mongo = require("mongodb");

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server = new Server('localhost',27017, {auto_reconnect: true});

exports.openDatabase = function(dbName){
	db = new Db(dbName,server);
	console.log(dbName);
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

var populateDB = function(){
	var boards = [
		{
			name : "testBoard1",
			author: "testBoard1Author",
			colour : "testColour2",
			columns: [{
				_id : new BSON.ObjectID(),
				name:"testBoard1Column1",
				notes: [{
					_id: new BSON.ObjectID(),
					name:"testBoard1Column1Note1",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour1"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard1Column1Note2",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour2"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard1Column1Note3",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour3"
				}
			]
			},{
				_id : new BSON.ObjectID(),
				name:"testBoard1Column2",
				notes: [{
					_id: new BSON.ObjectID(),
					name:"testBoard1Column2Note1",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour1"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard1Column2Note2",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour2"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard1Column2Note3",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour3"
				}
			]
			},{
				_id : new BSON.ObjectID(),
				name:"testBoard1Column3",
				notes: [{
					_id: new BSON.ObjectID(),
					name:"testBoard1Column3Note1",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour1"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard1Column3Note2",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour2"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard1Column3Note3",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour3"
				}
			]
			}
			]
		},
		{
			name : "testBoard2",
			author: "testBoard2Author",
			colour : "testColour2",
			columns: [{
				_id : new BSON.ObjectID(),
				name:"testBoard2Column1",
				notes: [{
					_id: new BSON.ObjectID(),
					name:"testBoard2Column1Note1",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour1"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard2Column1Note2",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour2"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard2Column1Note3",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour3"
				}
			]
		},{
				_id : new BSON.ObjectID(),
				name:"testBoard2Column2",
				notes: [{
					_id: new BSON.ObjectID(),
					name:"testBoard2Column2Note1",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour1"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard2Column2Note2",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour2"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard2Column2Note3",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour3"
				}
			]
			},{
				_id : new BSON.ObjectID(),
				name:"testBoard2Column3",
				notes: [{
					_id: new BSON.ObjectID(),
					name:"testBoard2Column3Note1",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour1"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard2Column3Note2",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour2"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard2Column3Note3",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour3"
				}
			]
			}
			]
		},
		{
			name : "testBoard3",
			author: "testBoard3Author",
			colour : "testColour3",
			columns: [{
				_id : new BSON.ObjectID(),
				name:"testBoard3Column1",
				notes: [{
					_id: new BSON.ObjectID(),
					name:"testBoard3Column1Note1",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour1"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard3Column1Note2",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour2"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard3Column1Note3",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour3"
				}
			]
			},{
				_id : new BSON.ObjectID(),
				name:"testBoard3Column2",
				notes: [{
					_id: new BSON.ObjectID(),
					name:"testBoard3Column2Note1",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour1"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard3Column2Note2",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour2"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard3Column2Note3",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour3"
				}
			]
			},{
				_id : new BSON.ObjectID(),
				name:"testBoard3Column3",
				notes: [{
					_id: new BSON.ObjectID(),
					name:"testBoard3Column3Note1",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour1"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard3Column3Note2",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour2"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard3Column3Note3",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour3"
				}
			]
			}
			]
		},
		{
			name : "testBoard4",
			author: "testBoard4Author",
			colour : "testColour4",
			columns: [{
				_id : new BSON.ObjectID(),
				name:"testBoard4Column1",
				notes: [{
					_id: new BSON.ObjectID(),
					name:"testBoard4Column1Note1",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour1"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard4Column1Note2",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour2"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard4Column1Note3",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour3"
				}
			]
			},{
				_id : new BSON.ObjectID(),
				name:"testBoard4Column2",
				notes: [{
					_id: new BSON.ObjectID(),
					name:"testBoard4Column2Note1",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour1"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard4Column2Note2",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour2"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard4Column2Note3",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour3"
				}
			]
			},{
				_id : new BSON.ObjectID(),
				name:"testBoard4Column3",
				notes: [{
					_id: new BSON.ObjectID(),
					name:"testBoard4Column3Note1",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour1"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard4Column3Note2",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour2"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard4Column3Note3",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour3"
				}
			]
			}
			]
		},
		{
			name : "testBoard5",
			author: "testBoard5Author",
			colour : "testColour5",
			columns: [{
				_id : new BSON.ObjectID(),
				name:"testBoard5Column1",
				notes: [{
					_id: new BSON.ObjectID(),
					name:"testBoard5Column1Note1",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour1"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard5Column1Note2",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour2"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard5Column1Note3",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour3"
				}
			]
			},{
				_id : new BSON.ObjectID(),
				name:"testBoard5Column2",
				notes: [{
					_id: new BSON.ObjectID(),
					name:"testBoard5Column2Note1",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour1"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard5Column2Note2",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour2"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard5Column2Note3",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour3"
				}
			]
			},{
				_id : new BSON.ObjectID(),
				name:"testBoard5Column3",
				notes: [{
					_id: new BSON.ObjectID(),
					name:"testBoard5Column3Note1",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour1"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard5Column3Note2",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour2"
				},{
					_id: new BSON.ObjectID(),
					name:"testBoard5Column3Note3",
					content:"This <i>is</i> a <u>test</u> <b>note</b>",
					colour:"testColour3"
				}
			]
			}
			]
		},
	];

	db.collection('boards', function(err, collection){
		collection.insert(boards,{safe:true}, function(err, result){});
	});
};
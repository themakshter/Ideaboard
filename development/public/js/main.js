	var apiURL = 'http://localhost:3000';
	var timeLastUpdated = new Date();
	var container = $("#container");
	var currentBoardID;
	//listBoards();
	var AppRouter = Backbone.Router.extend(
	{
		routes:
		{
			""			: "listBoards",
			"boards/new":"newBoard",
			"boards/:id":"showBoard",
			"*actions": "defaultRoute"
		}
	});

	var app_router = new AppRouter();
	app_router.on('route:showBoard',function(id)
	{
		showBoard(id);
		console.log("showing board"+id);

	});
	app_router.on('route:defaultRoute', function(actions) 
	{
        alert(actions);
    })
	app_router.on('route:listBoards',function(actions)
	{
		listBoards();
	});
	app_router.on('route:newBoard',function(actions)
	{
		
	});
	Backbone.history.start();
	function listBoards()
	{
		container.empty();
		container.append("<div class='boardList'></div>");
		var boardList = container.children().first();

		boardList.append('<h1>Available Boards</h1>');
		$.get(apiURL+"/boards",function(data)
		{
			var table = '<table class="boardTable">';
			var table = table + "<th><td>Name</td><td>Author</td></th>";
			$.each(data,function(key,value)
			{
				table = table + "<tr><td class='boardLink' data-boardID='"+value._id+"'>"+value.name+"</td><td>"+value.author+"</td></tr>";
			});
			table = table + "</table>";
			boardList.append(table);
			$(".boardLink").click(function(e)
			{
				var boardID = $(this).attr("data-boardID");
				app_router.navigate('boards/'+boardID,{trigger:true});
			});
		});

	}
	function showBoard(boardID)
	{
		currentBoardID = boardID;
		container.empty();
		container.append('<div class="board" data-boardID="'+boardID+'"></div>');
		container = container.children().first();
		$.get(apiURL+'/boards/'+boardID,function(data)
		{
			$(".userField").text(data.author);
			$(".boardField").text(data.name);
 		});
 		$.get(apiURL+'/boards/'+boardID+"/columns",function(data)
		{
			var columns = [];
			$(data).each(function(index,value)
			{
				var colID = value._id;
				columns.push(colID);
				container.append("<div class=\"boardColumn\" data-columnID =\"" + colID + "\"></div>");
				var colContainer = container.children().last();
				colContainer.append("<div class=\"notesContainer\">");
				var notesContainer = colContainer.children().first();
				var notes = [];
				$.get(apiURL+'/boards/'+boardID+"/columns/"+colID,function(data)
				{
					var colName = data.name;
					colContainer.prepend("<h3 class=\"columnTitle\">" + colName + "</h3>");
				});
				$.get(apiURL+'/boards/'+boardID+"/columns/"+colID+"/notes",function(data)
				{
					console.log(data);
					$(data).each(function(index,value)
					{
						makeNote(value,notesContainer);
					});
					makeNewNoteButton(colContainer);
					$('.textArea').notebook();
					$('.colorPicker').empty().addColorPicker({
						clickCallback: function(c,picker)
						{
							$(picker).parent().css('background-color',c);
							updateNoteDiv(picker.parent());
						}
					});
					$('.textArea').on('contentChange', function(e)
					{

						var textArea = e.originalEvent.target;
						var note = $(textArea).parent();
						var id = note.attr('data-noteID');
						updateNote(id,colID,boardID);

					});


				});
			});
 		});
	}
	function makeNewNoteButton(container)
	{
		container.append("<div class='newNoteButton'><span class='glyphicon glyphicon-plus'></span></div>");
		var button = container.children().last();
		button.click(function()
		{
			var colID = $(this).parents('.boardColumn').attr('data-columnid');
			createNote(colID);

		});
	}
	function makeNote(note,container)
	{
		var text = note.contents;
		container.append("<div class=\"note\" data-noteID =\"" + note._id +"\"></div>");
		var noteCon = container.children().last();
		noteCon.css('background-color',note.color);
		noteCon.append("<div class='colorPicker'></div>");
		noteCon.append("<div class='textArea'>"+text+"</div>");
	}

	function timeSinceUpdate()
	{
		var now = new Date();
		var timeDiff = Math.abs(now.getTime() - timeLastUpdated.getTime());
		return timeDiff;
	}
	function updateNoteDiv(note)
	{
		var id = note.attr('data-noteID');
		var colID = note.parents('.boardColumn').attr('data-columnid');
		var boardID = note.parents('.board').attr('data-boardID');
		updateNote(id,colID,boardID);
	}
	function createNote(colID)
	{
		$.post(apiURL+"/boards/"+currentBoardID+"/columns/"+colID+"/notes",
		{
			"name":"testName",
			"contents":"",
			"color":"#FFFFFF"
		});

	}
	function updateNote(id,colID,boardID)
	{
		var note = $('.note[data-noteID="'+id+'"]');
		var textArea = note.children('.textArea');
		var content = textArea.html();
		var color = note.css('background-color');
		var message = 
	    {
	    	"column":colID,
	    	"name": "test name from client",
	    	"contents":content,
	    	"color":color
	    };
	    var url = apiURL+'/boards/'+boardID+"/columns/"+colID+"/notes/"+id;
	    console.log(url);
	    $.ajax({
	    	url: url,
	    	type:'PUT',
	    	data:JSON.stringify(message),
	    	success:function(data,textStatus,jqXHR)
	    	{
	    		console.log(data);
	    	},
	    	contentType: "application/json"
	    })
	    timeLastUpdated = new Date();
	}

	// your JS code goes here
	// var app = {}; // create namespace for our app

 //    app.Note = Backbone.Model.extend({
 //    	defaults:{
 //    		text:''
 //    	}
 //    });
 //    app.NoteCollumn = Backbone.Collection.extend({
 //    	model: app.Note
 //    });
 //    app.Board = Backbone.Collection.extend({
 //        model: app.NoteCollumn
 //    })
 //    var boardTemplate = $('#boardTemplate').html();
	// var AppView = Backbone.View.extend({
	// 	el: $('#container'),
	// 	// template 
	// 	template: _.template(
	//   		boardTemplate
	//   	),

	//   	initialize: function(){
	// 		this.render();
	//   	},

	// 	render: function(){
	// 		this.$el.html(this.template({who: 'world!'}));
	// 	}
	// });

	// var appView = new AppView();

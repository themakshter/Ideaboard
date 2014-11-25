$(document).ready(fucnction()
{
	var apiURL = 'http://localhost:3000';
	var timeLastUpdated = new Date();
	var container = $("#container");
	showBoard('547391b215c61e96408261fd');
	// listBoards();
	// function listBoards()
	// {
	// 	container.empty();
	// 	container.append("<div class='boardList'></div>");
	// 	var boardList = container.children().first();

	// 	boardList.append('<h1>Available Boards</h1>');
	// 	$.get(apiURL+"/boards",function(data)
	// 	{
	// 		var table = '<table class="boardTable">';
	// 		var table = table + "<th><td>Name</td><td>Author</td></th>";
	// 		$.each(data,function(key,value)
	// 		{
	// 			table = table + "<tr><td class='boardLink' data-boardID='"+value._id+"'>"+value.name+"</td><td>"+value.author+"</td></tr>";
	// 		});
	// 		table = table + "</table>";
	// 		boardList.append(table);
	// 		$(".boardLink").click(function(e)
	// 		{
	// 			var boardID = $(this).attr("data-boardID");
	// 			showBoard(boardID);
	// 		});
	// 	});

	// }
	function showBoard(boardID)
	{
		var boardID = $("#boardId").attr(value);
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
						var text = value.contents;
						notesContainer.prepend("<div class=\"note\" data-noteID =\"" + value._id +"\"></div>");
						var note = notesContainer.children().first();
						note.css('background-color',value.color);
						note.append("<div class='colorPicker'></div>");
						note.append("<div class='textArea'>"+text+"</div>");
					});
					$('.textArea').notebook();
					$('.colorPicker').empty().addColorPicker({
						clickCallback: function(c,picker)
						{
							console.log(picker);
							console.log(c);
							$(picker).parent().css('background-color',c);
							updateNoteDiv(picker.parent());
						}
					});
					$('.textArea').on('contentChange', function(e)
					{
						var now = new Date();
						var timeDiff = Math.abs(now.getTime() - timeLastUpdated.getTime());
						console.log(timeDiff);
						if(timeSinceUpdate() > 500)
						{
							var textArea = e.originalEvent.target;
							var note = $(textArea).parent();
							var id = note.attr('data-noteID');
							updateNote(id,colID,boardID);
						}
						else
						{
							setTimeout(checkLater(id,colID,boardID),1000)
						}
						function checkLater(id,colID,boardID)
						{
							if(timeSinceUpdate()>500)
							{
								updateNote(id,colID,boardID);
							}
						}
					});

				});
			});
 		});
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
	    $.ajax({
	    	url:apiURL+'/boards/'+boardID+"/columns/"+colID+"/notes/"+id,
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
});

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

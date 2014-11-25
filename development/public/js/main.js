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
    });
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

		boardList.append('<h1 class="text-center">Available Boards</h1>');
		$.get(apiURL+"/boards",function(data)
		{
			var boards = '<ul class="boardTable thumbnails">';
			$.each(data,function(key,value)
			{
				boards+= "<li class='boardLink board' data-boardID='"+value._id+"'><a href='#boards/"+value._id+"'><h3>"+value.name+"<br><small>"+value.author+"</small><h3></a></li>";
			});
			boards = boards + "</ul>";
			boardList.append(boards);
			// $(".boardLink").click(function(e)
			// {
			// 	var boardID = $(this).attr("data-boardID");
			// 	app_router.navigate('boards/'+boardID,{trigger:true});
			// });
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
							setTimeout(checkLater(id,colID,boardID),1000);
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
		var colorPicker = $(noteCon).children().last();
		noteCon.append("<div class='textArea'>"+text+"</div>");
		var textArea = $(noteCon).children().last();
		$(textArea).notebook();
		$(colorPicker).empty().addColorPicker({
			clickCallback: function(c,picker)
			{
				$(picker).parent().css('background-color',c);
				updateNoteDiv(picker.parent());
			}
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
	function createNote(colID)
	{
		$.post(apiURL+"/boards/"+currentBoardID+"/columns/"+colID+"/notes",
		{
			"name":"testName",
			"contents":"",
			"column":colID,
			"color":"#FFFFFF"
		}
		,function(data)
		{
			console.log(data);
			var container = $('.boardColumn[data-columnid="'+colID+'"] .notesContainer');
			makeNote(data,container);
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
		$.ajax({
			url:apiURL+'/boards/'+boardID+"/columns/"+colID+"/notes/"+id,
			type:'PUT',
			data:JSON.stringify(message),
			success:function(data,textStatus,jqXHR)
			{
				console.log(data);
			},
			contentType: "application/json"
		});
		timeLastUpdated = new Date();
		}
	var apiURL = 'http://localhost:3000';
	var timeLastUpdated = new Date();
	var container = $("#container");
	var currentBoardID;
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
		container = $("#container");
		container.empty();
		container.append("<div class='boardList'></div>");
		var boardList = container.children().first();

		boardList.append('<h1 class="text-center">Available Boards</h1><br>');
		$.get(apiURL+"/boards",function(data)
		{
			var boards = '<ul class="list-inline">';
			$.each(data,function(key,value)
			{
				boards+= "<li class='boardLink ' data-boardID='"+value._id+"'><a class='board plain thumbnail text-center' href='#boards/"+value._id+"'><h3>"+value.name+"<br><small>"+value.author+"</small></h3></a></li>";
			});
			boards+="</ul>";
			boardList.append(boards);
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
			$(data).each(function(index,value)
			{
				makeColumn(value,container);
			});
			makeNewColumnButton(container);
		});
	}

	function makeNewColumnButton(container)
	{
		container.append('<div class="newColumnButton"><span class="glyphicon glyphicon-plus"></span></div>');
		$('.newColumnButton').click(function()
		{
			$.post(apiURL+'/boards/'+currentBoardID+'/columns',
			{
				'board':currentBoardID,
				'name':'New Column'
			},
			function(data){
				var container = $('.board');
				$('.newColumnButton').remove();
				makeColumn(data,container)
				makeNewColumnButton(container)
				var newColumnButton = $('.newColumnButton');
				window.scrollBy(300,0);
			});

		});
	}

	function makeColumn(column,container)
	{
		var colID = column._id;
		container.append("<div class=\"boardColumn\" data-columnID =\"" + colID + "\"></div>");
		var colContainer = container.children().last();
		colContainer.append("<div class=\"notesContainer\">");
		var notesContainer = colContainer.children().first();
		var notes = [];
		$.get(apiURL+'/boards/'+currentBoardID+"/columns/"+colID,function(data)
		{
			var colName = data.name;
			if (colName === "")
			{
				colName = "Name ..."
			}
			colContainer.prepend("<span class='glyphicon glyphicon-remove deleteColumn' />");
			colContainer.prepend("<form ><input type='text' class=\"columnTitle\" value='"+colName+"'></input></form>");
			var colTitle = colContainer.children().first();
			colTitle.change(function(e)
			{
				var title = e.target.value;
				var colID = $(this).parents('.boardColumn').attr('data-columnid');
				var message = 
				{
						"_id":colID,
						"board":currentBoardID,
						"name":title
				};
				$.ajax(
				{
					url: apiURL+'/boards/'+currentBoardID+'/columns/'+colID,
					data:message,
					type:'PUT'
				});
			});
		});
		$.get(apiURL+'/boards/'+currentBoardID+"/columns/"+colID+"/notes",function(data)
		{
			console.log(data);
			$(data).each(function(index,value)
			{
				makeNote(value,notesContainer);
			});
			makeNewNoteButton(colContainer);
				
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
		$(noteCon).slideDown();
		noteCon.css('background-color',note.color);
		noteCon.append("<div class='colorPicker'></div>");
		var colorPicker = $(noteCon).children().last();
		noteCon.append('<span  class="glyphicon glyphicon-remove deleteNote"></span>');
		var deleteButton = noteCon.children().last();
		noteCon.append("<div class='textArea'>"+text+"</div>");
		var textArea = $(noteCon).children().last();

		deleteButton.click(function()
		{
			var noteCon = $(this).parent();
			noteCon.slideUp(500);
			var noteId = noteCon.attr('data-noteid');
			var colID = noteCon.parents('.boardColumn').attr('data-columnid');
			$.ajax(
			{
				url:apiURL+'/boards/'+currentBoardID+'/columns/'+colID+'/notes/'+noteId,
				type: 'DELETE'
			});
		});
		$(textArea).notebook();
		$(colorPicker).empty().addColorPicker({
			clickCallback: function(c,picker)
			{
				$(picker).parent().css('background-color',c);
				updateNoteDiv(picker.parent());
			}
		});
		$(textArea).on('contentChange', function(e)
		{
			var textArea = e.originalEvent.target;
			var note = $(textArea).parent();
			var id = note.attr('data-noteID');
			var colID = $(note).parents('.boardColumn').attr('data-columnid');
			updateNote(id,colID,currentBoardID);
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
			"name":"New Note",
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
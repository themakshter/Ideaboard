	var apiURL = 'http://localhost:3000';
	showBoard('546a841460abfa1f17e76b81');
	function showBoard(boardID)
	{
		var container = $("#container");
		container.empty();
	
		$.get(apiURL+'/boards/'+boardID,function(data)
		{
			$(".userField").text(data.author);
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
						notesContainer.prepend("<div class=\"note\" data-noteID =\"" + value._id +"\">"+text+"</div>");
						var note = notesContainer.children().first();
					});
					$('.note').notebook();
					$('.note').on('contentChange', function(e)
					{
						var id = e.originalEvent.target.getAttribute('data-noteID');
						
					    var content = e.originalEvent.detail.content;
					    $.ajax({
					    	url:apiURL+'/boards/'+boardID+"/columns/"+colID+"/notes/"+id,
					    	type:'PUT',
					    	data:content
					    })
					    //$.put(apiURL+'/boards/'+boardID+"/columns/"+colID+"/notes/"+id,content);
						console.log("post to server on note"+id);
					});

				});
			});
 		});
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

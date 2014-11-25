var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "boards/"           : "list",
        "boards/add"        : "addBoard",
        "boards/:id"        : "boardDetails",
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var boardList = new BoardCollection();
        boardList.fetch({success: function(){
            $("#content").html(new BoardListView({model: boardList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    boardDetails: function (id) {
        var board = new Board({id: id});
        board.fetch({success: function(){
            $("#content").html(new BoardView({model: board}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addBoard: function() {
        var board = new Board();
        $('#content').html(new WineView({model: board}).el);
        this.headerView.selectMenuItem('add-menu');
	},

});

utils.loadTemplate(['HeaderView', 'BoardView', 'BoardListItemView','HomeView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});
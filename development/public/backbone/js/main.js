var AppRouter = Backbone.Router.extend({

    routes: {
        ""                                      : "home",
        "boards"                                : "listBoards",
        "boards/page/:page"                     : "listBoards",
        "boards/add"                            : "addBoard",
        "boards/:boardId"                       : "boardDetails",
        "boards/:boardId/columns"               : "listColumns",
        "boards/:boardId/columns/page/:page"    : "listColumns",
        "boards/:boardId/columns/:columnId"     : "columnDetails",
        "boards/:boardId/columns/add"           : "addColumn",
        "about"                                 : "about"
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

	listBoards: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var boardList = new BoardCollection();
        boardList.fetch({success: function(){
            $("#content").html(new BoardListView({model: boardList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    boardDetails: function (boardId) {
        var board = new Board({_id: boardId});
        board.fetch({success: function(){
            $("#content").html(new BoardView({model: board}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addBoard: function() {
        var board = new Board();
        $('#content').html(new BoardView({model: board}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    listColumns: function(boardId,page) {
        var p = page ? parseInt(page, 10) : 1;
        var columnList = new ColumnCollection();
        columnList.setBoard(boardId);
        columnList.fetch({success: function(){
            $("#content").html(new ColumnListView({model: columnList, page: p, board: boardId}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    columnDetails: function (columnId) {
        var column = new Column({_id: columnId});
        column.fetch({success: function(){
            $("#content").html(new ColumnView({model: column}).el);
        }});
        this.headerView.selectMenuItem();
    },

    addColumn: function() {
        var column = new Column();
        $('#content').html(new ColumnView({model: column}).el);
        this.headerView.selectMenuItem('add-menu');
    },

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'BoardView', 'BoardListItemView','ColumnView','ColumnListItemView' ,'AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});
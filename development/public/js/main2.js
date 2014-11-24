var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "list",
        "boards/page/:page"	: "list",
        "boards/add"         : "addBoard",
        "boards/:id"         : "boardDetails",
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var wineList = new WineCollection();
        wineList.fetch({success: function(){
            $("#content").html(new WineListView({model: wineList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    boardDetails: function (id) {
        var board = new Wine({id: id});
        board.fetch({success: function(){
            $("#content").html(new WineView({model: board}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addBoard: function() {
        var wine = new Wine();
        $('#content').html(new WineView({model: wine}).el);
        this.headerView.selectMenuItem('add-menu');
	},

});

utils.loadTemplate(['HeaderView', 'BoardView', 'BoardListItemView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});
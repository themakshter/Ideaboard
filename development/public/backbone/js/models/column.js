window.Column = Backbone.Model.extend({

    urlRoot: "/boards/:boardId/columns/board",

    idAttribute: "_id",

    initialize: function () {
        this.validators = {};

        this.validators.name = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        _id: null,
        name: "New Column",
    }
});

window.ColumnCollection = Backbone.Collection.extend({

    model: Column,
    boardId: 0,
    url: "",
    setBoard : function(boardId){
        this.boardId = boardId;
        console.log(this.boardId);
        this.url = "/boards/"+boardId+"/columns";
    }

});
(function() {

    //make model
    var Board = Backbone.Model.extend({
        initialize: function() {
            this.fetch();
        },
        url: '/home'

    });

    //instantiate model
    var myBoard = new Board();

       
}());

var app = {};

var BoardView = Backbone.View.extend({
    el: '#main',
    initialize: function() {
        app.images.fetch();
        console.log(app);
    }
});

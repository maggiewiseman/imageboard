var app = {};

var BoardView = Backbone.View.extend({
    el: '#main',
    initialize: function() {
        app.images.fetch();
        console.log(app);
    },
    url: '/home'
});

/*********** ROUTER ****************/
var Router = Backbone.Router.extend({
    routes: {
        '' : 'home',
        'home' : 'home',
        'image' : 'image',
        'upload': 'upload'
    },
    upload: function() {
        $('#upload-section').off();
        $('#upload-section').show();
        console.log('upload route');
        new UploadView({
            el: '#upload-section',
            model: new UploadModel
        });
    },
    home: function() {
        //$('#main').off();
        $('#upload-section').hide();
        new BoardView({
            el: '#main',
            
        });
    }
});

var router = new Router;

//tell it to start listening for changes to the url
Backbone.history.start();

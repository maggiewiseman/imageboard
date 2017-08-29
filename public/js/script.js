(function() {
    Handlebars.templates = Handlebars.templates || {};

    var templates = document.querySelectorAll('template');

    Array.prototype.slice.call(templates).forEach(function(tmpl) {
        Handlebars.templates[tmpl.id] = Handlebars.compile(tmpl.innerHTML.replace(/{{&gt;/g, '{{>'));
    });

    Handlebars.partials = Handlebars.templates;

    //make model
    var BoardModel = Backbone.Model.extend({
        initialize: function() {
            this.fetch();
            console.log('initializing after fetch');
            console.log(this);

        },
        url: '/home'
        // addLike: function() {
        //     var numLikes = this.model.get('likes');
        //     this.model.set({likes : numLikes++ });
        //     this.save();
        // }

    });

    var BoardView = Backbone.View.extend({
        initialize: function() {
            console.log('initializing board view');
            var view = this;
            this.model.on('change', function() {
                console.log('change event happened');
                view.render();
                console.log(this.model);
            });

        },
        render: function() {
            console.log('views render function called');
            var data = this.model.toJSON();
            var html = Handlebars.templates.imageBoard(data);
            console.log(html);
            this.$el.html(html);
        },
        addLike: function(e) {
            this.model.addLike();
        },
        events: {
            'click .heart': 'addLike'
        }
    });

    // var myBoardView = new BoardView({
    //     el: '#main',
    //     model: new BoardModel
    // });

    /************* UPLOAD ******************/
    var UploadModel = Backbone.Model.extend({
        url: "/upload"
    });

    var UploadView = Backbone.View.extend({
        initialize: function() {
            console.log('initializing upload view');
            this.render();

        },
        render: function() {
            var html = Handlebars.templates.upload();
            console.log(html);
            this.$el.html(html);
        },
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
            console.log('upload route');
            new UploadView({
                el: '#main',
                model: new UploadModel
            });
        },
        home: function() {
            new BoardView({
                el: '#main',
                model: new BoardModel
            });
        }
    });

    var router = new Router;

    //tell it to start listening for changes to the url
    Backbone.history.start();
}());

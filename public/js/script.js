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
            });

        },
        render: function() {
            console.log('views render function called');
            var data = this.model.toJSON();
            var html = Handlebars.templates.imageBoard(data);
            this.$el.html(html);
        },
        addLike: function(e) {
            e.preventDefault();
            console.log('liked!');
        },
        events: {
            'click .heart': 'addLike'
        }
    });


    /************* UPLOAD ******************/
    var UploadModel = Backbone.Model.extend({
        save: function() {
            console.log('in upload model save function');
            var formData = new FormData;  //invented object to send file in ajax
            formData.append('file', this.get('file'));
            formData.append('title', this.get('title'));
            formData.append('description', this.get('description'));
            formData.append('username', this.get('username'));

            $.ajax({
                url: '/upload',
                method: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function() {
                    console.log('successful upload');
                    //this.trigger('uploadSuccess');
                }
            });
        },
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
        events: {
            'click button': function() {
                var saveInfo = {
                    username: this.$el.find('input[name=username]').val(),
                    description: this.$el.find('input[name=description]').val(),
                    title: this.$el.find('input[name=title]').val(),
                    file: this.$el.find('input[type="file"]').prop('files')[0],
                };
                console.log('saveInfo', saveInfo);
                this.model.set(saveInfo).save();
            },
            'uploadSuccess' : function(e) {
                console.log('uploadSucess Event', e);
            }
        }
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

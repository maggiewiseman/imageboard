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
            //console.log('views render function called');
            var data = this.model.toJSON();
            console.log('rendering: ', data);
            var html = Handlebars.templates.imageBoard(data);
            this.$el.html(html);
        },
        addLike: function(e) {
            e.preventDefault();
            console.log(e)
            console.log('liked!', $(e.target.parentElement.parentElement.previousElementSibling.children[0].attributes[0]).val());

            // var numLikes = this.model.get('likes');
            // console.log(likes);
            // this.model.set().save();

        }
    });


    /************* UPLOAD ******************/
    var UploadModel = Backbone.Model.extend({
        save: function() {
            var model = this;
            //console.log('in upload model save function');
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
                    model.trigger('uploadSuccess');
                }
            });
        },
        url: "/upload"
    });

    var UploadView = Backbone.View.extend({
        initialize: function() {
            console.log('initializing upload view');
            this.listenTo(this.model, 'uploadSuccess', this.clearUploadView);
            this.render();
        },
        render: function() {
            var html = Handlebars.templates.upload();
            this.$el.html(html);
        },
        events: {
            'click #upload-btn': function() {
                var saveInfo = {
                    username: this.$el.find('input[name=username]').val(),
                    description: this.$el.find('input[name=description]').val(),
                    title: this.$el.find('input[name=title]').val(),
                    file: this.$el.find('input[type="file"]').prop('files')[0],
                };
                //console.log('saveInfo', saveInfo);
                this.model.set(saveInfo).save();
            },
            'click #cancel-btn': function() {
                //console.log('cancel button clicked');
                router.navigate('home', {trigger: true});
            }
        },
        clearUploadView: function() {
            router.navigate('home', {trigger: true});

        }
    });

    /*********** BIG IMAGE MODEL AND ROUTER ****************/
    var BigImageModel = Backbone.Model.extend({
        initialize: function() {
            console.log('initializing BigImageModel', this.id);
            this.url = '/image/' + this.id;
            this.fetch();
        },

    });

    var BigImageView = Backbone.View.extend({
        initialize: function() {
            console.log('big image model. id = ', this.model.id);
            var view = this;
            this.views = [this];
            var likesView = new LikesView({
                el: '#likes-sect',
                model: new LikesModel({
                    id: this.model.id
                })
            });
            this.views.push(likesView);

            this.model.on('change', function() {
                console.log('in on change event on BigImageView');
                view.views[0].render();
            });
        },
        render: function() {
            console.log('rendering bigImage view');
            var jsonModel = this.model.toJSON();
            jsonModel.comments.map(function(comment) {
                comment.created_at = new Date(comment.created_at);
                return comment;
            });
            //console.log(goodDateModel);
            var data = Handlebars.templates.bigImage(jsonModel);
            //console.log('rendering: ', data);
            var html = (data);
            this.$el.html(html);
            var $likes = $('#likes-sect');
            console.log('likes element: ', $likes);
            console.log('rendering', this.views[1].render());
            $likes.append(this.views[1].render());

        },
        addLike: function(e) {
            e.preventDefault();
            // console.log(e)
            // console.log('big image liked!', e.currentTarget.id);
            // var image_id = e.currentTarget.id.split('-')[1];
            // var likes = this.model.get('likes');
            //
            // if(!likes) {
            //     likes = 1;
            // } else {
            //     likes++;
            // }
            //
            // console.log('likes', likes);
            // this.model.set({
            //     imageData: {
            //         id: image_id,
            //         likes: likes
            //     }
            // });
            // console.log(this.model);
            // this.model.save();

            // var numLikes = this.model.get('likes');
            // console.log(likes);
            // this.model.set().save();

        },
        events: {
            'submit #comment-form': function() {
                var saveInfo = {
                    posted_by: this.$el.find('input[name=posted_by]').val(),
                    comment: this.$el.find('input[name=commentText]').val(),
                    image_id: this.model.id
                };
                this.model.set(saveInfo);
                this.model.save();
            }
        }
    });

    var LikesModel = Backbone.Model.extend({
        initialize: function(){
            console.log('initializing Likes Model with id: ', this.id);
            this.url = '/likes/' + this.id;
            this.fetch();
        }
    });

    var LikesView = Backbone.View.extend({
        initialize: function(id){
            console.log('initialize likesView');
            var view = this;
            this.model.on('change', function() {
                console.log('in on change event on likes view');
                view.render();
            });
        },
        template: Handlebars.templates['likes-temp'],
        render: function() {
            console.log('in likes render function');
            return this.template(this.model.toJSON());
        },
        addLike: function(e) {
            console.log(e);
        },
        events: {
            'click .heart': 'addLike'
        }
    });

    /*********** ROUTER ****************/
    var Router = Backbone.Router.extend({
        routes: {
            '' : 'home',
            'home' : 'home',
            'upload': 'upload',
            'image/:id': 'image'
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
            console.log('home route');
            $('#main').off();
            $('#upload-section').hide();
            new BoardView({
                el: '#main',
                model: new BoardModel
            });
        },
        image: function(id) {
            console.log('id is: ', id);
            new BigImageView({
                el: '#main',
                model: new BigImageModel({
                    id: id
                })
            });
        }
    });

    var router = new Router;

    //tell it to start listening for changes to the url
    Backbone.history.start();
}());

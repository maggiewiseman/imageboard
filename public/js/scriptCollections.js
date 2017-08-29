(function() {
    Handlebars.templates = Handlebars.templates || {};

    var templates = document.querySelectorAll('template');

    Array.prototype.slice.call(templates).forEach(function(tmpl) {
        Handlebars.templates[tmpl.id] = Handlebars.compile(tmpl.innerHTML.replace(/{{&gt;/g, '{{>'));
    });

    Handlebars.partials = Handlebars.templates;

    //make model
    var ImageModel = Backbone.Model.extend();

    var ImageCollection = Backbone.Collection.extend({
        initialize: function() {
            console.log('initializing collection');

            this.fetch({
                success: function(data) {
                    
                }
            });
        },
        url: '/home',
        model: ImageModel
    });

    var ImageView = Backbone.View.extend({
        initialize: function() {
            this.render();
        },
        model: ImageModel,
        className: 'img-div',
        template: Handlebars.templates.image,
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    var BoardModel = Backbone.Model.extend({
        initialize: function() {
            //this.fetch();
            console.log('initializing after fetch');
            console.log('The board model: ', this);

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
            console.log('initializing view');
            var view = this;
            this.models.on('change', function() {
                console.log('change event happened');
                view.render();
            });
        },
        collection: ImageCollection,
        singleImageView: function(image) {
            var imgView = new ImageView({model: image});
            this.$el.append(imgView);
        },
        render: function() {
            console.log('this collection: ', this.collection);
            this.collection.forEach(this.singleImageView, this);
            // console.log('views render function called');
            // var data = this.model.toJSON();
            // var html = Handlebars.templates.imageBoard(data);
            // console.log(html);
            // this.$el.html(html);
        },
        addLike: function(e) {
            this.model.addLike();
        },
        events: {
            'click .heart': 'addLike'
        }
    });

    var myBoardView = new BoardView({
        el: '#main',
        collection: new ImageCollection
    });


}());

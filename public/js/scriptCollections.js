//(function() {
/*********** Handlebars Templating Setup **************/
Handlebars.templates = Handlebars.templates || {};

var templates = document.querySelectorAll('template');

Array.prototype.slice.call(templates).forEach(function(tmpl) {
    Handlebars.templates[tmpl.id] = Handlebars.compile(tmpl.innerHTML.replace(/{{&gt;/g, '{{>'));
});

Handlebars.partials = Handlebars.templates;
console.log('Templates', Handlebars.templates);

/*********** Image Model, View, Collection **************/
var ImageModel = Backbone.Model.extend();

var ImageView = Backbone.View.extend({
    initialize: function() {
        this.render();
    },
    model: ImageModel,
    className: 'image-div',
    template: Handlebars.templates.image,
    render: function() {

        var html = this.template(this.model.toJSON());
        //console.log('html:', html);
        this.$el.html(html);
        return this.$el;
    }
});

var ImageCollection = Backbone.Collection.extend({
    initialize: function() {
        this.fetch({
            success: function(){
                console.log('data uploaded'); // some callback to do stuff with the collection you made
                new BoardView({collection: this});
            },
            error: function(){
                alert("Oh noes! Something went wrong!");
            }
        });
    },
    url: '/home',
    model: ImageModel
});


var myCollection = new ImageCollection;

var boardView;
myCollection.fetch({
    success: function(){
        console.log('data uploaded'); // some callback to do stuff with the collection you made
        boardView = new BoardView({collection: myCollection});
    },
    error: function(){
        alert("Oh noes! Something went wrong!");
    }
});


/*********** Board View **************/
var BoardView = Backbone.View.extend({
    initialize: function() {
        console.log('initializing view');
        var view = this;
        // this.models.on('change', function() {
        //     console.log('change event happened');
        view.render();
        //
    },
    el: '#main',
    collection: ImageCollection,
    singleImageView: function(image) {
        var imgView = new ImageView({model: image});
        console.log(imgView.render());
        this.$el.append(imgView.render());
        console.log('single image view', this.$el);
    },
    render: function() {
        console.log('this collection: ', this.collection);
        this.collection.forEach(this.singleImageView, this);
        console.log(this.$el);
        //this.$el.html(html);
    },
    addLike: function(e) {
        this.model.addLike();
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
        'image' : 'image',
        'upload': 'upload'
    },
    upload: function() {
        $('#upload-section').off();
        $('#upload-section').show();
        console.log('upload route');
        this.uploadView = new UploadView({
            el: '#upload-section',
            model: new UploadModel
        });
    },
    home: function() {
        $('#main').off();
        $('#upload-section').hide();
        this.boardColl = new ImageCollection({
            el: '#main'
        });
    }
});

var router = new Router;

//tell it to start listening for changes to the url
Backbone.history.start();
//}());

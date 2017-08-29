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
    className: 'img-div',
    template: Handlebars.templates.image,
    render: function() {

        var html = Handlebars.templates.image(this.model.toJSON());
        console.log('html:', html);
        this.$el.html(html);
        return this.$el;
    }
});

var ImageCollection = Backbone.Collection.extend({
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
console.log(myCollection);


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
        // console.log('views render function called');
        //var data = this.collection.toJSON();
        //console.log();
        //var html = Handlebars.templates.imageBoard(data);
        console.log(this.$el);
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
    //     collection: new ImageCollection
    // });


//}());

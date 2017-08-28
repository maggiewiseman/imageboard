(function() {


    //create model constructor
    var ImageModel = Backbone.Model.extend({
        defaults: {
            title: 'Lorem Ipsum',
            desc: 'Description of model'
        }
    });

    var ImagesCollection = Backbone.Collection.extend({
        model: ImageModel
    });

    //create a view and tell it the type of model it is going to have +
    //initialize which will take the model an turn it into an html element using a template
    var ImageView = Backbone.View.extend({
        initialize: function() {
            this.render();
        },
        model: ImageModel,
        template: _.template('<%= title %>'),
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    //Board view
    var BoardView = Backbone.View.extend({
        intitalize: function() {
            this.render();
        },
        tagName: 'section',
        collection: ImagesCollection,
        singleImageView: function(image) {
            var imageView = new ImageView({model: image});
            this.$el.append(this.singleImageView(imageView.el));
        },
        render: function() {
            this.collection.forEach(this.singleImageView, this);
            return this;
        }
    });

    var myCollection = [
        { title: 'title 1', desc: 'Desc 1'},
        { title: 'title 2', desc: 'Desc 2'},
        { title: 'title 3', desc: 'Desc 3'},
        { title: 'title 4', desc: 'Desc 4'},
    ];

    //instantiate a collection
    var myImages = new ImagesCollection(myCollection);
    console.log('Collection: ', myImages);
    //instantiate Board
    var myBoard = new BoardView(myImages);
    console.log('Board', myBoard);

    $('#imageBoard').append(myBoard.el);
    //instantiate model
    // var myImage = new ImageModel();
    // console.log(myImage);
    //
    // var myView = new ImageView({model: myImage});
    // console.log(myImage.el);
    // $('#image').append(myView.el);




}());

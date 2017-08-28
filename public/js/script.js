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

    });

    var myBoard = new BoardModel();
myBoard.on('change', function() {
        console.log('change event happened');
        //view.render();
        console.log(myBoard.get('images'));
    });
    // var BoardView = Backbone.View.extend({
    //     initialize: function() {
    //         console.log('initializing view');
    //         var view = this;
    //         this.model.on('change', function() {
    //             console.log('change event happened');
    //             view.render();
    //             //console.log(this.model.get('images'));
    //         });
    //
    //     },
    //     render: function() {
    //         console.log('views render function called');
    //         var data = this.model.toJSON();
    //         var html = Handlebars.templates.imageBoard(data);
    //         this.$el.html(html);
    //     }
    // });
    //
    // var myBoardView = new BoardView({
    //     el: '#main',
    //     model: new BoardModel
    // });


}());

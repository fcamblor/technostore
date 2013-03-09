define([
    "backbone", "underscore", "hbs!templates/hello/Hello", "rivets", "models/Technos"
], function(Backbone, _, viewTemplate, rivets, Technos){

    var HelloViewClass = Backbone.View.extend({
        events: {
        },
    
        initialize: function(){
            HelloViewClass.__super__.initialize.apply(this, arguments);
        },
    
        render: function(){
            this.$el.html(viewTemplate({}));

            window._technos = new Technos();
            rivets.bind(this.$el, {technos: window._technos});

            return this;
        }
    
    });
    
    return HelloViewClass;
});
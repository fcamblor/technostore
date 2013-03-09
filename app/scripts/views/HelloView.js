define([
    "backbone", "underscore", "hbs!templates/hello/Hello", "rivets", "models/Technos"
], function(Backbone, _, viewTemplate, rivets, Technos){

    var HelloViewClass = Backbone.View.extend({
        events: {
            "click #addBtn": "addTechno",
            "click #loadBtn": "loadTechnos"
        },
    
        initialize: function(){
            HelloViewClass.__super__.initialize.apply(this, arguments);
        },
    
        render: function(){
            this.$el.html(viewTemplate({}));

            this._technos = new Technos();
            rivets.bind(this.$el, {technos: this._technos});
            window._technos = this._technos;

            return this;
        },

        addTechno: function(){
            var techno = this._technos.create({ summary: "Created on "+new Date() });
            techno.save();
        },

        loadTechnos: function(){
            var $self = this;
            $.when(this._technos.fetch()).then(function(models){
                console.log("technos fetched : "+models);
            });
        }
    });
    
    return HelloViewClass;
});
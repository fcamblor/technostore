define([
    "backbone", "underscore", "hbs!templates/hello/Hello", "rivets", "models/Technos"
], function(Backbone, _, viewTemplate, rivets, Technos){

    var HelloViewClass = Backbone.View.extend({
        events: {
            "click #addBtn": "addTechno",
            "click #loadBtn": "loadTechnos",
            "click #resetBtn": "resetTechnos"
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
            $.when(this._technos.fetch()).then(function(models){
                console.log("technos fetched : "+models);
            });
        },

        resetTechnos: function(){
            var technos = this._technos.models;
            // Should start from the end, otherwise it won't work...
            for(var i=technos.length-1; i>=0; i--){
                technos[i].destroy();
            }
            // Will be available in future version of backbone localstorage
            // this._technos._clear();
        }
    });
    
    return HelloViewClass;
});
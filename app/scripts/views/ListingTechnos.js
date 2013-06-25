/*global define */
define([
    "backbone", "underscore", "hbs!templates/listingTechnos", "models/Technos", 'models/Techno', 'rivets'
], function(Backbone, _, viewTemplate, Technos, Techno, rivets){
    'use strict';

    var ListingTechnosClass = Backbone.View.extend({
        events: {
            "click #addTechno": "addTechno"
        },

        initialize: function(){
            ListingTechnosClass.__super__.initialize.apply(this, arguments);

            this.technos = new Technos();
            this.editedTechno = new Techno();

            var self = this;
            this.editedTechno.bind("change:title", function(){ console.log("title changé : "+self.editedTechno.toJSON().title); });
        },

        render: function(){
            this.$el.html(viewTemplate({}));

            rivets.bind(this.$el, {
                technos: this.technos,
                editedTechno: this.editedTechno
            });

            this.technos.fetch();

            return this;
        },

        addTechno: function(){
            this.technos.add(this.editedTechno.toJSON());

            this.editedTechno.set({ title: "", description: "" });
        }

    });

    return ListingTechnosClass;
});
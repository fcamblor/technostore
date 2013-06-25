/*global define */
define([
    "backbone", "underscore", "hbs!templates/listingTechnos", "models/Technos"
], function(Backbone, _, viewTemplate, Technos){
    'use strict';

    var ListingTechnosClass = Backbone.View.extend({
        events: {
            "click #addTechno": "addTechno"
        },

        initialize: function(){
            ListingTechnosClass.__super__.initialize.apply(this, arguments);

            this.technos = new Technos();

            this.technos.bind("add remove reset", this.display, this);
        },

        render: function(){
            var self = this;

            var ajaxCall = this.technos.fetch();

            $.when(
                ajaxCall
            ).then(function(){
                self.display();
            });

            return this;
        },

        display: function(){
            this.$el.html(viewTemplate({
                technos: this.technos.toJSON()
            }));
        },

        addTechno: function(){
            this.technos.add({ title: "Nouvelle techno", description: "Une super techno !" });
        }

    });

    return ListingTechnosClass;
});
/*global define */
define([
    "backbone", "underscore", "hbs!templates/technoListing", "models/Technos", "models/Techno", "rivets"
], function(Backbone, _, viewTemplate, Technos, Techno, rivets){
    'use strict';

    var TechnoListingViewClass = Backbone.View.extend({
        events: {
            "click .edit": "editTechno"
        },

        initialize: function(){
            TechnoListingViewClass.__super__.initialize.apply(this, arguments);

            this.technos = new Technos(); // Here, technos are empty !
            this.editedTechno = new Techno();
        },

        render: function(){
            var self = this;

            debugger;
            self.$el.html(viewTemplate({ }));
            rivets.bind(self.$el, {
                technos: this.technos,
                editedTechno: this.editedTechno
            });

            var onceTechnosFetched = this.technos.fetch();

            $.when(
                onceTechnosFetched
            ).then(function(){
                debugger;
                console.log("technos fetched !");
            });

            return this;
        },

        editTechno: function(){
            this.editedTechno.set({ show: true });
        }

    });

    return TechnoListingViewClass;
});
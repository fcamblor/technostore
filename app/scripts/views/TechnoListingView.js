/*global define */
define([
    "backbone", "underscore", "hbs!templates/technoListing", "models/Technos", "rivets"
], function(Backbone, _, viewTemplate, Technos, rivets){
    'use strict';

    var TechnoListingViewClass = Backbone.View.extend({
        events: {
        },

        initialize: function(){
            TechnoListingViewClass.__super__.initialize.apply(this, arguments);

            this.technos = new Technos(); // Here, technos are empty !
        },

        render: function(){
            var self = this;

            debugger;
            self.$el.html(viewTemplate({ }));
            rivets.bind(self.$el, { technos: this.technos });

            var onceTechnosFetched = this.technos.fetch();

            $.when(
                onceTechnosFetched
            ).then(function(){
                debugger;
                console.log("technos fetched !");
            });

            return this;
        }

    });

    return TechnoListingViewClass;
});
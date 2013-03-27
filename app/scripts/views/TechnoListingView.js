/*global define */
define([
    "backbone", "underscore", "hbs!templates/technoListing", "models/Technos"
], function(Backbone, _, viewTemplate, Technos){
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

            var onceTechnosFetched = this.technos.fetch();

            $.when(
                onceTechnosFetched
            ).then(function(){
                self.$el.html(viewTemplate({ technos: self.technos.toJSON() }));
            });

            return this;
        }

    });

    return TechnoListingViewClass;
});
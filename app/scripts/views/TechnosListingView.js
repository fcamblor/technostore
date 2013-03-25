/*global define */
define([
    "backbone", "underscore", "hbs!templates/technoListing", "models/Technos"
], function(Backbone, _, viewTemplate, Technos){
    'use strict';    

    var TechnosListingViewClass = Backbone.View.extend({
        events: {
        },
    
        initialize: function(){
            TechnosListingViewClass.__super__.initialize.apply(this, arguments);

            this.technos = new Technos();
        },
    
        render: function(){
            var self = this;

            $.when(
                self.technos.fetch()
            ).then(function(){
                self.$el.html(viewTemplate({
                    technos: self.technos.toJSON(),
                    toolingCount: self.technos.countToolings()
                }));
            });

            return this;
        }
    
    });
    
    return TechnosListingViewClass;
});
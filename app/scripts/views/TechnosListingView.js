/*global define */
define([
    "backbone", "underscore", "hbs!templates/technoListing", "models/Technos", 'rivets'
], function(Backbone, _, viewTemplate, Technos, rivets){
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

            self.$el.html(viewTemplate({}));
            rivets.bind(this.$el, { technos: this.technos });

            $.when(
                self.technos.fetch()
            ).then(function(){
                console.log("technos fetched !");
            });

            return this;
        }
    
    });
    
    return TechnosListingViewClass;
});
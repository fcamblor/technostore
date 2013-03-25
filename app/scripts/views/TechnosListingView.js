/*global define */
define([
    "backbone", "underscore", "hbs!templates/technoListing"
], function(Backbone, _, viewTemplate){
    'use strict';    

    var TechnosListingViewClass = Backbone.View.extend({
        events: {
        },
    
        initialize: function(){
            TechnosListingViewClass.__super__.initialize.apply(this, arguments);
        },
    
        render: function(){
            var self = this;

            $.ajax("/data/toolings.json", {
                success: function(toolingTechnos){
                    $.ajax("/data/jsfmks.json", {
                       success: function(jsFmkTechnos){
                           self.$el.html(viewTemplate({
                               technos: _.union(toolingTechnos, jsFmkTechnos)
                           }));
                       }
                    });
                }
            });

            return this;
        }
    
    });
    
    return TechnosListingViewClass;
});
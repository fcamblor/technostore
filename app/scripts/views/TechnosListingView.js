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

            var toolingsPromise = $.ajax("/data/toolings.json");
            var jsFmksPromise = $.ajax("/data/jsfmks.json");

            $.when(
                toolingsPromise,
                jsFmksPromise
            ).then(function(toolingRes, jsFmkRes){
                self.$el.html(viewTemplate({
                    technos: _.union(toolingRes[0], jsFmkRes[0])
                }));
            });

            return this;
        }
    
    });
    
    return TechnosListingViewClass;
});
/*global define */
define([
    "backbone", "underscore", "hbs!templates/technoListing"
], function(Backbone, _, viewTemplate){
    'use strict';

    var TechnoListingViewClass = Backbone.View.extend({
        events: {
        },

        initialize: function(){
            TechnoListingViewClass.__super__.initialize.apply(this, arguments);
        },

        render: function(){
            var self = this;

            $.ajax("/data/jsfmks.json", {
                success: function(jsFmks){
                    $.ajax("/data/toolings.json", {
                        success: function(toolings){
                            self.$el.html(viewTemplate({ technos: _.union(toolings, jsFmks) }));
                        }
                    });
                }
            });

            return this;
        }

    });

    return TechnoListingViewClass;
});
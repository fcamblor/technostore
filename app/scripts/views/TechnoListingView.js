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

            var onceJsfmkFetched = $.ajax("/data/jsfmks.json");
            var onceToolingFetched = $.ajax("/data/toolings.json");
            $.when(
                onceJsfmkFetched,
                onceToolingFetched
            ).then(function(jsFmksRes, toolingsRes){
                self.$el.html(viewTemplate({ technos: _.union(toolingsRes[0], jsFmksRes[0]) }));
            });

            return this;
        }

    });

    return TechnoListingViewClass;
});
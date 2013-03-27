/*global define */
define(["backbone", "underscore"], function(Backbone, _){
    'use strict';
    var TechnoClass = Backbone.Model.extend({
        defaults: {
            type: 1
        },

        initialize: function(attributes, options){
            TechnoClass.__super__.initialize.call(this,attributes, options);
        }

        // Aliases
    });

    return TechnoClass;
});
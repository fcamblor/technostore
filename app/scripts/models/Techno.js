/*global define */
define(["backbone", "underscore"], function(Backbone, _){
    'use strict';
    var TechnoClass = Backbone.Model.extend({
        defaults: {
        },

        initialize: function(attributes, options){
            TechnoClass.__super__.initialize.call(this,attributes, options);

            this.set({ className : (attributes.type === 1)?"tooling":"jsfmk" });
        }

        // Aliases
    });

    return TechnoClass;
});
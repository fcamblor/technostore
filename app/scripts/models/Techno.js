/*global define */
define(["backbone", "underscore"], function(Backbone, _){
    'use strict';
    var TechnoClass = Backbone.Model.extend({
        defaults: {
            // Defining default type value in order to not fail while calculating className
            type: 1
        },

        initialize: function(attributes, options){
            TechnoClass.__super__.initialize.call(this,attributes, options);

            this.set({ className : (this.get("type") === 1)?"tooling":"jsfmk" });
        }

        // Aliases
    });

    return TechnoClass;
});
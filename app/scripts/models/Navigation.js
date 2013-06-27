/*global define */
define(["backbone", "underscore"], function(Backbone, _){
    'use strict';
    var NavigationClass = Backbone.Model.extend({
        defaults: {
            selectedStatus: "all"
        },

        initialize: function(attributes, options){
            NavigationClass.__super__.initialize.call(this,attributes, options);
        },

        selectAll: function(){ this.set({ selectedStatus: "all" }); },
        selectCompleted: function(){ this.set({ selectedStatus: "completed" }); },
        selectActive: function(){ this.set({ selectedStatus: "active" }); },

        allSelectedClass: function(){ return this.get("selectedStatus") === "all"?"selected":""; },
        completedSelectedClass: function(){ return this.get("selectedStatus") === "completed"?"selected":""; },
        activeSelectedClass: function(){ return this.get("selectedStatus") === "active"?"selected":""; }
        // Aliases
    });

    return NavigationClass;
});
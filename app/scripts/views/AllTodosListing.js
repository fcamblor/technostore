/*global define */
define([
    "backbone", "underscore", "views/GenericTodosListing"
], function(Backbone, _, GenericTodosListing){
    'use strict';

    var AllTodosListingClass = GenericTodosListing.extend({

        initialize: function(){
            AllTodosListingClass.__super__.initialize.apply(this, arguments);
            this.navigation.selectAll();
        },

        // Overriding default url used
        todosFetchUrl: "https://api.mongolab.com/api/1/databases/todomvc/collections/todos?apiKey=fO6K0boLuhcPc1LvTg1bAiox6i2em1cW"

    });

    return AllTodosListingClass;
});
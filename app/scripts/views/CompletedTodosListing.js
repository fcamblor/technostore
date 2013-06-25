/*global define */
define([
    "backbone", "underscore", "views/GenericTodosListing"
], function(Backbone, _, GenericTodosListing){
    'use strict';

    var CompletedTodosListingClass = GenericTodosListing.extend({

        // Overriding default url used
        todosFetchUrl: 'https://api.mongolab.com/api/1/databases/todomvc/collections/todos?q={status:"completed"}&apiKey=fO6K0boLuhcPc1LvTg1bAiox6i2em1cW'

    });

    return CompletedTodosListingClass;
});
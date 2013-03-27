/*global define */
define(["jquery", "backbone", "underscore"], function($, Backbone, _){
    'use strict';    

    var MainRouterClass = Backbone.Router.extend({
        routes: {
            "hello": "sayHello",
            "listTechnos": "listTechnos"
        },
    
        initialize: function () {
            MainRouterClass.__super__.initialize.apply(this, arguments);

            // Starting urls handlings
            // See http://backbonejs.org/#Router
            Backbone.history.start({ pushState: true, root: "/" });

            $(document).on("click", "a[href]:not([data-bypass])", function(evt) {
                // Get the absolute anchor href.
                var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
                // Get the absolute root.
                var root = location.protocol + "//" + location.host + "/";

                // Ensure the root is part of the anchor href, meaning it's relative.
                if (href.prop.slice(0, root.length) === root) {
                    // Stop the default event to ensure the link will not cause a page
                    // refresh.
                    evt.preventDefault();

                    // `Backbone.history.navigate` is sufficient for all Routers and will
                    // trigger the correct events. The Router's internal `navigate` method
                    // calls this anyways.  The fragment is sliced from the root.
                    Backbone.history.navigate(href.attr, true);
                }
            });
        },
    
        sayHello: function(){
            console.log("hello has been called !");

            require(["views/HelloView"], function(HelloView){
                window.view = new HelloView({ el: $(".hero-unit") }).render();
            });
        },

        listTechnos: function(){
            require(["views/TechnosListingView"], function(TechnosListingView){
                window.view = new TechnosListingView({ el: $(".hero-unit") }).render();
            });
        }

    
    });
    
    return MainRouterClass;
});
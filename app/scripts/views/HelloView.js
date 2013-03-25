/*global define */
define([
    "backbone", "underscore", "hbs!templates/hello"
], function(Backbone, _, viewTemplate){
    'use strict';    

    var HelloViewClass = Backbone.View.extend({
        events: {
        },
    
        initialize: function(){
            HelloViewClass.__super__.initialize.apply(this, arguments);
        },
    
        render: function(){
            this.$el.html(viewTemplate({ who: "DevoxxFr" }));
    
            return this;
        }
    
    });
    
    return HelloViewClass;
});
/*global define */
define([
    "backbone", "underscore", "hbs!templates/hello"
], function(Backbone, _, viewTemplate){
    'use strict';    

    var HelloViewClass = Backbone.View.extend({
        events: {
            "click #sayHelloBtn": "sayHello"
        },
    
        initialize: function(){
            HelloViewClass.__super__.initialize.apply(this, arguments);
        },
    
        render: function(){
            this.$el.html(viewTemplate({ who: "devoxxFr" }));
    
            return this;
        },

        sayHello: function(){
            console.log("Hello world ! "+new Date());
        }
    
    });
    
    return HelloViewClass;
});
/*global define */
define([
    "backbone", "underscore", "hbs!templates/hello"
], function(Backbone, _, viewTemplate){
    'use strict';

    var HelloViewClass = Backbone.View.extend({
        events: {
            "click #sayHello": "sayHello"
        },

        initialize: function(){
            HelloViewClass.__super__.initialize.apply(this, arguments);
            this.count = 0;
        },

        render: function(){
            this.$el.html(viewTemplate({ world: "a tous" }));

            return this;
        },

        sayHello: function(){
            console.log("hello "+this.count);
            this.count++;
        }

    });

    return HelloViewClass;
});
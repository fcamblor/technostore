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

            this.bind("helloSaid", this.anotherHello, this);
        },

        render: function(){
            this.$el.html(viewTemplate({ world: "a tous" }));

            return this;
        },

        anotherHello: function(context){
            console.log("blah "+context.count);
        },

        sayHello: function(){
            console.log("hello "+this.count);
            this.count++;
            this.trigger("helloSaid", { count: this.count });
        }

    });

    return HelloViewClass;
});
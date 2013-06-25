/*global define */
define(['routers/MainRouter', 'rivets'], function (MainRouter, rivets) {
    'use strict';

    // Custom rivets binder allowing to attach to jquery elem's data(), binded value
    // For instance : <div data-to-jqdata-blah="foo"></div>
    // will make a $("target-div").data("blah", fooObject);
    rivets.binders['to-jqdata-*'] = {
        "function": true,
        unbind: function(el) {
            $(el).removeData(this.args[0]);
        },
        routine: function(el, value) {
            $(el).data(this.args[0], this.model);
        }
    };


    // CONFIGURES RIVETS.JS WITH BACKBONE.JS
    // Collection support implemented, thanks to https://github.com/mikeric/rivets/issues/57#issuecomment-13364792
    // Note that implementation have changed a bit in order to handle
    // properties which are not Backbone.Models (in that case, no subscription
    // will be done on these properties)
    rivets.configure({
      adapter: {
        subscribe: function(obj, keypath, callback) {
          if (obj instanceof Backbone.Collection) {
            obj.on('add remove reset', function () {
              callback(obj[keypath])
            });
          } else if(obj instanceof Backbone.Model) {
            obj.on('change:' + keypath, function (m, v) { callback(v) });
          };
        },
        unsubscribe: function(obj, keypath, callback) {
          if (obj instanceof Backbone.Collection) {
            obj.off('add remove reset', function () {
              callback(obj[keypath])
            });
          } else if(obj instanceof Backbone.Model) {
            obj.off('change:' + keypath, function (m, v) { callback(v) });
          };
        },
        read: function(obj, keypath) {
          if (obj instanceof Backbone.Collection) {
            return obj["models"]; // fetching models directly
          } else if(obj instanceof Backbone.Model) {
            return obj.get(keypath);
          } else {
            return obj;
          };
        },
        publish: function(obj, keypath, value) {
          if (obj instanceof Backbone.Collection) {
            obj[keypath] = value;
          } else if(obj instanceof Backbone.Model) {
            obj.set(keypath, value);
          } else {
            throw "Unsupported operation : rivet.publish() done on `"+obj+"`, `"+keypath+"`, `"+value+"`";
          };
        }
      }
    });


    new MainRouter();

    return '\'Allo \'Allo!';
});
/*global define */
// CONFIGURES RIVETS.JS WITH BACKBONE.JS
// Collection support implemented, thanks to https://github.com/mikeric/rivets/issues/57#issuecomment-13364792
define(['rivets', 'backbone'], function(rivets, Backbone){
    'use strict';

    rivets.formatters.typeToClass = function(value){ return value===1?"tooling":"jsfmk"; };

    rivets.configure({
      adapter: {
        subscribe: function(obj, keypath, callback) {
          if (obj instanceof Backbone.Collection) {
            obj.on('add remove reset', function () {
              callback(obj[keypath])
            });
          } else {
            obj.on('change:' + keypath, function (m, v) { callback(v) });
          };
        },
        unsubscribe: function(obj, keypath, callback) {
          if (obj instanceof Backbone.Collection) {
            obj.off('add remove reset', function () {
              callback(obj[keypath])
            });
          } else {
            obj.off('change:' + keypath, function (m, v) { callback(v) });
          };
        },
        read: function(obj, keypath) {
          if (obj instanceof Backbone.Collection) {
            return obj[keypath];
          } else {
            return obj.get(keypath);
          };
        },
        publish: function(obj, keypath, value) {
          if (obj instanceof Backbone.Collection) {
            obj[keypath] = value;
          } else {
            obj.set(keypath, value);
          };
        }
      }
    });
});
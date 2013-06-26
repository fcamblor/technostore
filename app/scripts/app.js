/*global define */
define(['routers/MainRouter', 'rivets', 'jquery'], function (MainRouter, rivets, $) {
    'use strict';

    // Custom function allowing to retrieve data attached in node ancestry
    // For instance, if we have :
    // <div>    <= Attached data("bleh", 10) on this node
    //   <div>    <= Attached data("blah", 5)
    //     <span id="foo"></span>  <= Attached data("blah", 1) on this node
    //   </div>
    // </div>
    // $("#foo").findDataInHierarchy("blah") will return 1
    // $("#foo").findDataInHierarchy("bleh") will return 10
    // $("#foo").findDataInHierarchy("unknownKey") will return undefined
    $.fn.findDataInHierarchy = function(key){
        if(this.length !== 1){
            throw "findDataInHierarchy() should be called on exactly one jquery element, provided is `"+this.length+"`";
        }

        var values = this.map(function(){
            var currentEl = $(this);
            var dataElem = currentEl.data(key);
            while(dataElem === undefined && currentEl.parent().length !== 0){
                currentEl = currentEl.parent();
                dataElem = currentEl.data(key);
            }

            return dataElem;
        });
        return values.length === 0?undefined:values[0];
    };

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

    rivets.formatters['formatDate'] = function(timestamp){
        if(timestamp){
            var date = new Date(timestamp);
            return date.getFullYear()+"/"+(date.getMonth()<9?"0":"")+(date.getMonth()+1)+"/"+(date.getDate()<10?"0":"")+date.getDate()
                +" "+(date.getHours()<10?"0":"")+date.getHours()+":"+(date.getMinutes()<10?"0":"")+date.getMinutes();
        } else {
            return "";
        }
    };

    new MainRouter();

    return '\'Allo \'Allo!';
});
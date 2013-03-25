/*global define */
define([
    "backbone", "underscore", "hbs!templates/technoListing", "models/Technos", "models/Techno", 'rivets'
], function(Backbone, _, viewTemplate, Technos, Techno, rivets){
    'use strict';    

    var TechnosListingViewClass = Backbone.View.extend({
        events: {
            "click .edit":"editTechno"
        },
    
        initialize: function(){
            TechnosListingViewClass.__super__.initialize.apply(this, arguments);

            this.technos = new Technos();
            this.editedTechno = new Techno();
        },
    
        render: function(){
            var self = this;

            self.$el.html(viewTemplate({}));
            rivets.bind(this.$el, {
                technos: this.technos,
                editedEntry: this.editedTechno
            });

            $.when(
                self.technos.fetch()
            ).then(function(){
                console.log("technos fetched !");
            });

            return this;
        },

        editTechno: function(event){
            this.editedTechno.set({ show: true });

            var targetTechno = $(event.currentTarget).data("rivetsContext");
            this.editedTechno.set(targetTechno.toJSON());
        }
    
    });
    
    return TechnosListingViewClass;
});
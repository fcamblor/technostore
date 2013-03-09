define(["jquery", "backbone", "underscore"], function($, Backbone, _){

    var RouterClass = Backbone.Router.extend({
        routes: {
            "!/*path": "invokeView"
        },
    
        // Provide a mapping between :
        // Key : an url
        // Value : A require.js path relative to views/ directory, representing
        //   view which will be loaded when corresponding url is met
        viewsByUrls: {
        },

        // Will be calculated in initialize() depending on viewsByUrls field
        viewByUrlPattern: null,

        dynamicSection: $("#container"),

        // Latest resolved view
        currentView: null,

        initialize: function () {
            RouterClass.__super__.initialize.call(this);

            // Initiating view by url regexes
            // Note : This should be done _before_ Backbone.history.start() in order to be
            // able to resolve current url when starting history
            this.viewByUrlPattern = this.createViewByUrlPattern(this.viewsByUrls);

            // Starting urls handlings
            // See http://backbonejs.org/#Router
            Backbone.history.start();
        },
        

        invokeView: function(url) {
            var viewInfos = this.findViewInfosByUrl(url);
            if(!viewInfos){
                throw "Missing view name declaration in viewByUrl for url : "+url;
            }
        
            var router = this;
            // Requiring view and invoking render() on it
            require(["views/"+viewInfos.viewName], function(ViewClass){
                // Fixing memory leak, by cleaning previous view (and attached events on it)
                if(router.currentView){
                    router.currentView.undelegateEvents();
                    router.currentView.$el.empty();
                }
        
                // Instantiating view..
                router.currentView = new ViewClass(viewInfos.parameters);
                router.currentView.setElement(router.dynamicSection);
                // ... then calling render() on it
                router.currentView.render();
            });
        },
        
        findViewInfosByUrl: function(url) {
            var urlPatterns = this.viewByUrlPattern;
            var matchingViewUrlPattern = _.find(_.keys(urlPatterns), function(routeUrl){
                return urlPatterns[routeUrl].urlPattern.test(url);
            });
        
            if(matchingViewUrlPattern){
                return {
                    matchingViewUrlPattern: matchingViewUrlPattern,
                    viewName: urlPatterns[matchingViewUrlPattern].view,
                    parameters: this._extractParameters(urlPatterns[matchingViewUrlPattern].urlPattern, url)
                };
            } else {
                return null;
            }
        },
        
        createViewByUrlPattern: function(viewByUrl){
            var $self = this;
            var viewByUrlPattern = {};
            _.each(_.keys(viewByUrl), function(routeUrl){
                var urlPattern = _.isRegExp(routeUrl)?routeUrl:$self._routeToRegExp(routeUrl);
                viewByUrlPattern[routeUrl] = { urlPattern: urlPattern, view: viewByUrl[routeUrl] };
            });
            return viewByUrlPattern;
        }
    });
    
    return RouterClass;
});
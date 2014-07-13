/**
 * Main application class.
 */
Clonoz.createClass('Application.Router').addProperties({

    /**
     * Router configuration.
     *
     * @memberOf Clonoz.Application.Router
     * @type {Object}
     */
    config: {
        /**
         * Patterns to map constructor class.
         * @type {Array}
         */
        controllerPatterns: [
            'Controller_%sController',
            'View_%s_%sController'
        ]
    },

    /**
     * Crosroads object.
     *
     * @memberOf Clonoz.Application.Router
     * @type {Crossroads}
     */
    router: null,

    /**
     * Compilled route rulles.
     *
     * @memberOf Clonoz.Application.Router
     * @type {Array}
     */
    routes: null,
}).addMethods({
    /**
     * Do routing itself Route an request.
     *
     * @private
     * @memberOf Clonoz.Application.Router
     *
     * @param {String} controllerClass Controller class as string.
     * @param {String} action          Action to route.
     * @param {Object} parameters      Parameters.
     *
     * @returns {Void}
     */
    doRouting: function(controllerClass, action, parameters) {
        var controller = Clonoz.Application.Controller.getInstance(controllerClass);
        controller.addProperties({
            router: this
        });

        // Dispatch Controller.
        controller.dispatch(action, parameters);
    },

    /**
     * Process default values when route was found.
     *
     * @private
     * @memberOf Clonoz.Application.Router
     *
     * @param {String} requestedUrl Requested URL.
     * @param {Object} values       Processed values from crossroutes.
     * @param {Object} routeSpec    Route specification.
     *
     * @throws {Clonoz.Exception} Exception is thrown if controller or action could not be expressed.
     *
     * @returns {Array} Processed array with parameters.
     */
    processDefaultValues: function(requestedUrl, values, routeSpec) {
        var controller = '';
        var action = '';
        var params = [];

        // Set default values
        var defaults = routeSpec.hasOwnProperty('default') ? routeSpec['default'] : {};
        for (var def in defaults) {
            if (!values.hasOwnProperty(def) || !values[def]) {
                values[def] = defaults[def];
            }
        }

        // Iterate over the all values .
        for (var key in values) {
            // If key is not meta key (suffixed with '_').
            if (key.substr(-1) != '_') {
                // If value is missing try use default one if defined.
                var value = values[key];
                if (key == 'controller') {
                    if (!value) {
                        throw Clonoz.Exception.create('Invalid URL', 'Controller could not be found.');
                    }
                    value = Clonoz.strCapitalise(value);

                    for (var i = this.config.controllerPatterns.length - 1; i >= 0; i--) {
                        controller          = this.config.controllerPatterns[i].replace(/%s/g, value);
                        var controllerClass = Clonoz.ClassFactory.getClass(controller);
                        if (controllerClass && controllerClass.isA(Clonoz.Application.Controller)) {
                            break;
                        }
                    }
                    if (controller == '') {
                        throw Clonoz.Exception.create('Invalid URL', 'Invalid controller.');
                    }
                } else if (key == 'action') {
                    if (!value) {
                        throw new Clonoz.Exception.create('Invalid URL', 'Action could not be found.');
                    }

                    action = value;
                } else {
                    params.push(value);
                }
            }
        }
        return [controller, action, params];
    },
    /**
     * Initialise routes.
     * @param {Object} routersSpecs Raw routes.
     *
     * @returns {Void}
     */
    initRoutes: function(routesSpecs) {
        var id      = 0;
        var self    = this;
        this.routes = [];

        for (var pattern in routesSpecs) {
            var routeSpec = routesSpecs[pattern];

            // Create rule.
            var route = this.router.addRoute(pattern, null, id--);
            route.matched.add(function(controllerClass, action, parameters) {
                this.doRouting(controllerClass, action, parameters);
            }, this);

            // Add rules if there are any.
            route.rules = routeSpec.rules || {};

            // Process default values, function has to be specified in local closure.
            (function() {
                var spec = routeSpec;
                route.rules.normalize_ = function(requestedUrl, values) {
                    return self.processDefaultValues(requestedUrl, values, spec);
                };
            })();

            // Set properties if there are any.
            if (routeSpec.hasOwnProperty('properties')) {
                for (var prop in routeSpec.properties) {
                    route[prop] = routeSpec.properties[prop];
                }
            }

            // Add route to routes array.
            this.routes.push(route);
        }
    },

    /**
     * Constructor
     */
    init: function(config) {
        // Get Crossroads.js external object and create new instance.
        this.router = crossroads.create();
        this.router.ignoreState = true;

        // Turn on automatic type-casting.
        this.router.shouldTypecast = true;

        // Throw exception if not route was found
        this.router.bypassed.add(function(url) {
            throw Clonoz.Exception.create('Invalid URL', 'No route was found for given URL (' + url + ').');
        });

        // Compile routes.
        this.initRoutes(config.routes);

        var self = this;
        Clonoz.History.registerCallback(function(url) {
            self.router.parse(url);
        });
    },

    /**
     * Redirect to specific controler and action with parameters.
     *
     * @param {Object|String} controller Controller object or name.
     * @param {String}        action     Action name.
     * @param {Object}        parameters Object with all parameters.
     * @param {Boolean}       noTrigger  Hash will be changed without triggering its processing.
     *
     * @return {Void};
     */
    redirectTo: function(controller, action, parameters, noTrigger) {
        var hash = this.link(controller, action, parameters);
        if (hash != Clonoz.History.getCurrentHistoryId()) {
            Clonoz.History.addHistoryEntry(hash);

            if (!noTrigger) {
                this.router.parse(hash);
            }
        }
    },

    /**
     * Redirect to specific hash.
     *
     * @param {String}  hash      Hash to redirect to.
     * @param {Boolean} noTrigger Hash will be changed without triggering its processing.
     *
     * @return {Void};
     */
    redirectToHash: function(hash, noTrigger) {
        if (hash != Clonoz.History.getCurrentHistoryId()) {
            Clonoz.History.addHistoryEntry(hash);

            if (!noTrigger) {
                this.router.parse(hash);
            }
        }
    },

    /**
     * Generate link to specific controller and action.
     *
     * @param {Object|String} controller Controller object or name.
     * @param {String}        action     Action name.
     * @param {Object}        parameters Object with all parameters.
     *
     * @throws {Clonoz.Exceptionn} Exception is thrown if is not possible to create link for given parameters.
     *
     * @return {String} Generated URL.
     */
    link: function(controller, action, parameters) {
        parameters = parameters || {};

        // Set controller and action.
        if (controller) {
            parameters.controller = (controller.isA(Clonoz.Application.Controller) ? (controller.alias || controller.getID()) : controller);
        }

        if (action) {
            parameters.action = action;
        }

        // Trace all routes to find first route which suits requirements.
        for (var route in this.routes) {
            try {
                // Try to interpolate parameters to URL, if it was possible, return URL.
                url = this.routes[route].interpolate(parameters);
                return url.replace(/\/+/gm, '/').replace(/\/\?/gm, '?');
            } catch(e) {
                // Mute exception if route was not able to interpolate
            }
        }
        throw Clonoz.Exception.create('Link creating failed', 'Link for given parameters (controller=' + controller +', action=' + action + ', parameters=' + JSON.stringify(parameters) + ') could not be found.');
    },

});
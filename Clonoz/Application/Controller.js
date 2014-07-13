/**
 * Main controller.
 */
Clonoz.createClass('Application.Controller').addClassProperties({
    /**
     * Container of instantiated controllers.
     * @type {Object}
     */
    cache: {},

    /**
     * Get instance of controller
     * @param  {String|Clonoz.Class} controller Name of controller or class.
     * @param  {Array}               ...        Constructor parameters for controller.
     * @return {Clonoz.Application.Controller} Instance of controller.
     */
    getInstance: function(controller) {
        var controllerName = controller;

        if (Clonoz.isA.String(controller)) {
            controller = Clonoz.ClassFactory.getClass(controller);

            if (!controller) {
                throw Clonoz.Exception.create('Invalid Controller', "Controller '" + controllerName + "' does not exist.");
            }
        } else {
            controllerName = controller.getClassName();
        }

        if (!Clonoz.Application.Controller.cache.hasOwnProperty(controllerName)) {
            Clonoz.Application.Controller.cache[controllerName]        = controller.create.apply(controller, Array.prototype.slice.call(arguments, 1));
            Clonoz.Application.Controller.cache[controllerName].router = Clonoz.app.router;
        }

        return Clonoz.Application.Controller.cache[controllerName];
    }
}).addProperties({
    /**
     * Router object.
     *
     * @type {Clonoz.Application.Router}
     */
    router: null,

    /**
     * View object.
     *
     * @type {Clonoz.Application.View}
     */
    view: null,

    /**
     * Config object.
     * @type {Object}
     */
    config: {
        /**
         * Default action pattern.
         *
         * @type {String}
         */
        actionPattern: 'on%s',
    },
}).addMethods({
    /**
     * Constructor
     */
    init: function(config) {
        this.config = Clonoz.addProperties(this.config, config);
        if (this.config.hasOwnProperty('router')) {
            this.router = this.config.router;
            delete this.config.router;
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
        return this.router.link(controller, action, parameters);
    },

    /**
     * Callback function run at the beginning of the dispatch process.
     *
     * @protected
     * @memberOf Clonoz.Application.Controller
     *
     * @return {Boolean} False return value stops processing.
     */
    initialisation: function() {
        return true;
    },

    /**
     * Start whole dispatch process.
     *
     * @public
     * @memberOf Clonoz.Application.Controller
     *
     * @param {String} action          Action to route.
     * @param {Object} parameters      Parameters.
     *
     * @throws {Clonoz.Exception} Exception is thrown if requested action does not exist.
     *
     * @returns {void}
     */
    dispatch: function(action, parameters) {
        // Run initialisation callback function.
        if (!this.initialisation()) {
            return;
        }

        // Create action method name.
        var actionMethod = this.config.actionPattern.replace(/%s/g, action);

        // If action method exists, trigger it.
        if (Clonoz.isA.Function(this[actionMethod])) {
            this[actionMethod].apply(this, parameters);
        } else {
            throw  Clonoz.Exception.create('Invalid action', 'Invalid action \'' +  action + '\' in ' + this.getClassName());
        }

        // Run finalise callback function.
        this.finalise();
    },

    /**
     * Callback function run at the end of the dispatch process.
     *
     * @protected
     * @memberOf Clonoz.Application.Controller
     *
     * @return {void}
     */
    finalise: function() {
    }
});
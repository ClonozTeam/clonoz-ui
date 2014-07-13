/**
 * Main application class.
 */
Clonoz.createClass('Application.Application').addProperties({

    /**
     * Config object.
     * @type {Object}
     */
    config: {
        /**
         * Main view.
         * @type {String|Class}
         */
        view: null,

        /**
         * Route rulles.
         * Key is pattern which is either regular expression (in /.../) or signle pattern.
         *
         * @type {Object}
         */
        routes: {}
    },
}).addMethods({
    /**
     * Router object.
     *
     * @type {Clonoz.Application.Router}
     */
    router: null,

    /**
     * Main view.
     * @type {Clonos.Application.View}
     */
    view: null,

    /**
     * Constructor
     */
    init: function(config) {
        this.config = Clonoz.addProperties(this.config, config)

        // Make application object globaly accessible as soon as possible.
        Clonoz.app  = this;

        // Get Crossroads.js external object and create new instance in case that route will be called multiple times.
        this.router = Clonoz.Application.Router.create({
            routes: this.config.routes
        });

        // Create view from config.
        if (Clonoz.isA.String(this.config.view)) {
            this.config.view = Clonoz.ClassFactory.getClass(this.config.view);
        }

        this.view = this.config.view.create();
    }
});
/**
 * Main view class.
 */
Clonoz.createClass('Application.View', 'Layout').addClassProperties({
	/**
	 * Create callback function which will be run on Controller.
	 * @param  {String} functionName Function name.
	 * @param  {Object} scope		 If different scope is require in oposed to controller.
	 * @return {FUnction}            Function which wraps calling of the function on controller.
	 */
	fire: function(functionName, scope) {
		return function() {
			var view = this.view;
			var name = view.controller.config.actionPattern.replace(/%s/g, functionName);

			if (view.controller) {
				var name = view.controller.config.actionPattern.replace(/%s/g, functionName);
				if (view.controller[name]) {
					return view.controller[name].apply(scope || view.controller, [view, this].concat(Array.prototype.slice.call(arguments)));
				} else {
					throw Clonoz.Exception.create('Invalid method', 'Invalid controller method \'' + name + '\' please check whether requested method exists in controller.');
				}
			} else {
				throw Clonoz.Exception.create('Invalid controller', 'Invalid controller please check whether controller is set in the view.');
			}
		};
	}
}).addProperties({
	/**
	 * View controller, will be evaluated autoamticaly based on the name of the class if not set.
	 * @type {Clonoz.Application.Controller}
	 */
	controller: null,

	/**
	 * Cache of compoents.
	 * @type {Object}
	 */
	componentsCache: null,

	/**
	 * Components.
	 * @type {Object}
	 */
	components: null,

	/**
	 * Properties setters
	 * @type {Object}
	 */
	propertiesSetters: null
}).addMethods({
	/**
	 * Setup widget for a field.
	 *
	 * @param {Object} widget Widget configuration.
	 * @return {Void}
	 */
	setupBindings: function(widget) {
		var me = this;

		if (Clonoz.isAn.Instance(widget) && (widget == this ||!widget.isA(Clonoz.Application.View))) {
			// Add pointer to the view itself.
			widget.addProperties({ view: this });

			// If widget has some bindings.
			if (widget.hasOwnProperty('bind')) {
				// Create setter function for all properties in this widget.
				var propertySetter = function(view, values) {
					var properties = {};

					// Conudct all properties.
					for (var i in widget.bind) {
						var value = widget.bind[i];

						// Create replacement function.
						var setProperty = function(match, p1) {
							return Clonoz.Class.evaluate(p1, { view: view, value: values, me: this, 'event': Clonoz.Event });
						}

						// If string contains placeholder, evaluate content of placeholders, otherwise evaluate whole string.
						if (value.match(/\{\{.*?\}\}/)) {
							properties[i] = value.replace(/\{\{(.*?)\}\}/gm, setProperty);
						} else {
							properties[i] = setProperty(value, value);
						}
					}

					// Set the properties to wiget itself.
					this.addProperties(properties);
				};

				// Set property to main widget so it can be called from its context, but with context of the widget.
				me.propertiesSetters[widget.getID()] = propertySetter.bind(widget);
			}

			// Recursively process also children of widget.
			if (widget.hasOwnProperty('children')) {
				for (var i = 0; i < widget.children.length; i++) {
					this.setupBindings(widget.children[i]);
				}
			}
		}
	},

	/**
	 * Create component from the view.
	 *
	 * @param  {String} name       Name of the component in view.
	 * @param  {Object} properties Component properties.
	 * @return {Canvas}            Created component.
	 */
	createComponent: function(name, properties) {
		if (!this.components || !this.components[name]) {
			throw Clonoz.Exception.create('Invalid component', "Component '" + name + "' does not exist in " + this.getClassName());
		}

		var component = Clonoz.clone(this.components[name])
		if (Clonoz.isAn.Instance(component)) {
			component.addProperties(properties || {});

			if (!this.propertiesSetters.hasOwnProperty(component.getID())) {
				this.setupBindings(component);
			}
		} else {
			component = Clonoz.ClassFactory.newInstance(component, properties || {});
			this.setupBindings(component);
		}
	},

	/**
	 * Get component instance.
	 * @param  {String} name Name of the component in view.
	 *
	 * @return {Canvas}      Component instance.
	 */
	getComponent: function(name) {
		if (!this.componentsCache[name]) {
			this.componentsCache[name] = this.createComponent(name);
		}

		return this.componentsCache[name];
	},

	/**
	 * Constructor
	 */
	initWidget: function(conf) {
		conf                   = conf || {};
		this.controller        = conf.controller
		this.componentsCache   = {};
		this.propertiesSetters = {};

		// If controller is not ser just add 'Controller' after name of the View.
		if (!this.controller) {
			this.controller = this.getClassName() + 'Controller';
		}

		// If controller is string, get class from it.
		if (Clonoz.isA.String(this.controller)) {
			this.controller = Clonoz.ClassFactory.getClass(this.controller);
		}

		// If controller was set or constructed name exists.
		if (this.controller) {
			// Get instance of controller.
			this.controller = Clonoz.Application.Controller.getInstance(this.controller, {
				view: this
			});
		}

		var result = this.Super('initWidget', conf);

		// Setup binding.
		this.setupBindings(this);

		return result;
	}
});
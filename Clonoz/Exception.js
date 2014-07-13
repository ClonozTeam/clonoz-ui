2/**
 * Main Exception.
 *
 */
Clonoz.createClass('Exception').addProperties({

	/**
	 * Exception Level.
	 *
	 * @public
	 * @memberOf Clonoz.Exception
	 *
	 * @type {Number}
	 */
	level: 1,

	/**
	 * Name of exception.
	 *
	 * @public
	 * @memberOf Clonoz.Exception
	 *
	 * @type {String}
	 */
	name: '',

	/**
	 * Message.
	 *
	 * @public
	 * @memberOf Clonoz.Exception
	 *
	 * @type {String}
	 */
	message: '',

	/**
	 * Exception code.
	 *
	 * @public
	 * @memberOf Clonoz.Exception
	 *
	 * @type {Number}
	 */
	code: -1,
}).addMethods({
	/**
	 * Constructor
	 *
	 * @constructor
	 *
	 * @memberOf Clonoz.Exception
	 *
	 * @param {String} name    Exception name.
	 * @param {String} message Exception message.
	 * @param {String} code    Exception code.
	 * @param {Number} level   Exception level.
	 */
	init: function(name, message, code, level) {
		this.name    = name;
		this.message = message;
		this.code    = code || -1;
		this.level   = level == undefined ? this.level : level;
	},

	/**
	 * Rewrite toString function to show error message.
	 *
	 * @public
	 * @memberOf Clonoz.Exception
	 *
	 * @returns {String}
	 */
	toString: function() {
		return this.name + ': ' + this.message + ' (' + this.code + ')';
	},

	/**
	 * Rewrite valueOf function to return error code.
	 *
	 * @public
	 * @memberOf Clonoz.Exception
	 *
	 * @returns {Number}
	 */
	valueOf: function() {
		return this.code;
	}
});
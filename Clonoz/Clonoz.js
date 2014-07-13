Date.setInputFormat('YMD');

/**
 * Extend main class.
 */
Clonoz = isc.addProperties(isc, {
	/**
	 * Capitalize first character of the string
	 * @param  {String} str String to capitalize.
	 * @return {String}     Capitalized string.
	 */
	strCapitalise: function(str) {
    	return str.charAt(0).toUpperCase() + str.slice(1);
	},

	createNamespace: function(name) {
		var names = name.split('.');

		if (names[0] == 'Clonoz') {
			names.shift();
		}

		var parent = Clonoz;
		for (var i = 0; i < names.length; i++) {
			var ns     = names[i];
			if (ns == '') {
				continue;
			}

			parent[ns] = parent[ns] || {};
			parent = parent[ns];
		}

		return parent;
	},

	createClass: function(className, superClass) {
		var pos  = className.lastIndexOf('.');
		var ns   = this.createNamespace(className.substr(0, pos))
		var name = className.substr(pos + 1);

		ns[name] = Clonoz.ClassFactory.defineClass(className.replace(/\./g, '_'), superClass);

		return ns[name];
	}
});

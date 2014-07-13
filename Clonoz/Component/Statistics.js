/**
 * Main controller.
 */
Clonoz.createClass('Component.Statistics', Clonoz.HTMLFlow).addProperties({
	baseStyle: 'statistics-meta',
	width: '*',
	overflow: 'hidden',
	dynamicContentsVars: {
		data: [{
	        description: 'Campaigns',
	        statistic: 10
	    },{
	        description: 'Opportunities',
	        statistic: '20,560'
	    },{
	        description: 'Closed Won',
	        statistic: '10,000'
	    },{
	        description: 'Total Sales',
	        statistic: '$90,200'
	    },{
	        description: 'Goals Met',
	        statistic: '71%'
	    }]
	},
	dynamicContents: true,
	contents: '<table class="statistics-meta"><tr>${this.generateContent(data)}</tr></table>',
}).addMethods({
	/**
	 * Generate content.
	 * @param  {Array} data Array from which the content is to be generate.
	 * @return {String}     Output.
	 */
	generateContent: function(data) {
		var out = '';
		for (var i = 0; i < data.length; i++) {
			out += '<td>' +
                   		'<div>' + data[i].statistic + '</div> ' + data[i].description +
                   '</td>';
        }

        return out;
	},
});
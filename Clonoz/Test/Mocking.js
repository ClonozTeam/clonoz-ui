testDataMocking = [
    { name: 'Credit Card Details', source: 'eshop', database: '', entity: 'credit_cards', field: 'cc_number', method: 'generate', created: Date.parseInput('2014-07-27 18:25'), createdBy: 'peter' },
    { name: 'Client Name',         source: 'eshop', database: 'eshop_test', entity: 'client', field: 'name',  method: 'random',   created: Date.parseInput('2014-05-12 15:25'), createdBy: 'milan' },
    { name: 'Phone Number',        source: 'eshop', database: 'eshop_test', entity: 'client', field: 'phone', method: 'shuffle',  created: Date.parseInput('2014-06-06 19:25'), createdBy: 'milan' },
    { name: 'Email',               source: 'eshop', database: 'eshop_test', entity: 'client', field: 'email', method: 'formula',  created: Date.parseInput('2014-06-06 19:25'), createdBy: 'milan' },

	{ name: 'Client Name',         source: 'eshop', database: 'eshop_demo', entity: 'client', field: 'name',  method: 'random',   created: Date.parseInput('2014-05-12 15:25'), createdBy: 'milan' },
    { name: 'Phone Number',        source: 'eshop', database: 'eshop_demo', entity: 'client', field: 'phone', method: 'shuffle',  created: Date.parseInput('2014-06-06 19:25'), createdBy: 'milan' },
    { name: 'Email',               source: 'eshop', database: 'eshop_demo', entity: 'client', field: 'email', method: 'formula',  created: Date.parseInput('2014-06-06 19:25'), createdBy: 'milan' },

    { name: 'Access Log', source: 'portal', database: 'blog_uat', entity: 'access_log', field: '',         method: 'truncate',   created: Date.parseInput('2014-02-07 10:25'), createdBy: 'peter' },
    { name: 'Article',    source: 'portal', database: 'blog_uat', entity: 'articles',   field: 'aticle',   method: 'loremIpsum', created: Date.parseInput('2014-03-20 12:25'), createdBy: 'peter' },
    { name: 'Password',   source: 'portal', database: 'blog_uat', entity: 'user',       field: 'password', method: 'replace',    created: Date.parseInput('2014-07-27 18:25'), createdBy: 'peter' }
];
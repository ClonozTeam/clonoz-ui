Clonoz.DataSource.create({
    ID: 'databases',
    dataFormat: 'json',
    clientOnly: true,
    testData: testDataDatabases,
    dataURL: '/Clonoz/Test/Databases.js',
    fields:[
        { name: 'type', type: 'string' },
        { name: 'name', type: 'string', primaryKey: true },
        { name: 'source', type: 'string' },
        { name: 'refreshing',  type: 'boolean' },
        { name: 'refreshtime',  type: 'string' },
        { name: 'note', type: 'string' },
        { name: 'size', type: 'string' },
        { name: 'private', type: 'bool' },
        { name: 'refreshed', type: 'datetime' }
    ]
});

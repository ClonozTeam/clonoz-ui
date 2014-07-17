Clonoz.DataSource.create({
    ID: 'mockingMethods',
    dataFormat: 'json',
    clientOnly: true,
    testData: testMockingMethods,
    dataURL: '/Clonoz/Test/MockingMethods',
    fields:[
        { name: 'name', type: 'sequence', primaryKey: true },
        { name: 'supportedDatabases', type: 'any' }
    ]
});

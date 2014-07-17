Clonoz.DataSource.create({
    ID: 'databaseType',
    dataFormat: 'json',
    clientOnly: true,
    testData: testDatabaseType,
    dataURL: '/Clonoz/Test/DatabaseType',
    fields:[
        { name: 'name', type: 'sequence', primaryKey: true }
    ]
});

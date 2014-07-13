Clonoz.DataSource.create({
    ID: 'connections',
    dataFormat: 'json',
    clientOnly: true,
    testData: testDataConnections,
    dataURL: '/Clonoz/Test/Connection',
    fields:[
        { name: 'type', type: 'string' },
        { name: 'name', type: 'sequence', primaryKey: true },
        { name: 'host', type: 'string' },
        { name: 'user', type: 'string' },
        { name: 'sources', type: 'integer' },
        { name: 'created', type: 'datetime' },
        { name: 'createdBy', type: 'string', foreignKey: 'users.login', editorType: 'ComboBoxItem' }
    ]
});

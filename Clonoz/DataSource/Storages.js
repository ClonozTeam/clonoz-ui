Clonoz.DataSource.create({
    ID: 'storages',
    dataFormat: 'json',
    clientOnly: true,
    testData: testDataStorages,
    dataURL: '/Clonoz/Test/Storages',
    fields:[
        { name: 'type', type: 'string' },
        { name: 'name', type: 'sequence', primaryKey: true },
        { name: 'path', type: 'string' },
        { name: 'sources', type: 'integer' },
        { name: 'databases', type: 'integer' },
        { name: 'created', type: 'datetime' },
        { name: 'createdBy', type: 'string', foreignKey: 'users.login', editorType: 'ComboBoxItem' }
    ]
});

Clonoz.DataSource.create({
    ID: 'sources',
    dataFormat: 'json',
    clientOnly: true,
    testData: testDataSources,
    dataURL: '/Clonoz/Test/Source',
    fields:[
        { name: 'type', type: 'string', foreignKey: 'databaseType.name', editorType: 'ComboBoxItem' },
        { name: 'name', type: 'sequence', primaryKey: true },
        { name: 'storage', foreignKey: 'storages.name', editorType: 'ComboBoxItem' },
        { name: 'connection', foreignKey: 'connections.name', editorType: 'ComboBoxItem'  },
        { name: 'databases',  type: 'integer' },
        { name: 'created', type: 'datetime' },
        { name: 'createdBy', type: 'string', foreignKey: 'users.login', editorType: 'ComboBoxItem' }
    ]
});

Clonoz.DataSource.create({
    ID: 'databases',
    dataFormat: 'json',
    clientOnly: true,
    testData: testDataDatabases,
    dataURL: '/Clonoz/Test/Database',
    fields:[
        { name: 'type', type: 'string' },
        { name: 'name', type: 'sequence', primaryKey: true },
        { name: 'source',  foreignKey: 'sources.name', editorType: 'ComboBoxItem' },
        { name: 'refreshing',  type: 'boolean' },
        { name: 'refreshtime',  type: 'string' },
        { name: 'note', type: 'text', length: 500  },
        { name: 'size', type: 'string' },
        { name: 'private', type: 'bool' },
        { name: 'refreshed', type: 'datetime' },
        { name: 'refreshedBy', type: 'string', foreignKey: 'users.login', editorType: 'ComboBoxItem' },
        { name: 'created', type: 'datetime' },
        { name: 'createdBy', type: 'string', foreignKey: 'users.login', editorType: 'ComboBoxItem' }
    ]
});

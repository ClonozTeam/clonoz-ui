Clonoz.DataSource.create({
    ID: 'mocking',
    dataFormat: 'json',
    clientOnly: true,
    testData: testDataMocking,
    dataURL: '/Clonoz/Test/Mocking',
    fields:[
        { name: 'name', type: 'sequence', primaryKey: true },
        { name: 'source', foreignKey: 'sources.name', editorType: 'ComboBoxItem' },
        { name: 'database', foreignKey: 'databases.name', editorType: 'ComboBoxItem'  },
        { name: 'entity', type: 'string' },
        { name: 'field', type: 'string' },
        { name: 'method', foreignKey: 'mockingMethods.name', editorType: 'ComboBoxItem' }
    ]
});

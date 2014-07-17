Clonoz.DataSource.create({
    ID: 'storageType',
    dataFormat: 'json',
    clientOnly: true,
    testData: testStorageType,
    dataURL: '/Clonoz/Test/StorageType',
    fields:[
        { name: 'name', type: 'sequence', primaryKey: true }
    ]
});

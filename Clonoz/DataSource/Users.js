Clonoz.DataSource.create({
    ID: 'users',
    dataFormat: 'json',
    clientOnly: true,
    testData: testDataUsers,
    dataURL: '/Clonoz/Test/Users',
    fields:[
        { name: 'login', type: 'sequence', primaryKey: true },
        { name: 'email', type: 'string' },
        { name: 'firstName', type: 'string' },
        { name: 'secondName', type: 'string' },
        { name: 'role', type: 'text', valueMap: ['Administrator', 'Developer', 'User'] },
        { name: 'lastLogin', type: 'datetime' }
    ]
});

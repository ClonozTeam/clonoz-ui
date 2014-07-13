testDataStorages = [
    { type: 'zfs',   name: 'blogger', path: '/var/lib/mysql1',             sources: 1, databases: 2, created: Date.parseInput('2014-04-13 14:37'), createdBy: 'milan' },
    { type: 'zfs',   name: 'portal',  path: '/var/lib/mongodb/',           sources: 1, databases: 2, created: Date.parseInput('2014-03-10 18:42'), createdBy: 'peter' },
    { type: 'btrfs', name: 'others',  path: '/var/lib/mysql2',             sources: 2, databases: 6, created: Date.parseInput('2014-05-06 08:15'), createdBy: 'peter' },
    { type: 'lvm',   name: 'storage', path: '/var/lib/pgsql/data/',        sources: 1, databases: 2, created: Date.parseInput('2014-02-02 09:53'), createdBy: 'milan' },
    { type: 'mysql', name: 'eshop',   path: 'mysql://root@10.1.1.15:3306', sources: 1, databases: 3, created: Date.parseInput('2014-02-25 20:05'), createdBy: 'milan' },
    { type: 'zfs',   name: 'test',    path: '/var/lib/test',               sources: 0, databases: 0, created: Date.parseInput('2014-01-22 12:52'), createdBy: 'milan' }
];
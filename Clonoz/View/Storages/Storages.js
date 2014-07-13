/**
 * Main view.
 */
Clonoz.createClass('View.Storages.Storages', Clonoz.Application.View).addProperties({
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    members : [{
        _constructor: Clonoz.Component.ListGrid,
        width: '100%',
        showAllRecords: true,
        showAllColumns: true,
        autoFetchData: true,
        dataSource: 'storages',
        alternateRecordStyles: true,
        showFilterEditor: true,
        gridComponents:['header', 'filterEditor', 'body'],
        showRecordComponents: true,
        showRecordComponentsByCell: true,
        canEdit: true,
        overflow: 'auto',
        margin: 10,
        border: 0,
        fields: [{
            name: 'type',
            type: 'image',
            title: 'Type',
            imageURLPrefix:'logos/logo-',
            imageURLSuffix: '.png',
            imageSize: 32,
            align: 'center',
            width: 60,
            canEdit: false
        },
        { name: 'name', type:  'text', title: 'Storage' },
        { name: 'path', title: 'Path' },
        { name: 'createdBy', title: 'Created By', width: 130, canEdit: false },
        { name: 'created', type: 'datetime', width: 130, align: 'center', title: 'Created', format: 'dd/MM/yyyy HH:mm', canEdit: false },
        { name: 'databases',   type:  'integer', width: 100, align: 'center', title: 'Databases', canEdit: false },
        { name: 'sources',   type:  'integer', width: 100, align: 'center', title: 'Sources', canEdit: false },
        {
            name: 'iconField',
            canEdit: false,
            canFilter: false,
            width: 64,
            align: 'center',

            headerTitle: '',
            subWidget: {
                _constructor: 'HLayout',
                align: 'center',
                width: 44,
                height: 10,
                members: [{
                    _constructor: 'ImgButton',
                    showDown: false,
                    showRollOver: false,
                    layoutAlign: 'center',
                    prompt: 'Settings',
                    src: '[SKIN]/actions/configure.png',
                    height: 16,
                    width: 16
                }, {
                    _constructor: 'ImgButton',
                    showDown: false,
                    showRollOver: false,
                    layoutAlign: 'center',
                    prompt: 'Delete source',
                    bind: {
                        disabled: '(record["databases"] && record["sources"])>0'
                    },
                    src: '[SKIN]/actions/remove.png',
                    height: 16,
                    width: 16
                }]
            }
        }]
    }]
});
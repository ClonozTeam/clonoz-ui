/**
 * Main view.
 */
var view = Clonoz.View.TableView;
Clonoz.createClass('View.Sources.Sources', view).addProperties({
    viewTitleProperties: {
        contents: 'Sources'
    },
    addButonProperties: {
        title: 'Create New Source',
        click: view.fire('Create')
    },
    mainGridProperties: {
        dataSource: 'sources',
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
        { name: 'name', type:  'text', title: 'Source' },
        { name: 'storage', title: 'Storage' },
        { name: 'connection', title: 'Connection' },
        { name: 'createdBy', title: 'Created By', canEdit: false, width: 130 },
        { name: 'created', type: 'datetime', width: 130, align: 'center', title: 'Created', format: 'dd/MM/yyyy HH:mm', canEdit: false },
        { name: 'databases', type:  'integer', width: 100, align: 'center', title: 'Databases', canEdit: false },
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
                    prompt: 'Delete storage',
                    bind: {
                        disabled: 'record["databases"]>0'
                    },
                    src: '[SKIN]/actions/remove.png',
                    height: 16,
                    width: 16
                }]
            }
        }]
    },

    components: {
        addWindow: {
            _constructor: 'Component_FormWindow',
            title: 'Add source',
            mainFormProperties: {
                dataSource: 'sources',
                numCols: 1,
                fields: [
                    { name: 'name' },
                    { name: 'storage' },
                    { name: 'connection' },
                ]
            },
            buttons: [
                { _constructor: 'Button', title: 'Create', click: 'this.topElement.hide();' },
                { _constructor: 'Button', title: 'Cancel', click: 'this.topElement.hide();' }
            ]
        }
    }
});
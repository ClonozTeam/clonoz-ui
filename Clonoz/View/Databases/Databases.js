/**
 * Main view.
 */
var view = Clonoz.View.TableView;
Clonoz.createClass('View.Databases.Databases', view).addProperties({
    viewTitleProperties: {
        contents: 'Databases'
    },
    addButonProperties: {
        title: 'Clone New Database',
        click: view.fire('Create')
    },
    mainGridProperties: {
        dataSource: 'databases',
        fields: [{
            name: 'type',
            type: 'image',
            title: 'Type',
            imageURLPrefix:'logos/logo-',
            imageURLSuffix: '.png',
            displayValueFromRecord: true,
            imageSize: 32,
            align: 'center',
            width: 60,
            canEdit: false
        },
        { name: 'name',   type: 'text', title: 'Database' },
        { name: 'source', title: 'Source' },
        {
            name: 'private',
            type: 'boolean',
            width: 70,
            title: 'Private',
            valueIcons: {
                'true': '[SKINIMG]/actions/approve.png',
                'false': '[SKINIMG]/actions/cross.png'
            },
            imageSize: 16,
            showValueIconOnly: true,
            align: 'center'
        },
        { name: 'note', type: 'text', title: 'User Note' },
        { name: 'size', type: 'text', width: 60, title: 'Size', canEdit: false },
        { name: 'refreshedBy', title: 'Refreshed By', canEdit: false },
        { name: 'refreshed', type: 'datetime', width: 130, align: 'center', title: 'Last refresh', format: 'dd/MM/yyyy HH:mm', canEdit: false },
        { name: 'createdBy', title: 'Created By', canEdit: false },
        { name: 'created', type: 'datetime', width: 130, align: 'center', title: 'Created', format: 'dd/MM/yyyy HH:mm', canEdit: false },
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
                width: 64,
                height: 10,
                members: [{
                    _constructor: 'ImgButton',
                    showDown: false,
                    showRollOver: false,
                    layoutAlign: 'center',
                    hoverWidth: 140,
                    bind: {
                        prompt: '{{record["refreshing"]==0?"Scheduled refresh off.":("Refreshing every " + record["refreshing"] + " hours.<br />Next refresh scheduled to: " + record["refreshtime"])}}',
                        src: 'ListGrid/clock_{{record["refreshing"]==0?"stop":"red"}}.png',
                        record: '{{record}}'
                    },
                    click: view.fire('ScheduleRefresh'),
                    height: 16,
                    width: 16
                }, {
                    _constructor: 'ImgButton',
                    showDown: false,
                    showRollOver: false,
                    layoutAlign: 'center',
                    prompt: 'Refresh database',
                    src: 'ListGrid/arrow_refresh.png',
                    size: 16
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
                    size: 16
                }]
            }
        }]
    },

    components: {
        // Window to shedule periodical refreshing.
        sheduleWindow: {
            _constructor: 'Component_FormWindow',
            title: 'Schedule Refresh',
            mainFormProperties: {
                numCols: 1,
                fields: [
                    { name: 'refresh', title: 'First Refresh', type: 'datetime' },
                    { name: 'period', title: 'Refresh period in hours', type: 'integer'}
                ]
            },
            buttons: [
                { _constructor: 'Button', title: 'Schedule', click: 'this.topElement.hide();' },
                { _constructor: 'Button', title: 'Cancel', click: 'this.topElement.hide();' }
            ]
        },

        addWindow: {
            _constructor: 'Component_FormWindow',
            title: 'Add Database',
            mainFormProperties: {
                dataSource: 'databases',
                fields: [
                    { name: 'name' },
                    { name: 'source' },
                    { name: 'refresh', title: 'First Refresh', type: 'datetime' },
                    { name: 'period', title: 'Refresh period in hours', type: 'integer'},
                    { name: 'note', colSpan: 2, width: 500 },
                    { name: 'private', showTitle: false }
                ]
            },
            buttons: [
                { _constructor: 'Button', title: 'Clone', click: 'this.topElement.hide();' },
                { _constructor: 'Button', title: 'Cancel', click: 'this.topElement.hide();' }
            ]
        }
    }
});
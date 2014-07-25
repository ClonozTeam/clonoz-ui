/**
 * Main view.
 */
var view = Clonoz.View.TableView;
Clonoz.createClass('View.Mocking.Mocking', view).addProperties({
    viewTitleProperties: {
        contents: 'Mocking'
    },
    addButonProperties: {
        title: 'Create Mocking Rule',
        click: view.fire('Create')
    },
    mainGridProperties: {
        dataSource: 'mocking',
        groupByField: ['source'],
        canGroupBy: false,
        nullGroupTitle: 'All Databases',
        fields: [{
            name: 'source',
            getGroupValue : function (value, record, field, fieldName, grid) {
                return record['source'] + ' :: ' + (record['database'] || '*');
            },
            hidden: true
        },
        { name: 'name', title: 'Rule Name', align: 'left' },
        { name: 'entity', title: 'Entity' },
        { name: 'field', title: 'Field' },
        { name: 'method', title: 'Method' },
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
                    prompt: 'Settings',
                    src: '[SKIN]/actions/configure.png',
                    height: 16,
                    width: 16
                }, {
                    _constructor: 'ImgButton',
                    showDown: false,
                    showRollOver: false,
                    layoutAlign: 'center',
                    prompt: 'Delete rule',
                    src: '[SKIN]/actions/remove.png',
                    size: 16
                }]
            }
        }]
    },

    components: {
        addWindow: {
            _constructor: 'Component_FormWindow',
            title: 'Add Mocking Rule',
            mainFormProperties: {
                dataSource: 'mocking',
                fields: [
                    { name: 'name' },
                    {
                        name: 'source',
                        change: 'form.clearValue("database"); form.clearValue("method"); form.getField("database").setDisabled(!value); form.getField("method").setDisabled(!value);'
                    },
                    {
                        name: 'database',
                        getPickListFilterCriteria: function() {
                            return { source: this.form.getValue('source') };
                        },
                        disabled: true,
                        change: 'form.getField("entity").setDisabled(!value);'
                    },
                    { name: 'entity', title: 'Entity', disabled: true, change: 'form.getField("field").setDisabled(!value);' },
                    { name: 'field', title: 'Field', disabled: true },
                    { name: 'method', title: 'Method',
                        getPickListFilterCriteria: function() {
                            var record  = this.form.getField("source").getSelectedRecord();
                            return { supportedDatabases: record['type'] };
                        }, disabled: true }
                ]
            },
            buttons: [
                { _constructor: 'Button', title: 'Create', click: 'this.topElement.hide();' },
                { _constructor: 'Button', title: 'Cancel', click: 'this.topElement.hide();' }
            ]
        }
    }
});
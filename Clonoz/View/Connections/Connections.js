/**
 * Main view.
 */
var view = Clonoz.View.TableView;
Clonoz.createClass('View.Connections.Connections', view).addProperties({
        label: {
        contents: 'Connections'
    },
    addButton: {
        title: 'Create New Connection',
        click: view.fire('Create')
    },
    list: {
        dataSource: 'connections',
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
        { name: 'name', type:  'text', title: 'Connection' },
        { name: 'host',  title: 'Host' },
        { name: 'user',  title: 'User' },
        { name: 'createdBy', title: 'Created By', canEdit: false, width: 130 },
        { name: 'created', type: 'datetime', width: 130, align: 'center', title: 'Created', format: 'dd/MM/yyyy HH:mm', canEdit: false },
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
                    prompt: 'Change password',
                    src: '[SKIN]/actions/key.png',
                    click: view.fire('ChangePassword'),
                    height: 16,
                    width: 16
                }, {
                    _constructor: 'ImgButton',
                    showDown: false,
                    showRollOver: false,
                    layoutAlign: 'center',
                    prompt: 'Delete source',
                    bind: {
                        disabled: 'record["sources"]>0'
                    },
                    src: '[SKIN]/actions/remove.png',
                    height: 16,
                    width: 16
                }]
            }
        }]
    },

   components: {
        // Window to shedule periodical refreshing.
        changePasswordWindow: {
            _constructor: 'Window',
            title: 'Change Password',
            width: 270,
            height: 130,
            autoCenter: true,
            isModal: true,
            showModalMask: true,
            items: [{
                _constructor: 'DynamicForm',
                height: 48,
                padding:4,
                titleWidth: 100,
                fields: [
                    { name: 'password', title: 'New Password', type: 'password' },
                    { name: 'password2', title: 'Confirm New Password', type: 'password'}
                ]
            }, {
                _constructor: 'HLayout',
                layoutMargin: 6,
                membersMargin: 6,
                align: 'right',
                members: [
                    { _constructor: 'Button', title: 'Change', click: 'this.topElement.hide();' },
                    { _constructor: 'Button', title: 'Cancel', click: 'this.topElement.hide();' }
                ]
            }]
        },

        addWindow: {
            _constructor: 'Window',
            title: 'Add Connection',
            width: 320,
            height: 190,
            autoCenter: true,
            isModal: true,
            showModalMask: true,
            items: [{
                _constructor: 'DynamicForm',
                height: '100%',
                padding: 4,
                numCols: 2,
                titleOrientation: 'top',
                titleWidth: 100,
                dataSource: 'connections',
                fields: [
                    { name: 'name', colSpan: 2, width: '*' },
                    { name: 'host', startRow: true },
                    { name: 'user' },
                    { name: 'password', title: 'Password', type: 'password' },
                    { name: 'password2', title: 'Confirm Password', type: 'password'}
                ]
            }, {
                _constructor: 'HLayout',
                layoutMargin: 6,
                membersMargin: 6,
                align: 'right',
                members: [
                    { _constructor: 'Button', title: 'Create', click: 'this.topElement.hide();' },
                    { _constructor: 'Button', title: 'Cancel', click: 'this.topElement.hide();' }
                ]
            }]
        }
    }
});
/**
 * Main view.
 */
var view = Clonoz.Application.View;
Clonoz.createClass('View.Users.Users', view).addProperties({
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    members : [{
        _constructor: Clonoz.Component.ListGrid,
        width: '100%',
        showAllRecords: true,
        showAllColumns: true,
        autoFetchData: true,
        dataSource: 'users',
        alternateRecordStyles: true,
        showFilterEditor: true,
        gridComponents:['header', 'filterEditor', 'body'],
        showRecordComponents: true,
        showRecordComponentsByCell: true,
        canEdit: true,
        overflow: 'auto',
        margin: 10,
        border: 0,
        fields: [
        { name: 'login', type: 'text', title: 'User Name' },
        { name: 'email', type: 'text', title: 'Email' },
        { name: 'firstName', type: 'text', title: 'First Name' },
        { name: 'secondName', type: 'text', title: 'Second Name' },
        { name: 'role', type: 'text', title: 'Role' },
        { name: 'lastLogin',   type: 'datetime', width: 130, align: 'center', title: 'Last Login', format: 'dd/MM/yyyy HH:mm', canEdit: false },
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
                        disabled: '(record["databases"] && record["sources"])>0'
                    },
                    src: '[SKIN]/actions/remove.png',
                    height: 16,
                    width: 16
                }]
            }
        }]
    }],

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
        }
    }
});
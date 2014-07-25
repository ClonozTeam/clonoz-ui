/**
 * Main view.
 */
var view = Clonoz.View.TableView;
Clonoz.createClass('View.Users.Users', view).addProperties({
    viewTitleProperties: {
        contents: 'Users',
    },
    addButonProperties: {
        title: 'Create New User',
        click: view.fire('Create')
    },
    mainGridProperties: {
        dataSource: 'users',
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
    },

   components: {
        // Change password.
        changePasswordWindow: {
            _constructor: 'Component_FormWindow',
            title: 'Change Password',
            mainFormProperties: {
                numCols: 1,
                fields: [
                    { name: 'password', title: 'New Password', type: 'password' },
                    { name: 'password2', title: 'Confirm New Password', type: 'password'}
                ]
            },
            buttons: [
                { _constructor: 'Button', title: 'Change', click: 'this.topElement.hide();' },
                { _constructor: 'Button', title: 'Cancel', click: 'this.topElement.hide();' }
            ]
        },

        addWindow: {
            _constructor: 'Component_FormWindow',
            title: 'Add User',
            mainFormProperties: {
                dataSource: 'users',
                fields: [
                    { name: 'login' },
                    { name: 'email' },
                    { name: 'firstName' },
                    { name: 'secondName' },
                    { name: 'password', title: 'Password', type: 'password' },
                    { name: 'password2', title: 'Confirm Password', type: 'password'},
                    { name: 'role' }
                ]
            },
            buttons: [
                { _constructor: 'Button', title: 'Create', click: 'this.topElement.hide();' },
                { _constructor: 'Button', title: 'Cancel', click: 'this.topElement.hide();' }
            ]
        }
    }
});
/**
 * Main view.
 */
var view = Clonoz.Application.View;
Clonoz.createClass('View.Main.Main', view).addProperties({
    vertical: true,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    members : [{
            _constructor: 'HLayout',
            overflow: 'hidden',
            height: 101,
            members: [{
                _constructor: 'Label',
                width: 230,
                valign: 'center',
                align: 'center',
                backgroundColor: Theme.headerColor,
                icon: 'sheep.png',
                iconSize: 64,
                baseStyle: 'clonoz-header',
                contents: 'Clonoz'
            }, {
                _constructor: Clonoz.Component.Statistics
            }]
        }, {
            _constructor: 'TabSet',
            tabBarPosition: 'left',
            ID: 'mainTabSet',
            tabBarThickness: 230,
            useSimpleTabs: true,
            simpleTabBaseStyle: 'clonoz-menu-tab',
            showTabScroller: false,  // TODO: Implement nice tabScroller.
            showTabPicker: false,
            tabSelected: view.fire('TabSelected'),
            tabBarProperties: {
                backgroundColor: Theme.tabBarColor,
                baseLineThickness: 0,
                layoutEndMargin: 0,
                layoutStartMargin: 0,
                membersMargin:0,
            },
            tabProperties: {
                iconSpacing: 15
            },
            paneContainerClassName: 'clonoz-tab-container',
            tabs: [{
                    ID: 'databases',
                    title: 'Databases',
                    icon: 'menu/databases-small.png',
                    iconSize: 20,
                    pane: {
                        _constructor: Clonoz.View.Databases.Databases,
                        autoDraw: false
                    }
                }, {
                    ID: 'sources',
                    title: 'Sources',
                    icon: 'menu/sources-small.png',
                    iconSize: 20,
                    pane: {
                        _constructor: Clonoz.View.Sources.Sources,
                        autoDraw: false
                    }
                }, {
                    ID: 'storages',
                    title: 'Storages',
                    icon: 'menu/storages-small.png',
                    iconSize: 20,
                    pane: {
                        _constructor: Clonoz.View.Storages.Storages,
                        autoDraw: false
                    }
                }, {
                    ID: 'connections',
                    title: 'Connections',
                    icon: 'menu/connections-small.png',
                    iconSize: 20,
                    pane: {
                        _constructor: Clonoz.View.Connections.Connections,
                        autoDraw: false
                    }
                }, {
                    ID: 'mocking',
                    title: 'Mocking',
                    icon: 'menu/mocking-small.png',
                    iconSize: 20
                }, {
                    ID: 'users',
                    title: 'Users',
                    icon: 'menu/users-small.png',
                    iconSize: 20,
                    pane: {
                        _constructor: Clonoz.View.Users.Users,
                        autoDraw: false
                    }
                }, {
                    ID: 'settings',
                    title: 'Settings',
                    icon: 'menu/settings-small.png',
                    iconSize: 20
                }
            ]
        }
    ]
});
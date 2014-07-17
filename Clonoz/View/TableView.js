/**
 * Main view.
 */
Clonoz.createClass('View.TableView', Clonoz.Application.View).addProperties({
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    vertical: true,
    subComponents: {
        members : [{
            _constructor: 'HLayout',
            height: 40,
            defaultLayoutAlign: 'center',
            layoutLeftMargin: 20,
            layoutRightMargin: 20,

            members: [{
                _constructor: 'Label',
                styleName: 'title'
            }, {
                _constructor: 'LayoutSpacer'
            }, {
                _constructor: 'IButton',
                icon: '[SKIN]/actions/add.png',
                iconSize: 16,
                width: 150,
            }]
        }, {
            _constructor: 'Component_ListGrid',
            width: '100%',
            showAllRecords: true,
            showAllColumns: true,
            autoFetchData: true,
            filterOnKeypress: true,
            alternateRecordStyles: true,
            showFilterEditor: true,
            gridComponents:['header', 'filterEditor', 'body'],
            showRecordComponents: true,
            showRecordComponentsByCell: true,
            canEdit: true,
            overflow: 'auto',
            margin: 10,
            border: 0
        }]
    },

    initWidget: function(config) {
        var defaults = Clonoz.clone(this.subComponents);

        Clonoz.addProperties(defaults.members[0].members[0], this.label);
        Clonoz.addProperties(defaults.members[0].members[2], this.addButton);
        Clonoz.addProperties(defaults.members[1], this.list);

        this.addProperties(defaults);
        return this.Super('initWidget', config);
    }
});
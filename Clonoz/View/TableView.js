/**
 * Main view.
 */
Clonoz.createClass('View.TableView', Clonoz.Application.View).addProperties({
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    vertical: true,
    headerBackgroundColor: Theme.headerColor,

    headerContainerDefaults: {
        _constructor: 'HLayout',
        height: 40,
        defaultLayoutAlign: 'center',
        layoutLeftMargin: 20,
        layoutRightMargin: 20
    },

    viewTitleDefaults: {
        _constructor: 'Label',
        styleName: 'title',
        autoParent: 'headerContainer'
    },

    addButonDefaults: {
        _constructor: 'IButton',
        icon: '[SKIN]/actions/add.png',
        iconSize: 16,
        width: 200,
        autoParent: 'headerContainer'
    },

    mainGridDefaults: {
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
        fields: [],
        canEdit: true,
        overflow: 'auto',
        margin: 10,
        border: 0
    },

    headerSpacerDefaults: {
        _constructor: 'LayoutSpacer',
        autoParent: 'headerContainer'
    },

    autoChildren: ['headerContainer', 'viewTitle', 'headerSpacer', 'addButon', 'mainGrid']
});
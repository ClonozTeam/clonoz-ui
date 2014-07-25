/**
 * FormWindow.
 */
Clonoz.createClass('Component.FormWindow', Clonoz.Window).addProperties({
    autoSize: true,
    autoCenter: true,
    isModal: true,
    showModalMask: true,
    dismissOnEscape: true,
    showStatusBar: false,
    showFooter: true,
    mainFormDefaults: {
        _constructor: 'DynamicForm',
        padding: 10,
        cellPadding: 10,
        numCols: 2,
        titleOrientation: 'top',
        titleSuffix: ''
    },

    buttonsDefaults: {
        _constructor: 'HLayout',
        height: 50,
        membersMargin: 10,
        rightPadding: 25,
        align: 'right',
        defaultLayoutAlign: 'center'
    },
}).addMethods({
    /**
     * Constructor
     */
    initWidget: function() {
        this.Super('initWidget', arguments);

        var mainForm = this.createAutoChild('mainForm');
        var buttons  = this.createAutoChild('buttons', {
        	members: this.buttons
        });

        this.addItem(mainForm);
        this.footerControls = [buttons];
    }
});
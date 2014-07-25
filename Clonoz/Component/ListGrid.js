/**
 * ListGrid.
 */
Clonoz.createClass('Component.ListGrid', Clonoz.ListGrid).addMethods({

    /**
     * Create record widgets for subWidget.
     * @param  {ListGridRecord} record Grid record.
     * @param  {Integer}        colNum Column number.
     *
     * @return {Canvas} Created widget.
     */
    createRecordWidgets: function(record, colNum) {
        var field = this.fields[colNum];

        // If processed field has some subWidgets.
        if (field.hasOwnProperty('subWidget')) {
            // If subWidget is already instantiated, just return it.
            if (Clonoz.isAn.Instance(field.subWidget)) {
                return field.subWidget;
            }

            // Otherwise instatiate it.
            var subWidget = Clonoz.ClassFactory.newInstance(Clonoz.clone(field.subWidget));

            // Setup binding on all subWidgets recursively.
            subWidget.subWidgetsPropertiesSetters = [];
            this.setupSubWidgets(subWidget);

            // Apply all online properties.
            for (var i = 0; i < subWidget.subWidgetsPropertiesSetters.length; i++) {
                subWidget.subWidgetsPropertiesSetters[i](this, record);
            }

            return subWidget;
        }

        return null;
    },

    /**
     * [updateRecordWidgets description]
     * @param  {ListGridRecord} record  Grid record.
     * @param  {Integer} colNum         Column number
     * @param  {Canvas} component       Componet to update.
     * @param  {Boolean} recordChanged  Wheter component was previously embedded in a different record.
     *
     * @return {Canvas} Componed to embed in passed record.
     */
    updateRecordWidgets: function(record, colNum, component, recordChanged) {
        // If field has subWidget.
        if (component && component.hasOwnProperty('subWidgetsPropertiesSetters')) {
            // Reapply all field properties.
            for (var i = 0; i < component.subWidgetsPropertiesSetters.length; i++) {
                component.subWidgetsPropertiesSetters[i](this, record);
            }
        }

        return component;
    },

    /**
     * Setup widget for a field.
     *
     * @param {Object} widget Widget configuration.
     * @return {Void}
     */
    setupSubWidgets: function(widget) {
        var me      = this;
        widget.view = this.view;

        if (Clonoz.isAn.Instance(widget)) {

            // If widget has some bindings.
            if (widget.hasOwnProperty('bind')) {
                // Create setter function for all properties in this widget.
                var propertySetter = function(grid, record) {
                    var properties = {};

                    // Conudct all properties.
                    for (var i in widget.bind) {
                        var value = widget.bind[i];
                        // Create replacement function.
                        var setProperty = function(match, p1) {
                            return Clonoz.Class.evaluate(p1, { grid: grid, record: record, me: this, 'event': Clonoz.Event });
                        }

                        // If string contains placeholder, evaluate content of placeholders, otherwise evaluate whole string.
                        if (value.match(/\{\{.*?\}\}/)) {
                            properties[i] = value.replace(/\{\{(.*?)\}\}/gm, setProperty);
                        } else {
                            properties[i] = setProperty(value, value);
                        }
                    }

                    // Set the properties to wiget itself.
                    this.addProperties(properties);
                };

                // Set property to main widget so it can be called from its context, but with context of the widget.
                widget.topElement.subWidgetsPropertiesSetters.push(propertySetter.bind(widget));
            }

            // Recursively process also children of widget.
            if (widget.hasOwnProperty('children')) {
                for (var i = 0; i < widget.children.length; i++) {
                    this.setupSubWidgets(widget.children[i]);
                }
            }
        }
    },

    /**
     * Constructor
     */
    initWidget: function() {
        this.Super('initWidget', arguments);

        // If cell record components are set to true and component related function are note set.
        if (this.showRecordComponents && this.showRecordComponentsByCell && !this.createRecordComponent && !this.updateRecordComponent) {
            // Check whether there is a field with some subWidget.
            for (var i = 0; i < this.fields.length; i++) {
                if (this.fields[i].hasOwnProperty('subWidget')) {
                    // Set subWidget relatet function as functions to create record components.
                    this.createRecordComponent = this.createRecordWidgets;
                    this.updateRecordComponent = this.updateRecordWidgets;
                }
            }
        }
    }
});
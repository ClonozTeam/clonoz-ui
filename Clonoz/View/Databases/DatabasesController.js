/**
 * Main controller.
 */
Clonoz.createClass('View.Databases.DatabasesController', Clonoz.Application.Controller).addMethods({
    /**
     * Set the alias for routing.
     * @type {String}
     */
    alias: 'databases',

    /**
     * On ScheduleRefresh.
     * @param {Application.View} view   View object.
     * @param {ImgButton}        button Pressed button.
     *
     * @return {Void}
     */
    onScheduleRefresh: function(view, button) {
        var scheduleWindow = view.createComponent('sheduleWindow');
    },

    /**
     * On Create.
     * @param {Application.View} view   View object.
     * @param {ImgButton}        button Pressed button.
     *
     * @return {Void}
     */
    onCreate: function(view, button) {
        var addWindow = view.createComponent('addWindow');
    }
});
/**
 * Main controller.
 */
Clonoz.createClass('View.Connections.ConnectionsController', Clonoz.Application.Controller).addMethods({
    /**
     * Set the alias for routing.
     * @type {String}
     */
    alias: 'connections',

    /**
     * On ScheduleRefresh.
     * @param {Application.View} view   View object.
     * @param {ImgButton}        button Pressed button.
     *
     * @return {Void}
     */
    onChangePassword: function(view, button) {
        var changePasswordWindow = view.createComponent('changePasswordWindow');
    }
});
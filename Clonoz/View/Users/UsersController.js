/**
 * Main controller.
 */
Clonoz.createClass('View.Users.UsersController', Clonoz.Application.Controller).addMethods({
    /**
     * Set the alias for routing.
     * @type {String}
     */
    alias: 'users',

    /**
     * On ScheduleRefresh.
     * @param {Application.View} view   View object.
     * @param {ImgButton}        button Pressed button.
     *
     * @return {Void}
     */
    onChangePassword: function(view, button) {
        var changePasswordWindow = view.createComponent('changePasswordWindow');
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
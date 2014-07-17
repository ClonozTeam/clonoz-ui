/**
 * Main controller.
 */
Clonoz.createClass('View.Storages.StoragesController', Clonoz.Application.Controller).addMethods({
    /**
     * Set the alias for routing.
     * @type {String}
     */
    alias: 'storages',

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
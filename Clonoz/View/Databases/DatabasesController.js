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
     * Procees with navigation by activating correct tab.
     *
     * @param  {String} tab Tab name.
     */
    onTabNavigate: function (tab) {
        var mainTab = Clonoz.Canvas.getById('mainTabSet');
        mainTab.selectTab(tab);
    },

    /**
     * Draw tab pane on select.
     *
     * @param {Application.View} view    View object.
     * @param {TabSet}           tabSet  TabSet which trigger this action.
     * @param {Number}           tabNum  Number of the tab.
     * @param {Canvas}           tabPane Pane for this tab.
     * @param {String}           ID      ID of the tab.
     * @param {Tab}              tab     The tab object (not tab button instance).
     * @param {String}           name    Name of the tab.
     *
     * @return {Boolean} Whether deselction is succesfull or not.
     */

    onTabSelected: function (view, tabSet, tabNum, tabPane, ID, tab, name) {
        this.router.redirectTo(this, 'TabNavigate', { tab: ID }, true);
    }
});
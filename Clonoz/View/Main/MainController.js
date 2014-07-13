/**
 * Main controller.
 */
Clonoz.createClass('View.Main.MainController', Clonoz.Application.Controller).addProperties({
    /**
     * ID of selcted tab.
     * @type {String}
     */
    tabSelected: 0
}).addMethods({
    /**
     * Set the alias for routing.
     * @type {String}
     */
    alias: 'main',

    /**
     * Index action
     */
    onIndex: function() {
        this.router.redirectTo(this, 'TabNavigate', { tab: 'databases' }, true);
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
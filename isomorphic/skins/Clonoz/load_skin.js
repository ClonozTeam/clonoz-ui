Theme = {
    headerColor: '#105D68',
    tabBarColor: '#3e4752'
};

isc.loadSkin = function (theWindow) {
if (theWindow == null) theWindow = window;
with (theWindow) {

    isc.Class.modifyFrameworkStart();


//----------------------------------------
// Specify skin directory
//----------------------------------------
    // must be relative to your application file or isomorphicDir
    isc.Page.setSkinDir("[ISOMORPHIC]/skins/Clonoz/");


//----------------------------------------
// Load skin style sheet(s)
//----------------------------------------
    isc.Page.loadStyleSheet("[SKIN]/skin_styles.css", theWindow);

    var useCSS3 = isc.Browser.useCSS3,
        useSpriting = isc.Browser.useSpriting;

    isc.Canvas.setProperties({
        // this skin uses custom scrollbars
        groupBorderCSS:"1px solid #165fa7",
        showCustomScrollbars:false
    });


    if (isc.Browser.isIE && isc.Browser.version >= 7 && !isc.Browser.isIE9) {
        isc.Canvas.setAllowExternalFilters(false);
        isc.Canvas.setNeverUseFilters(true);

        if (isc.Window) {
            isc.Window.addProperties({
                modalMaskOpacity:null,
                modalMaskStyle:"normal"
            });
            isc.Window.changeDefaults("modalMaskDefaults", { src:"[SKIN]opacity.png" });
        }
    }

    if (isc.RPCManager) {
        isc.RPCManager.addClassProperties({
            promptStyle:"cursor"
        });
    }

    //----------------------------------------
    // 2) Buttons
    //----------------------------------------
    isc.Button.addProperties({
        height: 34,
        baseStyle:"btn btn-primary dummy"
    });

    // define IButton so examples that support the new SmartClient skin image-based
    // button will fall back on the CSS-based Button with this skin
    isc.ClassFactory.defineClass("IButton", "Button");
    isc.ClassFactory.defineClass("IAutoFitButton", "AutoFitButton");

    if (isc.IButton.markAsFrameworkClass != null) isc.IButton.markAsFrameworkClass();
    if (isc.IAutoFitButton.markAsFrameworkClass != null) isc.IAutoFitButton.markAsFrameworkClass();

    isc.ClassFactory.defineClass("HeaderMenuButton", "IButton").addProperties({
        baseStyle:"headerMenuButton"
    });

    // Have IMenuButton be just a synonym for IMenuButton
    if (isc.MenuButton) {
        isc.ClassFactory.overwriteClass("IMenuButton", "MenuButton");

        if (isc.IMenuButton.markAsFrameworkClass != null) isc.IMenuButton.markAsFrameworkClass();

        isc.MenuButton.addProperties({
            // copy the header (.button) background-color to match when sort arrow is hidden
            baseStyle:"button"
        });
        if (isc.ITreeMenuButton) {
            isc.ClassFactory.overwriteClass("ITreeMenuButton", "TreeMenuButton");
            if (isc.ITreeMenuButton.markAsFrameworkClass != null) isc.ITreeMenuButton.markAsFrameworkClass();
        }

    }

    if (isc.Menu) {
        isc.Menu.addProperties({
            cellHeight:22,
            fastCellUpdates:false,
            showShadow:true,
            shadowDepth:5,
            showEdges:false,
            submenuImage:{src:"[SKIN]submenu.png", height:7, width:4},
            submenuDisabledImage:{src:"[SKIN]submenu_disabled.png", height:7, width:4},
            checkmarkImage:{src:"[SKIN]check.png", width:9, height:8},
            checkmarkDisabledImage:{src:"[SKIN]check_disabled.png", width:7, height:6},
            bodyStyleName:"gridBody",
            iconBodyStyleName:"menuMain",
            bodyBackgroundColor:null
        });
        isc.Menu.changeDefaults("iconFieldDefaults", {
            width:24,
            baseStyle:"menuIconField"
        });
        isc.Menu.changeDefaults("titleFieldDefaults", {
            baseStyle: "menuTitleField"
        });
    }

    if (isc.MenuButton) {
        isc.MenuButton.addProperties({
            baseStyle: "menuButton",
            menuButtonImage:"[SKIN]menu_button.png",
            menuButtonImageUp:"[SKIN]menu_button_up.png",
            iconWidth:7,
            iconHeight:4,
            showFocusedAsOver:true
        });
    }
    if (isc.IMenuButton) {
        isc.IMenuButton.addProperties({

            menuButtonImage:"[SKIN]menu_button.png",
            menuButtonImageUp:"[SKIN]menu_button_up.png",
            iconWidth:7,
            iconHeight:4,

            // Other properties (match IButton)
            src:"[SKIN]button/button.png",
            height:22,
            capSize:4,
            titleStyle:"buttonTitle",
            showFocused:true,
            showFocusedAsOver:true
        });
    }

    if (isc.PickTreeItem) {
        isc.PickTreeItem.addProperties({
            buttonDefaults:{ height:21 }
        });
    }

    isc.Label.addProperties({
        showFocused:false
    });

    //----------------------------------------
    // 3) Resizebars
    //----------------------------------------
    // StretchImgSplitbar class renders as resize bar
    isc.StretchImgSplitbar.addProperties({
        capSize:10,
        showGrip:true,
        showOver:false
    });

    isc.Snapbar.addProperties({
        hBaseStyle:"hSplitbar",
        vBaseStyle:"vSplitbar",
        gripBreadth:3,
        gripLength:20,
        hSrc:"[SKIN]hsplit.png",
        items:[
            {name:"blank", width:"*", height:"*"}
        ],
        showClosedGrip:false,
        showDown:false,
        showDownGrip:false,
        showRollOver:false,
        vSrc:"[SKIN]vsplit.png"
    });

    isc.Layout.addProperties({
        resizeBarSize:5,
        // Use the Snapbar as a resizeBar by default - subclass of Splitbar that
        // shows interactive (closed/open) grip images
        // Other options include the Splitbar, StretchImgSplitbar or ImgSplitbar
        resizeBarClass:"Snapbar"
    })

    if (isc.SectionItem) {
        isc.SectionItem.addProperties({
            height:26
        });
    }
    if (isc.SectionStack) {
        isc.SectionStack.addProperties({
            headerHeight:26
        });
    }

    if (isc.ListGrid) {
        isc.ListGrid.addProperties({
            alternateRecordStyles:true,
            alternateBodyStyleName:null,
            backgroundColor:null,
            cellHeight:42,
            checkboxFieldImageHeight:13,
            checkboxFieldImageWidth:13,
            editFailedCSSText:"color:FF6347;",
            errorIconSrc:"[SKINIMG]actions/exclamation.png",
            expansionFieldImageHeight:16,
            expansionFieldImageWidth:16,
            expansionFieldFalseImage:"[SKINIMG]/ListGrid/row_collapsed.png",
            expansionFieldTrueImage:"[SKINIMG]/ListGrid/row_expanded.png",
            expansionFieldImageWidth: 16,
            expansionFieldImageHeight: 16,
            groupIcon:"[SKINIMG]/ListGrid/group.png",
            groupIconPadding:3,
            groupLeadingIndent:1,
            headerBackgroundColor: Theme.headerColor,
            headerBaseStyle:"headerButton",
            headerHeight:30,
            headerMenuButtonIcon:"[SKINIMG]ListGrid/sort_descending.png",
            headerMenuButtonConstructor:"HeaderMenuButton",
            headerMenuButtonWidth:17,
            normalCellHeight:42,
            showHeaderMenuButton:true,
            sortAscendingImage:{src:"[SKINIMG]ListGrid/sort_ascending.png", width:9, height:6},
            sortDescendingImage:{src:"[SKINIMG]ListGrid/sort_descending.png", width:9, height:6},
            summaryRowHeight:41,
            tallBaseStyle:"tallCell"
        });

        isc.ListGrid.changeDefaults("sorterDefaults", {
            baseStyle:"sorterButton",
            showRollOver:false
        });
    }

    if (isc.TreeGrid) {
        isc.TreeGrid.addProperties({
            alternateRecordStyles:false,
            folderIcon:"[SKIN]folder.png",
            manyItemsImage:"[SKIN]folder_file.png",
            nodeIcon:"[SKIN]file.png",
            normalBaseStyle:"treeCell",
            applyRowNumberStyle:false,
            openerIconSize:22,
            openerImage:"[SKIN]opener.png",
            sortAscendingImage:{src:"[SKINIMG]ListGrid/sort_ascending.png", width:9, height:6},
            sortDescendingImage:{src:"[SKINIMG]ListGrid/sort_descending.png", width:9, height:6},
            tallBaseStyle:"treeTallCell"
        });
    }

    if (isc.TabSet) {
        isc.TabSet.addProperties({
            closeTabIconSize:12,
            paneContainerClassName:"tabSetContainer",
            paneMargin:5,
            pickerButtonSize:20,
            pickerButtonSrc:"[SKIN]picker.png",
            showScrollerRollOver:false,
            scrollerButtonSize:19,
            scrollerSrc:"[SKIN]scroll.png",
            showEdges:false,
            symmetricScroller:false,
            symmetricPickerButton:false,
            tabBarThickness:24,
            defaultTabHeight:24,
            useSimpleTabs:true
        });

        // In Netscape Navigator 4.7x, set the backgroundColor directly since the css
        // background colors are not reliable
        if (isc.Browser.isNav) {
            isc.TabSet.addProperties({paneContainerDefaults:{backgroundColor:"#FFFFFF"}});
        }

        isc.TabBar.addProperties({
            baseLineConstructor:"Canvas",
            baseLineProperties:{ backgroundColor:"#C0C3C7", height:1, overflow:"hidden" },
            baseLineThickness:1,
            bottomStyleName:"tabBarBottom",
            layoutEndMargin:5,
            layoutStartMargin:5,
            leadingMargin:5,
            leftStyleName:"tabBarLeft",
            membersMargin:1,
            rightStyleName:"tabBarRight",
            styleName:"tabBar",
            topStyleName:"tabBarTop"
        });
    }

    if (isc.ImgTab) isc.ImgTab.addProperties({capSize:6});

    if (isc.Window) {
        isc.Window.addProperties({
            backgroundColor:null,
            bodyStyle:"windowBody",
            layoutBottomMargin: 0,
            layoutLeftMargin:0,
            layoutRightMargin:0,
            layoutTopMargin:0,
            modalMaskOpacity:10,
            membersMargin:0,
            styleName:"windowBackground",
            showHeaderBackground:false,
            showFooter:false,
            headerControls : ["headerLabel", "minimizeButton", "maximizeButton", "closeButton"]
        });

        isc.Window.changeDefaults("headerDefaults", {
            height:35,
            layoutMargin:6
        });

        isc.Window.changeDefaults("resizerDefaults", { src:"[SKIN]/Window/resizer.png" });

        isc.Window.changeDefaults("headerIconDefaults", {
            height:1,
            src:"",
            width:1
        });

        isc.Window.changeDefaults("restoreButtonDefaults", {
            height:16,
            showDown:false,
            showRollOver:false,
            src:"[SKIN]/headerIcons/maximizeButton.png",
            width:16
        });

        isc.Window.changeDefaults("closeButtonDefaults", {
            height:16,
            showDown:false,
            showRollOver:false,
            src:"[SKIN]/headerIcons/closeButton.png",
            width:16
        });

        isc.Window.changeDefaults("maximizeButtonDefaults", {
            height:16,
            showDown:false,
            showRollOver:false,
            src:"[SKIN]/headerIcons/maximizeButton.png",
            width:16
        });

        isc.Window.changeDefaults("minimizeButtonDefaults", {
            height:16,
            showDown:false,
            showRollOver:false,
            src:"[SKIN]/headerIcons/minimizeButton.png",
            width:16
        });

        isc.Window.changeDefaults("toolbarDefaults", { buttonConstructor:"IButton" });

        if (isc.ColorPicker) {
            isc.ColorPicker.addProperties({
                layoutMargin:2
            });
        }
    }

    if (isc.Dialog) {
        isc.Dialog.addProperties({
            bodyColor:"#FFFFFF",
            bodyStyle:"windowBody",
            layoutBottomMargin:4,
            layoutLeftMargin:4,
            layoutRightMargin:4,
            layoutTopMargin:1,
            modalMaskOpacity:10,
            membersMargin:0,
            styleName:"windowBackground",
            showHeaderBackground:false,
            showFooter:false
        });

        // even though Dialog inherits from Window, we need a separate changeDefaults block
        // because Dialog defines its own toolbarDefaults
        isc.Dialog.changeDefaults("toolbarDefaults", {
            buttonConstructor:"IButton",
            height:42, // 10px margins + 22px button
            membersMargin:10
        });

        if (isc.Dialog.Warn && isc.Dialog.Warn.toolbarDefaults) {
        isc.logWarn("Case 1:" + isc.Dialog.Warn);
            isc.addProperties(isc.Dialog.Warn.toolbarDefaults, {
                buttonConstructor:"IButton",
                height:42,
                membersMargin:10
            });
        }


        // Modify the prompt dialog to show a header
        // In the css3-off mode header media is part of the background image, so
        // a header appears to show even though there's no true header widget.
        if (isc.Dialog.Prompt) {
    //            isc.logWarn("case 2:" + isc.Dialog.Prompt);
            isc.addProperties(isc.Dialog.Prompt, {
                showHeader:true,
                showTitle:false,
                showCloseButton:false,
                bodyStyle:"windowBody"

            });
        }

    }

    if (isc.ButtonItem && isc.IButton) {isc.ButtonItem.addProperties({
        showFocused:true,
        showFocusAsOver:false,
        buttonConstructor:isc.IButton,
        height:34
    })}

    if (isc.ToolbarItem && isc.IAutoFitButton) {
        isc.ToolbarItem.addProperties({
            buttonConstructor:isc.IAutoFitButton,
            buttonProperties:{ autoFitDirection:isc.Canvas.BOTH }
        });
    }

    if (isc.DateRangeDialog) {
        isc.DateRangeDialog.changeDefaults("headerIconProperties", { src:"[SKIN]/DynamicForm/date_control.png" });
        isc.DateRangeDialog.changeDefaults('rangeFormDefaults', {
            styleName: 'smartDialogMain',
            padding: 5
        });

        isc.DateRangeDialog.changeDefaults('mainLayoutDefaults', {
            layoutMargin: 0
        });

        isc.DateRangeDialog.changeDefaults('buttonLayoutDefaults', {
            defaultLayoutAlign: 'center',
            rightPadding: 15,
            height: 35,
        });

        isc.DateRangeDialog.addProperties({
            bodyStyle: 'smartDialogBody'
        });
    }

    if (isc.MiniDateRangeItem) {
        isc.MiniDateRangeItem.changeDefaults("pickerIconDefaults", {
            src:"[SKIN]/DynamicForm/date_control.png",
            width: 16,
            height: 16
        });

        isc.MiniDateRangeItem.addProperties({
            textBoxStyle: 'picker-mini-control dummy',
            cellStyle: 'mini-pickerElement'
        });
    }

    if (isc.RelativeDateItem) {
        isc.RelativeDateItem.changeDefaults("pickerIconDefaults", { src:"[SKIN]/DynamicForm/date_control.png" });
    }


    if (isc.MultiSortPanel) {
         isc.MultiSortPanel.addProperties({
            styleName: 'smartDialogMain',
            padding: 5,
            optionsGridProperties: {
                cellHeight:22,
                headerHeight:22,
                normalCellHeight:22
            }
        });

        isc.MultiSortPanel.changeDefaults('topLayoutDefaults', { styleName: 'btn-smart-group' });

        isc.MultiSortPanel.changeDefaults('addLevelButtonDefaults', { baseStyle: 'btn btn-default btn-first dummy' });
        isc.MultiSortPanel.changeDefaults('deleteLevelButtonDefaults', { baseStyle: 'btn btn-default dummy' });
        isc.MultiSortPanel.changeDefaults('copyLevelButtonDefaults', { baseStyle: 'btn btn-default dummy' });
        isc.MultiSortPanel.changeDefaults("levelUpButtonDefaults", {
            _constructor: 'IButton',
            autoFit: true,
            baseStyle: 'btn btn-default dummy',
            title: 'Up',
            icon: '[SKINIMG]common/arrow_up.png'
        });
        isc.MultiSortPanel.changeDefaults("levelDownButtonDefaults", {
            _constructor: 'IButton',
            autoFit: true,
            baseStyle: 'btn btn-default btn-last dummy',
            title: 'Down',
            icon: '[SKINIMG]common/arrow_down.png'
        });
    }

    if (isc.MultiSortDialog) {

        isc.MultiSortDialog.changeDefaults('mainLayoutDefaults', {
            layoutMargin: 0
        });

        isc.MultiSortDialog.changeDefaults('bottomLayoutDefaults', {
            defaultLayoutAlign: 'center',
            rightPadding: 15,
            height: 35,
        });
        isc.MultiSortDialog.changeDefaults('applyButtonDefaults', { autoFit: false });
        isc.MultiSortDialog.changeDefaults('cancelButtonDefaults', { autoFit: false });

        isc.MultiSortDialog.addProperties({
            bodyStyle: 'smartDialogBody'
        });
    }

    // Native FILE INPUT items are rendered differently in Safari from other browsers
    // Don't show standard textbox styling around them as it looks odd
    if (isc.UploadItem && isc.Browser.isSafari) {
        isc.UploadItem.addProperties({
            textBoxStyle:"normal"
        });
    }
    if (isc.DateChooser) {
        isc.DateChooser.addProperties({
            alternateWeekStyles:false,
            backgroundColor:null,
            baseNavButtonStyle:"dateChooserNavButton",
            baseWeekdayStyle:"dateChooserWeekday",
            baseWeekendStyle:"dateChooserWeekend",
            baseBottomButtonStyle:"dateChooserBorderedBottomButton",
            edgeCenterBackgroundColor:"#FFFFFF",
            headerStyle:"dateChooserButton",
            nextMonthIcon:"[SKINIMG]/DateChooser/arrow_right.png",
            nextMonthIconHeight:16,
            nextMonthIconWidth:16,
            nextYearIcon:"[SKINIMG]/DateChooser/doubleArrow_right.png",
            nextYearIconHeight:16,
            nextYearIconWidth:16,
            prevMonthIcon:"[SKINIMG]/DateChooser/arrow_left.png",
            prevMonthIconHeight:16,
            prevMonthIconWidth:16,
            prevYearIcon:"[SKINIMG]/DateChooser/doubleArrow_left.png",
            prevYearIconHeight:16,
            prevYearIconWidth:16,
            showDoubleYearIcon:false,
            showEdges:false,
            skinImgDir:"images/DateChooser/",
            todayButtonHeight:20,
            weekendHeaderStyle:"dateChooserWeekendButton",
            styleName:"dateChooserBorder"
        });
    }

    if (isc.ToolStrip) {
        isc.ToolStrip.addProperties({
            defaultLayoutAlign:"center",
            height:30
        });

        isc.ToolStrip.changeDefaults("formWrapperDefaults",{cellPadding:3});
    }
    if (isc.ToolStripMenuButton) {
        isc.overwriteClass("ToolStripMenuButton", "MenuButton").addProperties({
            autoFit:true,
            baseStyle:"toolStripButton",
            height:34,
            labelVPad:0,
            showDown:true,
            showRollOver:true,
            showTitle:false
        });
    }

    if (isc.ToolStripButton) {
        isc.overwriteClass("ToolStripButton", "Button").addProperties({
            autoFit:true,
            baseStyle:"toolStripButton",
            height:34,
            labelVPad:0,
            showTitle:false,
            showRollOver:true,
            showDown:true,
            title:null
        });
    }

    if (isc.EdgedCanvas) {
        isc.EdgedCanvas.addProperties({
            edgeSize:6,
            edgeImage: "[SKINIMG]edges/edge.png"
        });
    }

    if (isc.Slider) {
        isc.Slider.addProperties({
            hThumbStyle:"hSliderThumb",
            hTrackStyle:"hSliderTrack",
            thumbConstructor:"StatefulCanvas",
            thumbThickWidth:14,
            thumbThinWidth:14,
            trackConstructor:"StatefulCanvas",
            trackWidth:5,
            vThumbStyle:"vSliderThumb",
            vTrackStyle:"vSliderTrack"
        });
    }

    if (isc.TileGrid) {
        isc.TileGrid.addProperties({
            showEdges:false,
            styleName:null,
            valuesShowRollOver:true
        });
    }

    if (isc.Calendar) {
        isc.Calendar.changeDefaults("datePickerButtonDefaults", {
            showDown:false,
            showOver:false,
            src:"[SKIN]/DynamicForm/date_control.png"
        });

        isc.Calendar.changeDefaults("controlsBarDefaults", {
            height:10,
            layoutBottomMargin:10
        });

        isc.EventWindow.changeDefaults("resizerDefaults", {
            src:"[SKIN]/Window/v_resizer.png"
        });
        isc.TimelineWindow.changeDefaults("resizerDefaults", {
            src:"[SKIN]/Window/h_resizer.png"
        })


    }

    if (isc.Hover) {
    //        isc.logWarn("HoverCD:" + isc.Hover.hoverCanvasDefaults);
        isc.addProperties(isc.Hover.hoverCanvasDefaults, {
            shadowDepth:5,
            showShadow:false
        });
    }

    //indicate type of media used for various icon types
    isc.pickerImgType = "png";
    isc.transferImgType = "png";
    isc.headerImgType = "png";

    isc.Page.checkBrowserAndRedirect("[SKIN]/unsupported_browser.html");

    //----------------------------------------
    // 3) Resizebars
    //----------------------------------------

    if (isc.SplitPane) {
        isc.SplitPane.changeDefaults("backButtonDefaults", {
            icon: "[SKINIMG]NavigationBar/back_arrow~2.png",
            iconWidth: 14,
            iconHeight: 24,
            iconSpacing: 7,
            showRTLIcon: true,
            valign: "top"
        });

        if (isc.Browser.isIPhone || isc.Browser.isIPad) {
            isc.SplitPane.changeDefaults("backButtonDefaults", {
                icon: "[SKINIMG]NavigationBar/back_arrow.svg"
            });
        }
    }

    //----------------------------------------
    // 4) Sections & NavigationBar
    //----------------------------------------
    if (isc.NavigationBar) {
        isc.NavigationBar.changeDefaults("leftButtonDefaults", {
            icon: "[SKINIMG]NavigationBar/back_arrow~2.png",
            iconWidth: 14,
            iconHeight: 24,
            iconSpacing: 7,
            showRTLIcon: true
        });
        isc.NavigationBar.changeDefaults("rightButtonDefaults", {
        });
        isc.NavigationBar.changeDefaults("titleLabelDefaults", {
            margin: 5
        });

        if (isc.Browser.isIPhone || isc.Browser.isIPad) {
            isc.NavigationBar.changeDefaults("leftButtonDefaults", {
                icon: "[SKINIMG]NavigationBar/back_arrow.svg"
            });
        }
    }
    if (isc.NavigationButton) {
        isc.NavigationButton.addProperties({
            padding: 0
        });
    }

    //----------------------------------------
    // 6) TabSets
    //----------------------------------------
    if (isc.TabBar) {
        isc.TabBar.changeDefaults("tabDefaults", {
            showFocusOutline: !isc.Browser.isSafari
        });
    }
    if (isc.TabSet && useSpriting) {
        isc.TabSet.addMethods({
            getScrollerBackImgName : function skin_TabSet_getScrollerBackImgName() {
                return "blank1";
            },
            getScrollerForwardImgName : function skin_TabSet_getScrollerForwardImgName() {
                return "blank2";
            },
            getTabPickerSrc : function skin_TabSet_getTabPickerSrc() {
                return "[SKINIMG]/blank.gif";
            }
        });
        isc.TabSet.changeDefaults("scrollerBackImg", {
            baseStyleKey: "scrollerPosition",
            baseStyleMap: {
                "top": "tabScrollerTopBack",
                "right": "tabScrollerRightBack",
                "bottom": "tabScrollerBottomBack",
                "left": "tabScrollerLeftBack"
            },
            baseStyle: "tabScrollerBack"
        });
        isc.TabSet.changeDefaults("scrollerForwardImg", {
            baseStyleKey: "scrollerPosition",
            baseStyleMap: {
                "top": "tabScrollerTopForward",
                "right": "tabScrollerRightForward",
                "bottom": "tabScrollerBottomForward",
                "left": "tabScrollerLeftForward"
            },
            baseStyle: "tabScrollerForward"
        });
        isc.TabSet.changeDefaults("tabPickerDefaults", {
            statelessImage: true,
            imageStyle: "tabPicker",
            redrawOnStateChange: true
        });
    }

    //----------------------------------------
    // 10) Menus
    //----------------------------------------
    if (isc.Menu) {
        isc.Menu.addProperties({
            styleName: "menuBorder"
        });
    }

    //----------------------------------------
    // 12) ListGrids
    //----------------------------------------
    if (isc.ListGrid) {
        isc.ListGrid.addProperties({
            expansionFieldImageShowRTL: true
        });

        if (useSpriting) {
            isc.ListGrid.addProperties({
                booleanBaseStyle: "checkbox",
                booleanTrueImage: "blank",
                booleanFalseImage: "blank",
                booleanPartialImage: "blank",
                booleanImageWidth: 13,
                booleanImageHeight: 13
            });
        }
    }

    //----------------------------------------
    // 14) Form controls
    //----------------------------------------

    // Dynamic form skinning
    if (isc.DynamicForm) {
        isc.DynamicForm.addProperties({
        });
    }

    // Dynamic form skinning
    if (isc.SectionHeader) {
        isc.SectionHeader.addProperties({
            icon:"[SKIN]/SectionHeader/opener.png"
        });
    }

    if (isc.FormItem) {
        isc.FormItem.addProperties({
            defaultIconSrc:"[SKIN]/DynamicForm/default_formItem_icon.png",
            errorIconSrc:"[SKINIMG]actions/exclamation.png",
            iconHeight:18,
            iconVAlign:"middle",
            iconWidth:18,
            margin: '0px 5px',
            titleStyle: 'control-label dummy',
            pickerIconStyle: 'dummy',
            showRTL: true
        });
    }

    if (isc.TextItem) {
        isc.TextItem.addProperties({
            height:34,
            showFocused:true,
            textBoxStyle: "form-control dummy",
            width: 250
        });
    }

    if (isc.CheckboxItem) {
        isc.CheckboxItem.addProperties({
            checkedImage:"[SKINIMG]/DynamicForm/checked.png",
            partialSelectedImage:"[SKINIMG]/DynamicForm/partialcheck.png",
            showValueIconFocused:false,
            showValueIconOver:false,
            uncheckedImage:"[SKINIMG]/DynamicForm/unchecked.png",
            unsetImage:"[SKINIMG]/DynamicForm/unsetcheck.png",
            valueIconWidth:13,
            valueIconHeight:13
        });
    }

    if (isc.NativeSelectItem) {
        isc.NativeSelectItem.addProperties({
            textBoxStyle:"form-control dummy"
        });
    }


    if (isc.ComboBoxItem) {
        isc.ComboBoxItem.addProperties({
            height:34,
            pendingTextBoxStyle:"comboBoxItemPendingText",
            pickerIconWidth:0,
            showFocusedPickerIcon:false,
            textBoxStyle:"form-control dummy",
            pickerIconSrc: "blank",
            pickerIconStyle: "comboBoxItemPickerCell"
        });

        isc.ComboBoxItem.changeDefaults("pickerIconDefaults", {
            showOver: true,
            showRTL: true,
            baseStyle: "comboBoxItemPicker"
        });
    }

    if (isc.MultiComboBoxItem) {
        isc.MultiComboBoxItem.changeDefaults("buttonDefaults", {
            icon: "[SKIN]DynamicForm/drop.png",
            iconWidth: 0,
            iconHeight: 0,
            iconSize: 0
        });
    }

    if (isc.SelectItem) {
        isc.SelectItem.addProperties({
            height:34,
            width: 250,
            pickerIconWidth:0,
            pickerIconHeight:0,
            autoFit: true,
            showFocusedPickerIcon:false,
            textBoxStyle:"form-control form-control-force-size dummy",
            pickerIconSrc: "blank",
            pickerIconStyle: "comboBoxItemPickerCell"
        });
        isc.SelectItem.changeDefaults("pickerIconDefaults", {
            showOver: true,
            showRTL: true,
            baseStyle: "comboBoxItemPicker"
        });
    }

    // used by SelectItem and ComboBoxItem for picklist
    if (isc.ScrollingMenu) {
        isc.ScrollingMenu.addProperties({
            shadowDepth:5,
            showShadow: false,
            overflow: 'visible',
            bodyStyleName: 'pickListMenuBody dummy',
            pickListBaseStyle: 'pickListCell dummy'
        });
    }

    if (isc.DateItem) {
        isc.DateItem.addProperties({
            height:34,
            pickerIconHeight:16,
            pickerIconWidth:35,
            width: 253,
            pickerIconSrc: '[SKIN]/DynamicForm/date_control.png',
            textBoxStyle: 'form-control dummy',
            cellStyle: 'pickerElement'
        });
    }

    if (isc.SpinnerItem) {
        isc.SpinnerItem.addProperties({
            height:34,
            textBoxStyle:"selectItemText",
            textBoxStyle: 'form-control dummy',
            showValueIconFocused: true,
            showValueIconOver: true,
            cellStyle: 'pickerElementSpinner dummy'
        });

        isc.SpinnerItem.changeDefaults("increaseIconDefaults", {
            width:16,
            height:11,
            showOver:true,
            showFocused:true,
            showFocusedWithItem:false,
            imgOnly:true,
            src:"[SKIN]/DynamicForm/spinner_control_increase.png",
            showRTL:true
        });
        isc.SpinnerItem.changeDefaults("decreaseIconDefaults", {
            width:16,
            height:11,
            showOver:true,
            showFocused:true,
            showFocusedWithItem:false,
            imgOnly:true,
            src:"[SKIN]/DynamicForm/spinner_control_decrease.png",
            showRTL:true
        });
        if (useSpriting) {
            isc.SpinnerItem.changeDefaults("increaseIconDefaults", {
                src:"blank",
                baseStyle:"spinnerItemIncrease"
            });
            isc.SpinnerItem.changeDefaults("decreaseIconDefaults", {
                src:"blank",
                baseStyle:"spinnerItemDecrease"
            });
        }
    }

    if (isc.TextAreaItem) {
        isc.TextAreaItem.addProperties({
            showFocused:true,
            textBoxStyle: "form-control dummy",
        });
    }

    if (isc.PopUpTextAreaItem) {
        isc.PopUpTextAreaItem.addProperties({
            popUpIconHeight:16,
            popUpIconSrc:"[SKIN]/DynamicForm/text_control.gif",
            popUpIconWidth:16
        });
    }

    if (isc.RichTextEditor) {
        isc.RichTextEditor.addProperties({
            showEdges:false,
            styleName:"richTextEditorBorder"
        });
    }

    // -------------------------------------------
    // 21) Printing
    // -------------------------------------------
    if (isc.PrintWindow) {
        isc.PrintWindow.changeDefaults("printButtonDefaults", {
            height: 19
        });
    }

    // -------------------------------------------
    // 23) SplitPane
    // -------------------------------------------
    if (isc.SplitPanePagedPanel) {
        isc.SplitPanePagedPanel.addProperties({
            skinUsesCSSTransitions: true
        });
    }
    if (isc.SplitPaneSidePanel) {
        isc.SplitPaneSidePanel.addProperties({
            skinUsesCSSTransitions: true
        });
    }

    // remember the current skin so we can detect multiple skins being loaded
    if (isc.setCurrentSkin) isc.setCurrentSkin("Clonoz");

    isc.Class.modifyFrameworkDone();
}   // end with()
}   // end loadSkin()

isc.loadSkin();

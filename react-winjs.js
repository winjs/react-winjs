var React = require('react');

// Generated from https://github.com/rigdern/winjs-control-apis
var RawControlApis = {
    AppBar: {
        closedDisplayMode: {
            type: "enum",
            values: [
                "compact",
                "full",
                "minimal",
                "none"
            ]
        },
        data: {
            name: "WinJS.Binding.List",
            type: "reference",
            typeArguments: [
                {
                    name: "WinJS.UI.ICommand",
                    type: "reference",
                    typeArguments: []
                }
            ]
        },
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        onAfterClose: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onAfterOpen: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onBeforeClose: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onBeforeOpen: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        opened: {
            type: "boolean"
        },
        placement: {
            type: "enum",
            values: [
                "bottom",
                "top"
            ]
        }
    },
    AppBarCommand: {
        disabled: {
            type: "boolean"
        },
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        extraClass: {
            type: "string"
        },
        firstElementFocus: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        flyout: {
            name: "WinJS.UI.Flyout",
            type: "reference",
            typeArguments: []
        },
        hidden: {
            type: "boolean"
        },
        icon: {
            type: "string"
        },
        id: {
            type: "string"
        },
        label: {
            type: "string"
        },
        lastElementFocus: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        onClick: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        priority: {
            type: "number"
        },
        section: {
            type: "string"
        },
        selected: {
            type: "boolean"
        },
        tooltip: {
            type: "string"
        },
        type: {
            type: "string"
        }
    },
    AutoSuggestBox: {
        chooseSuggestionOnEnter: {
            type: "boolean"
        },
        disabled: {
            type: "boolean"
        },
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        onQueryChanged: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onQuerySubmitted: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onResultSuggestionChosen: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onSuggestionsRequested: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        placeholderText: {
            type: "string"
        },
        queryText: {
            type: "string"
        },
        searchHistoryContext: {
            type: "string"
        },
        searchHistoryDisabled: {
            type: "boolean"
        }
    },
    BackButton: {
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        }
    },
    CellSpanningLayout: {
        groupHeaderPosition: {
            type: "enum",
            values: [
                "left",
                "top"
            ]
        },
        groupInfo: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        itemInfo: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        maximumRowsOrColumns: {
            type: "number"
        },
        numberOfItemsPerItemsBlock: {
            type: "any"
        },
        orientation: {
            type: "enum",
            values: [
                "horizontal",
                "vertical"
            ]
        }
    },
    Command: {
        disabled: {
            type: "boolean"
        },
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        extraClass: {
            type: "string"
        },
        firstElementFocus: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        flyout: {
            name: "WinJS.UI.Flyout",
            type: "reference",
            typeArguments: []
        },
        hidden: {
            type: "boolean"
        },
        icon: {
            type: "string"
        },
        id: {
            type: "string"
        },
        label: {
            type: "string"
        },
        lastElementFocus: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        onClick: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        priority: {
            type: "number"
        },
        section: {
            type: "string"
        },
        selected: {
            type: "boolean"
        },
        tooltip: {
            type: "string"
        },
        type: {
            type: "string"
        }
    },
    ContentDialog: {
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        hidden: {
            type: "boolean"
        },
        onAfterHide: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onAfterShow: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onBeforeHide: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onBeforeShow: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        primaryCommandDisabled: {
            type: "boolean"
        },
        primaryCommandText: {
            type: "string"
        },
        secondaryCommandDisabled: {
            type: "boolean"
        },
        secondaryCommandText: {
            type: "string"
        },
        title: {
            type: "string"
        }
    },
    DatePicker: {
        calendar: {
            type: "string"
        },
        current: {
            name: "Date",
            type: "reference",
            typeArguments: []
        },
        datePattern: {
            type: "string"
        },
        disabled: {
            type: "boolean"
        },
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        maxYear: {
            type: "number"
        },
        minYear: {
            type: "number"
        },
        monthPattern: {
            type: "string"
        },
        onChange: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        yearPattern: {
            type: "string"
        }
    },
    FlipView: {
        currentPage: {
            type: "number"
        },
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        itemDataSource: {
            name: "WinJS.UI.IListDataSource",
            type: "reference",
            typeArguments: [
                {
                    name: "T",
                    type: "type-param"
                }
            ]
        },
        itemSpacing: {
            type: "number"
        },
        itemTemplate: {
            type: "any"
        },
        onDataSourceCountChanged: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onPageCompleted: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onPageSelected: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onPageVisibilityChanged: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        orientation: {
            type: "string"
        }
    },
    Flyout: {
        alignment: {
            type: "string"
        },
        anchor: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        disabled: {
            type: "boolean"
        },
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        hidden: {
            type: "boolean"
        },
        onAfterHide: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onAfterShow: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onBeforeHide: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onBeforeShow: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        placement: {
            type: "string"
        }
    },
    GridLayout: {
        backdropColor: {
            type: "string"
        },
        disableBackdrop: {
            type: "boolean"
        },
        groupHeaderPosition: {
            type: "enum",
            values: [
                "left",
                "top"
            ]
        },
        groupInfo: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        itemInfo: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        maxRows: {
            type: "number"
        },
        maximumRowsOrColumns: {
            type: "number"
        },
        numberOfItemsPerItemsBlock: {
            type: "any"
        },
        orientation: {
            type: "enum",
            values: [
                "horizontal",
                "vertical"
            ]
        }
    },
    Hub: {
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        headerTemplate: {
            type: "any"
        },
        indexOfFirstVisible: {
            type: "number"
        },
        indexOfLastVisible: {
            type: "number"
        },
        loadingState: {
            type: "enum",
            values: [
                "complete",
                "loading"
            ]
        },
        onContentAnimating: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onHeaderInvoked: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onLoadingStateChanged: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        orientation: {
            type: "enum",
            values: [
                "horizontal",
                "vertical"
            ]
        },
        scrollPosition: {
            type: "number"
        },
        sectionOnScreen: {
            type: "number"
        },
        sections: {
            name: "WinJS.Binding.List",
            type: "reference",
            typeArguments: [
                {
                    name: "WinJS.UI.HubSection",
                    type: "reference",
                    typeArguments: []
                }
            ]
        },
        zoomableView: {
            name: "WinJS.UI.IZoomableView",
            type: "reference",
            typeArguments: [
                {
                    type: "any"
                }
            ]
        }
    },
    HubSection: {
        contentElement: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        header: {
            type: "string"
        },
        isHeaderStatic: {
            type: "boolean"
        }
    },
    ItemContainer: {
        draggable: {
            type: "boolean"
        },
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        onInvoked: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onSelectionChanged: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onSelectionChanging: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        selected: {
            type: "boolean"
        },
        selectionDisabled: {
            type: "boolean"
        },
        swipeBehavior: {
            type: "enum",
            values: [
                "none",
                "select"
            ]
        },
        swipeOrientation: {
            type: "enum",
            values: [
                "horizontal",
                "vertical"
            ]
        },
        tapBehavior: {
            type: "enum",
            values: [
                "directSelect",
                "invokeOnly",
                "none",
                "toggleSelect"
            ]
        }
    },
    ListLayout: {
        backdropColor: {
            type: "string"
        },
        disableBackdrop: {
            type: "boolean"
        },
        groupHeaderPosition: {
            type: "enum",
            values: [
                "left",
                "top"
            ]
        },
        numberOfItemsPerItemsBlock: {
            type: "any"
        },
        orientation: {
            type: "enum",
            values: [
                "horizontal",
                "vertical"
            ]
        }
    },
    ListView: {
        automaticallyLoadPages: {
            type: "boolean"
        },
        currentItem: {
            name: "WinJS.UI.IListViewItem",
            type: "reference",
            typeArguments: []
        },
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        footer: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        groupDataSource: {
            name: "WinJS.UI.IListDataSource",
            type: "reference",
            typeArguments: [
                {
                    name: "T",
                    type: "type-param"
                }
            ]
        },
        groupHeaderTapBehavior: {
            type: "enum",
            values: [
                "invoke",
                "none"
            ]
        },
        groupHeaderTemplate: {
            type: "any"
        },
        header: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        indexOfFirstVisible: {
            type: "number"
        },
        indexOfLastVisible: {
            type: "number"
        },
        itemDataSource: {
            name: "WinJS.UI.IListDataSource",
            type: "reference",
            typeArguments: [
                {
                    name: "T",
                    type: "type-param"
                }
            ]
        },
        itemTemplate: {
            type: "any"
        },
        itemsDraggable: {
            type: "boolean"
        },
        itemsReorderable: {
            type: "boolean"
        },
        layout: {
            name: "WinJS.UI.ILayout2",
            type: "reference",
            typeArguments: []
        },
        loadingBehavior: {
            type: "string"
        },
        loadingState: {
            type: "string"
        },
        maxDeferredItemCleanup: {
            type: "number"
        },
        maxLeadingPages: {
            type: "number"
        },
        maxTrailingPages: {
            type: "number"
        },
        onAccessibilityAnnotationComplete: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onContentAnimating: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onFooterVisibilityChanged: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onGroupHeaderInvoked: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onHeaderVisibilityChanged: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onItemDragBetween: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onItemDragChanged: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onItemDragDrop: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onItemDragEnd: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onItemDragEnter: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onItemDragLeave: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onItemDragStart: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onItemInvoked: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onKeyboardNavigating: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onLoadingStateChanged: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onSelectionChanged: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onSelectionChanging: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        pagesToLoad: {
            type: "number"
        },
        pagesToLoadThreshold: {
            type: "number"
        },
        scrollPosition: {
            type: "number"
        },
        selection: {
            name: "WinJS.UI.ISelection",
            type: "reference",
            typeArguments: [
                {
                    name: "T",
                    type: "type-param"
                }
            ]
        },
        selectionMode: {
            type: "enum",
            values: [
                "multi",
                "none",
                "single"
            ]
        },
        swipeBehavior: {
            type: "enum",
            values: [
                "none",
                "select"
            ]
        },
        tapBehavior: {
            type: "enum",
            values: [
                "directSelect",
                "invokeOnly",
                "none",
                "toggleSelect"
            ]
        },
        zoomableView: {
            name: "WinJS.UI.IZoomableView",
            type: "reference",
            typeArguments: [
                {
                    name: "WinJS.UI.ListView",
                    type: "reference",
                    typeArguments: [
                        {
                            name: "T",
                            type: "type-param"
                        }
                    ]
                }
            ]
        }
    },
    Menu: {
        alignment: {
            type: "string"
        },
        anchor: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        commands: {
            name: "Array",
            type: "reference",
            typeArguments: [
                {
                    name: "WinJS.UI.MenuCommand",
                    type: "reference",
                    typeArguments: []
                }
            ]
        },
        disabled: {
            type: "boolean"
        },
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        hidden: {
            type: "boolean"
        },
        onAfterHide: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onAfterShow: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onBeforeHide: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onBeforeShow: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        placement: {
            type: "string"
        }
    },
    MenuCommand: {
        disabled: {
            type: "boolean"
        },
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        extraClass: {
            type: "string"
        },
        flyout: {
            name: "WinJS.UI.Flyout",
            type: "reference",
            typeArguments: []
        },
        hidden: {
            type: "boolean"
        },
        id: {
            type: "string"
        },
        label: {
            type: "string"
        },
        onClick: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        selected: {
            type: "boolean"
        },
        type: {
            type: "string"
        }
    },
    NavBar: {
        closedDisplayMode: {
            type: "string"
        },
        commands: {
            name: "WinJS.UI.AppBarCommand",
            type: "reference",
            typeArguments: []
        },
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        hidden: {
            type: "boolean"
        },
        onAfterClose: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onAfterOpen: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onBeforeClose: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onBeforeOpen: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onChildrenProcessed: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        opened: {
            type: "boolean"
        },
        placement: {
            type: "string"
        }
    },
    NavBarCommand: {
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        icon: {
            type: "string"
        },
        label: {
            type: "string"
        },
        location: {
            type: "any"
        },
        onInvoked: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        splitButton: {
            type: "boolean"
        },
        splitOpened: {
            type: "boolean"
        },
        state: {
            type: "any"
        },
        tooltip: {
            type: "string"
        }
    },
    NavBarContainer: {
        currentIndex: {
            type: "number"
        },
        data: {
            name: "WinJS.Binding.List",
            type: "reference",
            typeArguments: [
                {
                    name: "WinJS.UI.NavBarCommand",
                    type: "reference",
                    typeArguments: []
                }
            ]
        },
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        fixedSize: {
            type: "boolean"
        },
        layout: {
            type: "enum",
            values: [
                "horizontal",
                "vertical"
            ]
        },
        maxRows: {
            type: "number"
        },
        onInvoked: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onSplitToggle: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        template: {
            name: "WinJS.Binding.Template",
            type: "reference",
            typeArguments: []
        }
    },
    Pivot: {
        customLeftHeader: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        customRightHeader: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        items: {
            name: "WinJS.Binding.List",
            type: "reference",
            typeArguments: [
                {
                    name: "WinJS.UI.PivotItem",
                    type: "reference",
                    typeArguments: []
                }
            ]
        },
        locked: {
            type: "boolean"
        },
        onItemAnimationEnd: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onItemAnimationStart: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onSelectionChanged: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        selectedIndex: {
            type: "number"
        },
        selectedItem: {
            name: "WinJS.UI.PivotItem",
            type: "reference",
            typeArguments: []
        },
        title: {
            type: "string"
        }
    },
    PivotItem: {
        contentElement: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        header: {
            type: "string"
        }
    },
    Rating: {
        averageRating: {
            type: "number"
        },
        disabled: {
            type: "boolean"
        },
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        enableClear: {
            type: "boolean"
        },
        maxRating: {
            type: "number"
        },
        onCancel: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onChange: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onPreviewChange: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        tooltipStrings: {
            name: "Array",
            type: "reference",
            typeArguments: [
                {
                    type: "string"
                }
            ]
        },
        userRating: {
            type: "number"
        }
    },
    SearchBox: {
        chooseSuggestionOnEnter: {
            type: "boolean"
        },
        disabled: {
            type: "boolean"
        },
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        focusOnKeyboardInput: {
            type: "boolean"
        },
        onQueryChanged: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onQuerySubmitted: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onResultSuggestionChosen: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onSuggestionsRequested: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        placeholderText: {
            type: "string"
        },
        queryText: {
            type: "string"
        },
        searchHistoryContext: {
            type: "string"
        },
        searchHistoryDisabled: {
            type: "boolean"
        }
    },
    SemanticZoom: {
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        enableButton: {
            type: "boolean"
        },
        locked: {
            type: "boolean"
        },
        onZoomChanged: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        zoomFactor: {
            type: "number"
        },
        zoomedOut: {
            type: "boolean"
        }
    },
    SplitView: {
        closedDisplayMode: {
            type: "enum",
            values: [
                "inline",
                "none"
            ]
        },
        contentElement: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        onAfterClose: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onAfterOpen: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onBeforeClose: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onBeforeOpen: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        openedDisplayMode: {
            type: "enum",
            values: [
                "inline",
                "overlay"
            ]
        },
        paneElement: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        paneOpened: {
            type: "boolean"
        },
        panePlacement: {
            type: "enum",
            values: [
                "bottom",
                "left",
                "right",
                "top"
            ]
        }
    },
    SplitViewCommand: {
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        icon: {
            type: "string"
        },
        label: {
            type: "string"
        },
        onInvoked: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        tooltip: {
            type: "string"
        }
    },
    SplitViewPaneToggle: {
        element: {
            name: "HTMLButtonElement",
            type: "reference",
            typeArguments: []
        },
        onInvoked: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        splitView: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        }
    },
    TimePicker: {
        clock: {
            type: "string"
        },
        current: {
            name: "Date",
            type: "reference",
            typeArguments: []
        },
        disabled: {
            type: "boolean"
        },
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        hourPattern: {
            type: "string"
        },
        minuteIncrement: {
            type: "number"
        },
        minutePattern: {
            type: "string"
        },
        onChange: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        periodPattern: {
            type: "string"
        }
    },
    ToggleSwitch: {
        checked: {
            type: "boolean"
        },
        disabled: {
            type: "boolean"
        },
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        labelOff: {
            type: "string"
        },
        labelOn: {
            type: "string"
        },
        onChange: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        title: {
            type: "string"
        }
    },
    ToolBar: {
        closedDisplayMode: {
            type: "enum",
            values: [
                "compact",
                "full"
            ]
        },
        data: {
            name: "WinJS.Binding.List",
            type: "reference",
            typeArguments: [
                {
                    name: "WinJS.UI.ICommand",
                    type: "reference",
                    typeArguments: []
                }
            ]
        },
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        onAfterClose: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onAfterOpen: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onBeforeClose: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onBeforeOpen: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        opened: {
            type: "boolean"
        }
    },
    Tooltip: {
        contentElement: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        element: {
            name: "HTMLElement",
            type: "reference",
            typeArguments: []
        },
        extraClass: {
            type: "string"
        },
        infotip: {
            type: "boolean"
        },
        innerHTML: {
            type: "string"
        },
        onBeforeClose: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onBeforeOpen: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onClosed: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        onOpened: {
            name: "Function",
            type: "reference",
            typeArguments: []
        },
        placement: {
            type: "string"
        }
    }
};

var setImmediate;
var clearImmediate;
if (window.setImmediate && window.clearImmediate) {
    setImmediate = window.setImmediate;
    clearImmediate = window.clearImmediate;
} else {
    setImmediate = function (callback) {
        return setTimeout(callback, 0);
    };
    clearImmediate = window.clearTimeout;
}

function isEvent(propName) {
    return propName[0] === "o" && propName[1] === "n";
}

function mapObject(obj, callback) {
    var result = {};
    Object.keys(obj).forEach(function (key) {
        var value = callback(key, obj[key]);
        if (value !== undefined) {
            result[key] = value;
        }
    });
    return result;
}

function cloneObject(obj) {
    var result = {};
    for (k in obj) { result[k] = obj[k]; }
    return result;
}

function merge(/* objs */) {
    var result = {};
    for (var i = 0, len = arguments.length; i < len; i++) {
        var obj = arguments[i];
        if (obj) {
            for (k in obj) { result[k] = obj[k]; }
        }
    }
    return result;
}

function endsWith(s, suffix) {
    return s.length >= suffix.length && s.substr(-suffix.length) === suffix;
}

function arraysShallowEqual(a, b) {
    if (a === b) {
        return true;
    } else if (a.length !== b.length) {
        return false;
    } else {
        for (var i = 0, len = a.length; i < len; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }
}

function nestedSet(obj, path, value) {
    var parts = path.split(".");
    var allButLast = parts.slice(0, parts.length - 1);
    var last = parts[parts.length - 1];
    var finalObj = allButLast.reduce(function (current, key) {
        return current[key];
    }, obj);
    finalObj[last] = value;
}

function deparent(element) {
    var parent = element.parentNode;
    parent && parent.removeChild(element);
}

function fireEvent(element, eventName) {
    var eventObject = document.createEvent("CustomEvent");
    eventObject.initCustomEvent(
        eventName,
        true,  // bubbles
        false, // cancelable
        null   // detail
    );
    element.dispatchEvent(eventObject);
}

function makeClassSet(className) {
    var classSet = {};
    className && className.split(" ").forEach(function (aClass) {
        if (aClass) {
            classSet[aClass] = true;
        }
    });
    return classSet;
}

function getIn(object, path) {
    var parts = path.split(".");
    return parts.reduce(function (current, name) {
        return current && current[name];
    }, object);
}

// Given a type from RawControlApis returns a React propType.
function typeToPropType(typeInfo) {
    if (typeInfo.type === "string") {
        return React.PropTypes.string;
    } else if (typeInfo.type === "boolean") {
        return React.PropTypes.bool;
    } else if (typeInfo.type === "number") {
        return React.PropTypes.number;
    } else if (typeInfo.type === "enum") {
        return React.PropTypes.oneOf(typeInfo.values);
    } else if (typeInfo.type === "any") {
        return React.PropTypes.any;
    } else if (typeInfo.type === "reference") {
        if (typeInfo.name === "Function") {
            return React.PropTypes.func;
        } else if (typeInfo.name === "Array") {
            var itemPropType = typeToPropType(typeInfo.typeArguments[0]);
            return itemPropType ? React.PropTypes.arrayOf(itemPropType) : React.PropTypes.array;
        } else if (getIn(window, typeInfo.name)) {
            var instance = getIn(window, typeInfo.name);
            return React.PropTypes.instanceOf(instance);
        }
    } else {
        console.warn("react-winjs typeToPropType: unable to find propType for type: " + JSON.stringify(typeInfo, null, 2));
    }
}

// TODO: Revisit all of this diffing stuff:
//   - Make it more efficient
//   - It's currently hard to understand because it makes aggressive
//     assumptions (e.g. each item has a key and each item has a winControl)
//   - Is it correct?
//   - Should we just sync an array with a binding list instead of computing
//     edits based on 2 arrays and then applying them to a binding list?
function buildIndex(array) {
    var index = {};
    array.forEach(function (item, i) {
        index[item.key] = i;
    });
    return index;
}
function indexOfKey(array, key) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].key === key) {
            return i;
        }
    }
    return -1;
}
function diffArraysByKey(old, latest) {
    old = old.slice(0);
    var oldIndex = buildIndex(old);
    var latestIndex = buildIndex(latest);
    var edits = [];

    // Handle removals
    for (i = old.length - 1; i >= 0; i--) {
        var item = old[i];
        if (!latestIndex.hasOwnProperty(item.key)) {
            edits.push({ type: "delete", index: i });
            old.splice(i, 1);
        }
    }

    // Handle insertions and moves
    for (i = 0; i < latest.length; i++) {
        var item = latest[i];
        if (!oldIndex.hasOwnProperty(item.key)) {
            // Insertion
            edits.push({ type: "insert", index: i, value: item });
            old.splice(i, 0, item);
        } else if (old[i].key !== item.key) {
            // Move
            //edits.push({ type: "move", from: oldIndex[item.key], to: i });
            //old.splice(oldIndex[item.key], 1);

            var fromIndex = indexOfKey(old, item.key);
            edits.push({ type: "move", from: fromIndex, to: i });
            old.splice(fromIndex, 1);
            old.splice(i, 0, item);
        }
    }

    return edits;
}
function applyEditsToBindingList(list, edits) {
    edits.forEach(function (edit) {
        if (edit.type === "delete") {
            list.splice(edit.index, 1);
        } else if (edit.type === "insert") {
            list.splice(edit.index, 0, edit.value.winControl);
        } else if (edit.type === "move") {
            list.move(edit.from, edit.to);
        } else {
            throw "Unsupported edit type: " + edit.type;
        }
    }, this);
}

// interface IWinJSComponent {
//     winControl
//     element
//     data
//     displayName
// }

// interface IWinJSChildComponent extends IWinJSComponent {
//     key
//     type
// }

function processChildren(componentDisplayName, children, childComponentsMap) {
    var newChildComponents = [];
    var newChildComponentsMap = {};

    React.Children.forEach(children, function (component) {
        if (component) {
            if (component.ref) {
                console.warn(
                    "ref prop (" + component.ref + ") will not work on " +
                    component.type.displayName + " component because it is inside " +
                    "of a " + componentDisplayName + " component"
                );
            }

            if (component.key === null) {
                console.error(
                    component.type.displayName + " component requires a key " +
                    "when inside of a " + componentDisplayName + " component"
                );
            } else {
                var winjsChildComponent = childComponentsMap[component.key];
                if (winjsChildComponent) {
                    if (winjsChildComponent.type === component.type) {
                        winjsChildComponent.update(component);
                    } else {
                        winjsChildComponent.dispose();
                        winjsChildComponent = new WinJSChildComponent(component);
                    }
                } else {
                    winjsChildComponent = new WinJSChildComponent(component);
                }
                newChildComponents.push(winjsChildComponent);
                newChildComponentsMap[component.key] = winjsChildComponent;
            }
        }
    });

    Object.keys(childComponentsMap).forEach(function (key) {
        if (!newChildComponentsMap.hasOwnProperty(key)) {
            childComponentsMap[key].dispose();
        }
    });

    return {
        childComponents: newChildComponents,
        childComponentsMap: newChildComponentsMap
    };
}

function prefixedProperty(prefix, property) {
    return prefix + property[0].toUpperCase() + property.substr(1);
}

var isUnitlessProperty = {
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    widows: true,
    zIndex: true,
    zoom: true
};
var vendorPrefixes = ["Moz", "ms", "Webkit"];
Object.keys(isUnitlessProperty).forEach(function (property) {
    vendorPrefixes.forEach(function (prefix) {
        isUnitlessProperty[prefixedProperty(prefix, property)] = true;
    });
});

function resolveStyleValue(cssProperty, value) {
    if (typeof value === "number") {
        return isUnitlessProperty[cssProperty] || value === 0 ?
            ("" + value) :
            (value + "px");
    } else {
        return value ? ("" + value) : "";
    }
}

var PropHandlers = {
    // Maps to a property on the winControl.
    property: function (propType) {
        return {
            propType: propType,
            preCtorInit: function property_preCtorInit(element, options, data, displayName, propName, value) {
                options[propName] = value;
            },
            update: function property_update(winjsComponent, propName, oldValue, newValue) {
                if (oldValue !== newValue) {
                    winjsComponent.winControl[propName] = newValue;
                }
            }
        };
    },

    // Maps to a property on the winControl which involves setting focus. Such properties
    // are set outside of componentWillReceiveProps to prevent React from undoing the
    // focus move.
    focusProperty: function (propType) {
        return {
            propType: propType,
            preCtorInit: function focusProperty_preCtorInit(element, options, data, displayName, propName, value) {
                options[propName] = value;
            },
            update: function focusProperty_update(winjsComponent, propName, oldValue, newValue) {
                if (oldValue !== newValue) {
                    var asyncToken = winjsComponent.data[propName];
                    asyncToken && clearImmediate(asyncToken);
                    asyncToken = setImmediate(function () {
                        winjsComponent.data[propName] = null;
                        winjsComponent.winControl[propName] = newValue;
                    });
                }
            },
            dispose: function focusProperty_dispose(winjsComponent, propName) {
                var asyncToken = winjsComponent.data[propName];
                asyncToken && clearImmediate(asyncToken);
            }
        };
    },

    // Maps to a property on the winControl's element.
    domProperty: function (propType) {
        return {
            propType: propType,
            preCtorInit: function domProperty_preCtorInit(element, options, data, displayName, propName, value) {
                element[propName] = value;
            },
            update: function domProperty_update(winjsComponent, propName, oldValue, newValue) {
                if (oldValue !== newValue) {
                    winjsComponent.element[propName] = newValue;
                }
            }
        };
    },

    // Maps to an attribute on the winControl's element.
    domAttribute: function (propType) {
        return {
            propType: propType,
            update: function domAttribute_update(winjsComponent, propName, oldValue, newValue) {
                if (oldValue !== newValue) {
                    if (newValue !== null && newValue !== undefined) {
                        winjsComponent.element.setAttribute(propName, "" + newValue);
                    } else {
                        winjsComponent.element.removeAttribute(propName);
                    }
                }
            }
        };
    },

    // Maps to an event on the winControl.
    event: {
        propType: React.PropTypes.func,
        // Can't set options in preCtorInit for events. The problem is WinJS control options
        // use a different code path to hook up events than the event property setters.
        // Consequently, setting an event property will not automatically unhook the event
        // listener that was specified in the options during initialization. To avoid this
        // problem, always go thru the event property setters.
        update: function event_update(winjsComponent, propName, oldValue, newValue) {
            if (oldValue !== newValue) {
                winjsComponent.winControl[propName.toLowerCase()] = newValue;
            }
        }
    },

    // Maps to an event on the winControl's element.
    domEvent: {
        propType: React.PropTypes.func,
        preCtorInit: function domEvent_preCtorInit(element, options, data, displayName, propName, value) {
            element[propName.toLowerCase()] = value;
        },
        update: function domEvent_update(winjsComponent, propName, oldValue, newValue) {
            if (oldValue !== newValue) {
                winjsComponent.element[propName.toLowerCase()] = newValue;
            }
        }
    },

    //  Enable the addition and removal of CSS classes on the root of the winControl
    //  but don't clobber whatever CSS classes the underlying control may have added
    //  (e.g. don't clobber win-listview).
    winControlClassName: {
        propType: React.PropTypes.string,
        preCtorInit: function winControlClassName_preCtorInit(element, options, data, displayName, propName, value) {
            if (value) {
                element.className = value;
            }
            data[propName] = makeClassSet(value);
        },
        update: function winControlClassName_update(winjsComponent, propName, oldValue, newValue) {
            if (oldValue !== newValue) {
                var oldClassSet = winjsComponent.data[propName] || {};
                var newClassSet = makeClassSet(newValue);
                var elementClassList = winjsComponent.winControl.element.classList;
                for (var className in oldClassSet) {
                    if (!newClassSet[className]) {
                        elementClassList.remove(className);
                    }
                }
                for (var className in newClassSet) {
                    if (!oldClassSet[className]) {
                        elementClassList.add(className);
                    }
                }
                winjsComponent.data[propName] = newClassSet;
            }
        }
    },

    //  Enable the addition and removal of inline styles on the root of the winControl
    //  but don't clobber whatever inline styles the underlying control may have added.
    winControlStyle: {
        propType: React.PropTypes.object,
        preCtorInit: function winControlStyle_preCtorInit(element, options, data, displayName, propName, value) {
            var elementStyle = element.style;
            value = value || {};
            for (var cssProperty in value) {
                elementStyle[cssProperty] = resolveStyleValue(cssProperty, value[cssProperty]);
            }
        },
        update: function winControlStyle_update(winjsComponent, propName, oldValue, newValue) {
            if (oldValue !== newValue) {
                oldValue = oldValue || {};
                newValue = newValue || {};
                var elementStyle = winjsComponent.winControl.element.style;
                for (var cssProperty in oldValue) {
                    if (!newValue.hasOwnProperty(cssProperty)) {
                        elementStyle[cssProperty] = "";
                    }
                }
                for (var cssProperty in newValue) {
                    if (oldValue[cssProperty] !== newValue[cssProperty]) {
                        elementStyle[cssProperty] = resolveStyleValue(cssProperty, newValue[cssProperty]);
                    }
                }
            }
        }
    },

    // Emits a warning to the console whenever prop gets used.
    warn: function PropHandlers_warn(warnMessage) {
        return {
            // Don't need preCtorInit because this prop handler doesn't have any side
            // effects on the WinJS control. update also runs during initialization so
            // update is just as good as preCtorInit for our use case.
            update: function warn_update(winjsComponent, propName, oldValue, newValue) {
                console.warn(winjsComponent.displayName + ": " + warnMessage);
            }
        };
    },

    // Creates a DOM element and mounts a React component on it. Gives this DOM
    // element to the *winControlProperty* property of the winControl.
    propertyWithMount: function PropHandlers_propertyWithMount(winControlProperty) {
        return {
            propType: React.PropTypes.element,
            preCtorInit: function propertyWithMount_preCtorInit(element, options, data, displayName, propName, value) {
                if (value) {
                    data[propName] = document.createElement("div");
                    React.render(value, data[propName]);
                    options[winControlProperty] = data[propName];
                }
            },
            update: function propertyWithMount_update(winjsComponent, propName, oldValue, newValue) {
                var winControl = winjsComponent.winControl;
                var element = winjsComponent.data[propName];
                if (newValue) {
                    if (!element) {
                        element = document.createElement("div");
                        winjsComponent.data[propName] = element;
                    }
                    React.render(newValue, element);
                    if (winControl[winControlProperty] !== element) {
                        winControl[winControlProperty] = element;
                    }
                } else if (oldValue) {
                    element && React.unmountComponentAtNode(element);
                    winControl[winControlProperty] = null;
                }
            },
            dispose: function propertyWithMount_dispose(winjsComponent, propName) {
                var element = winjsComponent.data[propName];
                element && React.unmountComponentAtNode(element);
            }
        };
    },


    // Mounts a React component on whatever element gets returned by getMountPoint.
    mountTo: function PropHandlers_mountTo(getMountPoint) {
        return {
            propType: React.PropTypes.element,
            // Can't use preCtorInit because the mount point may not exist until the
            // constructor has run.
            update: function mountTo_update(winjsComponent, propName, oldValue, newValue) {
                var data = winjsComponent.data[propName] || {};
                var version = (data.version || 0) + 1;
                winjsComponent.data[propName] = {
                    // *mountComponent* may run asynchronously and we may queue it multiple
                    // times before it runs. *version* allows us to ensure only the latest
                    // version runs and the others are no ops.
                    version: version,
                    // *element* is the element to which we last mounted the component.
                    element: data.element
                };

                var mountComponent = function () {
                    if (version === winjsComponent.data[propName].version) {
                        var oldElement = winjsComponent.data[propName].element;

                        if (newValue) {
                            var newElement = getMountPoint(winjsComponent);
                            if (oldElement && oldElement !== newElement) {
                                React.unmountComponentAtNode(oldElement);
                            }

                            React.render(newValue, newElement);
                            winjsComponent.data[propName].element = newElement;
                        } else if (oldValue) {
                            oldElement && React.unmountComponentAtNode(oldElement);
                            winjsComponent.data[propName].element = null;
                        }
                    }
                };

                // *isDeclarativeControlContainer* is a hook some WinJS controls provide
                // (e.g. HubSection, PivotItem) to ensure that processing runs on the
                // control only when the control is ready for it. This enables lazy loading
                // of HubSections/PivotItems (e.g. load off screen items asynchronously in
                // batches). Additionally, doing processing thru this hook guarantees that
                // the processing won't run until the control is in the DOM.
                var winControl = winjsComponent.winControl;
                var queueProcessing = winControl.constructor.isDeclarativeControlContainer;
                if (queueProcessing && typeof queueProcessing === "function") {
                    queueProcessing(winControl, mountComponent);
                } else {
                    mountComponent();
                }
            },
            dispose: function mountTo_dispose(winjsComponent, propName) {
                var data = winjsComponent.data[propName] || {};
                var element = data.element;
                element && React.unmountComponentAtNode(element);
            }
        };
    },

    // Uses the Binding.List's editing APIs to make it match the children prop. Does this to
    // the Binding.List stored in the winControl's property called bindingListName.
    syncChildrenWithBindingList: function PropHandlers_syncChildrenWithBindingList(bindingListName) {
        return {
            preCtorInit: function syncChildrenWithBindingList_preCtorInit(element, options, data, displayName, propName, value) {
                var latest = processChildren(displayName, value, {});
                data[propName] = {
                    winjsChildComponents: latest.childComponents,
                    winjsChildComponentsMap: latest.childComponentsMap
                };

                options[bindingListName] = new WinJS.Binding.List(
                    latest.childComponents.map(function (winjsChildComponent) {
                        return winjsChildComponent.winControl;
                    })
                );
            },
            update: function syncChildrenWithBindingList_update(winjsComponent, propName, oldValue, newValue) {
                var data = winjsComponent.data[propName] || {};
                var oldChildComponents = data.winjsChildComponents || [];
                var oldChildComponentsMap = data.winjsChildComponentsMap || {};
                var latest = processChildren(winjsComponent.displayName, newValue, oldChildComponentsMap);

                var bindingList = winjsComponent.winControl[bindingListName];
                if (bindingList) {
                    applyEditsToBindingList(
                        bindingList,
                        diffArraysByKey(oldChildComponents, latest.childComponents)
                    );
                } else {
                    winjsComponent.winControl[bindingListName] = new WinJS.Binding.List(latest.childComponents.map(function (winjsChildComponent) {
                        return winjsChildComponent.winControl;
                    }));
                }
                
                winjsComponent.data[propName] = {
                    winjsChildComponents: latest.childComponents,
                    winjsChildComponentsMap: latest.childComponentsMap
                };
            },
            dispose: function syncChildrenWithBindingList_dispose(winjsComponent, propName) {
                var data = winjsComponent.data[propName] || {};
                var childComponents = data.winjsChildComponents || [];
                childComponents.forEach(function (winjsChildComponent) {
                    winjsChildComponent.dispose();
                });
            }
        }
    }
};

function defineControl(options) {
    // Required
    var winjsControl = options.winjsControl;

    // Optional
    var winControlOptions = options.winControlOptions || {};
    var preCtorInit = options.preCtorInit || function () { };
    var propHandlers = options.propHandlers || {};
    var render = options.render || function (component) {
        return React.DOM.div();
    };
    var displayName = options.displayName;

    function initWinJSComponent(winjsComponent, element, props) {
        winjsComponent.data = {};
        winjsComponent.displayName = displayName;
        winjsComponent.element = element;

        // Give propHandlers that implement preCtorInit the opportunity to run before
        // instantiating the winControl.
        var options = cloneObject(winControlOptions);
        preCtorInit(element, options, winjsComponent.data, displayName);
        Object.keys(props).forEach(function (propName) {
            var handler = propHandlers[propName];
            if (handler && handler.preCtorInit) {
                handler.preCtorInit(element, options, winjsComponent.data, displayName, propName, props[propName]);
            }
        });
        winjsComponent.winControl = new winjsControl(element, options);        

        // Process propHandlers that don't implement preCtorInit.
        Object.keys(props).forEach(function (propName) {
            var handler = propHandlers[propName];
            if (handler && !handler.preCtorInit) {
                handler.update(winjsComponent, propName, undefined, props[propName]);
            }
        });
    }

    function updateWinJSComponent(winjsComponent, prevProps, nextProps) {
        // Handle props that were added or changed
        Object.keys(nextProps).forEach(function (propName) {
            var handler = propHandlers[propName];
            if (handler) {
                handler.update(winjsComponent, propName, prevProps[propName], nextProps[propName]);
            }
        });

        // Handle props that were removed
        Object.keys(prevProps).forEach(function (propName) {
            if (!nextProps.hasOwnProperty(propName)) {
                var handler = propHandlers[propName];
                if (handler) {
                    handler.update(winjsComponent, propName, prevProps[propName], undefined);
                }
            }
        });
    }

    function disposeWinJSComponent(winjsComponent) {
        winjsComponent.winControl.dispose && winjsComponent.winControl.dispose();
        Object.keys(propHandlers).forEach(function (propName) {
            var handler = propHandlers[propName];
            handler.dispose && handler.dispose(winjsComponent, propName);
        })
    }

    return React.createClass({
        displayName: displayName,
        statics: {
            initWinJSComponent: initWinJSComponent,
            updateWinJSComponent: updateWinJSComponent,
            disposeWinJSComponent: disposeWinJSComponent
        },
        propTypes: mapObject(propHandlers, function (propName, propHandler) {
            return propHandler.propType;
        }),
        shouldComponentUpdate: function () {
            return false;
        },
        // If choosing to implement componentWillMount, be aware that componentWillMount
        // will run when WinJSChildComponent renders the component to a string via
        // renderRootlessComponent.
        componentDidMount: function () {
            initWinJSComponent(this, React.findDOMNode(this), this.props);
        },
        componentWillUnmount: function () {
            disposeWinJSComponent(this);
        },
        componentWillReceiveProps: function (nextProps) {
            updateWinJSComponent(this, this.props, nextProps);
        },
        render: function() {
            return render(this);
        }
    });
}

var hostEl = document.createElement("div");
function renderRootlessComponent(component) {
    var html = React.renderToStaticMarkup(component);
    hostEl.innerHTML = html;
    var element = hostEl.firstElementChild;
    hostEl.removeChild(element);
    return element;
}

// TODO: Is there a better way to solve this problem that WinJSChildComponent solves?
// TODO: Because we're not going thru React's lifecycle, we're missing out on
// validation of propTypes.
// TODO: ref doesn't work on WinJSChildComponents. The reason is that during updates, we
// don't call React.render. Because of this, refs would go stale and only reflect the
// state of the component after its first render. Consequently, we clone the component
// during its first render so it never shows up in refs. This should make it clearer
// that refs don't work than generating stale refs.
function WinJSChildComponent(component) { // implements IWinJSChildComponent
    // Clone the component so a ref isn't generated.
    var clonedComponent = React.cloneElement(component, { ref: null });
    var element = renderRootlessComponent(clonedComponent);
    component.type.initWinJSComponent(this, element, component.props);
    this.key = component.key;
    this.type = component.type;
    this._props = component.props;
    this._disposeWinJSComponent = component.type.disposeWinJSComponent;
};
WinJSChildComponent.prototype.update = function (component) {
    component.type.updateWinJSComponent(this, this._props, component.props);
    this._props = component.props;
};
WinJSChildComponent.prototype.dispose = function () {
    this._disposeWinJSComponent(this);
};


// Prop handlers that are common to every WinJS control.
var defaultPropHandlers = {
    className: PropHandlers.winControlClassName,
    style: PropHandlers.winControlStyle,

    // TODO: Instead of special casing these, support DOM attributes
    // more generically.
    id: PropHandlers.domProperty(React.PropTypes.string),
    "aria-controls": PropHandlers.domAttribute(React.PropTypes.any),
    "aria-expanded": PropHandlers.domAttribute(React.PropTypes.any)
};

// Control-specific prop handlers derived from RawControlApis
var DefaultControlPropHandlers = (function processRawApis() {
    var keepProperty = function keepProperty(propertyName) {
        return !endsWith(propertyName.toLowerCase(), "element");
    };

    return mapObject(RawControlApis, function (controlName, controlApis) {
        var propHandlers = {};
        Object.keys(controlApis).forEach(function (propName) {
            if (isEvent(propName)) {
                propHandlers[propName] = PropHandlers.event;
            } else if (keepProperty(propName)) {
                var typeInfo = controlApis[propName];
                var propType = typeToPropType(typeInfo);
                propHandlers[propName] = PropHandlers.property(propType);
            }
        });
        return propHandlers;
    });
})();

// Each entry in controlApis has the same format as the argument to defineControl except
// updateWithDefaults automatically provides:
//   - winjsControl
//   - displayName
//   - propHandlers
// and updateWithDefaults implements an extra option:
//   - underlyingControlName
// By default, winjsControl, displayName, and propHanders are inferred from the entry's key
// in controlApis. If underlyingControlName is provided, they will instead be inferred from
// that name.
function updateWithDefaults(controlApis) {
    Object.keys(controlApis).forEach(function (controlName) {
        var spec = controlApis[controlName];
        var winjsControlName = spec.underlyingControlName || controlName;
        spec.winjsControl = spec.winjsControl || WinJS.UI[winjsControlName];
        spec.displayName = spec.displayName || winjsControlName;
        spec.propHandlers = merge(
            defaultPropHandlers, // Common to all WinJS controls
            DefaultControlPropHandlers[winjsControlName], // Control-specific derived from RawControlApis
            spec.propHandlers // Control-specific handwritten
        );
    });
    return controlApis;
}

var typeWarnPropHandler = PropHandlers.warn("Invalid prop 'type'. Instead, the command type is" +
    " determined by the component: Button, Toggle, Separator, ContentCommand, FlyoutCommand.");
var CommandSpecs = {
    Button: {
        underlyingControlName: "AppBarCommand",
        winControlOptions: { type: "button" },
        render: function (component) {
            return React.DOM.button();
        },
        propHandlers: {
            type: typeWarnPropHandler,
        }
    },
    Toggle: {
        underlyingControlName: "AppBarCommand",
        winControlOptions: { type: "toggle" },
        render: function (component) {
            return React.DOM.button();
        },
        propHandlers: {
            type: typeWarnPropHandler
        }
    },
    Separator: {
        underlyingControlName: "AppBarCommand",
        winControlOptions: { type: "separator" },
        render: function (component) {
            return React.DOM.hr();
        },
        propHandlers: {
            type: typeWarnPropHandler
        }
    },
    ContentCommand: {
        underlyingControlName: "AppBarCommand",
        winControlOptions: { type: "content" },
        propHandlers: {
            type: typeWarnPropHandler,
            children: PropHandlers.mountTo(function (winjsComponent) {
                return winjsComponent.winControl.element;
            })
        }
    },
    FlyoutCommand: {
        underlyingControlName: "AppBarCommand",
        winControlOptions: { type: "flyout" },
        render: function (component) {
            return React.DOM.button();
        },
        propHandlers: {
            type: typeWarnPropHandler,
            flyoutComponent: {
                propType: React.PropTypes.element,
                update: function FlyoutCommand_flyoutComponent_update(winjsComponent, propName, oldValue, newValue) {
                    var data = winjsComponent.data[propName];
                    if (!data) {
                        var flyoutHost = document.createElement("div");
                        flyoutHost.className = "win-react-flyout-host";
                        document.body.appendChild(flyoutHost);
                        winjsComponent.data[propName] = data = {
                            flyoutHost: flyoutHost,
                            flyoutComponent: null
                        };
                    }
                    var oldWinControl = data.flyoutComponent && data.flyoutComponent.winControl;
                    var instance = React.render(newValue, data.flyoutHost);
                    if (oldWinControl !== instance.winControl) {
                        winjsComponent.winControl.flyout = instance.winControl;
                    }
                    winjsComponent.data[propName].flyoutComponent = instance;
                },
                dispose: function FlyoutCommand_flyoutComponent_dispose(winjsComponent, propName) {
                    var data = winjsComponent.data[propName];
                    if (data && data.flyoutHost) {
                        React.unmountComponentAtNode(data.flyoutHost);
                        deparent(data.flyoutHost);
                    }
                }
            }
        }
    }
};

var ControlApis = updateWithDefaults({
    AppBar: {
        propHandlers: {
            opened: PropHandlers.focusProperty(React.PropTypes.bool),
            children: PropHandlers.syncChildrenWithBindingList("data")
        }
    },
    "AppBar.Button": CommandSpecs.Button,
    "AppBar.Toggle": CommandSpecs.Toggle,
    "AppBar.Separator": CommandSpecs.Separator,
    "AppBar.ContentCommand": CommandSpecs.ContentCommand,
    "AppBar.FlyoutCommand": CommandSpecs.FlyoutCommand,
    AutoSuggestBox: {},
    BackButton: {
        preCtorInit: function (element, options, data, displayName) {
            element.addEventListener("click", function (eventObject) {
                // Prevent React from seeing the "click" event to workaround this React
                // bug: https://github.com/facebook/react/issues/3790
                eventObject.stopPropagation();
            });
        },
        render: function (component) {
            return React.DOM.button();
        }
    },
    // CellSpanningLayout: Not a component so just use off of WinJS.UI?
    ContentDialog: {
        propHandlers: {
            hidden: PropHandlers.focusProperty(React.PropTypes.bool),
            children: PropHandlers.mountTo(function (winjsComponent) {
                return winjsComponent.winControl.element.querySelector(".win-contentdialog-content");
            })
        }
    },
    DatePicker: {},
    FlipView: {},
    Flyout: {
        // The WinJS Flyout control doesn't come with a good mount point.
        // App content and control content are siblings in Flyout.element.
        // Consequently, if React rendered to Flyout.element, it would destroy
        // some of Flyout's elements. To fix this, we give Flyout a div
        // (className="win-react-flyout-mount-point") which will contain only
        // app content. The React component renders into this div so it doesn't
        // destroy any control content.
        render: function (component) {
            return React.DOM.div(null, React.DOM.div({ className: "win-react-flyout-mount-point" }));
        },
        propHandlers: {
            hidden: PropHandlers.focusProperty(React.PropTypes.bool),
            children: PropHandlers.mountTo(function (winjsComponent) {
                return winjsComponent.winControl.element.querySelector(".win-react-flyout-mount-point");
            })
        }
    },
    // GridLayout: Not a component so just use off of WinJS.UI?
    Hub: {
        propHandlers: {
            children: PropHandlers.syncChildrenWithBindingList("sections")
        }
    },
    "Hub.Section": {
        underlyingControlName: "HubSection",
        propHandlers: {
            children: PropHandlers.mountTo(function (winjsComponent) {
                return winjsComponent.winControl.contentElement;
            })
        }
    },
    ItemContainer: {
        propHandlers: {
            children: PropHandlers.mountTo(function (winjsComponent) {
                return winjsComponent.winControl.element.querySelector(".win-item");
            })
        }
    },
    // ListLayout: Not a component so just use off of WinJS.UI?
    ListView: {
        propHandlers: {
            currentItem: PropHandlers.focusProperty(React.PropTypes.any),
            headerComponent: PropHandlers.propertyWithMount("header"),
            footerComponent: PropHandlers.propertyWithMount("footer"),
        }
    },
    // TODO: Keyboarding doesn't work in Menu probably because MenuCommands are not direct
    // children of the Menu.
    Menu: {
        propHandlers: {
            hidden: PropHandlers.focusProperty(React.PropTypes.bool),
            children: {
                // children propHandler looks like this rather than using mountTo on
                // winControl.element because this enables props.children to have
                // multiple components whereas the other technique restricts it to one.
                update: function (winjsComponent, propName, oldValue, newValue) {
                    // TODO: dispose
                    React.render(React.DOM.div(null, newValue), winjsComponent.winControl.element);
                }
            }
        }
    },
    "Menu.Button": merge(CommandSpecs.Button, {
        underlyingControlName: "MenuCommand"
    }),
    "Menu.Toggle": merge(CommandSpecs.Toggle, {
        underlyingControlName: "MenuCommand"
    }),
    "Menu.Separator": merge(CommandSpecs.Separator, {
        underlyingControlName: "MenuCommand"
    }),
    "Menu.FlyoutCommand": merge(CommandSpecs.FlyoutCommand, {
        underlyingControlName: "MenuCommand"
    }),
    Pivot: {
        propHandlers: {
            children: PropHandlers.syncChildrenWithBindingList("items"),
            customLeftHeaderComponent: PropHandlers.propertyWithMount("customLeftHeader"),
            customRightHeaderComponent: PropHandlers.propertyWithMount("customRightHeader")
        }
    },
    "Pivot.Item": {
        underlyingControlName: "PivotItem",
        propHandlers: {
            children: PropHandlers.mountTo(function (winjsComponent) {
                return winjsComponent.winControl.contentElement;
            })
        }
    },
    Rating: {},
    SemanticZoom: {
        propHandlers: {
            zoomedInComponent: {
                propType: React.PropTypes.element,
                preCtorInit: function zoomedInComponent_preCtorInit(element, options, data, displayName, propName, value) {
                    var child = new WinJSChildComponent(value);
                    // Zoomed in component should be the first child.
                    element.insertBefore(child.winControl.element, element.firstElementChild);
                    data[propName] = child;
                },
                update: function zoomedInComponent_update(winjsComponent, propName, oldValue, newValue) {
                    var child = winjsComponent.data[propName];
                    if (child.type === newValue.type) {
                        child.update(newValue);
                    } else {
                        console.warn("SemanticZoom: zoomedInComponent's component type can't change");
                    }
                },
                dispose: function zoomedInComponent_dispose(winjsComponent, propName) {
                    var child = winjsComponent.data[propName];
                    child && child.dispose();
                }
            },
            zoomedOutComponent: {
                propType: React.PropTypes.element,
                preCtorInit: function zoomedOutComponent_preCtorInit(element, options, data, displayName, propName, value) {
                    var child = new WinJSChildComponent(value);
                    // Zoomed out component should be the second child.
                    element.appendChild(child.winControl.element);
                    data[propName] = child;
                },
                update: function zoomedOutComponent_update(winjsComponent, propName, oldValue, newValue) {
                    var child = winjsComponent.data[propName];
                    if (child.type === newValue.type) {
                        child.update(newValue);
                    } else {
                        console.warn("SemanticZoom: zoomedOutComponent's component type can't change");
                    }
                },
                dispose: function zoomedOutComponent_dispose(winjsComponent, propName) {
                    var child = winjsComponent.data[propName];
                    child && child.dispose();
                }
            }
        }
    },
    SplitView: {
        propHandlers: {
            paneOpened: PropHandlers.focusProperty(React.PropTypes.bool),
            paneComponent: PropHandlers.mountTo(function (winjsComponent) {
                return winjsComponent.winControl.paneElement;
            }),
            contentComponent: PropHandlers.mountTo(function (winjsComponent) {
                return winjsComponent.winControl.contentElement;
            })
        }
    },
    "SplitView.Command": {
        underlyingControlName: "SplitViewCommand",
    },
    SplitViewPaneToggle: {
        render: function (component) {
            return React.DOM.button();
        },
        propHandlers: {
            // paneOpened provides a React-friendly interface for making the SplitViewPaneToggle accessible.
            // When paneOpened is specified, is not undefined, and is not null, it:
            //  - Sets SplitViewPaneToggle's aria-expanded attribute to match paneOpened
            //  - Fires SplitViewPaneToggle's "invoked" event when aria-expanded is mutated
            paneOpened: {
                propType: React.PropTypes.bool,
                update: function paneOpened_update(winjsComponent, propName, oldValue, newValue) {
                    var data = winjsComponent.data[propName];
                    if (!data) {
                        data = {
                            // WinJS.UI.SplitViewPaneToggle depends on WinJS.Utilities._MutationObserver so it
                            // is safe to use it here.
                            ariaExpandedMutationObserver: new WinJS.Utilities._MutationObserver(function () {
                                var element = winjsComponent.element;
                                var ariaExpanded = (element.getAttribute("aria-expanded") === "true");
                                if (ariaExpanded !== winjsComponent.data[propName].value) {
                                    fireEvent(element, "invoked"); // Fire WinJS.UI.SplitViewPaneToggle's invoked event
                                }
                            }),
                            observing: false,
                            value: newValue
                        };
                        winjsComponent.data[propName] = data;
                    }

                    if (oldValue !== newValue) {
                        if (newValue !== null && newValue !== undefined) {
                            winjsComponent.element.setAttribute("aria-expanded", newValue ? "true" : "false");
                            if (!data.observing) {
                                data.observing = true;
                                data.ariaExpandedMutationObserver.observe(winjsComponent.element, {
                                    attributes: true,
                                    attributeFilter: ["aria-expanded"]
                                });
                            }
                        } else {
                            winjsComponent.element.removeAttribute("aria-expanded");
                            if (data.observing) {
                                data.observing = false;
                                data.ariaExpandedMutationObserver.disconnect();
                            }
                        }
                    }

                    data.value = newValue;
                },
                dispose: function paneOpened_dispose(winjsComponent, propName) {
                    var data = winjsComponent.data[propName];
                    if (data && data.observing) {
                        data.ariaExpandedMutationObserver.disconnect();
                    }
                }
            }
        }
    },
    TimePicker: {},
    ToggleSwitch: {},
    ToolBar: {
        propHandlers: {
            opened: PropHandlers.focusProperty(React.PropTypes.bool),
            children: PropHandlers.syncChildrenWithBindingList("data")
        }
    },
    "ToolBar.Button": CommandSpecs.Button,
    "ToolBar.Toggle": CommandSpecs.Toggle,
    "ToolBar.Separator": CommandSpecs.Separator,
    "ToolBar.ContentCommand": CommandSpecs.ContentCommand,
    "ToolBar.FlyoutCommand": CommandSpecs.FlyoutCommand,
    Tooltip: {
        propHandlers: {
            children: PropHandlers.mountTo(function (winjsComponent) {
                return winjsComponent.winControl.element;
            }),
            contentComponent: PropHandlers.propertyWithMount("contentElement")
        }
    }
});

//
// Publish
//

var ReactWinJS = {};

// Controls
//

// Sort to ensure that controls come before their subcontrols
// (e.g. AppBar comes before AppBar.Toggle).
Object.keys(ControlApis).sort().forEach(function (controlName) {
    nestedSet(ReactWinJS, controlName, defineControl(ControlApis[controlName]));
});

// Utilites
//

// Given a function that returns a React component,
// returns an item renderer function that can be used
// with WinJS controls. Useful for describing FlipView
// and ListView item templates as React components.
ReactWinJS.reactRenderer = function reactRenderer(componentFunction) {
    var componentFunctionBound;
    var renderItem = function renderItem(item) {
        var element = document.createElement("div");
        element.className = "win-react-renderer-host";
        React.render(componentFunctionBound(item), element);
        WinJS.Utilities.markDisposable(element, function () {
            React.unmountComponentAtNode(element);
        });
        return element;
    };

    return function itemRenderer(itemOrItemPromise) {
        if (!componentFunctionBound) {
            componentFunctionBound = componentFunction.bind(this);
        }

        return WinJS.Promise.is(itemOrItemPromise) ?
            itemOrItemPromise.then(renderItem) :
            renderItem(itemOrItemPromise);
    }
};


// Low-level utilities for wrapping custom WinJS-style controls
//

ReactWinJS.defineControl = defineControl;
ReactWinJS.PropHandlers = PropHandlers;
ReactWinJS.defaultPropHandlers = defaultPropHandlers;

module.exports = ReactWinJS;

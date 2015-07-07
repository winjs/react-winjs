/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(2);
	var ReactWinJS = __webpack_require__(3);
	var PeoplePage = __webpack_require__(4);
	var OtherPage = __webpack_require__(1);
	var ProfilePicture = __webpack_require__(5);
	var Data = __webpack_require__(6);

	var splitViewId = "rootSplitView";

	var splitViewConfigs = {
	    small: {
	        closedDisplayMode: "none",
	        openedDisplayMode: "overlay"
	    },
	    medium: {
	        closedDisplayMode: "inline",
	        openedDisplayMode: "overlay"
	    },
	    large: {
	        closedDisplayMode: "inline",
	        openedDisplayMode: "inline"
	    }
	};

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

	function getMode() {
	    return (
	        window.innerWidth >= 1366 ? "large" :
	        window.innerWidth >= 800 ? "medium" :
	        "small"
	    );
	}

	var App = React.createClass({displayName: "App",
	    getSplitViewConfig: function () {
	        return splitViewConfigs[this.state.mode];
	    },
	    handlePeopleChanged: function (newPeople) {
	        this.setState({
	            people: newPeople
	        });
	    },
	    handleNavigation: function (newLocation) {
	        this.setState({
	            location: newLocation
	        });
	    },
	    handleBack: function () {
	        var location = this.state.location;
	        location.pop();
	        this.handleNavigation(location);
	    },
	    handleResize: function () {
	        var prevMode = this.state.mode;
	        var nextMode = getMode();
	            
	        if (prevMode !== nextMode) {
	            this.setState({ mode: nextMode });
	        }
	    },
	    handleCommandInvoked: function (newLocation) {
	        this.setState({
	            location: newLocation,
	            paneOpened: this.getSplitViewConfig().openedDisplayMode === "overlay" ? false : this.state.paneOpened
	        });
	    },
	    handleTogglePane: function () {
	        this.setState({ paneOpened: !this.state.paneOpened });
	    },
	    handleAfterClose: function () {
	        this.setState({ paneOpened: false });
	    },
	    getInitialState: function () {
	        var mode = getMode();

	        var groupKey = function (data) {
	            return data.name[0].toUpperCase();
	        };

	        var groupData = function (data) {
	            return { title: groupKey(data) };
	        };

	        var sorter = function (a, b) {
	            if (a.name < b.name) {
	                return -1;
	            } else if (a.name > b.name) {
	                return 1;
	            } else {
	                return 0;
	            }
	        };

	        var data = new WinJS.Binding.List(Data.people)
	            .createSorted(sorter)
	            .createGrouped(groupKey, groupData);

	        return {
	            people: data,
	            mode: mode,
	            location: ["people"]
	        };
	    },
	    componentWillMount: function () {
	        window.addEventListener("resize", this.handleResize);
	    },
	    componentWillUnmount: function () {
	        window.removeEventListener("resize", this.handleResize);
	    },
	    renderPeoplePage: function () {
	        return (
	            React.createElement(PeoplePage, {
	                mode: this.state.mode, 
	                people: this.state.people, 
	                location: this.state.location, 
	                onNavigate: this.handleNavigation, 
	                onPeopleChanged: this.handlePeopleChanged})
	        );
	    },
	    renderOtherPage: function () {
	        return React.createElement(OtherPage, {location: this.state.location})
	    },
	    renderContent: function () {
	        if (this.state.location.length === 0 || this.state.location[0] === "people") {
	            return this.renderPeoplePage();
	        } else {
	            return this.renderOtherPage();
	        }
	    },
	    renderBackButton: function () {
	        var canGoBack = this.state.location.length > 1;
	        var shouldShowBackButton = canGoBack && this.state.mode === "small";
	        return shouldShowBackButton ?
	            React.createElement("button", {style: {display: "inline-block"}, className: "win-backbutton", onClick: this.handleBack}) :
	            null;
	    },
	    render: function () {
	        var paneComponent = (
	            React.createElement("div", null, 
	                React.createElement(ReactWinJS.NavBarCommand, {
	                    label: "People", 
	                    icon: "contact", 
	                    onClick: this.handleCommandInvoked.bind(null, ["people"])}), 
	                React.createElement(ReactWinJS.NavBarCommand, {
	                    label: "What's New", 
	                    icon: "comment", 
	                    onClick: this.handleCommandInvoked.bind(null, ["new"])}), 
	                React.createElement(ReactWinJS.NavBarCommand, {
	                    label: "Groups", 
	                    icon: "people", 
	                    onClick: this.handleCommandInvoked.bind(null, ["groups"])}), 

	                React.createElement(ReactWinJS.NavBarCommand, {
	                    style: {position: "absolute", bottom: 0, width: "100%"}, 
	                    label: "Settings", 
	                    icon: "settings", 
	                    onClick: this.handleCommandInvoked.bind(null, ["settings"])})
	            )
	        );

	        var contentComponent = this.renderContent();

	        return (
	            React.createElement("div", {style: {height: "100%"}}, 
	                React.createElement("div", {style: {height: 48, backgroundColor: "rgb(1, 121, 216)"}, className: "win-ui-dark"}, 
	                    React.createElement(ReactWinJS.SplitViewPaneToggle, {
	                        "aria-controls": splitViewId, 
	                        style: {display:'inline-block'}, 
	                        paneOpened: this.state.paneOpened, 
	                        onInvoked: this.handleTogglePane}), 
	                    this.renderBackButton(), 
	                    React.createElement("h3", {className: "win-h3", style: {display: "inline-block", marginLeft: 5}}, "Address Book")
	                ), 
	                React.createElement(ReactWinJS.SplitView, React.__spread({
	                    id: splitViewId, 
	                    style: {height: "calc(100% - 48px)"}, 
	                    paneComponent: paneComponent, 
	                    contentComponent: contentComponent, 
	                    onAfterClose: this.handleAfterClose, 
	                    paneOpened: this.state.paneOpened}, 
	                    this.getSplitViewConfig()))
	            )
	        );
	    }
	});

	React.render(React.createElement(App, null), document.getElementById("app"));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(2);

	var urlToContent = {
	    "new": "What's New",
	    groups: "Groups",
	    settings: "Settings"
	};

	var OtherPage = React.createClass({displayName: "OtherPage",
	    propTypes: {
	        location: React.PropTypes.array.isRequired
	    },
	    render: function () {
	        var title = urlToContent[this.props.location] || "Other";
	        return React.createElement("h2", {className: "win-h2", style: {marginLeft: "10px"}}, title)
	    }
	});

	module.exports = OtherPage;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(2);

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
	        horizontal: {
	            type: "boolean"
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
	            type: "string"
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
	        groupInfo: {
	            name: "Function",
	            type: "reference",
	            typeArguments: []
	        },
	        horizontal: {
	            type: "boolean"
	        },
	        itemInfo: {
	            name: "Function",
	            type: "reference",
	            typeArguments: []
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
	            name: "HTMLDivElement",
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
	            name: "HTMLDivElement",
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
	        onContentAnimating: {
	            name: "Function",
	            type: "reference",
	            typeArguments: []
	        },
	        onGroupHeaderInvoked: {
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
	            type: "any"
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
	        onReceivingFocusOnKeyboardInput: {
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
	        isDeclarativeControlContainer: {
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

	            // TODO: Remove these visibility events after fixing https://github.com/winjs/winjs/issues/1105
	            onHeaderVisibilityChanged: PropHandlers.event,
	            onFooterVisibilityChanged: PropHandlers.event
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
	    NavBar: {
	        // The WinJS NavBar control doesn't come with a good mount point.
	        // App content and control content are siblings in NavBar.element.
	        // Consequently, if React rendered to NavBar.element, it would destroy
	        // some of NavBar's elements. To fix this, we give NavBar a div
	        // (className="win-react-navbar-mount-point") which will contain only
	        // app content. The React component renders into this div so it doesn't
	        // destroy any control content.
	        render: function (component) {
	            return React.DOM.div(null, React.DOM.div({ className: "win-react-navbar-mount-point" }));
	        },
	        propHandlers: {
	            opened: PropHandlers.focusProperty(React.PropTypes.bool),
	            children: PropHandlers.mountTo(function (winjsComponent) {
	                return winjsComponent.winControl.element.querySelector(".win-react-navbar-mount-point");
	            })
	        }
	    },
	    NavBarCommand: {
	        propHandlers: {
	            // TODO: Instead of special casing onClick, support DOM attributes
	            // more generically.
	            onClick: PropHandlers.domEvent
	        }
	    },
	    NavBarContainer: {
	        propHandlers: {
	            children: PropHandlers.syncChildrenWithBindingList("data")
	        }
	    },
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(2);
	var ReactWinJS = __webpack_require__(3);
	var ProfilePicture = __webpack_require__(5);

	function calc100PercentMinus(n) {
	    return n === 0 ?
	        "100%" :
	        "calc(100% - " + (n + "px") + ")";
	}

	var PeoplePage = React.createClass({displayName: "PeoplePage",
	    handleToggleSelectionMode: function () {
	        this.setState({
	            selectionMode: !this.state.selectionMode
	        });
	        this.props.onNavigate(["people"]);
	        this.refs.listView.winControl.selection.clear();
	    },
	    handleSelectionChanged: function (eventObject) {
	        var listView = eventObject.currentTarget.winControl;
	        var indices = listView.selection.getIndices();
	        // Post to avoid navigating while in the middle of the event handler
	        setTimeout(function () {
	            this.setState({ selectedPeople: indices });
	            this.props.onNavigate(indices.length === 1 && !this.state.selectionMode ? ["people", indices[0]] : ["people"]);
	        }.bind(this), 0);
	    },
	    handleDelete: function () {
	        var people = this.props.people;
	        var indices = this.state.selectedPeople;
	        indices.sort();
	        indices.reverse();
	        indices.forEach(function (i) {
	            people.splice(i, 1);
	        });
	        this.setState({
	            selectedPeople: [],
	            selectionMode: false
	        });
	        this.props.onPeopleChanged(people);
	    },
	    handleContentAnimating: function (eventObject) {
	        // Disable ListView's entrance animation
	        if (eventObject.detail.type === "entrance") {
	            eventObject.preventDefault();
	        }
	    },
	    personRenderer: ReactWinJS.reactRenderer(function (person) {
	        return (
	            React.createElement("div", null, 
	                React.createElement(ProfilePicture, {backgroundUrl: person.data.picture, size: 34}), 
	                React.createElement("span", {className: "name"}, person.data.name)
	            )
	        );
	    }),
	    groupHeaderRenderer: ReactWinJS.reactRenderer(function (item) {
	        return (
	            React.createElement("div", null, item.data.title)
	        );
	    }),
	    renderPeoplePane: function (peoplePaneWidth) {
	        var deleteCommand = (
	            React.createElement(ReactWinJS.ToolBar.Button, {
	                key: "delete", 
	                icon: "delete", 
	                priority: 0, 
	                disabled: this.state.selectedPeople.length === 0, 
	                onClick: this.handleDelete})
	        );

	        return (
	            React.createElement("div", {className: "peopleSearchPane", style: {height: "100%", width: peoplePaneWidth, display: "inline-block", verticalAlign:"top"}}, 
	                React.createElement(ReactWinJS.ToolBar, {className: "peopleToolBar"}, 
	                    React.createElement(ReactWinJS.ToolBar.Button, {
	                        key: "edit", 
	                        icon: "edit", 
	                        label: "Edit", 
	                        priority: 4}), 
	                    React.createElement(ReactWinJS.ToolBar.Button, {
	                        key: "favorite", 
	                        icon: "favorite", 
	                        label: "Favorite", 
	                        priority: 3}), 
	                    React.createElement(ReactWinJS.ToolBar.Button, {
	                        key: "link", 
	                        icon: "link", 
	                        label: "Link", 
	                        priority: 2}), 
	                    React.createElement(ReactWinJS.ToolBar.Button, {
	                        key: "refresh", 
	                        icon: "refresh", 
	                        label: "Refresh", 
	                        priority: 1}), 

	                    React.createElement(ReactWinJS.ToolBar.Button, {
	                        key: "add", 
	                        icon: "add", 
	                        label: "Add", 
	                        priority: 0}), 
	                    this.state.selectionMode ? deleteCommand : null, 
	                    React.createElement(ReactWinJS.ToolBar.Toggle, {
	                        key: "select", 
	                        icon: "bullets", 
	                        label: "Select", 
	                        priority: 0, 
	                        selected: this.state.selectionMode, 
	                        onClick: this.handleToggleSelectionMode})
	                ), 

	                React.createElement(ReactWinJS.ListView, {
	                    ref: "listView", 
	                    className: "peopleListView win-selectionstylefilled", 
	                    style: {height: "calc(100% - 48px)"}, 
	                    itemDataSource: this.props.people.dataSource, 
	                    itemTemplate: this.personRenderer, 
	                    groupDataSource: this.props.people.groups.dataSource, 
	                    groupHeaderTemplate: this.groupHeaderRenderer, 
	                    layout: this.state.layout, 
	                    selectionMode: this.state.selectionMode ? "multi" : "single", 
	                    tapBehavior: this.state.selectionMode ? "toggleSelect" : "directSelect", 
	                    onSelectionChanged: this.handleSelectionChanged, 
	                    onContentAnimating: this.handleContentAnimating})
	            )
	        );
	    },
	    renderProfilePane: function (selectedIndex, peoplePaneWidth) {
	        if (selectedIndex === null) {
	            return (
	                React.createElement("div", {className: "profilePane", style: {height: "100%", width: calc100PercentMinus(peoplePaneWidth), display: "inline-block",verticalAlign:"top"}}, 
	                    React.createElement("div", {style: {display: "flex", height: "100%", justifyContent: "center", alignItems: "center", flexDirection: "column"}}, 
	                        React.createElement("h1", {className: "win-h1", style: {color: "grey"}}, "No Selection")
	                    )
	                )
	            );
	        } else {
	            var selectedPerson = this.props.people.getAt(selectedIndex);
	            return (
	                React.createElement("div", {className: "profilePane", style: {height: "100%", width: calc100PercentMinus(peoplePaneWidth), display: "inline-block",verticalAlign:"top"}}, 
	                    React.createElement("div", {className: "profileHeader"}, 
	                        React.createElement("div", {className: "name"}, selectedPerson.name), 
	                        React.createElement("div", {className: "personInfo"}, 
	                            React.createElement(ProfilePicture, {backgroundUrl: selectedPerson.picture, size: 100}), 
	                            React.createElement("div", {className: "profileStatus"}, 
	                                React.createElement("span", {className: "message"}, 
	                                    selectedPerson.status
	                                ), 
	                                React.createElement("span", {className: "source"}, selectedPerson.statusHoursAgo, " hours ago")
	                            )
	                        )
	                    ), 
	                    React.createElement("div", {className: "separator"}), 
	                    React.createElement("div", {className: "profileContent"}, 
	                        React.createElement("ul", null, 
	                            React.createElement("li", null, React.createElement("span", {className: "messageIcon"}), "Message"), 
	                            React.createElement("li", null, 
	                                React.createElement("span", {className: "phoneIcon"}), 
	                                React.createElement("div", {className: "callContent"}, 
	                                    React.createElement("a", {href: "call:5550100"}, "Call Mobile"), 
	                                    React.createElement("div", {className: "number"}, selectedPerson.mobilePhone)
	                                )
	                            ), 
	                            React.createElement("li", null, 
	                                React.createElement("span", {className: "phoneIcon"}), 
	                                React.createElement("div", {className: "callContent"}, 
	                                    React.createElement("a", {href: "call:5550100"}, "Call Work"), 
	                                    React.createElement("div", {className: "number"}, selectedPerson.workPhone)
	                                )
	                            ), 
	                            React.createElement("li", null, React.createElement("span", {className: "phoneIcon"}), "Call using an app"), 
	                            React.createElement("li", null, React.createElement("span", {className: "videoCallIcon"}), "Video call"), 
	                            React.createElement("li", null, React.createElement("span", {className: "emailIcon"}), "Email work"), 
	                            React.createElement("li", null, React.createElement("span", {className: "mapIcon"}), "Map home")
	                        )
	                    )
	                )
	            );
	        }
	    },
	    propTypes: {
	        mode: React.PropTypes.oneOf(["small", "medium", "large"]).isRequired,
	        people: React.PropTypes.object.isRequired,
	        location: React.PropTypes.array.isRequired,
	        onNavigate: React.PropTypes.func.isRequired,
	        onPeopleChanged: React.PropTypes.func.isRequired
	    },
	    getInitialState: function () {
	        return {
	            layout: { type: WinJS.UI.ListLayout },
	            selectedPeople: [],
	            selectionMode: false
	        };
	    },
	    render: function () {
	        var selectedIndex = this.props.location.length >= 2 ? this.props.location[1] : null;

	        if (this.props.mode === "small") {
	            if (selectedIndex === null) {
	                return this.renderPeoplePane("100%");
	            } else {
	                return this.renderProfilePane(selectedIndex, 0);
	            }
	        } else {
	            var peoplePaneWidth = 320;
	            return (
	                React.createElement("div", {style: {height: "100%"}}, 
	                    this.renderPeoplePane(peoplePaneWidth), 
	                    this.renderProfilePane(selectedIndex, peoplePaneWidth)
	                )
	            );
	        }
	    }
	});

	module.exports = PeoplePage;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(2);

	function cssUrl(url) {
	    return "url(" + url + ")";
	}

	var ProfilePicture = React.createClass({displayName: "ProfilePicture",
	    render: function () {
	        var size = this.props.size;
	        return (
	            React.createElement("div", {className: "profilePicture", style: {
	                backgroundImage: cssUrl(this.props.backgroundUrl),
	                width: size,
	                height: size,
	                WebkitBorderRadius: size,
	                MozBorderRadius: size,
	                borderRadius: size,
	                backgroundSize: "cover",
	                display: "inline-block"
	            }}, 
	                React.createElement("img", {src: "profile.png", height: size, width: size})
	            )
	        );
	    }
	});

	module.exports = ProfilePicture;


/***/ },
/* 6 */
/***/ function(module, exports) {

	var nextPersonId = 0;
	var firstNames = ["Aaliyah","Aaron","Abigail","Adam","Addison","Adrian","Aiden","Alexa","Alexandra","Alexis","Alice","Allison","Alyssa","Amelia","Andrew","Angel","Anna","Annabelle","Anthony","Aria","Ariana","Arianna","Asher","Ashley","Aubree","Aubrey","Audrey","Austin","Autumn","Ava","Avery","Ayden","Bella","Benjamin","Bentley","Blake","Brandon","Brayden","Brianna","Brody","Brooklyn","Caleb","Camden","Cameron","Camila","Caroline","Carson","Carter","Charles","Charlotte","Chase","Chloe","Christian","Christopher","Claire","Colton","Connor","Cooper","Daniel","David","Dominic","Dylan","Easton","Eleanor","Eli","Elijah","Elizabeth","Ella","Ellie","Emily","Emma","Eva","Evan","Evelyn","Faith","Gabriel","Gabriella","Gavin","Genesis","Gianna","Grace","Grayson","Hadley","Hailey","Hannah","Harper","Henry","Hudson","Hunter","Ian","Isaac","Isabella","Isabelle","Isaiah","Jace","Jack","Jackson","Jasmine","Jason","Jaxon","Jaxson","Jayden","Jeremiah","John","Jonathan","Jordan","Jose","Joseph","Joshua","Josiah","Juan","Julia","Julian","Justin","Katherine","Kayden","Kaylee","Kennedy","Kevin","Khloe","Kylie","Landon","Lauren","Layla","Leah","Leo","Levi","Lillian","Lily","Lincoln","Logan","London","Lucas","Lucy","Luis","Luke","Lydia","Mackenzie","Madeline","Madelyn","Madison","Matthew","Maya","Melanie","Mia","Mila","Naomi","Natalie","Nathan","Nathaniel","Nevaeh","Nicholas","Nolan","Nora","Oliver","Olivia","Owen","Paisley","Parker","Penelope","Peyton","Piper","Riley","Robert","Ruby","Ryan","Ryder","Sadie","Samantha","Samuel","Sarah","Savannah","Scarlett","Sebastian","Serenity","Skylar","Sofia","Sophia","Sophie","Stella","Taylor","Thomas","Tristan","Tyler","Victoria","Violet","Vivian","Wyatt","Xavier","Zachary","Zoe","Zoey"];
	var lastNames = ["Avey", "Crofoot", "Flor", "Barletta", "Zoller", "Rosson", "Coomes", "Wilken", "Withey", "Ojeda", "Mennella", "Gauer", "Puccio", "Zimmerer", "Cottrell", "Bridgman", "Gershman", "Tinoco", "Ayoub", "Fournier", "Marcella", "Melrose", "Lafontaine", "Cathcart", "Cioffi", "Sands", "Lei", "Cardoso", "Dela", "Metcalfe", "Ethridge", "Fryer", "Warden", "Madson", "Gonsales", "Tobey", "Knecht", "Gallion", "Thibault", "Brockington", "Baney", "Haddox", "Kang", "Galyean", "Riccio", "Lake", "Mirabella", "Frechette", "Rearick", "Carmouche"];
	var loremIpsum = [
	    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
	    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur",
	    "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?",
	    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
	    "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.",
	];
	var statuses = [
	    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.",
	    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo.",
	    "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account.",
	    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.",
	    "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the."
	];

	var posterWidth = 400;
	var posterHeight = 400;
	var _canvas;
	function makePoster(color) {
	    if (!_canvas) {
	        _canvas = document.createElement("canvas");
	        _canvas.width = posterWidth;
	        _canvas.height = posterHeight;
	    }
	    var ctxt = _canvas.getContext("2d");
	    ctxt.fillStyle = color;
	    ctxt.fillRect(0, 0, posterWidth, posterHeight);
	    return _canvas.toDataURL();
	}

	var posterColors = [
	    [68, 34, 87], [100, 66, 119], [132, 98, 151],
	    [164, 162, 165], [196, 194, 197], [228, 226, 229],
	    [220, 77, 6], [252, 109, 38], [255, 141, 70]
	];
	var posters = posterColors.map(function (color) {
	    return makePoster("rgb(" + color.join(", ") + ")");
	});

	function randomInt(first, last) {
	    return Math.round(Math.random() * (last - first)) + first;
	}

	function randomElement(array) {
	    return array[randomInt(0, array.length - 1)];
	}

	function genArray(minLength, maxLength, genElement) {
	    var len = randomInt(minLength, maxLength);
	    var result = new Array(len);
	    for (var i = 0; i < len; i++) {
	        result[i] = genElement();
	    }
	    return result;
	}

	function genName() {
	    return randomElement(firstNames) + " " + randomElement(lastNames);
	}

	function genPhoneNumber() {
	    return "555-0" + randomInt(100, 199);
	}

	function genPerson() {
	    return {
	        id: nextPersonId++,
	        name: genName(),
	        status: randomElement(statuses),
	        statusHoursAgo: randomElement([2, 3, 4, 5, 6, 7, 8, 9]),
	        picture: randomElement(posters),
	        mobilePhone: genPhoneNumber(),
	        workPhone: genPhoneNumber()
	    };
	}

	var personCount = 50;
	var people = genArray(personCount, personCount, genPerson);

	module.exports = {
	    people: people
	};

/***/ }
/******/ ]);
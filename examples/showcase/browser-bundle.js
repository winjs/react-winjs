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

	var React = __webpack_require__(1);
	var ReactWinJS = __webpack_require__(23);

	// title is:
	//   - Displayed as the title of the sample
	//   - Used as the anchor ID of the sample
	//   - Used to find the path to the source code of the sample. Specifically:
	//     './examples/<title>.jsx'
	var examples = [
	    { title: "AppBar", componenent: __webpack_require__(2) },
	    { title: "AutoSuggestBox", componenent: __webpack_require__(3) },
	    { title: "BackButton", componenent: __webpack_require__(4) },
	    { title: "ContentDialog", componenent: __webpack_require__(5) },
	    { title: "DatePicker", componenent: __webpack_require__(6) },
	    { title: "FlipView", componenent: __webpack_require__(7) },
	    { title: "Flyout", componenent: __webpack_require__(8) },
	    { title: "Hub", componenent: __webpack_require__(9) },
	    { title: "ItemContainer", componenent: __webpack_require__(10) },
	    { title: "ListView", componenent: __webpack_require__(11) },
	    { title: "Menu", componenent: __webpack_require__(12) },
	    { title: "NavBar", componenent: __webpack_require__(13) },
	    { title: "Pivot", componenent: __webpack_require__(14) },
	    { title: "Rating", componenent: __webpack_require__(15) },
	    { title: "SearchBox", componenent: __webpack_require__(16) },
	    { title: "SemanticZoom", componenent: __webpack_require__(17) },
	    { title: "SplitView", componenent: __webpack_require__(18) },
	    { title: "TimePicker", componenent: __webpack_require__(19) },
	    { title: "ToggleSwitch", componenent: __webpack_require__(20) },
	    { title: "ToolBar", componenent: __webpack_require__(21) },
	    { title: "Tooltip", componenent: __webpack_require__(22) }
	];

	var baseSourceUrl = "https://github.com/winjs/react-winjs/tree/master/examples/" +
	    "showcase/examples/";
	var styles = {
	    viewport: { height: "100%", overflow: "auto" },
	    surface: { paddingBottom: 96 + 10 }, // Leave room for bottom AppBar/NavBar
	    example: { paddingBottom: 30 },
	    exampleTitle: { paddingBottom: 10 },
	    sourceLink: { paddingLeft: 5 }
	};

	var App = React.createClass({displayName: "App",
	    handleToggleAppBar: function (exampleTitle) {
	        this.setState({
	            exampleWithAppBar: this.state.exampleWithAppBar === exampleTitle ? null : exampleTitle
	        });
	    },
	    getInitialState: function () {
	        return {
	            // To prevent AppBars from occluding each other, only one example
	            // should show an AppBar at a time.
	            exampleWithAppBar: null
	        };
	    },
	    render: function() {
	        var tableOfContents = examples.map(function (example) {
	            return React.createElement("li", null, React.createElement("a", {href: "#" + example.title}, example.title));
	        });

	        var exampleMarkup = examples.map(function (example) {
	            var sourceUrl = baseSourceUrl + example.title + ".jsx";

	            return (
	                React.createElement("div", {style: styles.example, id: example.title, className: "example"}, 
	                    React.createElement("h3", {style: styles.exampleTitle}, 
	                        example.title, 
	                        React.createElement("a", {
	                            style: styles.sourceLink, 
	                            href: sourceUrl, 
	                            target: "_blank", 
	                            className: "win-type-x-small"}, 
	                            "(view source)"
	                        )
	                    ), 
	                    React.createElement(example.componenent, {
	                        appBarShown: this.state.exampleWithAppBar === example.title, 
	                        onToggleAppBar: this.handleToggleAppBar.bind(null, example.title)})
	                )
	            );
	        }, this);

	        return (
	            React.createElement("div", {className: "viewport", style: styles.viewport}, 
	                React.createElement("div", {className: "surface", style: styles.surface}, 
	                    React.createElement("h1", null, React.createElement("a", {href: "https://github.com/winjs/react-winjs"}, "react-winjs"), " Control Showcase"), 

	                    React.createElement("h3", null, "Table of Contents"), 
	                    React.createElement("ul", null, tableOfContents), 

	                    exampleMarkup
	                )
	            )
	        );
	    }
	});

	React.render(React.createElement(App, null), document.getElementById("app"));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(1);
	var ReactWinJS = __webpack_require__(23);

	module.exports = React.createClass({displayName: "exports",
	    handleUpdateResult: function (result) {
	        this.setState({ result: result });
	    },
	    handleToggleMe: function (eventObject) {
	        var toggleCommand = eventObject.currentTarget.winControl;
	        this.setState({ toggleSelected: toggleCommand.selected });
	    },
	    getInitialState: function () {
	        return {
	            toolBarIsSmall: false,
	            result: null,
	            toggleSelected: true
	        };
	    },
	    render: function () {
	        var subMenu = (
	            React.createElement(ReactWinJS.Menu, null, 
	                React.createElement(ReactWinJS.Menu.Button, {
	                    key: "chooseMeA", 
	                    label: "Or Choose Me", 
	                    onClick: this.handleUpdateResult.bind(null, "Or Choose Me")}), 
	                React.createElement(ReactWinJS.Menu.Button, {
	                    key: "chooseMeB", 
	                    label: "No, Choose Me!", 
	                    onClick: this.handleUpdateResult.bind(null, "No, Choose Me!")})
	            )
	        );

	        var appBar = (
	            React.createElement(ReactWinJS.AppBar, null, 

	                    React.createElement(ReactWinJS.AppBar.ContentCommand, {
	                        key: "content", 
	                        icon: "accept", 
	                        label: "Accept"}, 
	                        React.createElement("input", {className: "win-interactive", type: "text"})
	                    ), 

	                    React.createElement(ReactWinJS.AppBar.Separator, {key: "separator"}), 

	                    React.createElement(ReactWinJS.AppBar.Button, {
	                        key: "chooseMe", 
	                        icon: "add", 
	                        label: "Choose Me", 
	                        onClick: this.handleUpdateResult.bind(null, "Choose Me")}), 

	                    React.createElement(ReactWinJS.AppBar.Toggle, {
	                        key: "toggleMe", 
	                        icon: "accept", 
	                        label: "Toggle Me", 
	                        selected: this.state.toggleSelected, 
	                        onClick: this.handleToggleMe}), 

	                    React.createElement(ReactWinJS.AppBar.FlyoutCommand, {
	                        key: "flyout", 
	                        icon: "up", 
	                        label: "Flyout", 
	                        flyoutComponent: subMenu}), 

	                    React.createElement(ReactWinJS.AppBar.Button, {
	                        key: "orMe", 
	                        section: "secondary", 
	                        label: "Or Me", 
	                        onClick: this.handleUpdateResult.bind(null, "Or Choose Me")}), 

	                    React.createElement(ReactWinJS.AppBar.Button, {
	                        key: "noMe", 
	                        section: "secondary", 
	                        label: "No Me!", 
	                        onClick: this.handleUpdateResult.bind(null, "No Me!")})

	                )
	        );

	        return (
	            React.createElement("div", null, 
	                React.createElement("p", null, "This AppBar renders at the bottom of the screen."), 
	                React.createElement("p", null, "Resize your window. Notice how the AppBar puts commands into an" + ' ' +
	                "overflow menu when it can't fit them in the primary area. You can" + ' ' +
	                "control what gets overflowed first using the ", React.createElement("code", null, "priority"), " prop"), 
	                React.createElement("button", {onClick: this.props.onToggleAppBar}, 
	                    this.props.appBarShown ? "Hide" : "Show", " AppBar"
	                ), 
	                React.createElement("p", null, "Clicked command: ", this.state.result || "<null>"), 
	                React.createElement("p", null, "Toggle selected: ", this.state.toggleSelected.toString()), 
	                this.props.appBarShown ? appBar : null
	            )
	        );
	    }
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(1);
	var ReactWinJS = __webpack_require__(23);

	var suggestionList = ["Shanghai", "Istanbul", "Karachi", "Delhi", "Mumbai", "Moscow", "Seoul", "Beijing", "Jakarta",
	"Tokyo", "Mexico City", "Kinshasa", "New York City", "Lagos", "London", "Lima", "Bogota", "Tehran", "Ho Chi Minh City", "Hong Kong",
	"Bangkok", "Dhaka", "Cairo", "Hanoi", "Rio de Janeiro", "Lahore", "Chonquing", "Bengaluru", "Tianjin", "Baghdad", "Riyadh", "Singapore",
	"Santiago", "Saint Petersburg", "Surat", "Chennai", "Kolkata", "Yangon", "Guangzhou", "Alexandria", "Shenyang", "Hyderabad", "Ahmedabad",
	"Ankara", "Johannesburg", "Wuhan", "Los Angeles", "Yokohama", "Abidjan", "Busan", "Cape Town", "Durban", "Pune", "Jeddah", "Berlin",
	"Pyongyang", "Kanpur", "Madrid", "Jaipur", "Nairobi", "Chicago", "Houston", "Philadelphia", "Phoenix", "San Antonio", "San Diego",
	"Dallas", "San Jose", "Jacksonville", "Indianapolis", "San Francisco", "Austin", "Columbus", "Fort Worth", "Charlotte", "Detroit",
	"El Paso", "Memphis", "Baltimore", "Boston", "Seattle Washington", "Nashville", "Denver", "Louisville", "Milwaukee", "Portland",
	"Las Vegas", "Oklahoma City", "Albuquerque", "Tucson", "Fresno", "Sacramento", "Long Beach", "Kansas City", "Mesa", "Virginia Beach",
	"Atlanta", "Colorado Springs", "Omaha", "Raleigh", "Miami", "Cleveland", "Tulsa", "Oakland", "Minneapolis", "Wichita", "Arlington",
	"Bakersfield", "New Orleans", "Honolulu", "Anaheim", "Tampa", "Aurora", "Santa Ana", "St. Louis", "Pittsburgh", "Corpus Christi",
	"Riverside", "Cincinnati", "Lexington", "Anchorage", "Stockton", "Toledo", "St. Paul", "Newark", "Greensboro", "Buffalo", "Plano",
	"Lincoln", "Henderson", "Fort Wayne", "Jersey City", "St. Petersburg", "Chula Vista", "Norfolk", "Orlando", "Chandler", "Laredo", "Madison",
	"Winston-Salem", "Lubbock", "Baton Rouge", "Durham", "Garland", "Glendale", "Reno", "Hialeah", "Chesapeake", "Scottsdale", "North Las Vegas",
	"Irving", "Fremont", "Irvine", "Birmingham", "Rochester", "San Bernardino", "Spokane", "Toronto", "Montreal", "Vancouver", "Ottawa-Gatineau",
	"Calgary", "Edmonton", "Quebec City", "Winnipeg", "Hamilton"];

	module.exports = React.createClass({displayName: "exports",
	    handleSuggestionsRequested: function (eventObject) {
	        var queryText = eventObject.detail.queryText,
	            query = queryText.toLowerCase(),
	            suggestionCollection = eventObject.detail.searchSuggestionCollection;

	        if (queryText.length > 0) {
	            for (var i = 0, len = suggestionList.length; i < len; i++) {
	                if (suggestionList[i].substr(0, query.length).toLowerCase() === query) {
	                    suggestionCollection.appendQuerySuggestion(suggestionList[i]);
	                }
	            }
	        }
	    },
	    handleQuerySubmitted: function (eventObject) {
	        this.setState({ query: eventObject.detail.queryText });
	    },
	    getInitialState: function () {
	        return {
	            query: null
	        };
	    },
	    render: function () {
	        return (
	            React.createElement("div", null, 
	                React.createElement(ReactWinJS.AutoSuggestBox, {
	                    placeholderText: "Type a city", 
	                    onSuggestionsRequested: this.handleSuggestionsRequested, 
	                    onQuerySubmitted: this.handleQuerySubmitted}), 

	                React.createElement("p", null, "Submitted Query: ", this.state.query || "<null>")
	            )
	        );
	    }
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(1);
	var ReactWinJS = __webpack_require__(23);

	module.exports = React.createClass({displayName: "exports",
	    render: function () {
	        return (
	            React.createElement(ReactWinJS.BackButton, null)
	        );
	    }
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(1);
	var ReactWinJS = __webpack_require__(23);

	module.exports = React.createClass({displayName: "exports",
	    handleShow: function () {
	        this.refs.dialog.winControl.show().then(function (eventObject) {
	            this.setState({ dialogResult: eventObject.result });
	        }.bind(this));
	    },
	    getInitialState: function () {
	        return {
	            dialogResult: null
	        };
	    },
	    render: function () {
	        return (
	            React.createElement("div", null, 
	                React.createElement("p", null, "Dialog Result: ", this.state.dialogResult || "<null>"), 
	                React.createElement("button", {onClick: this.handleShow}, "Show ContentDialog"), 

	                React.createElement(ReactWinJS.ContentDialog, {
	                    ref: "dialog", 
	                    title: "Urgent Message", 
	                    primaryCommandText: "OK", 
	                    secondaryCommandText: "Cancel"}, 
	                    React.createElement("div", null, 
	                        "This content will appear in the body of the ContentDialog. You can put ", React.createElement("i", null, "arbitrary"), " HTML in here."
	                    )
	                )
	            )
	        );
	    }
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(1);
	var ReactWinJS = __webpack_require__(23);

	module.exports = React.createClass({displayName: "exports",
	    handleDateChange: function (eventObject) {
	        var datePicker = eventObject.currentTarget.winControl;
	        this.setState({ date: datePicker.current });
	    },
	    getInitialState: function () {
	        return {
	            date: new Date()
	        };
	    },
	    render: function () {
	        return (
	            React.createElement("div", null, 
	                React.createElement("p", null, "Date: ", this.state.date.toDateString()), 
	                React.createElement(ReactWinJS.DatePicker, {
	                    current: this.state.date, 
	                    onChange: this.handleDateChange, 
	                    minYear: 1980, 
	                    maxYear: 2050})
	            )
	        );
	    }
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(1);
	var ReactWinJS = __webpack_require__(23);

	module.exports = React.createClass({displayName: "exports",
	    flipViewItemRenderer: ReactWinJS.reactRenderer(function (item) {
	        return (
	            React.createElement("div", {style: {height: "200px"}}, 
	                "The rating of this flip view item is: ", item.data.rating
	            )
	        );
	    }),
	    getInitialState: function () {
	        return {
	            ratingsList: new WinJS.Binding.List([
	                { rating: 4 },
	                { rating: 2 }
	            ])
	        };
	    },
	    render: function () {
	        return (
	            React.createElement(ReactWinJS.FlipView, {
	                style: {height: "200px", width: "200px"}, 
	                itemDataSource: this.state.ratingsList.dataSource, 
	                itemTemplate: this.flipViewItemRenderer})
	        );
	    }
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(1);
	var ReactWinJS = __webpack_require__(23);

	module.exports = React.createClass({displayName: "exports",
	    handleShow: function (eventObject) {
	        var anchor = eventObject.currentTarget;
	        this.refs.flyout.winControl.show(anchor);
	    },
	    getInitialState: function () {
	        return {
	            dialogResult: null
	        };
	    },
	    render: function () {
	        var dialogResult = this.state.dialogResult ?
	            React.createElement("div", null, "Dialog Result: ", this.state.dialogResult) :
	            null;

	        return (
	            React.createElement("div", null, 
	                React.createElement("button", {onClick: this.handleShow}, "Show Flyout"), 

	                React.createElement(ReactWinJS.Flyout, {
	                    ref: "flyout"}, 
	                    React.createElement("div", null, "This is the flyout content!!")
	                )
	            )
	        );
	    }
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(1);
	var ReactWinJS = __webpack_require__(23);

	module.exports = React.createClass({displayName: "exports",
	    handleHeaderInvoked: function (eventObject) {
	        if (eventObject.detail.index === 1) {
	            this.setState({ counter: this.state.counter + 1 });
	        }
	    },
	    getInitialState: function () {
	        return {
	            counter: 0
	        };
	    },
	    render: function () {
	        return (
	            React.createElement(ReactWinJS.Hub, {
	                style: {height: "500px"}, 
	                onHeaderInvoked: this.handleHeaderInvoked}, 
	                React.createElement(ReactWinJS.Hub.Section, {
	                    key: "sectionA", 
	                    header: "First section", 
	                    isHeaderStatic: true}, 
	                    React.createElement("div", null, "Hubs are useful for varied content.")
	                ), 
	                React.createElement(ReactWinJS.Hub.Section, {key: "sectionB", header: "The second section"}, 
	                    React.createElement("div", null, 
	                        "This section's header was clicked ", this.state.counter, " time(s)." + ' ' +
	                        "This hub is boring."
	                    )
	                ), 
	                React.createElement(ReactWinJS.Hub.Section, {key: "sectionC", header: "The tail"}, 
	                    React.createElement("div", null, "Because it's only purpose is to show how to create a hub.")
	                )
	            )
	        );
	    }
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(1);
	var ReactWinJS = __webpack_require__(23);

	module.exports = React.createClass({displayName: "exports",
	    handleSelectionChanged: function (eventObject) {
	        var itemContainer = eventObject.currentTarget.winControl;
	        this.setState({ selected: itemContainer.selected });
	    },
	    getInitialState: function () {
	        return {
	            selected: true
	        };
	    },
	    render: function () {
	        return (
	            React.createElement(ReactWinJS.ItemContainer, {
	                style: {margin: "5px", height: "80px", width: "252px"}, 
	                tapBehavior: "toggleSelect", 
	                selected: this.state.selected, 
	                onSelectionChanged: this.handleSelectionChanged}, 
	                React.createElement("div", {style: {padding: "5px"}}, 
	                    React.createElement("h4", null, "Marvelous Mint"), 
	                    React.createElement("h6", null, "Gelato"), 
	                    "Selected: ", this.state.selected.toString()
	                )
	            )
	        );
	    }
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(1);
	var ReactWinJS = __webpack_require__(23);

	// See CSS styles for win-container in index.html

	module.exports = React.createClass({displayName: "exports",
	    itemRenderer: ReactWinJS.reactRenderer(function (item) {
	        return React.createElement("div", null, item.data.title);
	    }),
	    getInitialState: function () {
	        return {
	            list: new WinJS.Binding.List([
	                { title: "Apple" },
	                { title: "Banana" },
	                { title: "Grape" },
	                { title: "Lemon" },
	                { title: "Mint" },
	                { title: "Orange" },
	                { title: "Pineapple" },
	                { title: "Strawberry"}
	            ]),
	            layout: { type: WinJS.UI.ListLayout }
	        };
	    },
	    render: function () {
	        return (
	            React.createElement(ReactWinJS.ListView, {
	                className: "listViewExample win-selectionstylefilled", 
	                style: {height: "200px"}, 
	                itemDataSource: this.state.list.dataSource, 
	                itemTemplate: this.itemRenderer, 
	                layout: this.state.layout, 
	                selectionMode: "single", 
	                tapBehavior: "directSelect"})
	        );
	    }
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(1);
	var ReactWinJS = __webpack_require__(23);

	module.exports = React.createClass({displayName: "exports",
	    handleShowMenu: function (eventObject) {
	        var anchor = eventObject.currentTarget;
	        this.refs.menu.winControl.show(anchor);
	    },
	    handleUpdateResult: function (result) {
	        this.setState({ result: result });
	    },
	    handleToggleMe: function (eventObject) {
	        var toggleCommand = eventObject.currentTarget.winControl;
	        this.setState({ toggleSelected: toggleCommand.selected });
	    },
	    getInitialState: function () {
	        return {
	            result: null,
	            toggleSelected: true
	        };
	    },
	    render: function () {
	        var subMenu = (
	            React.createElement(ReactWinJS.Menu, null, 
	                React.createElement(ReactWinJS.Menu.Button, {
	                    key: "chooseMeA", 
	                    label: "Or Choose Me", 
	                    onClick: this.handleUpdateResult.bind(null, "Or Choose Me")}), 
	                React.createElement(ReactWinJS.Menu.Button, {
	                    key: "chooseMeB", 
	                    label: "No, Choose Me!", 
	                    onClick: this.handleUpdateResult.bind(null, "No, Choose Me!")})
	            )
	        );

	        return (
	            React.createElement("div", null, 
	                React.createElement("button", {onClick: this.handleShowMenu}, "Show Menu"), 
	                React.createElement("p", null, "Clicked command: ", this.state.result || "<null>"), 
	                React.createElement("p", null, "Toggle selected: ", this.state.toggleSelected.toString()), 
	                
	                React.createElement(ReactWinJS.Menu, {ref: "menu"}, 

	                    React.createElement(ReactWinJS.Menu.Button, {
	                        key: "chooseMe", 
	                        label: "Choose Me", 
	                        onClick: this.handleUpdateResult.bind(null, "Choose Me")}), 

	                    React.createElement(ReactWinJS.Menu.Toggle, {
	                        key: "toggleMe", 
	                        label: "Toggle Me", 
	                        selected: this.state.toggleSelected, 
	                        onClick: this.handleToggleMe}), 

	                    React.createElement(ReactWinJS.Menu.Separator, {key: "separator"}), 

	                    React.createElement(ReactWinJS.Menu.FlyoutCommand, {
	                        key: "more", 
	                        label: "More", 
	                        flyoutComponent: subMenu})

	                )
	            )
	        );
	    }
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(1);
	var ReactWinJS = __webpack_require__(23);

	module.exports = React.createClass({displayName: "exports",
	    handleCommandInvoked: function (eventObject) {
	        var navbarCommand = eventObject.detail.navbarCommand;
	        this.setState({ result: navbarCommand.label });
	    },
	    getInitialState: function () {
	        return {
	            result: null
	        };
	    },
	    render: function () {
	        var navBar = (
	            React.createElement(ReactWinJS.NavBar, {placement: "bottom"}, 
	                React.createElement(ReactWinJS.NavBarContainer, {onInvoked: this.handleCommandInvoked}, 
	                    React.createElement(ReactWinJS.NavBarCommand, {
	                        key: "favorite", 
	                        label: "Favorite", 
	                        icon: "favorite"}), 
	                     React.createElement(ReactWinJS.NavBarCommand, {
	                        key: "delete", 
	                        label: "Delete", 
	                        icon: "delete"}), 
	                    React.createElement(ReactWinJS.NavBarCommand, {
	                        key: "music", 
	                        label: "Music", 
	                        icon: "audio"}), 
	                    React.createElement(ReactWinJS.NavBarCommand, {
	                        key: "edit", 
	                        label: "Edit", 
	                        icon: "edit"}), 
	                    React.createElement(ReactWinJS.NavBarCommand, {
	                        key: "settings", 
	                        label: "Settings", 
	                        icon: "settings"})
	                )
	            )
	        );

	        return (
	            React.createElement("div", null, 
	                React.createElement("p", null, "This NavBar renders at the bottom of the screen."), 
	                React.createElement("button", {onClick: this.props.onToggleAppBar}, 
	                    this.props.appBarShown ? "Hide" : "Show", " NavBar"
	                ), 
	                React.createElement("p", null, "Invoked command: ", this.state.result || "<null>"), 
	                this.props.appBarShown ? navBar : null
	            )
	        );
	    }
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(1);
	var ReactWinJS = __webpack_require__(23);

	module.exports = React.createClass({displayName: "exports",
	    render: function () {
	        return (
	            React.createElement(ReactWinJS.Pivot, {style: {height: "100px"}}, 
	                React.createElement(ReactWinJS.Pivot.Item, {key: "itemA", header: "First"}, 
	                    React.createElement("div", null, "Pivots are useful for varied content.")
	                ), 
	                React.createElement(ReactWinJS.Pivot.Item, {key: "itemB", header: "Second"}, 
	                    React.createElement("div", null, "This pivot is boring.")
	                ), 
	                React.createElement(ReactWinJS.Pivot.Item, {key: "itemC", header: "Tail..."}, 
	                    React.createElement("div", null, "Because it's only purpose is to show how to create a pivot.")
	                )
	            )
	        );
	    }
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(1);
	var ReactWinJS = __webpack_require__(23);

	module.exports = React.createClass({displayName: "exports",
	    handleChangeRating: function (eventObject) {
	        var ratingControl = eventObject.currentTarget.winControl;
	        this.setState({ rating: ratingControl.userRating });
	    },
	    handleAddToRating: function (amount) {
	        this.setState({ rating: this.state.rating + amount });
	    },
	    getInitialState: function () {
	        return {
	            rating: 0
	        };
	    },
	    render: function () {
	        return (
	            React.createElement("div", null, 
	                React.createElement("div", null, 
	                    React.createElement("button", {onClick: this.handleAddToRating.bind(null, -1)}, "-1"), 
	                    React.createElement("button", {onClick: this.handleAddToRating.bind(null, 1)}, "+1")
	                ), 
	                React.createElement("p", null, "Current Rating: ", this.state.rating), 

	                React.createElement(ReactWinJS.Rating, {
	                    userRating: this.state.rating, 
	                    maxRating: 8, 
	                    onChange: this.handleChangeRating})
	            )
	        );
	    }
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(1);
	var ReactWinJS = __webpack_require__(23);

	var suggestionList = ["Shanghai", "Istanbul", "Karachi", "Delhi", "Mumbai", "Moscow", "Seoul", "Beijing", "Jakarta",
	"Tokyo", "Mexico City", "Kinshasa", "New York City", "Lagos", "London", "Lima", "Bogota", "Tehran", "Ho Chi Minh City", "Hong Kong",
	"Bangkok", "Dhaka", "Cairo", "Hanoi", "Rio de Janeiro", "Lahore", "Chonquing", "Bengaluru", "Tianjin", "Baghdad", "Riyadh", "Singapore",
	"Santiago", "Saint Petersburg", "Surat", "Chennai", "Kolkata", "Yangon", "Guangzhou", "Alexandria", "Shenyang", "Hyderabad", "Ahmedabad",
	"Ankara", "Johannesburg", "Wuhan", "Los Angeles", "Yokohama", "Abidjan", "Busan", "Cape Town", "Durban", "Pune", "Jeddah", "Berlin",
	"Pyongyang", "Kanpur", "Madrid", "Jaipur", "Nairobi", "Chicago", "Houston", "Philadelphia", "Phoenix", "San Antonio", "San Diego",
	"Dallas", "San Jose", "Jacksonville", "Indianapolis", "San Francisco", "Austin", "Columbus", "Fort Worth", "Charlotte", "Detroit",
	"El Paso", "Memphis", "Baltimore", "Boston", "Seattle Washington", "Nashville", "Denver", "Louisville", "Milwaukee", "Portland",
	"Las Vegas", "Oklahoma City", "Albuquerque", "Tucson", "Fresno", "Sacramento", "Long Beach", "Kansas City", "Mesa", "Virginia Beach",
	"Atlanta", "Colorado Springs", "Omaha", "Raleigh", "Miami", "Cleveland", "Tulsa", "Oakland", "Minneapolis", "Wichita", "Arlington",
	"Bakersfield", "New Orleans", "Honolulu", "Anaheim", "Tampa", "Aurora", "Santa Ana", "St. Louis", "Pittsburgh", "Corpus Christi",
	"Riverside", "Cincinnati", "Lexington", "Anchorage", "Stockton", "Toledo", "St. Paul", "Newark", "Greensboro", "Buffalo", "Plano",
	"Lincoln", "Henderson", "Fort Wayne", "Jersey City", "St. Petersburg", "Chula Vista", "Norfolk", "Orlando", "Chandler", "Laredo", "Madison",
	"Winston-Salem", "Lubbock", "Baton Rouge", "Durham", "Garland", "Glendale", "Reno", "Hialeah", "Chesapeake", "Scottsdale", "North Las Vegas",
	"Irving", "Fremont", "Irvine", "Birmingham", "Rochester", "San Bernardino", "Spokane", "Toronto", "Montreal", "Vancouver", "Ottawa-Gatineau",
	"Calgary", "Edmonton", "Quebec City", "Winnipeg", "Hamilton"];

	module.exports = React.createClass({displayName: "exports",
	    handleSuggestionsRequested: function (eventObject) {
	        var queryText = eventObject.detail.queryText,
	            query = queryText.toLowerCase(),
	            suggestionCollection = eventObject.detail.searchSuggestionCollection;

	        if (queryText.length > 0) {
	            for (var i = 0, len = suggestionList.length; i < len; i++) {
	                if (suggestionList[i].substr(0, query.length).toLowerCase() === query) {
	                    suggestionCollection.appendQuerySuggestion(suggestionList[i]);
	                }
	            }
	        }
	    },
	    handleQuerySubmitted: function (eventObject) {
	        this.setState({ query: eventObject.detail.queryText });
	    },
	    getInitialState: function () {
	        return {
	            query: null
	        };
	    },
	    render: function () {
	        return (
	            React.createElement("div", null, 
	                React.createElement(ReactWinJS.SearchBox, {
	                    placeholderText: "Type a city", 
	                    onSuggestionsRequested: this.handleSuggestionsRequested, 
	                    onQuerySubmitted: this.handleQuerySubmitted}), 

	                React.createElement("p", null, "Submitted Query: ", this.state.query || "<null>")
	            )
	        );
	    }
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(1);
	var ReactWinJS = __webpack_require__(23);

	// See CSS styles for win-container in index.html

	function groupKey(item) {
	    return item.title[0];
	}

	function groupData(item) {
	    return { title: item.title[0] };
	}

	module.exports = React.createClass({displayName: "exports",
	    itemRenderer: ReactWinJS.reactRenderer(function (item) {
	        return React.createElement("div", null, item.data.title);
	    }),
	    groupHeaderRenderer: ReactWinJS.reactRenderer(function (item) {
	        return React.createElement("div", null, item.data);
	    }),
	    handleToggleZoom: function (eventObject) {
	        this.setState({ zoomedOut: !this.state.zoomedOut });
	    },
	    handleZoomChanged: function (eventObject) {
	        this.setState({ zoomedOut: eventObject.detail });
	    },
	    getInitialState: function () {
	        return {
	            list: new WinJS.Binding.List([
	                { title: "Aaron" },
	                { title: "Adam" },
	                { title: "Allison" },
	                { title: "Barry" },
	                { title: "Bill" },
	                { title: "Brad" },
	                { title: "Bridget" },
	                { title: "Brett" },
	                { title: "Carly" },
	                { title: "Carol" },
	                { title: "Charles" },
	                { title: "Chris" },
	                { title: "Daisy" },
	                { title: "Dan" },
	                { title: "Denise" },
	                { title: "Derek" },
	                { title: "Earl" },
	                { title: "Emily" },
	                { title: "Emma" },
	                { title: "Erika" },
	                { title: "Ethan" },
	                { title: "Finley" },
	                { title: "Florence" },
	                { title: "Frank" },
	                { title: "Fred" }
	                
	            ]).createGrouped(groupKey, groupData),
	            layout: { type: WinJS.UI.ListLayout },
	            zoomedOut: false
	        };
	    },
	    render: function () {
	        var zoomedInView = React.createElement(ReactWinJS.ListView, {
	            className: "listViewExample win-selectionstylefilled", 
	            itemDataSource: this.state.list.dataSource, 
	            itemTemplate: this.itemRenderer, 
	            groupDataSource: this.state.list.groups.dataSource, 
	            groupHeaderTemplate: this.groupHeaderRenderer, 
	            layout: this.state.layout, 
	            selectionMode: "single", 
	            tapBehavior: "directSelect"});

	        var zoomedOutView = React.createElement(ReactWinJS.ListView, {
	            className: "listViewExample", 
	            itemDataSource: this.state.list.groups.dataSource, 
	            itemTemplate: this.itemRenderer, 
	            layout: this.state.layout});

	        return (
	            React.createElement("div", null, 
	                React.createElement("button", {onClick: this.handleToggleZoom}, 
	                    "Zoom ", this.state.zoomedOut ? "In" : "Out"
	                ), 
	                React.createElement(ReactWinJS.SemanticZoom, {
	                    style: {height: "400px"}, 
	                    zoomedInComponent: zoomedInView, 
	                    zoomedOutComponent: zoomedOutView, 
	                    zoomedOut: this.state.zoomedOut, 
	                    onZoomChanged: this.handleZoomChanged})
	            )
	        );
	            
	    }
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(1);
	var ReactWinJS = __webpack_require__(23);

	// Also see CSS styles in index.html.

	var SplitViewButton = React.createClass({displayName: "SplitViewButton",
	    render: function () {
	        return (
	            React.createElement("button", {
	                onClick: this.props.onClick, 
	                type: "button", 
	                className: "win-splitview-button"})
	        );
	    }
	});

	module.exports = React.createClass({displayName: "exports",
	    handleTogglePane: function () {
	        var splitView = this.refs.splitView.winControl;
	        splitView.paneHidden = !splitView.paneHidden;
	    },
	    handleChangeContent: function (newContent) {
	        this.setState({ content: newContent });
	        this.refs.splitView.winControl.paneHidden = true;
	    },
	    getInitialState: function () {
	        return {
	            content: "Home"
	        };
	    },
	    render: function () {
	        var paneComponent = (
	            React.createElement("div", {ref: "pane"}, 
	                React.createElement("div", null, 
	                    React.createElement(SplitViewButton, {onClick: this.handleTogglePane})
	                ), 

	                React.createElement(ReactWinJS.NavBarCommand, {
	                    label: "Home", 
	                    icon: "home", 
	                    onClick: this.handleChangeContent.bind(null, "Home")}), 
	                React.createElement(ReactWinJS.NavBarCommand, {
	                    label: "Favorite", 
	                    icon: "favorite", 
	                    onClick: this.handleChangeContent.bind(null, "Favorite")}), 
	                React.createElement(ReactWinJS.NavBarCommand, {
	                    label: "Settings", 
	                    icon: "settings", 
	                    onClick: this.handleChangeContent.bind(null, "Settings")})
	            )
	        );
	        var contentComponent = (
	            React.createElement("h2", {style: {marginLeft: "10px"}}, this.state.content)
	        );

	        return (
	            React.createElement(ReactWinJS.SplitView, {
	                ref: "splitView", 
	                style: {height: "300px"}, 
	                paneComponent: paneComponent, 
	                contentComponent: contentComponent})
	        );
	    }
	});

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(1);
	var ReactWinJS = __webpack_require__(23);

	function formattedTime(time) {
	    var rawHours = time.getHours();
	    var amPM = rawHours < 12 ? "AM" : "PM";
	    var hours = rawHours < 12 ? rawHours : (rawHours - 12);
	    hours = hours === 0 ? 12 : hours;
	    var rawMinutes = time.getMinutes();
	    var minutes = (rawMinutes < 10 ? "0" : "") + rawMinutes;

	    return hours + ":" + minutes + " " + amPM;
	}

	module.exports = React.createClass({displayName: "exports",
	    handleTimeChange: function (eventObject) {
	        var timePicker = eventObject.currentTarget.winControl;
	        this.setState({ time: timePicker.current });
	    },
	    getInitialState: function () {
	        return {
	            time: new Date()
	        };
	    },
	    render: function () {
	        return (
	            React.createElement("div", null, 
	                React.createElement("p", null, "Time: ", formattedTime(this.state.time)), 

	                React.createElement(ReactWinJS.TimePicker, {
	                    current: this.state.time, 
	                    onChange: this.handleTimeChange})
	            )
	        );
	    }
	});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(1);
	var ReactWinJS = __webpack_require__(23);

	module.exports = React.createClass({displayName: "exports",
	    handleToggle: function (eventObject) {
	        var toggleCommand = eventObject.currentTarget.winControl;
	        this.setState({ toggleSelected: toggleCommand.checked });
	    },
	    getInitialState: function () {
	        return {
	            toggleSelected: false
	        };
	    },
	    render: function () {
	        return (
	            React.createElement("div", null, 
	                React.createElement("p", null, "Toggle selected: ", this.state.toggleSelected.toString()), 
	                
	                React.createElement(ReactWinJS.ToggleSwitch, {
	                    checked: this.state.toggleSelected, 
	                    onChange: this.handleToggle, 
	                    labelOn: "Switch is On", 
	                    labelOff: "Switch is Off"})
	            )
	        );
	    }
	});

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(1);
	var ReactWinJS = __webpack_require__(23);

	module.exports = React.createClass({displayName: "exports",
	    handleToggleToolBarSize: function () {
	        this.setState({ toolBarIsSmall: !this.state.toolBarIsSmall });
	    },
	    handleUpdateResult: function (result) {
	        this.setState({ result: result });
	    },
	    handleToggleMe: function (eventObject) {
	        var toggleCommand = eventObject.currentTarget.winControl;
	        this.setState({ toggleSelected: toggleCommand.selected });
	    },
	    getInitialState: function () {
	        return {
	            toolBarIsSmall: false,
	            result: null,
	            toggleSelected: true
	        };
	    },
	    componentDidUpdate: function (prevProps, prevState) {
	        if (this.state.toolBarIsSmall !== prevState.toolBarIsSmall) {
	            // Notify the ToolBar that is has been resized.
	            this.refs.toolBar.winControl.forceLayout();
	        }
	    },
	    render: function () {
	        var subMenu = (
	            React.createElement(ReactWinJS.Menu, null, 
	                React.createElement(ReactWinJS.Menu.Button, {
	                    key: "chooseMeA", 
	                    label: "Or Choose Me", 
	                    onClick: this.handleUpdateResult.bind(null, "Or Choose Me")}), 
	                React.createElement(ReactWinJS.Menu.Button, {
	                    key: "chooseMeB", 
	                    label: "No, Choose Me!", 
	                    onClick: this.handleUpdateResult.bind(null, "No, Choose Me!")})
	            )
	        );

	        return (
	            React.createElement("div", null, 
	                React.createElement("p", null, "Notice how the ToolBar puts commands into an overflow menu when it can't fit" + ' ' +
	                "them in the primary area. You can control what gets overflowed first using" + ' ' +
	                "the ", React.createElement("code", null, "priority"), " prop"), 
	                React.createElement("button", {onClick: this.handleToggleToolBarSize}, 
	                    "Make ToolBar ", this.state.toolBarIsSmall ? "Bigger" : "Smaller"
	                ), 
	                React.createElement("p", null, "Clicked command: ", this.state.result || "<null>"), 
	                React.createElement("p", null, "Toggle selected: ", this.state.toggleSelected.toString()), 
	                
	                React.createElement(ReactWinJS.ToolBar, {ref: "toolBar", style: {
	                    width: this.state.toolBarIsSmall ? "400px" : "640px"
	                }}, 

	                    React.createElement(ReactWinJS.ToolBar.ContentCommand, {
	                        key: "content", 
	                        icon: "accept", 
	                        label: "Accept"}, 
	                        React.createElement("input", {className: "win-interactive", type: "text"})
	                    ), 

	                    React.createElement(ReactWinJS.ToolBar.Separator, {key: "separator"}), 

	                    React.createElement(ReactWinJS.ToolBar.Button, {
	                        key: "chooseMe", 
	                        icon: "add", 
	                        label: "Choose Me", 
	                        onClick: this.handleUpdateResult.bind(null, "Choose Me")}), 

	                    React.createElement(ReactWinJS.ToolBar.Toggle, {
	                        key: "toggleMe", 
	                        icon: "accept", 
	                        label: "Toggle Me", 
	                        selected: this.state.toggleSelected, 
	                        onClick: this.handleToggleMe}), 

	                    React.createElement(ReactWinJS.ToolBar.FlyoutCommand, {
	                        key: "flyout", 
	                        icon: "up", 
	                        label: "Flyout", 
	                        flyoutComponent: subMenu}), 

	                    React.createElement(ReactWinJS.ToolBar.Button, {
	                        key: "orMe", 
	                        section: "secondary", 
	                        label: "Or Me", 
	                        onClick: this.handleUpdateResult.bind(null, "Or Choose Me")}), 

	                    React.createElement(ReactWinJS.ToolBar.Button, {
	                        key: "noMe", 
	                        section: "secondary", 
	                        label: "No Me!", 
	                        onClick: this.handleUpdateResult.bind(null, "No Me!")})

	                )
	            )
	        );
	    }
	});

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(1);
	var ReactWinJS = __webpack_require__(23);

	module.exports = React.createClass({displayName: "exports",
	    render: function () {
	        var contentComponent = React.createElement("div", null, "This can contain arbitrary content, like images");

	        return (
	            React.createElement(ReactWinJS.Tooltip, {
	                contentComponent: contentComponent}, 
	                React.createElement("div", null, "This has a tooltip, hover and see...")
	            )
	        );
	    }
	});

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// Notes
	// - What's the most common way to distribute React components? webpack? requirejs?
	// - React appears to restore focus after componentWillReceiveProps. This is problematic for
	//   overlays like Flyout that are synchronously shown and take focus in componentWillReceiveProps.
	//   Maybe treat props such as hidden/opened as special and set them outside of React component
	//   lifecycle so that focus movements work properly.
	// - propTypes
	// - Should React be listed as a peerDependency instead of as a dependency?
	// - Does this project need a webpack config file?
	// - Enable setting of classNames and inline styles on control roots?
	// - Which props need to work like controlled components?
	// - What if we modeled dismissables like this? Instead of the app having to call hide/show,
	//   the app could render a special element for all dismissables (e.g. Dismissables) and when
	//   a dismissable is rendered into there, it will be shown. When it is no longer rendered
	//   in there, it will be hidden and removed from the DOM when its hide animation completes.
	//   This only makes sense for things that hide/show not for things that close/open because
	//   the latter need to be rendered even they're closed. Example:
	//     <Dismissables>
	//       <Flyout key="myFlyout">
	//         This is a Flyout!
	//       </Flyout>
	//       <ContentDialog key="myDialog">
	//         This is a ContentDialog!
	//       </ContentDialog>
	//     </Dismissables>
	// - Adaptive apps. In adaptive apps, you want to render certain components at some screen
	//   sizes but not at others. For cheap WinJS controls, reinstantiating the control during
	//   resize when it is needed may be fine. However, this pattern may not work well for
	//   expensive controls like the ListView. We'd want more of a lazy init pattern:
	//     - If the control isn't needed at this screen size, don't render it.
	//     - When the control is needed, instatiate it.
	//     - When the control isn't needed anymore, hide it (display: none).
	//     - When the control is needed again, show it (display: block) and call forceLayout()
	//   react-winjs could add a special prop to handle all of the details of this pattern for
	//   you with a special prop (e.g. displayNone). It could look like this:
	//     <ListView
	//       displayNone={this.state.shouldHideListViewAtThisScreenSize}
	//       itemDataSource={this.state.itemDataSource}
	//       itemTemplate={this.itemTemplate} />
	// - Provide SplitViewButton & SplitViewCommand components or wait for WinJS to provide
	//   the corresponding controls?

	var React = __webpack_require__(1);

	var ReactWinJS = {};

	// Generated from https://github.com/rigdern/winjs-control-apis
	var RawControlApis = {
	    AppBar: [
	        "closedDisplayMode",
	        "commands",
	        "disabled",
	        "element",
	        "hidden",
	        "layout",
	        "onAfterHide",
	        "onAfterShow",
	        "onBeforeHide",
	        "onBeforeShow",
	        "placement",
	        "sticky"
	    ],
	    AppBarCommand: [
	        "disabled",
	        "element",
	        "extraClass",
	        "firstElementFocus",
	        "flyout",
	        "hidden",
	        "icon",
	        "id",
	        "label",
	        "lastElementFocus",
	        "onClick",
	        "section",
	        "selected",
	        "tooltip",
	        "type"
	    ],
	    AutoSuggestBox: [
	        "chooseSuggestionOnEnter",
	        "disabled",
	        "element",
	        "onQueryChanged",
	        "onQuerySubmitted",
	        "onResultSuggestionsChosen",
	        "onSuggestionsRequested",
	        "placeholderText",
	        "queryText",
	        "searchHistoryContext",
	        "searchHistoryDisabled"
	    ],
	    BackButton: [
	        "element"
	    ],
	    CellSpanningLayout: [
	        "groupHeaderPosition",
	        "groupInfo",
	        "itemInfo",
	        "maximumRowsOrColumns",
	        "numberOfItemsPerItemsBlock",
	        "orientation"
	    ],
	    Command: [
	        "disabled",
	        "element",
	        "extraClass",
	        "firstElementFocus",
	        "flyout",
	        "hidden",
	        "icon",
	        "id",
	        "label",
	        "lastElementFocus",
	        "onClick",
	        "section",
	        "selected",
	        "tooltip",
	        "type"
	    ],
	    ContentDialog: [
	        "element",
	        "hidden",
	        "onAfterHide",
	        "onAfterShow",
	        "onBeforeHide",
	        "onBeforeShow",
	        "primaryCommandDisabled",
	        "primaryCommandText",
	        "secondaryCommandDisabled",
	        "secondaryCommandText",
	        "title"
	    ],
	    DatePicker: [
	        "calendar",
	        "current",
	        "datePattern",
	        "disabled",
	        "element",
	        "maxYear",
	        "minYear",
	        "monthPattern",
	        "onChange",
	        "yearPattern"
	    ],
	    FlipView: [
	        "currentPage",
	        "element",
	        "itemDataSource",
	        "itemSpacing",
	        "itemTemplate",
	        "onDataSourceCountChanged",
	        "onPageCompleted",
	        "onPageSelected",
	        "onPageVisibilityChanged",
	        "orientation"
	    ],
	    Flyout: [
	        "alignment",
	        "anchor",
	        "element",
	        "hidden",
	        "onAfterHide",
	        "onAfterShow",
	        "onBeforeHide",
	        "onBeforeShow",
	        "placement"
	    ],
	    GridLayout: [
	        "backdropColor",
	        "disableBackdrop",
	        "groupHeaderPosition",
	        "groupInfo",
	        "horizontal",
	        "itemInfo",
	        "maxRows",
	        "maximumRowsOrColumns",
	        "numberOfItemsPerItemsBlock",
	        "orientation"
	    ],
	    Hub: [
	        "element",
	        "headerTemplate",
	        "indexOfFirstVisible",
	        "indexOfLastVisible",
	        "loadingState",
	        "onContentAnimating",
	        "onHeaderInvoked",
	        "onLoadingStateChanged",
	        "orientation",
	        "scrollPosition",
	        "sectionOnScreen",
	        "sections",
	        "zoomableView"
	    ],
	    HubSection: [
	        "contentElement",
	        "element",
	        "header",
	        "isHeaderStatic"
	    ],
	    ItemContainer: [
	        "draggable",
	        "element",
	        "onInvoked",
	        "onSelectionChanged",
	        "onSelectionChanging",
	        "selected",
	        "selectionDisabled",
	        "swipeBehavior",
	        "swipeOrientation",
	        "tapBehavior"
	    ],
	    ListLayout: [
	        "backdropColor",
	        "disableBackdrop",
	        "groupHeaderPosition",
	        "groupInfo",
	        "horizontal",
	        "itemInfo",
	        "numberOfItemsPerItemsBlock",
	        "orientation"
	    ],
	    ListView: [
	        "automaticallyLoadPages",
	        "currentItem",
	        "element",
	        "footer",
	        "groupDataSource",
	        "groupHeaderTapBehavior",
	        "groupHeaderTemplate",
	        "header",
	        "indexOfFirstVisible",
	        "indexOfLastVisible",
	        "itemDataSource",
	        "itemTemplate",
	        "itemsDraggable",
	        "itemsReorderable",
	        "layout",
	        "loadingBehavior",
	        "loadingState",
	        "maxDeferredItemCleanup",
	        "onContentAnimating",
	        "onGroupHeaderInvoked",
	        "onItemDragBetween",
	        "onItemDragChanged",
	        "onItemDragDrop",
	        "onItemDragEnd",
	        "onItemDragEnter",
	        "onItemDragLeave",
	        "onItemDragStart",
	        "onItemInvoked",
	        "onKeyboardNavigating",
	        "onLoadingStateChanged",
	        "onSelectionChanged",
	        "onSelectionChanging",
	        "pagesToLoad",
	        "pagesToLoadThreshold",
	        "scrollPosition",
	        "selection",
	        "selectionMode",
	        "swipeBehavior",
	        "tapBehavior",
	        "zoomableView"
	    ],
	    Menu: [
	        "alignment",
	        "anchor",
	        "commands",
	        "element",
	        "hidden",
	        "onAfterHide",
	        "onAfterShow",
	        "onBeforeHide",
	        "onBeforeShow",
	        "placement"
	    ],
	    MenuCommand: [
	        "disabled",
	        "element",
	        "extraClass",
	        "flyout",
	        "hidden",
	        "id",
	        "label",
	        "onClick",
	        "selected",
	        "type"
	    ],
	    NavBar: [
	        "commands",
	        "disabled",
	        "element",
	        "hidden",
	        "layout",
	        "onAfterHide",
	        "onAfterShow",
	        "onBeforeHide",
	        "onBeforeShow",
	        "onChildrenProcessed",
	        "placement",
	        "sticky"
	    ],
	    NavBarCommand: [
	        "element",
	        "icon",
	        "label",
	        "location",
	        "splitButton",
	        "splitOpened",
	        "state",
	        "tooltip"
	    ],
	    NavBarContainer: [
	        "currentIndex",
	        "data",
	        "element",
	        "fixedSize",
	        "layout",
	        "maxRows",
	        "onInvoked",
	        "onSplitToggle",
	        "template"
	    ],
	    Pivot: [
	        "element",
	        "items",
	        "locked",
	        "onItemAnimationEnd",
	        "onItemAnimationStart",
	        "onSelectionChanged",
	        "selectedIndex",
	        "selectedItem",
	        "title"
	    ],
	    PivotItem: [
	        "contentElement",
	        "element",
	        "header"
	    ],
	    Rating: [
	        "averageRating",
	        "disabled",
	        "element",
	        "enableClear",
	        "maxRating",
	        "onCancel",
	        "onChange",
	        "onPreviewChange",
	        "tooltipStrings",
	        "userRating"
	    ],
	    SearchBox: [
	        "chooseSuggestionOnEnter",
	        "disabled",
	        "element",
	        "focusOnKeyboardInput",
	        "onQueryChanged",
	        "onQuerySubmitted",
	        "onReceivingFocusOnKeyboardInput",
	        "onResultSuggestionsChosen",
	        "onSuggestionsRequested",
	        "placeholderText",
	        "queryText",
	        "searchHistoryContext",
	        "searchHistoryDisabled"
	    ],
	    SemanticZoom: [
	        "element",
	        "enableButton",
	        "isDeclarativeControlContainer",
	        "locked",
	        "onZoomChanged",
	        "zoomFactor",
	        "zoomedOut"
	    ],
	    SplitView: [
	        "contentElement",
	        "element",
	        "hiddenDisplayMode",
	        "onAfterHide",
	        "onAfterShow",
	        "onBeforeHide",
	        "onBeforeShow",
	        "paneElement",
	        "paneHidden",
	        "panePlacement",
	        "shownDisplayMode"
	    ],
	    TimePicker: [
	        "clock",
	        "current",
	        "disabled",
	        "element",
	        "hourPattern",
	        "minuteIncrement",
	        "minutePattern",
	        "onChange",
	        "periodPattern"
	    ],
	    ToggleSwitch: [
	        "checked",
	        "disabled",
	        "element",
	        "labelOff",
	        "labelOn",
	        "onChange",
	        "title"
	    ],
	    ToolBar: [
	        "data",
	        "element",
	        "extraClass",
	        "shownDisplayMode"
	    ],
	    Tooltip: [
	        "contentElement",
	        "element",
	        "extraClass",
	        "infotip",
	        "innerHTML",
	        "onBeforeClose",
	        "onBeforeOpen",
	        "onClosed",
	        "onOpened",
	        "placement"
	    ]
	};

	function isEvent(propName) {
	    return propName[0] === "o" && propName[1] === "n";
	}

	function cloneObject(obj) {
	    var result = {};
	    for (k in obj) { result[k] = obj[k]; }
	    return result;
	}

	function merge(a, b) {
	    var result = {};
	    if (a) {
	        for (k in a) { result[k] = a[k]; }
	    }
	    if (b) {
	        for (k in b) { result[k] = b[k]; }
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

	function makeClassSet(className) {
	    var classSet = {};
	    className && className.split(" ").forEach(function (aClass) {
	        if (aClass) {
	            classSet[aClass] = true;
	        }
	    });
	    return classSet;
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
	            console.log(JSON.stringify(edits[edits.length - 1]));
	            old.splice(i, 1);
	        }
	    }

	    // Handle insertions and moves
	    for (i = 0; i < latest.length; i++) {
	        var item = latest[i];
	        if (!oldIndex.hasOwnProperty(item.key)) {
	            // Insertion
	            edits.push({ type: "insert", index: i, value: item });
	            console.log(JSON.stringify({ type: "insert", index: i, value: item.key }));
	            old.splice(i, 0, item);
	        } else if (old[i].key !== item.key) {
	            // Move
	            //edits.push({ type: "move", from: oldIndex[item.key], to: i });
	            //old.splice(oldIndex[item.key], 1);

	            var fromIndex = indexOfKey(old, item.key);
	            edits.push({ type: "move", from: fromIndex, to: i });
	            console.log(JSON.stringify(edits[edits.length - 1]));
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

	var PropHandlers = {
	    property: {
	        preCtorInit: function property_preCtorInit(element, options, data, displayName, propName, value) {
	            options[propName] = value;
	        },
	        update: function property_update(winjsComponent, propName, oldValue, newValue) {
	            if (oldValue !== newValue) {
	                winjsComponent.winControl[propName] = newValue;
	            }
	        }
	    },
	    domProperty: {
	        preCtorInit: function domProperty_preCtorInit(element, options, data, displayName, propName, value) {
	            element[propName] = value;
	        },
	        update: function domProperty_update(winjsComponent, propName, oldValue, newValue) {
	            if (oldValue !== newValue) {
	                winjsComponent.element[propName] = newValue;
	            }
	        }
	    },
	    event: {
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
	    domEvent: {
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
	        preCtorInit: function winControlStyle_preCtorInit(element, options, data, displayName, propName, value) {
	            var elementStyle = element.style;
	            value = value || {};
	            for (var cssProperty in value) {
	                elementStyle[cssProperty] = value[cssProperty];
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
	                        elementStyle[cssProperty] = newValue[cssProperty];
	                    }
	                }
	            }
	        }
	    },
	    warn: function PropHandlers_warn(warnMessage) {
	        return {
	            update: function warn_update(winjsComponent, propName, oldValue, newValue) {
	                console.warn(winjsComponent.displayName + ": " + warnMessage);
	            }
	        };
	    },
	    mountTo: function PropHandlers_mountTo(getMountPoint) {
	        return {
	            update: function mountTo_update(winjsComponent, propName, oldValue, newValue) {
	                React.render(newValue, getMountPoint(winjsComponent));
	            }
	        };
	    },
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

	function defineControl(controlName, options) {
	    options = options || {};
	    var winControlOptions = options.winControlOptions || {};
	    var propHandlers = options.propHandlers || {};
	    var render = options.render || function (component) {
	        return React.DOM.div();
	    };
	    var winjsControlName = options.underlyingControlName || controlName;
	    var displayName = controlName;

	    function initWinJSComponent(winjsComponent, element, props) {
	        winjsComponent.data = {};
	        winjsComponent.displayName = displayName;
	        winjsComponent.element = element;

	        // Give propHandlers that implement preCtorInit the opportunity to run before
	        // instantiating the winControl.
	        var options = cloneObject(winControlOptions);
	        Object.keys(props).forEach(function (propName) {
	            var preCtorInit = propHandlers[propName] && propHandlers[propName].preCtorInit;
	            if (preCtorInit) {
	                preCtorInit(element, options, winjsComponent.data, displayName, propName, props[propName]);
	            }
	        });
	        winjsComponent.winControl = new WinJS.UI[winjsControlName](element, options);        

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
	        shouldComponentUpdate: function () {
	            return false;
	        },
	        // If choosing to implement componentWillMount, be aware that componentWillMount
	        // will run when WinJSChildComponent renders the component to a string via
	        // renderRootlessComponent.
	        componentDidMount: function () {
	            initWinJSComponent(this, this.getDOMNode(), this.props);
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
	    var clonedComponent = React.addons.cloneWithProps(component);
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

	var DefaultControlApis = (function processRawApis() {
	    var keepProperty = function keepProperty(propertyName) {
	        return !endsWith(propertyName.toLowerCase(), "element");
	    };

	    var result = {};
	    Object.keys(RawControlApis).forEach(function (controlName) {
	        var propHandlers = {
	            className: PropHandlers.winControlClassName,
	            style: PropHandlers.winControlStyle,
	            // TODO: Instead of special casing id, support DOM attributes
	            // more generically.
	            id: PropHandlers.domProperty
	        };
	        RawControlApis[controlName].forEach(function (propName) {
	            if (isEvent(propName)) {
	                propHandlers[propName] = PropHandlers.event;
	            } else if (keepProperty(propName)) {
	                propHandlers[propName] = PropHandlers.property;
	            }
	        });
	        result[controlName] = {
	            propHandlers: propHandlers
	        };
	    });
	    return result;
	})();

	function updateWithDefaults(controlApis) {
	    Object.keys(controlApis).forEach(function (controlName) {
	        var winjsControlName = controlApis[controlName].underlyingControlName || controlName;
	        var spec = controlApis[controlName];
	        spec.propHandlers = merge(
	            DefaultControlApis[winjsControlName].propHandlers,
	            spec.propHandlers
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
	            children: {
	                preCtorInit: function AppBar_children_preCtorInit(element, options, data, displayName, propName, value) {
	                    var latest = processChildren(displayName, value, {});
	                    data[propName] = {
	                        winjsChildComponents: latest.childComponents,
	                        winjsChildComponentsMap: latest.childComponentsMap
	                    };

	                    options.commands = latest.childComponents.map(function (winjsChildComponent) {
	                        return winjsChildComponent.winControl;
	                    });
	                },
	                update: function AppBar_children_update(winjsComponent, propName, oldValue, newValue) {
	                    var data = winjsComponent.data[propName] || {};
	                    var oldChildComponents = data.winjsChildComponents || [];
	                    var oldChildComponentsMap = data.winjsChildComponentsMap || {};
	                    var latest = processChildren(winjsComponent.displayName, newValue, oldChildComponentsMap);

	                    if (!arraysShallowEqual(oldChildComponents, latest.childComponents)) {
	                        // TODO: There's currently a bug here because AppBar disposes all
	                        // current commands when setting commands even when some of the current
	                        // commands are in the new commands array. Maybe not worth finding a
	                        // workaround because WinJS's AppBar implementation is changing soon
	                        // and when that happens, we should be able to just use
	                        // syncChildrenWithBindingList.
	                        winjsComponent.winControl.commands = latest.childComponents.map(function (winjsChildComponent) {
	                            return winjsChildComponent.winControl;
	                        });
	                    
	                        winjsComponent.data[propName] = {
	                            winjsChildComponents: latest.childComponents,
	                            winjsChildComponentsMap: latest.childComponentsMap
	                        };
	                    }
	                },
	                dispose: function AppBar_children_dispose(winjsComponent, propName) {
	                    var data = winjsComponent.data[propName] || {};
	                    var childComponents = data.winjsChildComponents || [];
	                    childComponents.forEach(function (winjsChildComponent) {
	                        winjsChildComponent.dispose();
	                    });
	                }
	            }
	        }
	    },
	    "AppBar.Button": CommandSpecs.Button,
	    "AppBar.Toggle": CommandSpecs.Toggle,
	    "AppBar.Separator": CommandSpecs.Separator,
	    "AppBar.ContentCommand": CommandSpecs.ContentCommand,
	    "AppBar.FlyoutCommand": CommandSpecs.FlyoutCommand,
	    AutoSuggestBox: {},
	    BackButton: {
	        render: function (component) {
	            return React.DOM.button();
	        }
	    },
	    // CellSpanningLayout: Not a component so just use off of WinJS.UI?
	    ContentDialog: {
	        propHandlers: {
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
	    ListView: {},
	    // TODO: Keyboarding doesn't work in Menu probably because MenuCommands are not direct
	    // children of the Menu.
	    Menu: {
	        propHandlers: {
	            children: {
	                // children propHandler looks like this rather than using mountTo on
	                // winControl.element because this enables props.children to have
	                // multiple components whereas the other technique restricts it to one.
	                update: function (winjsComponent, propName, oldValue, newValue) {
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
	            children: PropHandlers.syncChildrenWithBindingList("items")
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
	    SearchBox: {},
	    SemanticZoom: {
	        propHandlers: {
	            zoomedInComponent: {
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
	            paneComponent: PropHandlers.mountTo(function (winjsComponent) {
	                return winjsComponent.winControl.paneElement;
	            }),
	            contentComponent: PropHandlers.mountTo(function (winjsComponent) {
	                return winjsComponent.winControl.contentElement;
	            })
	        }
	    },
	    TimePicker: {},
	    ToggleSwitch: {},
	    ToolBar: {
	        propHandlers: {
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
	            contentComponent: {
	                update: function (winjsComponent, propName, oldValue, newValue) {
	                    if (!winjsComponent.winControl.contentElement) {
	                        winjsComponent.winControl.contentElement = document.createElement("div");
	                    }
	                    React.render(newValue, winjsComponent.winControl.contentElement);
	                }
	            }
	        }
	    }
	});

	// Sort to ensure that controls come before their subcontrols
	// (e.g. AppBar comes before AppBar.Toggle).
	Object.keys(ControlApis).sort().forEach(function (controlName) {
	    nestedSet(ReactWinJS, controlName, defineControl(controlName, ControlApis[controlName]));
	});

	// Given a function that returns a React component,
	// returns an item renderer function that can be used
	// with WinJS controls. Useful for describing FlipView
	// and ListView item templates as React components.
	ReactWinJS.reactRenderer = function reactRenderer(componentFunction) {
	    return function itemRenderer(itemPromise) {
	        return itemPromise.then(function (item) {
	            var element = document.createElement("div");
	            React.render(componentFunction(item), element);
	            return element;
	        });
	    }
	};

	module.exports = ReactWinJS;

/***/ }
/******/ ]);
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
	var ReactWinJS = __webpack_require__(5);
	var FakeData = __webpack_require__(2);
	var Data = FakeData;
	var SearchPage = __webpack_require__(3);
	var DetailPage = __webpack_require__(4);

	// TODO: Preserve the scroll position when navigating back to search page.
	// TODO: Use a loading spinner instead of the text "Loading..."

	// Manages fetching of movie data. *fetchFirst* and *fetchNext* start fetches and the when the
	// resuts are ready, *dataHandler* is called.
	var MovieFetcher = function (dataHandler) {
	    this._dataHandler = dataHandler;
	    this._outstandingFetch = null;

	    this.queryText = "";
	    this.nextPage = 1;
	    this.receivedCount = 0;
	    this.totalCount = 0;

	};
	// Fetches the first page of results of *queryText*. If that fetch is already in
	// progress, this function is a no op.
	MovieFetcher.prototype.fetchFirst = function (queryText) {
	    this.queryText = queryText;
	    this.nextPage = 1;
	    this.receivedCount = 0;
	    this.totalCount = 0;

	    this._doFetch();
	};
	// Fetches the next page of results for whatever *queryText* was passed to the most
	// recent call to *fetchFirst*. If a fetch is already in progress, this function is a no op.
	MovieFetcher.prototype.fetchNext = function () {
	    this._doFetch();
	};
	// Cancels whatever fetch is currently in progress.
	MovieFetcher.prototype.stop = function () {
	    var currFetch = this._outstandingFetch;
	    this._outstandingFetch = null;
	    currFetch && currFetch.promise.cancel();
	};
	MovieFetcher.prototype._doFetch = function () {
	    var handleResults = function (response) {
	        this._outstandingFetch = null;

	        this.nextPage++;
	        this.receivedCount += response.movies.length;
	        this.totalCount = response.total;

	        this._dataHandler({
	            queryText: queryText,
	            page: page,
	            movies: response.movies,
	            hasMore: this.receivedCount < this.totalCount

	        });
	    }.bind(this);

	    var queryText = this.queryText;
	    var page = this.nextPage;

	    var hasMore = page === 1 || this.receivedCount < this.totalCount;
	    var currFetch = this._outstandingFetch;
	    if (!hasMore || currFetch && currFetch.queryText === queryText && currFetch.page === page) {
	        // No more data or the fetch is already in progress.
	        return;
	    }

	    this._outstandingFetch = null;
	    currFetch && currFetch.promise.cancel();

	    var fetchPromise = queryText ? Data.getSearchResults(queryText, page) : Data.getInTheaters(page);
	    fetchPromise = fetchPromise.then(
	        handleResults,
	        function (error) {
	            console.log("Query error: ");
	            console.log("  Query: '" + queryText + "'");
	            console.log("  Page: " + page);
	            console.log("  Error: " + JSON.stringify(error));
	        }
	    );

	    this._outstandingFetch = {
	        promise: fetchPromise,
	        queryText: queryText,
	        page: page
	    };
	};

	var App = React.createClass({displayName: "App",
	    handleFetchResults: function (results) {
	        var newMovies = results.movies;
	        var currentMovies;
	        if (results.page === 1) {
	            currentMovies = new WinJS.Binding.List(newMovies);
	        } else {
	            currentMovies = this.state.movies;
	            currentMovies.push.apply(currentMovies, newMovies);
	        }

	        this.setState({
	            movies: currentMovies,
	            queryText: results.queryText,
	            hasMore: results.hasMore
	        });
	    },
	    handleFetchFirstPage: function (queryText) {
	        this.fetcher.fetchFirst(queryText);
	    },
	    handleFetchNextPage: function () {
	        this.fetcher.fetchNext();
	    },
	    handleNavigated: function (eventObject) {
	        this.setState({ 
	            nav: {
	                location: eventObject.detail.location,
	                state: eventObject.detail.state
	            }
	        });
	    },
	    getInitialState: function () {
	        return {
	            movies: null,
	            queryText: "",
	            hasMore: true,
	            nav: {
	                location: WinJS.Navigation.location,
	                state: WinJS.Navigation.state
	            }
	        };
	    },
	    componentWillMount: function () {
	        this.fetcher = new MovieFetcher(this.handleFetchResults);
	        WinJS.Navigation.addEventListener("navigated", this.handleNavigated);
	        WinJS.Navigation.navigate("/");
	        this.handleFetchNextPage();
	    },
	    componentWillUnmount: function () {
	        WinJS.Navigation.removeEventListener("navigated", this.handleNavigated);
	        this.fetcher.stop();
	    },
	    render: function () {
	        var nav = this.state.nav;
	        if (nav.location === "/movie") {
	            return (
	                React.createElement(DetailPage, {
	                    movie: nav.state.movie})
	            );
	        } else {
	            return (
	                React.createElement(SearchPage, {
	                    movies: this.state.movies, 
	                    queryText: this.state.queryText, 
	                    hasMore: this.state.hasMore, 
	                    onFetchFirstPage: this.handleFetchFirstPage, 
	                    onFetchNextPage: this.handleFetchNextPage})
	            );
	        }
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

	var nextMovieId = 0;
	var ratings = ["Unrated", "G", "PG", "PG-13", "R"];
	var firstNames = ["Charlsie", "Ofelia", "Jerome", "Leana", "Harlan", "Annalisa", "Leida", "Dessie", "Valrie", "Sharen", "Sergio", "Mitzie", "Celia", "Debbra", "Florida", "Kara", "Jacquie", "Sherley", "Carson", "Staci", "Paula", "Dann", "Linette", "Meri", "Almeta", "Detra", "Lupe", "Neville", "Marivel", "Carmine", "Carina", "Laureen", "Lourdes", "Laverne", "Verona", "Gertha", "Jene", "Joslyn", "Jone", "Latoya", "Margurite", "Emmett", "Wallace", "Elana", "Xiomara", "Sabra", "Ouida", "Kenton", "Norene", "Raul"];
	var lastNames = ["Avey", "Crofoot", "Flor", "Barletta", "Zoller", "Rosson", "Coomes", "Wilken", "Withey", "Ojeda", "Mennella", "Gauer", "Puccio", "Zimmerer", "Cottrell", "Bridgman", "Gershman", "Tinoco", "Ayoub", "Fournier", "Marcella", "Melrose", "Lafontaine", "Cathcart", "Cioffi", "Sands", "Lei", "Cardoso", "Dela", "Metcalfe", "Ethridge", "Fryer", "Warden", "Madson", "Gonsales", "Tobey", "Knecht", "Gallion", "Thibault", "Brockington", "Baney", "Haddox", "Kang", "Galyean", "Riccio", "Lake", "Mirabella", "Frechette", "Rearick", "Carmouche"];
	var loremIpsum = [
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur",
		"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?",
		"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
		"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.",
	];
	var words = loremIpsum.join(" ").replace(/,|!|\?|\./g, "").replace(/-/g, " ").split(" ");

	var posterWidth = 153;
	var posterHeight = 243;
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
		[164, 162, 165], [196, 194, 197], [228, 226, 229]
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

	function genActor() {
		return { name: randomElement(firstNames) + " " + randomElement(lastNames) };
	}

	function genTitleWord() {
		var word = randomElement(words).toLowerCase();
		return word[0].toUpperCase() + word.substr(1);
	}

	function genMovie() {
		return {
			id: nextMovieId++,
			title: (nextMovieId - 1 + " ") + genArray(1, 5, genTitleWord).join(" "),
			year: randomInt(1950, 2015),
			mpaa_rating: randomElement(ratings),
			synopsis: randomElement(loremIpsum),
			posters: {
				detailed: randomElement(posters)
			},
			ratings: {
				critics_score: randomInt(0, 100),
				audience_score: randomInt(0, 100)
			},
			abridged_cast: genArray(1, 8, genActor)
		};
	}

	var movieCount = 1000;
	var movies = genArray(movieCount, movieCount, genMovie);
	var moviesPerPage = 20;
	var fetchDelay = 500;

	function getSearchResults(query, page) {
		query = query.toLowerCase();
		var start = (page - 1) * moviesPerPage;
		var results = movies.filter(function (m) {
			return m.title.toLowerCase().indexOf(query) !== -1;
		});
		return WinJS.Promise.timeout(fetchDelay).then(function () {
			return {
				movies: results.slice(start, start + moviesPerPage),
				total: results.length
			};
		});
	}

	function getInTheaters(page) {
		var start = (page - 1) * moviesPerPage;
		return WinJS.Promise.timeout(fetchDelay).then(function () {
			return {
				movies: movies.slice(start, start + moviesPerPage),
				total: movies.length
			};
		});
	}

	module.exports = {
		getSearchResults: getSearchResults,
		getInTheaters: getInTheaters
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(1);
	var ReactWinJS = __webpack_require__(5);
	var Score = __webpack_require__(6);
	var formattedScore = Score.formattedScore;
	var textColoredForScore = Score.textColoredForScore;

	// For best performance, .win-container should be sized in CSS.
	// See index.html for its style.
	var styles = {
	    item: {
	        root: {
	            display: "flex"
	        },
	        poster: {
	            marginRight: "10px",
	            flex: "none"
	        },
	        info: {
	            flex: "1"
	        }
	    },
	    root: {
	        height: "100%"
	    },
	    listView: {
	        height: "calc(100% - 50px)"
	    },
	    footer: {
	        height: "91px",
	        lineHeight: "91px",
	        textAlign: "center"
	    }
	};

	module.exports = React.createClass({displayName: "exports",
	    itemRenderer: ReactWinJS.reactRenderer(function (item) {
	        var score = item.data.ratings.critics_score;
	        var scoreComponent = textColoredForScore("Critics " + formattedScore(score), score);
	        return (
	            React.createElement("div", {style: styles.item.root}, 
	                React.createElement("img", {style: styles.item.poster, src: item.data.posters.detailed, width: 51, height: 81}), 
	                React.createElement("div", {style: styles.item.info}, 
	                    React.createElement("h3", null, item.data.title), 
	                    React.createElement("div", {className: "win-type-small"}, 
	                        item.data.year, " ", "\u2022", " ", scoreComponent
	                    )
	                )
	            )
	        );
	    }),
	    handleQueryChange: function (eventObject) {
	        var queryText = eventObject.currentTarget.value;
	        this.setState({ queryText: queryText });

	        this.pendingQueryId && clearTimeout(this.pendingQueryId);
	        this.pendingQueryId = setTimeout(function () {
	            this.props.onFetchFirstPage(queryText);
	        }.bind(this), 300);
	    },
	    handleMovieSelected: function (eventObject) {
	        WinJS.Navigation.navigate("/movie", {
	            movie: this.props.movies.getAt(eventObject.detail.itemIndex)
	        });
	    },
	    handleFooterVisibilityChanged: function (eventObject) {
	        if (eventObject.detail.visible) {
	            this.props.onFetchNextPage();
	        }
	    },
	    getInitialState: function () {
	        return {
	            queryText: this.props.queryText,
	            layout: { type: WinJS.UI.ListLayout }
	        };
	    },
	    render: function() {
	        var resultsComponent;
	        if (!this.props.movies) {
	            resultsComponent = React.createElement("div", null, "Loading...");
	        } else if (this.props.movies.length === 0) {
	            resultsComponent = React.createElement("div", null, "No movies found for \"", this.props.queryText, "\".");
	        } else {
	            var footerComponent = !this.props.hasMore ? null : (
	                React.createElement("div", {style: styles.footer}, 
	                "Loading..."
	                )
	            );

	            resultsComponent = (
	                React.createElement(ReactWinJS.ListView, {
	                    style: styles.listView, 
	                    className: "moviesListView", 
	                    itemDataSource: this.props.movies.dataSource, 
	                    itemTemplate: this.itemRenderer, 
	                    layout: this.state.layout, 
	                    onItemInvoked: this.handleMovieSelected, 
	                    footerComponent: footerComponent, 
	                    onFooterVisibilityChanged: this.handleFooterVisibilityChanged})
	            );
	        }

	        return (
	            React.createElement("div", {className: "searchPage", style: styles.root}, 
	                React.createElement("div", null, React.createElement("input", {type: "text", value: this.state.queryText, onChange: this.handleQueryChange})), 
	                resultsComponent
	            )
	        );
	    }
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(1);
	var ReactWinJS = __webpack_require__(5);
	var Score = __webpack_require__(6);
	var formattedScore = Score.formattedScore;
	var textColoredForScore = Score.textColoredForScore;

	var styles = {
	    root: {
	        marginLeft: "5px",
	        marginRight: "5px"
	    },
	    header: {
	        root: {
	            display: "flex",
	            flexDirection: "row"
	        },
	        backButton: {
	            marginRight: "10px"
	        },
	        title: {
	            marginBottom: "10px"
	        }
	    },
	    detail: {
	        root: {
	            display: "flex"
	        },
	        poster: {
	            marginRight: "10px",
	            flex: "none",
	            alignSelf: "center"
	        },
	        info: {
	            flex: "1 1",
	            alignSelf: "flex-start"
	        },
	        rating: {
	            display: "inline-block",
	            padding: "2px",
	            border: "2px solid black",
	            marginBottom: "15px",
	            fontFamily: "Palatino",
	            fontSize: "20px"
	        },
	        actors: {
	            marginTop: "0",
	            marginBottom: "0"
	        }
	    }
	};

	module.exports = React.createClass({displayName: "exports",
	    render: function () {
	        var movie = this.props.movie;
	        var criticsScore = movie.ratings.critics_score;
	        var audienceScore = movie.ratings.audience_score;
	        var actors = movie.abridged_cast.map(function (person) {
	            return React.createElement("li", {key: person.name}, person.name);
	        });

	        return (
	            React.createElement("div", {style: styles.root}, 
	                React.createElement("div", {style: styles.header.root}, 
	                    React.createElement(ReactWinJS.BackButton, {style: styles.header.backButton}), 
	                    React.createElement("h2", {style: styles.header.title}, movie.title, " (", movie.year, ")")
	                ), 
	                React.createElement("div", {style: styles.detail.root}, 
	                    React.createElement("img", {style: styles.detail.poster, src: movie.posters.detailed, width: 153, height: 243}), 
	                    React.createElement("div", {style: styles.detail.info}, 
	                        React.createElement("div", {style: styles.detail.rating}, movie.mpaa_rating), 
	                        React.createElement("h3", null, "Critics:"), 
	                        React.createElement("h2", null, textColoredForScore(formattedScore(criticsScore), criticsScore)), 
	                        React.createElement("h3", null, "Audience:"), 
	                        React.createElement("h2", null, textColoredForScore(formattedScore(audienceScore), audienceScore))
	                    )
	                ), 
	                React.createElement("hr", null), 
	                React.createElement("div", null, movie.synopsis), 
	                React.createElement("hr", null), 
	                React.createElement("div", null, 
	                    "Actors", 
	                    React.createElement("ul", {style: styles.detail.actors}, actors)
	                )
	            )
	        );
	    }
	});

/***/ },
/* 5 */
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
	// - Think more about React bug: https://github.com/facebook/react/issues/3790
	//   BackButton has to work around it. I wonder if other controls which often cause
	//   navigation on "click" will also have to workaround it (e.g. NavBarCommand).

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
	    // Maps to a property on the winControl.
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

	    // Maps to a property on the winControl's element.
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

	    // Maps to an event on the winControl.
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

	    // Maps to an event on the winControl's element.
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
	            // Can't use preCtorInit because the mount point may not exist until the
	            // constructor has run.
	            update: function mountTo_update(winjsComponent, propName, oldValue, newValue) {
	                var oldElement = winjsComponent.data[propName];

	                if (newValue) {
	                    var newElement = getMountPoint(winjsComponent);
	                    if (oldElement && oldElement !== newElement) {
	                        React.unmountComponentAtNode(oldElement);
	                    }

	                    React.render(newValue, newElement);
	                    winjsComponent.data[propName] = newElement;
	                } else if (oldValue) {
	                    oldElement && React.unmountComponentAtNode(oldElement);
	                    winjsComponent.data[propName] = null;
	                }
	            },
	            dispose: function mountTo_dispose(winjsComponent, propName) {
	                var element = winjsComponent.data[propName];
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

	function defineControl(controlName, options) {
	    options = options || {};
	    var winControlOptions = options.winControlOptions || {};
	    var preCtorInit = options.preCtorInit || function () { };
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
	        preCtorInit(element, options, winjsComponent.data, displayName);
	        Object.keys(props).forEach(function (propName) {
	            var handler = propHandlers[propName];
	            if (handler && handler.preCtorInit) {
	                handler.preCtorInit(element, options, winjsComponent.data, displayName, propName, props[propName]);
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
	    ListView: {
	        propHandlers: {
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
	            contentComponent: PropHandlers.propertyWithMount("contentElement")
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
	            WinJS.Utilities.markDisposable(element, function () {
	                React.unmountComponentAtNode(element);
	            });
	            return element;
	        });
	    }
	};

	module.exports = ReactWinJS;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	function formattedScore(score) {
	    return score >= 0 ? score + "%" : "N/A";
	}

	var maxColor = 200;
	function colorForScore(score) {
	    if (score >= 0) {
	        var scoreAsColor = Math.round(score / 100 * maxColor);
	        return "rgb(" + [maxColor - scoreAsColor, scoreAsColor, 0].join(",") + ")";
	    } else {
	        return "rgb(0, 0, 0)";
	    }

	}

	function textColoredForScore(text, score) {
	    return React.createElement("span", {style: {color: colorForScore(score)}}, text);
	}

	module.exports = {
		formattedScore: formattedScore,
		textColoredForScore: textColoredForScore
	};

/***/ }
/******/ ]);
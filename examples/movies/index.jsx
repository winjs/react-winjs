/** @jsx React.DOM */

var React = require('react/addons');
var ReactWinJS = require('react-winjs');
var FakeData = require('./FakeData');
var Data = FakeData;
var SearchPage = require('./SearchPage.jsx');
var DetailPage = require('./DetailPage.jsx');

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

var App = React.createClass({
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
                <DetailPage
                    movie={nav.state.movie} />
            );
        } else {
            return (
                <SearchPage
                    movies={this.state.movies}
                    queryText={this.state.queryText}
                    hasMore={this.state.hasMore}
                    onFetchFirstPage={this.handleFetchFirstPage}
                    onFetchNextPage={this.handleFetchNextPage} />
            );
        }
    }
});

React.render(<App />, document.getElementById("app"));

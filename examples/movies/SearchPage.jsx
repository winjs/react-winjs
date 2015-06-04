/** @jsx React.DOM */

var React = require('react');
var ReactWinJS = require('react-winjs');
var Score = require('./Score.jsx');
var formattedScore = Score.formattedScore;
var textColoredForScore = Score.textColoredForScore;

// For best performance, .win-container should be sized in CSS.
// See index.html for its style.
var styles = {
    item: {
        root: {
            height: "100%",
            display: "flex"
        },
        poster: {
            marginRight: "10px",
            flex: "none"
        },
        info: {
            root: {
                flex: "1 1",
                display: "flex",
                flexDirection: "column"
            },
            title: {
                flex: "0 1 auto",
                overflow: "hidden"
            },
            yearAndScore: {
                flex: "none"
            }
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

module.exports = React.createClass({
    itemRenderer: ReactWinJS.reactRenderer(function (item) {
        var score = item.data.ratings.critics_score;
        var scoreComponent = textColoredForScore("Critics " + formattedScore(score), score);
        return (
            <div style={styles.item.root}>
                <img style={styles.item.poster} src={item.data.posters.detailed} width={51} height={81} />
                <div style={styles.item.info.root}>
                    <h3 className="win-h3" style={styles.item.info.title}>{item.data.title}</h3>
                    <div style={styles.item.info.yearAndScore} className="win-type-small">
                        {item.data.year} {"\u2022"} {scoreComponent}
                    </div>
                </div>
            </div>
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
            resultsComponent = <div>Loading...</div>;
        } else if (this.props.movies.length === 0) {
            resultsComponent = <div>No movies found for "{this.props.queryText}".</div>;
        } else {
            var footerComponent = !this.props.hasMore ? null : (
                <div style={styles.footer}>
                Loading...
                </div>
            );

            resultsComponent = (
                <ReactWinJS.ListView
                    style={styles.listView}
                    className="moviesListView"
                    itemDataSource={this.props.movies.dataSource}
                    itemTemplate={this.itemRenderer}
                    layout={this.state.layout}
                    onItemInvoked={this.handleMovieSelected}
                    footerComponent={footerComponent}
                    onFooterVisibilityChanged={this.handleFooterVisibilityChanged} />
            );
        }

        return (
            <div className="searchPage" style={styles.root}>
                <div><input className="win-textbox" type="text" value={this.state.queryText} onChange={this.handleQueryChange} /></div>
                {resultsComponent}
            </div>
        );
    }
});
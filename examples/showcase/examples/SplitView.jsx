/** @jsx React.DOM */

var React = require('react');
var ReactWinJS = require('react-winjs');

var splitViewId = "mainSplitView";

module.exports = React.createClass({
    handleTogglePane: function () {
        this.setState({ paneOpened: !this.state.paneOpened });
    },
    handleAfterClose: function () {
        this.setState({ paneOpened: false });
    },
    handleChangeContent: function (newContent) {
        this.setState({
            content: newContent,
            paneOpened: false
        });
    },
    getInitialState: function () {
        return {
            content: "Home",
            paneOpened: false
        };
    },
    render: function () {
        var paneComponent = (
            <div>
                <div>
                    <ReactWinJS.SplitViewPaneToggle
                        aria-controls={splitViewId}
                        paneOpened={this.state.paneOpened}
                        onInvoked={this.handleTogglePane} />
                </div>

                <ReactWinJS.NavBarCommand
                    label="Home"
                    icon="home"
                    onClick={this.handleChangeContent.bind(null, "Home")} />
                <ReactWinJS.NavBarCommand
                    label="Favorite"
                    icon="favorite"
                    onClick={this.handleChangeContent.bind(null, "Favorite")} />
                <ReactWinJS.NavBarCommand
                    label="Settings"
                    icon="settings"
                    onClick={this.handleChangeContent.bind(null, "Settings")} />
            </div>
        );
        var contentComponent = (
            <h2 className="win-h2" style={{marginLeft: "10px"}}>{this.state.content}</h2>
        );

        return (
            <ReactWinJS.SplitView
                id={splitViewId}
                style={{height: "300px"}}
                paneComponent={paneComponent}
                contentComponent={contentComponent}
                paneOpened={this.state.paneOpened}
                onAfterClose={this.handleAfterClose} />
        );
    }
});
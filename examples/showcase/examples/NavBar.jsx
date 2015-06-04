/** @jsx React.DOM */

var React = require('react');
var ReactWinJS = require('react-winjs');

module.exports = React.createClass({
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
            <ReactWinJS.NavBar placement="bottom">
                <ReactWinJS.NavBarContainer onInvoked={this.handleCommandInvoked}>
                    <ReactWinJS.NavBarCommand
                        key="favorite"
                        label="Favorite"
                        icon="favorite" />
                     <ReactWinJS.NavBarCommand
                        key="delete"
                        label="Delete"
                        icon="delete" />
                    <ReactWinJS.NavBarCommand
                        key="music"
                        label="Music"
                        icon="audio" />
                    <ReactWinJS.NavBarCommand
                        key="edit"
                        label="Edit"
                        icon="edit" />
                    <ReactWinJS.NavBarCommand
                        key="settings"
                        label="Settings"
                        icon="settings" />
                </ReactWinJS.NavBarContainer>
            </ReactWinJS.NavBar>
        );

        return (
            <div>
                <p>This NavBar renders at the bottom of the screen.</p>
                <button className="win-button" onClick={this.props.onToggleAppBar}>
                    {this.props.appBarShown ? "Hide" : "Show"} NavBar
                </button>
                <p>Invoked command: {this.state.result || "<null>"}</p>
                {this.props.appBarShown ? navBar : null }
            </div>
        );
    }
});
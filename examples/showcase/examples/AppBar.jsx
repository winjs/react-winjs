/** @jsx React.DOM */

var React = require('react/addons');
var ReactWinJS = require('react-winjs');

module.exports = React.createClass({
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
            <ReactWinJS.Menu>
                <ReactWinJS.Menu.Button
                    key="chooseMeA"
                    label="Or Choose Me"
                    onClick={this.handleUpdateResult.bind(null, "Or Choose Me")} />
                <ReactWinJS.Menu.Button
                    key="chooseMeB"
                    label="No, Choose Me!"
                    onClick={this.handleUpdateResult.bind(null, "No, Choose Me!")} />
            </ReactWinJS.Menu>
        );

        var appBar = (
            <ReactWinJS.AppBar>

                    <ReactWinJS.AppBar.ContentCommand
                        key="content"
                        icon="accept"
                        label="Accept">
                        <input className="win-interactive" type="text" />
                    </ReactWinJS.AppBar.ContentCommand>

                    <ReactWinJS.AppBar.Separator key="separator" />

                    <ReactWinJS.AppBar.Button
                        key="chooseMe"
                        icon="add"
                        label="Choose Me"
                        onClick={this.handleUpdateResult.bind(null, "Choose Me")} />

                    <ReactWinJS.AppBar.Toggle
                        key="toggleMe"
                        icon="accept"
                        label="Toggle Me"
                        selected={this.state.toggleSelected}
                        onClick={this.handleToggleMe} />

                    <ReactWinJS.AppBar.FlyoutCommand
                        key="flyout"
                        icon="up"
                        label="Flyout"
                        flyoutComponent={subMenu} />

                    <ReactWinJS.AppBar.Button
                        key="orMe"
                        section="secondary"
                        label="Or Me"
                        onClick={this.handleUpdateResult.bind(null, "Or Choose Me")} />

                    <ReactWinJS.AppBar.Button
                        key="noMe"
                        section="secondary"
                        label="No Me!"
                        onClick={this.handleUpdateResult.bind(null, "No Me!")} />

                </ReactWinJS.AppBar>
        );

        return (
            <div>
                <p>This AppBar renders at the bottom of the screen.</p>
                <button onClick={this.props.onToggleAppBar}>
                    {this.props.appBarShown ? "Hide" : "Show"} AppBar
                </button>
                <p>Clicked command: {this.state.result || "<null>"}</p>
                <p>Toggle selected: {this.state.toggleSelected.toString()}</p>
                {this.props.appBarShown ? appBar : null}
            </div>
        );
    }
});
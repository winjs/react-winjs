/** @jsx React.DOM */

var React = require('react/addons');
var ReactWinJS = require('react-winjs');

module.exports = React.createClass({
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

        return (
            <div>
                <button onClick={this.handleToggleToolBarSize}>
                    Make ToolBar {this.state.toolBarIsSmall ? "Bigger" : "Smaller"}
                </button>
                <p>Clicked command: {this.state.result || "<null>"}</p>
                <p>Toggle selected: {this.state.toggleSelected.toString()}</p>
                
                <ReactWinJS.ToolBar ref="toolBar" style={{width: 640}}>

                    <ReactWinJS.ToolBar.ContentCommand
                        key="content"
                        icon="accept"
                        label="Accept">
                        <input className="win-interactive" type="text" />
                    </ReactWinJS.ToolBar.ContentCommand>

                    <ReactWinJS.ToolBar.Separator key="separator" />

                    <ReactWinJS.ToolBar.Button
                        key="chooseMe"
                        icon="add"
                        label="Choose Me"
                        onClick={this.handleUpdateResult.bind(null, "Choose Me")} />

                    <ReactWinJS.ToolBar.Toggle
                        key="toggleMe"
                        icon="accept"
                        label="Toggle Me"
                        selected={this.state.toggleSelected}
                        onClick={this.handleToggleMe} />

                    <ReactWinJS.ToolBar.FlyoutCommand
                        key="flyout"
                        icon="up"
                        label="Flyout"
                        flyoutComponent={subMenu} />

                    <ReactWinJS.ToolBar.Button
                        key="orMe"
                        section="secondary"
                        label="Or Me"
                        onClick={this.handleUpdateResult.bind(null, "Or Choose Me")} />

                    <ReactWinJS.ToolBar.Button
                        key="noMe"
                        section="secondary"
                        label="No Me!"
                        onClick={this.handleUpdateResult.bind(null, "No Me!")} />

                </ReactWinJS.ToolBar>
            </div>
        );
    }
});
/** @jsx React.DOM */

var React = require('react');
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
    componentDidUpdate: function (prevProps, prevState) {
        if (this.state.toolBarIsSmall !== prevState.toolBarIsSmall) {
            // Notify the ToolBar that is has been resized.
            this.refs.toolBar.winControl.forceLayout();
        }
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
                <p>Notice how the ToolBar puts commands into an overflow menu when it can't fit
                them in the primary area. You can control what gets overflowed first using
                the <code>priority</code> prop</p>
                <button className="win-button" onClick={this.handleToggleToolBarSize}>
                    Make ToolBar {this.state.toolBarIsSmall ? "Bigger" : "Smaller"}
                </button>
                <p>Clicked command: {this.state.result || "<null>"}</p>
                <p>Toggle selected: {this.state.toggleSelected.toString()}</p>
                
                <ReactWinJS.ToolBar ref="toolBar" style={{
                    width: this.state.toolBarIsSmall ? 400 : 640
                }}>

                    <ReactWinJS.ToolBar.ContentCommand
                        key="content"
                        icon="accept"
                        label="Accept">
                        <input className="win-textbox win-interactive" type="text" />
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
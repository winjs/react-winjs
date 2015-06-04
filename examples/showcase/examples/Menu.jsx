/** @jsx React.DOM */

var React = require('react');
var ReactWinJS = require('react-winjs');

module.exports = React.createClass({
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
                <button className="win-button" onClick={this.handleShowMenu}>Show Menu</button>
                <p>Clicked command: {this.state.result || "<null>"}</p>
                <p>Toggle selected: {this.state.toggleSelected.toString()}</p>
                
                <ReactWinJS.Menu ref="menu">

                    <ReactWinJS.Menu.Button
                        key="chooseMe"
                        label="Choose Me"
                        onClick={this.handleUpdateResult.bind(null, "Choose Me")} />

                    <ReactWinJS.Menu.Toggle
                        key="toggleMe"
                        label="Toggle Me"
                        selected={this.state.toggleSelected}
                        onClick={this.handleToggleMe} />

                    <ReactWinJS.Menu.Separator key="separator" />

                    <ReactWinJS.Menu.FlyoutCommand
                        key="more"
                        label="More"
                        flyoutComponent={subMenu} />

                </ReactWinJS.Menu>
            </div>
        );
    }
});
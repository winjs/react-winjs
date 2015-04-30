/** @jsx React.DOM */

var React = require('react/addons');
var ReactWinJS = require('react-winjs');

module.exports = React.createClass({
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
            <div>
                <p>Toggle selected: {this.state.toggleSelected.toString()}</p>
                
                <ReactWinJS.ToggleSwitch
                    checked={this.state.toggleSelected}
                    onChange={this.handleToggle}
                    labelOn="Switch is On"
                    labelOff="Switch is Off" />
            </div>
        );
    }
});
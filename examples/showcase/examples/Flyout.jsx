/** @jsx React.DOM */

var React = require('react');
var ReactWinJS = require('react-winjs');

module.exports = React.createClass({
    handleShow: function (eventObject) {
        var anchor = eventObject.currentTarget;
        this.refs.flyout.winControl.show(anchor);
    },
    render: function () {
        return (
            <div>
                <button className="win-button" onClick={this.handleShow}>Show Flyout</button>

                <ReactWinJS.Flyout ref="flyout">
                    <div>This is the flyout content!!</div>
                </ReactWinJS.Flyout>
            </div>
        );
    }
});
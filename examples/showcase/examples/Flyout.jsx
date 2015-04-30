/** @jsx React.DOM */

var React = require('react/addons');
var ReactWinJS = require('react-winjs');

module.exports = React.createClass({
    handleShow: function (eventObject) {
        var anchor = eventObject.currentTarget;
        this.refs.flyout.winControl.show(anchor);
    },
    getInitialState: function () {
        return {
            dialogResult: null
        };
    },
    render: function () {
        var dialogResult = this.state.dialogResult ?
            <div>Dialog Result: {this.state.dialogResult}</div> :
            null;

        return (
            <div>
                <button onClick={this.handleShow}>Show Flyout</button>

                <ReactWinJS.Flyout
                    ref="flyout">
                    <div>This is the flyout content!!</div>
                </ReactWinJS.Flyout>
            </div>
        );
    }
});
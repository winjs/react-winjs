/** @jsx React.DOM */

var React = require('react');
var ReactWinJS = require('react-winjs');

module.exports = React.createClass({
    handleShow: function () {
        this.refs.dialog.winControl.show().then(function (eventObject) {
            this.setState({ dialogResult: eventObject.result });
        }.bind(this));
    },
    getInitialState: function () {
        return {
            dialogResult: null
        };
    },
    render: function () {
        return (
            <div>
                <p>Dialog Result: {this.state.dialogResult || "<null>"}</p>
                <button className="win-button" onClick={this.handleShow}>Show ContentDialog</button>

                <ReactWinJS.ContentDialog
                    ref="dialog"
                    title="Urgent Message"
                    primaryCommandText="OK"
                    secondaryCommandText="Cancel">
                    <div>
                        This content will appear in the body of the ContentDialog. You can put <i>arbitrary</i> HTML in here.
                    </div>
                </ReactWinJS.ContentDialog>
            </div>
        );
    }
});
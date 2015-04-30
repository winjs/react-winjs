/** @jsx React.DOM */

var React = require('react/addons');
var ReactWinJS = require('react-winjs');

module.exports = React.createClass({
    render: function () {
        return (
            <ReactWinJS.Pivot style={{height: 100}}>
                <ReactWinJS.Pivot.Item key="itemA" header="First">
                    <div>Pivots are useful for varied content.</div>
                </ReactWinJS.Pivot.Item>
                <ReactWinJS.Pivot.Item key="itemB" header="Second">
                    <div>This pivot is boring.</div>
                </ReactWinJS.Pivot.Item>
                <ReactWinJS.Pivot.Item key="itemC" header="Tail...">
                    <div>Because it's only purpose is to show how to create a pivot.</div>
                </ReactWinJS.Pivot.Item>
            </ReactWinJS.Pivot>
        );
    }
});
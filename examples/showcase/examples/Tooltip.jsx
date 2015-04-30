/** @jsx React.DOM */

var React = require('react/addons');
var ReactWinJS = require('react-winjs');

module.exports = React.createClass({
    render: function () {
        var contentComponent = <div>This can contain arbitrary content, like images</div>;

        return (
            <ReactWinJS.Tooltip
                contentComponent={contentComponent}>
                <div>This has a tooltip, hover and see...</div>
            </ReactWinJS.Tooltip>
        );
    }
});
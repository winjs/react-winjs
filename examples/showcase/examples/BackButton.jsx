/** @jsx React.DOM */

var React = require('react/addons');
var ReactWinJS = require('react-winjs');

module.exports = React.createClass({
    render: function () {
        return (
            <ReactWinJS.BackButton />
        );
    }
});
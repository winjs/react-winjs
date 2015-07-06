/** @jsx React.DOM */

var React = require('react');

var urlToContent = {
    "new": "What's New",
    groups: "Groups",
    settings: "Settings"
};

var OtherPage = React.createClass({
    propTypes: {
        location: React.PropTypes.array.isRequired
    },
    render: function () {
        var title = urlToContent[this.props.location] || "Other";
        return <h2 className="win-h2" style={{marginLeft: "10px"}}>{title}</h2>
    }
});

module.exports = OtherPage;

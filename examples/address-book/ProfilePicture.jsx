/** @jsx React.DOM */

var React = require('react');

function cssUrl(url) {
    return "url(" + url + ")";
}

var ProfilePicture = React.createClass({
    render: function () {
        var size = this.props.size;
        return (
            <div className="profilePicture" style={{
                backgroundImage: cssUrl(this.props.backgroundUrl),
                width: size,
                height: size,
                WebkitBorderRadius: size,
                MozBorderRadius: size,
                borderRadius: size,
                backgroundSize: "cover",
                display: "inline-block"
            }}>
                <img src="profile.png" height={size} width={size} />
            </div>
        );
    }
});

module.exports = ProfilePicture;

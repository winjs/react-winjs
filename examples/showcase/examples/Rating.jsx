/** @jsx React.DOM */

var React = require('react');
var ReactWinJS = require('react-winjs');

module.exports = React.createClass({
    handleChangeRating: function (eventObject) {
        var ratingControl = eventObject.currentTarget.winControl;
        this.setState({ rating: ratingControl.userRating });
    },
    handleAddToRating: function (amount) {
        this.setState({ rating: this.state.rating + amount });
    },
    getInitialState: function () {
        return {
            rating: 0
        };
    },
    render: function () {
        return (
            <div>
                <div>
                    <button className="win-button" onClick={this.handleAddToRating.bind(null, -1)}>-1</button>
                    <button className="win-button" onClick={this.handleAddToRating.bind(null, 1)}>+1</button>
                </div>
                <p>Current Rating: {this.state.rating}</p>

                <ReactWinJS.Rating
                    userRating={this.state.rating}
                    maxRating={8}
                    onChange={this.handleChangeRating} />
            </div>
        );
    }
});
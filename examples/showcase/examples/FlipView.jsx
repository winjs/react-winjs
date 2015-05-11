/** @jsx React.DOM */

var React = require('react');
var ReactWinJS = require('react-winjs');

module.exports = React.createClass({
    flipViewItemRenderer: ReactWinJS.reactRenderer(function (item) {
        return (
            <div style={{height: "200px"}}>
                The rating of this flip view item is: {item.data.rating}
            </div>
        );
    }),
    getInitialState: function () {
        return {
            ratingsList: new WinJS.Binding.List([
                { rating: 4 },
                { rating: 2 }
            ])
        };
    },
    render: function () {
        return (
            <ReactWinJS.FlipView
                style={{height: "200px", width: "200px"}}
                itemDataSource={this.state.ratingsList.dataSource}
                itemTemplate={this.flipViewItemRenderer} />
        );
    }
});
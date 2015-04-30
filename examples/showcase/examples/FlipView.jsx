/** @jsx React.DOM */

var React = require('react/addons');
var ReactWinJS = require('react-winjs');

module.exports = React.createClass({
    flipViewItemRenderer: ReactWinJS.reactRenderer(function (item) {
        return (
            <div style={{height: 200}}>
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
                style={{height: 200, width: 200}}
                itemDataSource={this.state.ratingsList.dataSource}
                itemTemplate={this.flipViewItemRenderer} />
        );
    }
});
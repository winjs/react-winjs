/** @jsx React.DOM */

var React = require('react/addons');
var ReactWinJS = require('react-winjs');

// See CSS styles for win-container in index.html

module.exports = React.createClass({
    itemRenderer: ReactWinJS.reactRenderer(function (item) {
        return <div>{item.data.title}</div>;
    }),
    getInitialState: function () {
        return {
            list: new WinJS.Binding.List([
                { title: "Apple" },
                { title: "Banana" },
                { title: "Grape" },
                { title: "Lemon" },
                { title: "Mint" },
                { title: "Orange" },
                { title: "Pineapple" },
                { title: "Strawberry"}
            ]),
            layout: { type: WinJS.UI.ListLayout }
        };
    },
    render: function () {
        return (
            <ReactWinJS.ListView
                className="listViewExample win-selectionstylefilled"
                style={{height: 200}}
                itemDataSource={this.state.list.dataSource}
                itemTemplate={this.itemRenderer}
                layout={this.state.layout}
                selectionMode="single"
                tapBehavior="directSelect" />
        );
    }
});
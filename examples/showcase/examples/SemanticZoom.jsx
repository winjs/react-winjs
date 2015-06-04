/** @jsx React.DOM */

var React = require('react');
var ReactWinJS = require('react-winjs');

// See CSS styles for win-container in index.html

function groupKey(item) {
    return item.title[0];
}

function groupData(item) {
    return { title: item.title[0] };
}

module.exports = React.createClass({
    itemRenderer: ReactWinJS.reactRenderer(function (item) {
        return <div>{item.data.title}</div>;
    }),
    groupHeaderRenderer: ReactWinJS.reactRenderer(function (item) {
        return <div>{item.data.title}</div>;
    }),
    handleToggleZoom: function (eventObject) {
        this.setState({ zoomedOut: !this.state.zoomedOut });
    },
    handleZoomChanged: function (eventObject) {
        this.setState({ zoomedOut: eventObject.detail });
    },
    getInitialState: function () {
        return {
            list: new WinJS.Binding.List([
                { title: "Aaron" },
                { title: "Adam" },
                { title: "Allison" },
                { title: "Barry" },
                { title: "Bill" },
                { title: "Brad" },
                { title: "Bridget" },
                { title: "Brett" },
                { title: "Carly" },
                { title: "Carol" },
                { title: "Charles" },
                { title: "Chris" },
                { title: "Daisy" },
                { title: "Dan" },
                { title: "Denise" },
                { title: "Derek" },
                { title: "Earl" },
                { title: "Emily" },
                { title: "Emma" },
                { title: "Erika" },
                { title: "Ethan" },
                { title: "Finley" },
                { title: "Florence" },
                { title: "Frank" },
                { title: "Fred" }
                
            ]).createGrouped(groupKey, groupData),
            layout: { type: WinJS.UI.ListLayout },
            zoomedOut: false
        };
    },
    render: function () {
        var zoomedInView = <ReactWinJS.ListView
            className="zoomedInListView win-selectionstylefilled"
            itemDataSource={this.state.list.dataSource}
            itemTemplate={this.itemRenderer}
            groupDataSource={this.state.list.groups.dataSource}
            groupHeaderTemplate={this.groupHeaderRenderer}
            layout={this.state.layout}
            selectionMode="single"
            tapBehavior="directSelect" />;

        var zoomedOutView = <ReactWinJS.ListView
            className="zoomedOutListView"
            itemDataSource={this.state.list.groups.dataSource}
            itemTemplate={this.itemRenderer}
            layout={this.state.layout} />;

        return (
            <div>
                <button className="win-button" onClick={this.handleToggleZoom}>
                    Zoom {this.state.zoomedOut ? "In" : "Out"}
                </button>
                <ReactWinJS.SemanticZoom
                    className="seZoExample"
                    style={{height: "400px"}}
                    zoomedInComponent={zoomedInView}
                    zoomedOutComponent={zoomedOutView}
                    zoomedOut={this.state.zoomedOut}
                    onZoomChanged={this.handleZoomChanged} />
            </div>
        );
            
    }
});
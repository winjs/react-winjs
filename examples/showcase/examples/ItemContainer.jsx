/** @jsx React.DOM */

var React = require('react');
var ReactWinJS = require('react-winjs');

module.exports = React.createClass({
    handleSelectionChanged: function (eventObject) {
        var itemContainer = eventObject.currentTarget.winControl;
        this.setState({ selected: itemContainer.selected });
    },
    getInitialState: function () {
        return {
            selected: true
        };
    },
    render: function () {
        return (
            <ReactWinJS.ItemContainer
                style={{margin: "5px", height: "80px", width: "252px"}}
                tapBehavior="toggleSelect"
                selected={this.state.selected}
                onSelectionChanged={this.handleSelectionChanged}>
                <div style={{padding: "5px"}}>
                    <h4 className="win-h4">Marvelous Mint</h4>
                    <h6 className="win-h6">Gelato</h6>
                    Selected: {this.state.selected.toString()}
                </div>
            </ReactWinJS.ItemContainer>
        );
    }
});
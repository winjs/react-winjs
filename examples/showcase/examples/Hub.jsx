/** @jsx React.DOM */

var React = require('react/addons');
var ReactWinJS = require('react-winjs');

module.exports = React.createClass({
    handleHeaderInvoked: function (eventObject) {
        if (eventObject.detail.index === 1) {
            this.setState({ counter: this.state.counter + 1 });
        }
    },
    getInitialState: function () {
        return {
            counter: 0
        };
    },
    render: function () {
        return (
            <ReactWinJS.Hub
                style={{height: 500}}
                onHeaderInvoked={this.handleHeaderInvoked}>
                <ReactWinJS.Hub.Section
                    key="sectionA"
                    header="First section"
                    isHeaderStatic={true}>
                    <div>Hubs are useful for varied content.</div>
                </ReactWinJS.Hub.Section>
                <ReactWinJS.Hub.Section key="sectionB" header="The second section">
                    <div>
                        This section's header was clicked {this.state.counter} time(s).
                        This hub is boring.
                    </div>
                </ReactWinJS.Hub.Section>
                <ReactWinJS.Hub.Section key="sectionC" header="The tail">
                    <div>Because it's only purpose is to show how to create a hub.</div>
                </ReactWinJS.Hub.Section>
            </ReactWinJS.Hub>
        );
    }
});
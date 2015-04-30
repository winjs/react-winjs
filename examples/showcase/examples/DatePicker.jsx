/** @jsx React.DOM */

var React = require('react/addons');
var ReactWinJS = require('react-winjs');

module.exports = React.createClass({
    handleDateChange: function (eventObject) {
        var datePicker = eventObject.currentTarget.winControl;
        this.setState({ date: datePicker.current });
    },
    getInitialState: function () {
        return {
            date: new Date()
        };
    },
    render: function () {
        return (
            <div>
                <p>Date: {this.state.date.toDateString()}</p>
                <ReactWinJS.DatePicker
                    current={this.state.date}
                    onChange={this.handleDateChange}
                    minYear={1980}
                    maxYear={2050} />
            </div>
        );
    }
});
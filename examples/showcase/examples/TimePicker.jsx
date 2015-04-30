/** @jsx React.DOM */

var React = require('react/addons');
var ReactWinJS = require('react-winjs');

function formattedTime(time) {
    var rawHours = time.getHours();
    var amPM = rawHours < 12 ? "AM" : "PM";
    var hours = rawHours < 12 ? rawHours : (rawHours - 12);
    hours = hours === 0 ? 12 : hours;
    var rawMinutes = time.getMinutes();
    var minutes = (rawMinutes < 10 ? "0" : "") + rawMinutes;

    return hours + ":" + minutes + " " + amPM;
}

module.exports = React.createClass({
    handleTimeChange: function (eventObject) {
        var timePicker = eventObject.currentTarget.winControl;
        this.setState({ time: timePicker.current });
    },
    getInitialState: function () {
        return {
            time: new Date()
        };
    },
    render: function () {
        return (
            <div>
                <p>Time: {formattedTime(this.state.time)}</p>

                <ReactWinJS.TimePicker
                    current={this.state.time}
                    onChange={this.handleTimeChange} />
            </div>
        );
    }
});
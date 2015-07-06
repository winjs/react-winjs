/** @jsx React.DOM */

var React = require('react');
var ReactWinJS = require('react-winjs');
var ProfilePicture = require('./ProfilePicture.jsx');

function calc100PercentMinus(n) {
    return n === 0 ?
        "100%" :
        "calc(100% - " + (n + "px") + ")";
}

var PeoplePage = React.createClass({
    handleToggleSelectionMode: function () {
        this.setState({
            selectionMode: !this.state.selectionMode
        });
        this.props.onNavigate(["people"]);
        this.refs.listView.winControl.selection.clear();
    },
    handleSelectionChanged: function (eventObject) {
        var listView = eventObject.currentTarget.winControl;
        var indices = listView.selection.getIndices();
        // Post to avoid navigating while in the middle of the event handler
        setTimeout(function () {
            this.setState({ selectedPeople: indices });
            this.props.onNavigate(indices.length === 1 && !this.state.selectionMode ? ["people", indices[0]] : ["people"]);
        }.bind(this), 0);
    },
    handleDelete: function () {
        var people = this.props.people;
        var indices = this.state.selectedPeople;
        indices.sort();
        indices.reverse();
        indices.forEach(function (i) {
            people.splice(i, 1);
        });
        this.setState({
            selectedPeople: [],
            selectionMode: false
        });
        this.props.onPeopleChanged(people);
    },
    handleContentAnimating: function (eventObject) {
        // Disable ListView's entrance animation
        if (eventObject.detail.type === "entrance") {
            eventObject.preventDefault();
        }
    },
    personRenderer: ReactWinJS.reactRenderer(function (person) {
        return (
            <div>
                <ProfilePicture backgroundUrl={person.data.picture} size={34} />
                <span className="name">{person.data.name}</span>
            </div>
        );
    }),
    groupHeaderRenderer: ReactWinJS.reactRenderer(function (item) {
        return (
            <div>{item.data.title}</div>
        );
    }),
    renderPeoplePane: function (peoplePaneWidth) {
        var deleteCommand = (
            <ReactWinJS.ToolBar.Button
                key="delete"
                icon="delete"
                priority={0}
                disabled={this.state.selectedPeople.length === 0}
                onClick={this.handleDelete} />
        );

        return (
            <div className="peopleSearchPane" style={{height: "100%", width: peoplePaneWidth, display: "inline-block", verticalAlign:"top"}}>
                <ReactWinJS.ToolBar className="peopleToolBar">
                    <ReactWinJS.ToolBar.Button
                        key="edit"
                        icon="edit"
                        label="Edit"
                        priority={4} />
                    <ReactWinJS.ToolBar.Button
                        key="favorite"
                        icon="favorite"
                        label="Favorite"
                        priority={3} />
                    <ReactWinJS.ToolBar.Button
                        key="link"
                        icon="link"
                        label="Link"
                        priority={2} />
                    <ReactWinJS.ToolBar.Button
                        key="refresh"
                        icon="refresh"
                        label="Refresh"
                        priority={1} />

                    <ReactWinJS.ToolBar.Button
                        key="add"
                        icon="add"
                        label="Add"
                        priority={0} />
                    {this.state.selectionMode ? deleteCommand : null}
                    <ReactWinJS.ToolBar.Toggle
                        key="select"
                        icon="bullets"
                        label="Select"
                        priority={0}
                        selected={this.state.selectionMode}
                        onClick={this.handleToggleSelectionMode} />
                </ReactWinJS.ToolBar>

                <ReactWinJS.ListView
                    ref="listView"
                    className="peopleListView win-selectionstylefilled"
                    style={{height: "calc(100% - 48px)"}}
                    itemDataSource={this.props.people.dataSource}
                    itemTemplate={this.personRenderer}
                    groupDataSource={this.props.people.groups.dataSource}
                    groupHeaderTemplate={this.groupHeaderRenderer}
                    layout={this.state.layout}
                    selectionMode={this.state.selectionMode ? "multi" : "single"}
                    tapBehavior={this.state.selectionMode ? "toggleSelect" : "directSelect"}
                    onSelectionChanged={this.handleSelectionChanged}
                    onContentAnimating={this.handleContentAnimating} />
            </div>
        );
    },
    renderProfilePane: function (selectedIndex, peoplePaneWidth) {
        if (selectedIndex === null) {
            return (
                <div className="profilePane" style={{height: "100%", width: calc100PercentMinus(peoplePaneWidth), display: "inline-block",verticalAlign:"top"}}>
                    <div style={{display: "flex", height: "100%", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                        <h1 className="win-h1" style={{color: "grey"}}>No Selection</h1>
                    </div>
                </div>
            );
        } else {
            var selectedPerson = this.props.people.getAt(selectedIndex);
            return (
                <div className="profilePane" style={{height: "100%", width: calc100PercentMinus(peoplePaneWidth), display: "inline-block",verticalAlign:"top"}}>
                    <div className="profileHeader">
                        <div className="name">{selectedPerson.name}</div>
                        <div className="personInfo">
                            <ProfilePicture backgroundUrl={selectedPerson.picture} size={100} />
                            <div className="profileStatus">
                                <span className="message">
                                    {selectedPerson.status}
                                </span>
                                <span className="source">{selectedPerson.statusHoursAgo} hours ago</span>
                            </div>
                        </div>
                    </div>
                    <div className="separator" />
                    <div className="profileContent">
                        <ul>
                            <li><span className="messageIcon" />Message</li>
                            <li>
                                <span className="phoneIcon" />
                                <div className="callContent">
                                    <a href="call:5550100">Call Mobile</a>
                                    <div className="number">{selectedPerson.mobilePhone}</div>
                                </div>
                            </li>
                            <li>
                                <span className="phoneIcon" />
                                <div className="callContent">
                                    <a href="call:5550100">Call Work</a>
                                    <div className="number">{selectedPerson.workPhone}</div>
                                </div>
                            </li>
                            <li><span className="phoneIcon" />Call using an app</li>
                            <li><span className="videoCallIcon" />Video call</li>
                            <li><span className="emailIcon" />Email work</li>
                            <li><span className="mapIcon" />Map home</li>
                        </ul>
                    </div>
                </div>
            );
        }
    },
    propTypes: {
        mode: React.PropTypes.oneOf(["small", "medium", "large"]).isRequired,
        people: React.PropTypes.object.isRequired,
        location: React.PropTypes.array.isRequired,
        onNavigate: React.PropTypes.func.isRequired,
        onPeopleChanged: React.PropTypes.func.isRequired
    },
    getInitialState: function () {
        return {
            layout: { type: WinJS.UI.ListLayout },
            selectedPeople: [],
            selectionMode: false
        };
    },
    render: function () {
        var selectedIndex = this.props.location.length >= 2 ? this.props.location[1] : null;

        if (this.props.mode === "small") {
            if (selectedIndex === null) {
                return this.renderPeoplePane("100%");
            } else {
                return this.renderProfilePane(selectedIndex, 0);
            }
        } else {
            var peoplePaneWidth = 320;
            return (
                <div style={{height: "100%"}}>
                    {this.renderPeoplePane(peoplePaneWidth)}
                    {this.renderProfilePane(selectedIndex, peoplePaneWidth)}
                </div>
            );
        }
    }
});

module.exports = PeoplePage;

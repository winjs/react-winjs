/** @jsx React.DOM */

var React = require('react');
var ReactWinJS = require('react-winjs');

// title is:
//   - Displayed as the title of the sample
//   - Used as the anchor ID of the sample
//   - Used to find the path to the source code of the sample. Specifically:
//     './examples/<title>.jsx'
var examples = [
    { title: "AppBar", componenent: require('./examples/AppBar.jsx') },
    { title: "AutoSuggestBox", componenent: require('./examples/AutoSuggestBox.jsx') },
    { title: "BackButton", componenent: require('./examples/BackButton.jsx') },
    { title: "ContentDialog", componenent: require('./examples/ContentDialog.jsx') },
    { title: "DatePicker", componenent: require('./examples/DatePicker.jsx') },
    { title: "FlipView", componenent: require('./examples/FlipView.jsx') },
    { title: "Flyout", componenent: require('./examples/Flyout.jsx') },
    { title: "Hub", componenent: require('./examples/Hub.jsx') },
    { title: "ItemContainer", componenent: require('./examples/ItemContainer.jsx') },
    { title: "ListView", componenent: require('./examples/ListView.jsx') },
    { title: "Menu", componenent: require('./examples/Menu.jsx') },
    { title: "NavBar", componenent: require('./examples/NavBar.jsx') },
    { title: "Pivot", componenent: require('./examples/Pivot.jsx') },
    { title: "Rating", componenent: require('./examples/Rating.jsx') },
    { title: "SemanticZoom", componenent: require('./examples/SemanticZoom.jsx') },
    { title: "SplitView", componenent: require('./examples/SplitView.jsx') },
    { title: "TimePicker", componenent: require('./examples/TimePicker.jsx') },
    { title: "ToggleSwitch", componenent: require('./examples/ToggleSwitch.jsx') },
    { title: "ToolBar", componenent: require('./examples/ToolBar.jsx') },
    { title: "Tooltip", componenent: require('./examples/Tooltip.jsx') }
];

var baseSourceUrl = "https://github.com/winjs/react-winjs/tree/master/examples/" +
    "showcase/examples/";
var styles = {
    viewport: { height: "100%", overflow: "auto" },
    surface: { paddingBottom: 96 + 10 }, // Leave room for bottom AppBar/NavBar
    example: { paddingBottom: 30 },
    exampleTitle: { paddingBottom: 10 },
    sourceLink: { paddingLeft: 5 }
};

var App = React.createClass({
    handleToggleAppBar: function (exampleTitle) {
        this.setState({
            exampleWithAppBar: this.state.exampleWithAppBar === exampleTitle ? null : exampleTitle
        });
    },
    getInitialState: function () {
        return {
            // To prevent AppBars from occluding each other, only one example
            // should show an AppBar at a time.
            exampleWithAppBar: null
        };
    },
    render: function() {
        var tableOfContents = examples.map(function (example) {
            return <li key={example.title}><a className="win-link" href={"#" + example.title}>{example.title}</a></li>;
        });

        var exampleMarkup = examples.map(function (example) {
            var sourceUrl = baseSourceUrl + example.title + ".jsx";

            return (
                <div style={styles.example} id={example.title} key={example.title} className="example">
                    <h3 className="win-h3" style={styles.exampleTitle}>
                        {example.title}
                        <a
                            style={styles.sourceLink}
                            href={sourceUrl}
                            target="_blank"
                            className="win-link win-type-base">
                            (view source)
                        </a>
                    </h3>
                    <example.componenent
                        appBarShown={this.state.exampleWithAppBar === example.title}
                        onToggleAppBar={this.handleToggleAppBar.bind(null, example.title)} />
                </div>
            );
        }, this);

        return (
            <div className="viewport" style={styles.viewport}>
                <div className="surface" style={styles.surface}>
                    <h1 className="win-h1"><a className="win-link" href="https://github.com/winjs/react-winjs">react-winjs</a> Control Showcase</h1>

                    <h3 className="win-h3">Table of Contents</h3>
                    <ul>{tableOfContents}</ul>

                    {exampleMarkup}
                </div>
            </div>
        );
    }
});

React.render(<App />, document.getElementById("app"));

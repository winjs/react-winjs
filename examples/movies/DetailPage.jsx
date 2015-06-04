/** @jsx React.DOM */

var React = require('react');
var ReactWinJS = require('react-winjs');
var Score = require('./Score.jsx');
var formattedScore = Score.formattedScore;
var textColoredForScore = Score.textColoredForScore;

var styles = {
    root: {
        marginLeft: "5px",
        marginRight: "5px"
    },
    header: {
        root: {
            display: "flex",
            flexDirection: "row"
        },
        backButton: {
            marginRight: "10px",
            flex: "none"
        },
        title: {
            marginBottom: "10px",
            flex: "1 1"
        }
    },
    detail: {
        root: {
            display: "flex"
        },
        poster: {
            marginRight: "10px",
            flex: "none",
            alignSelf: "center"
        },
        info: {
            flex: "1 1",
            alignSelf: "flex-start"
        },
        rating: {
            display: "inline-block",
            padding: "2px",
            border: "2px solid black",
            marginBottom: "15px",
            fontFamily: "Palatino",
            fontSize: "20px"
        },
        actors: {
            marginTop: "0",
            marginBottom: "0"
        }
    }
};

module.exports = React.createClass({
    render: function () {
        var movie = this.props.movie;
        var criticsScore = movie.ratings.critics_score;
        var audienceScore = movie.ratings.audience_score;
        var actors = movie.abridged_cast.map(function (person) {
            return <li key={person.name}>{person.name}</li>;
        });

        return (
            <div style={styles.root}>
                <div style={styles.header.root}>
                    <ReactWinJS.BackButton style={styles.header.backButton} />
                    <h2 className="win-h2" style={styles.header.title}>{movie.title} ({movie.year})</h2>
                </div>
                <div style={styles.detail.root}>
                    <img style={styles.detail.poster} src={movie.posters.detailed} width={153} height={243} />
                    <div style={styles.detail.info}>
                        <div style={styles.detail.rating}>{movie.mpaa_rating}</div>
                        <h3 className="win-h3">Critics:</h3>
                        <h2 className="win-h2">{textColoredForScore(formattedScore(criticsScore), criticsScore)}</h2>
                        <h3 className="win-h3">Audience:</h3>
                        <h2 className="win-h2">{textColoredForScore(formattedScore(audienceScore), audienceScore)}</h2>
                    </div>
                </div>
                <hr />
                <div>{movie.synopsis}</div>
                <hr />
                <div>
                    Actors
                    <ul style={styles.detail.actors}>{actors}</ul>
                </div>
            </div>
        );
    }
});
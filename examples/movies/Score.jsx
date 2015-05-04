/** @jsx React.DOM */

function formattedScore(score) {
    return score >= 0 ? score + "%" : "N/A";
}

var maxColor = 200;
function colorForScore(score) {
    if (score >= 0) {
        var scoreAsColor = Math.round(score / 100 * maxColor);
        return "rgb(" + [maxColor - scoreAsColor, scoreAsColor, 0].join(",") + ")";
    } else {
        return "rgb(0, 0, 0)";
    }

}

function textColoredForScore(text, score) {
    return <span style={{color: colorForScore(score)}}>{text}</span>;
}

module.exports = {
	formattedScore: formattedScore,
	textColoredForScore: textColoredForScore
};
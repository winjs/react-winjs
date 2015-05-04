var nextMovieId = 0;
var ratings = ["Unrated", "G", "PG", "PG-13", "R"];
var firstNames = ["Charlsie", "Ofelia", "Jerome", "Leana", "Harlan", "Annalisa", "Leida", "Dessie", "Valrie", "Sharen", "Sergio", "Mitzie", "Celia", "Debbra", "Florida", "Kara", "Jacquie", "Sherley", "Carson", "Staci", "Paula", "Dann", "Linette", "Meri", "Almeta", "Detra", "Lupe", "Neville", "Marivel", "Carmine", "Carina", "Laureen", "Lourdes", "Laverne", "Verona", "Gertha", "Jene", "Joslyn", "Jone", "Latoya", "Margurite", "Emmett", "Wallace", "Elana", "Xiomara", "Sabra", "Ouida", "Kenton", "Norene", "Raul"];
var lastNames = ["Avey", "Crofoot", "Flor", "Barletta", "Zoller", "Rosson", "Coomes", "Wilken", "Withey", "Ojeda", "Mennella", "Gauer", "Puccio", "Zimmerer", "Cottrell", "Bridgman", "Gershman", "Tinoco", "Ayoub", "Fournier", "Marcella", "Melrose", "Lafontaine", "Cathcart", "Cioffi", "Sands", "Lei", "Cardoso", "Dela", "Metcalfe", "Ethridge", "Fryer", "Warden", "Madson", "Gonsales", "Tobey", "Knecht", "Gallion", "Thibault", "Brockington", "Baney", "Haddox", "Kang", "Galyean", "Riccio", "Lake", "Mirabella", "Frechette", "Rearick", "Carmouche"];
var loremIpsum = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur",
    "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?",
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.",
];
var words = loremIpsum.join(" ").replace(/,|!|\?|\./g, "").replace(/-/g, " ").split(" ");

var posterWidth = 153;
var posterHeight = 243;
var _canvas;
function makePoster(color) {
    if (!_canvas) {
        _canvas = document.createElement("canvas");
        _canvas.width = posterWidth;
        _canvas.height = posterHeight;
    }
    var ctxt = _canvas.getContext("2d");
    ctxt.fillStyle = color;
    ctxt.fillRect(0, 0, posterWidth, posterHeight);
    return _canvas.toDataURL();
}

var posterColors = [
    [68, 34, 87], [100, 66, 119], [132, 98, 151],
    [164, 162, 165], [196, 194, 197], [228, 226, 229]
];
var posters = posterColors.map(function (color) {
    return makePoster("rgb(" + color.join(", ") + ")");
});

function randomInt(first, last) {
    return Math.round(Math.random() * (last - first)) + first;
}

function randomElement(array) {
    return array[randomInt(0, array.length - 1)];
}

function genArray(minLength, maxLength, genElement) {
    var len = randomInt(minLength, maxLength);
    var result = new Array(len);
    for (var i = 0; i < len; i++) {
        result[i] = genElement();
    }
    return result;
}

function genActor() {
    return { name: randomElement(firstNames) + " " + randomElement(lastNames) };
}

function genTitleWord() {
    var word = randomElement(words).toLowerCase();
    return word[0].toUpperCase() + word.substr(1);
}

function genMovie() {
    return {
        id: nextMovieId++,
        title: (nextMovieId - 1 + " ") + genArray(1, 5, genTitleWord).join(" "),
        year: randomInt(1950, 2015),
        mpaa_rating: randomElement(ratings),
        synopsis: randomElement(loremIpsum),
        posters: {
            detailed: randomElement(posters)
        },
        ratings: {
            critics_score: randomInt(0, 100),
            audience_score: randomInt(0, 100)
        },
        abridged_cast: genArray(1, 8, genActor)
    };
}

var movieCount = 1000;
var movies = genArray(movieCount, movieCount, genMovie);
var moviesPerPage = 20;
var fetchDelay = 500;

function getSearchResults(query, page) {
    query = query.toLowerCase();
    var start = (page - 1) * moviesPerPage;
    var results = movies.filter(function (m) {
        return m.title.toLowerCase().indexOf(query) !== -1;
    });
    return WinJS.Promise.timeout(fetchDelay).then(function () {
        return {
            movies: results.slice(start, start + moviesPerPage),
            total: results.length
        };
    });
}

function getInTheaters(page) {
    var start = (page - 1) * moviesPerPage;
    return WinJS.Promise.timeout(fetchDelay).then(function () {
        return {
            movies: movies.slice(start, start + moviesPerPage),
            total: movies.length
        };
    });
}

module.exports = {
    getSearchResults: getSearchResults,
    getInTheaters: getInTheaters
};
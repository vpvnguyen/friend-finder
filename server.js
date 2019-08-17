var express = require('express');
var app = express();
var path = require('path');

var PORT = process.env.PORT || 3000;
// MySQL DB Connection Information (remember to change this with our specific credentials)
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "friendsFinder"
});

// Initiate MySQL Connection.
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

// express middleware; parse json
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// serve static pages from public folder
app.use(express.static('./app/data/public'));

// routing
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './app/data/public/home.html'));
});

app.get('/survey', (req, res) => {
    res.sendFile(path.join(__dirname, './app/data/public/survey.html'));
});

// Displays all characters
app.get("/api/characters", function (req, res) {
    return res.json(characters);
});

// Displays a single character, or returns false
app.get("/api/characters/:character", function (req, res) {
    var chosen = req.params.character;

    console.log(chosen);

    // for (var i = 0; i < characters.length; i++) {
    //   if (chosen === characters[i].routeName) {
    //     return res.json(characters[i]);
    //   }
    // }

    // return res.json(false);

    // faster way to search for route except for looping
    var char = characters.find(function (elementOfArray) {
        return chosen === elementOfArray.routeName
    })
    if (char) {
        res.json(char);
    } else {
        return res.send('no character found')
    }
});

// Create New Characters - takes in JSON input
app.post("/api/characters", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newCharacter = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

    console.log(newCharacter);

    characters.push(newCharacter);

    res.json(newCharacter);
});

// listen for route
app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
});
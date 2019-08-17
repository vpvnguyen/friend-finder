var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');

var PORT = process.env.PORT || 3000;

// MySQL DB Connection Information (remember to change this with our specific credentials)
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "friendFinder"
});

// Initiate MySQL Connection.
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("MySQL connected as id " + connection.threadId);
});

// express middleware; parse json
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// serve static pages from public folder
app.use(express.static('./app/data/public'));

// ROUTING
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './app/data/public/home.html'));
});

app.get('/survey', (req, res) => {
    res.sendFile(path.join(__dirname, './app/data/public/survey.html'));
});

app.post('/survey', (req, res) => {
    // get data from forms and add to the table called user..

    console.log(res);

    // connection.query("INSERT INTO user (Name, Email, Address, City, Country, password) VALUES", (name, email, address, city, country, password), function (err, result) {
    //     if (err) throw err;
    //     console.log("1 record inserted");

})

// get data about person name
app.get("/api/:name", function (req, res) {

    var personName = req.params.name;
    // If the main route is hit, then we initiate a SQL query to grab all records.
    // All of the resulting records are stored in the variable "result."

    connection.query("SELECT * FROM friends WHERE name=?", personName, function (err, result) {
        if (err) throw err;
        // We then begin building out HTML elements for the page.
        var html = "<h1> Person </h1>";

        // Here we begin an unordered list.
        html += "<ul>";

        // We then use the retrieved records from the database to populate our HTML file.
        for (var i = 0; i < result.length; i++) {
            html += "<li><p> ID: " + result[i].id + "</p>";
            html += "<p>name: " + result[i].name + " </p>"
            html += "<p>answer1: " + result[i].answer1 + " </p>"
            html += "<p>answer2: " + result[i].answer2 + " </p></li>";
        }

        // We close our unordered list.
        html += "</ul>";

        // Finally we send the user the HTML file we dynamically created.
        res.send(html);
    });
});

// display everything from DB
app.get("/all", function (req, res) {

    // If the main route is hit, then we initiate a SQL query to grab all records.
    // All of the resulting records are stored in the variable "result."

    // SELECT * FROM actors ORDER BY coolness_points DESC;
    connection.query("SELECT * FROM friends", function (err, result) {
        if (err) throw err;
        // We then begin building out HTML elements for the page.
        var html = "<h1> all </h1>";

        // Here we begin an unordered list.
        html += "<ul>";

        // We then use the retrieved records from the database to populate our HTML file.
        for (var i = 0; i < result.length; i++) {
            html += "<li><p> ID: " + result[i].id + "</p>";
            html += "<p>name: " + result[i].name + " </p>"
            html += "<p>email: " + result[i].email + " </p>"
            html += "<p>answer1: " + result[i].answer1 + " </p>"
            html += "<p>answer2: " + result[i].answer2 + " </p>"
            html += "<p>answer3: " + result[i].answer3 + " </p>"
            html += "<p>answer4: " + result[i].answer4 + " </p>"
            html += "<p>answer5: " + result[i].answer5 + " </p>"
            html += "<p>answer6: " + result[i].answer6 + " </p>"
            html += "<p>answer7: " + result[i].answer7 + " </p>"
            html += "<p>answer8: " + result[i].answer8 + " </p>"
            html += "<p>answer9: " + result[i].answer9 + " </p>"
            html += "<p>answer10: " + result[i].answer10 + " </p></li>";

        }

        // We close our unordered list.
        html += "</ul>";

        // Finally we send the user the HTML file we dynamically created.
        res.send(html);
    });
});

// listen for route
app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
});
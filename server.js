var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');

// use provided port or default to 3000
var PORT = process.env.PORT || 3000;

// CONNECT MYSQL
// mysql connection config (remember to change this with your own credentials)
var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'friendFinder'
});

// connected to mysql
connection.connect(function (err) {
    if (err) {
        console.error(`error connecting: ${err.stack}`);
        return;
    }
    console.log(`MySQL connected as id ${connection.threadId}`);
});

// MIDDLEWARE
// parse request body as json
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// serve static pages from public folder; css / front js handling
app.use(express.static('./app/data/public'));

// ROUTING
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './app/data/public/home.html'));
});

app.get('/survey', (req, res) => {
    res.sendFile(path.join(__dirname, './app/data/public/survey.html'));
});

// get data about person name
app.get('/api/:name', function (req, res) {

    // get user's name from route and query for all user info
    var userProfile = req.params.name;

    connection.query(`SELECT * FROM friends WHERE name=?`, userProfile, function (err, result) {
        if (err) throw err;
        // We then begin building out HTML elements for the page.
        var html = '<h1> Person </h1>';

        // Here we begin an unordered list.
        html += '<ul>';

        // We then use the retrieved records from the database to populate our HTML file.
        for (var i = 0; i < result.length; i++) {
            html += `<li><p> ID: ${result[i].id}</p>`;
            html += `<p>name: ${result[i].name}</p>`;
            html += `<p>answer1: ${result[i].answer1}</p>`;
            html += `<p>answer2: ${result[i].answer2}</p></li>`;
        }

        // We close our unordered list.
        html += '</ul>';

        // Finally we send the user the HTML file we dynamically created.
        res.send(html);
    });
});

// Create a new user profile
// frontend form to aysnc POST data to route
app.post('/api/form', function (req, res) {

    console.log(req.body);
    connection.query(`INSERT INTO friends 
    (name, image, answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8, answer9, answer10)
    VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [req.body.name, req.body.image, req.body.answer1, req.body.answer2, req.body.answer3, req.body.answer4, req.body.answer5, req.body.answer6, req.body.answer7, req.body.answer8, req.body.answer9, req.body.answer10],
        function (err, result) {
            if (err) {
                return res.status(500).end();
            }

            // Send back the ID of the new profile
            console.log({ id: result.insertId });
            console.log('user added');
        });
});

// display everything from DB
app.get('/all', function (req, res) {

    // query for friends table;
    connection.query(`SELECT * FROM friends`, function (err, result) {
        if (err) throw err;

        // build html
        var html = '<h1> all </h1>';
        html += '<ul>';

        // We then use the retrieved records from the database to populate our HTML file.
        for (var i = 0; i < result.length; i++) {
            html += `<li><p> ID: ${result[i].id}</p>`;
            html += `<li><p> name: ${result[i].name}</p>`;
            html += `<li><p> image: ${result[i].image}</p>`;
            html += `<li><p> answer1: ${result[i].answer1}</p>`;
            html += `<li><p> answer2: ${result[i].answer2}</p>`;
            html += `<li><p> answer3: ${result[i].answer3}</p>`;
            html += `<li><p> answer4: ${result[i].answer4}</p>`;
            html += `<li><p> answer5: ${result[i].answer5}</p>`;
            html += `<li><p> answer6: ${result[i].answer6}</p>`;
            html += `<li><p> answer7: ${result[i].answer7}</p>`;
            html += `<li><p> answer8: ${result[i].answer8}</p>`;
            html += `<li><p> answer9: ${result[i].answer9}</p>`;
            html += `<li><p> answer10: ${result[i].answer10}</p></li>`;
        }

        // We close our unordered list.
        html += '</ul>';

        // Finally we send the user the HTML file we dynamically created.
        res.send(html);
    });
});

// listen for route
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log(`Server listening on: http://localhost:${PORT}`);
});
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
        console.error(`\nerror connecting: ${err.stack}\n`);
        return;
    }
    console.log(`\nMySQL connected as id ${connection.threadId}\n`);
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
        var html = '<h1> Person </h1>';

        html += '<ul>';

        for (var i = 0; i < result.length; i++) {
            html += `<li><p> ID: ${result[i].id}</p>`;
            html += `<p>name: ${result[i].name}</p>`;
            html += `<p>answer1: ${result[i].answer1}</p>`;
            html += `<p>answer2: ${result[i].answer2}</p></li>`;
        }

        html += '</ul>';

        res.send(html);
    });
});

// Create a new user profile
// frontend form POST data to route
app.post('/api/form', function (req, res) {

    console.log('==============req.body===============');
    console.log(req.body);
    checkForm(req.body);
    console.log('==============req.body===============');

    // validate incoming data
    function checkForm(input) {
        if (input.name.length > 2 && Number(input.answer1) > 0 && Number(input.answer2) > 0 &&
            Number(input.answer3) > 0 && Number(input.answer4) > 0 && Number(input.answer5) > 0 &&
            Number(input.answer6) > 0 && Number(input.answer7) > 0 && Number(input.answer8) > 0 &&
            Number(input.answer9) > 0 && Number(input.answer10) > 0) {
            return true;
        } else {
            return false;
        }
    };

    if (checkForm(req.body)) {

        // insert user profile into mysql
        connection.query(`INSERT INTO friends 
        (name, image, answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8, answer9, answer10)
        VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [req.body.name, req.body.image, req.body.answer1, req.body.answer2, req.body.answer3, req.body.answer4,
            req.body.answer5, req.body.answer6, req.body.answer7, req.body.answer8, req.body.answer9, req.body.answer10],
            function (err, result) {
                if (err) {
                    return res.status(500).end();
                }

                // Send back the ID of the new profile
                console.log({ id: result.insertId });
                console.log('profile added')
                return res.status(200).end();
            });
    } else {
        console.log('did not insert data into sql');
        return res.status(500).end();
    }
});

// display everything from DB
app.get('/api', function (req, res) {

    // query for friends table
    connection.query(`SELECT * FROM friends`, function (err, result) {
        if (err) throw err;

        // build html
        var html = '<h1> all </h1>';
        html += '<ul>';

        // use results from query to display in html
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

        html += '</ul>';

        // send dynamically created file
        res.send(html);
    });
});


// listen for route
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log(`\nServer listening on: http://localhost:${PORT}\n`);
});

// Your htmlRoutes.js file should include two routes:

// A GET Route to /survey which should display the survey page.
// A default, catch-all route that leads to home.html which displays the home page.



// Your apiRoutes.js file should contain two routes:

// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.



// You should save your application's data inside of app/data/friends.js as an array of objects. Each of these objects should roughly follow the format below.
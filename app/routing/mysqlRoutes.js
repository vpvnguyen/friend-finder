var mysql = require('mysql');

module.exports = (app) => {

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

    // display all friends table
    app.get('/db', (req, res) => {

        console.log('\nGET request | mysql => html | SELECT * FROM friends');
        console.log(req.body);
        console.log('\n');

        // query for friends table
        connection.query(`SELECT * FROM friends`, function (err, result) {
            if (err) throw err;

            // build html
            var html = '<h1> All Friends </h1>';
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

            // send dynamically created html
            res.send(html);
        });
    });

    // display possible friends - WIP
    app.get('/db/friends', (req, res) => {

        console.log('\nGET request | mysql => html | SELECT * FROM friends table');
        console.log(req.body);
        console.log('\n');

        // query for friends table
        connection.query(`SELECT * FROM friends`, function (err, result) {
            if (err) throw err;

            // build html
            var html = '<h1> My Friends </h1>';
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

    // create a new user profile
    // frontend form POST data to route
    app.post('/db/friends', (req, res) => {

        console.log('\nPOST request | survey => mysql | Validate form');
        console.log(req.body);
        console.log('\n');

        // validate incoming data
        function checkForm(input) {
            if (input.name.length > 0 && input.image.length > 0 && Number(input.answer1) > 0 && Number(input.answer2) > 0 &&
                Number(input.answer3) > 0 && Number(input.answer4) > 0 && Number(input.answer5) > 0 && Number(input.answer6) > 0 &&
                Number(input.answer7) > 0 && Number(input.answer8) > 0 && Number(input.answer9) > 0 && Number(input.answer10) > 0) {
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
                    console.log(`\nNew User Added to friends table`);
                    return res.status(200).end();
                });
        } else {
            console.log('\nSurvey form validation - FAIL: return 500 status');
            return res.status(500).end();
        }
    });

    // get data about person name
    app.get('/db/friends/:name', (req, res) => {

        // get user's name from route and query for all user info
        var userProfile = req.params.name;

        console.log('\nGET request | mysql => dynamic html | SELECT * FROM friends WHERE name=?');
        console.log(req.body);
        console.log('\n');

        connection.query(`SELECT * FROM friends WHERE name=?`, userProfile, function (err, result) {
            if (err) throw err;
            var html = '<h1> This guy </h1>';

            html += '<ul>';

            for (var i = 0; i < result.length; i++) {
                html += `<li><p> ID: ${result[i].id}</p>`;
                html += `<p>name: ${result[i].name}</p>`;
                html += `<p>answer1: ${result[i].answer1}</p>`;
                html += `<p>answer1: ${result[i].answer2}</p>`;
                html += `<p>answer1: ${result[i].answer3}</p>`;
                html += `<p>answer1: ${result[i].answer4}</p>`;
                html += `<p>answer1: ${result[i].answer5}</p>`;
                html += `<p>answer1: ${result[i].answer6}</p>`;
                html += `<p>answer1: ${result[i].answer7}</p>`;
                html += `<p>answer1: ${result[i].answer8}</p>`;
                html += `<p>answer1: ${result[i].answer9}</p>`;
                html += `<p>answer2: ${result[i].answer10}</p></li>`;
            }

            html += '</ul>';

            res.send(html);
        });
    });
};
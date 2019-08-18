var express = require('express');
var app = express();
var path = require('path');

// use provided port or default to 3000
var PORT = process.env.PORT || 3000;

// MIDDLEWARE
// parse request body as json
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// serve static pages from public folder; css / front js handling
app.use(express.static('./app/data/public'));

// ROUTING
require('./app/data/routing/mysqlRoutes')(app);
// require('./app/data/routing/apiRoutes')(app);
require('./app/data/routing/htmlRoutes')(app);

app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log(`\nServer listening on: http://localhost:${PORT}\n`);
});
var express = require('express');
var app = express();
var path = require('path');

var PORT = process.env.PORT || 3000;

// express middleware; parse json
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// routing
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "./public/home.html"));
});

app.get("/survey", function(req, res){
    res.sendFile(path.join(__dirname, "./public/survey.html"));
});

// sample express post
app.post('/api', function (req, res, next) {
    console.log(req.body)
    res.json(req.body)
  })

// listen for route
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});
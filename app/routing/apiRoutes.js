var allFriends = require('../data/friends');

module.exports = function (app) {

    app.get('/api/friends', function (req, res) {
        res.json(allFriends);
    });

    app.post('/api/friends', function (req, res) {
        allFriends.push(req.body);
        res.json();
    });

};

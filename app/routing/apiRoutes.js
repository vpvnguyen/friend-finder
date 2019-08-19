var allFriends = require('../data/friends');

module.exports = function (app) {

    // display all friends list json
    app.get('/api/friends', (req, res) => {

        console.log('\nGET request | friends.js => json | API');
        console.log(req.body);
        console.log('\n');

        res.json(allFriends);
    });

    // find best match and display as a modal
    app.post('/api/friends', (req, res) => {

        console.log('\nPOST request | survey => html | Attempt match to friends.js');
        console.log(req.body);
        console.log('\n');

        // add new friend to friends.js
        var newFriend = req.body;

        // create an object to hold best match
        var match = {
            name: '',
            image: '',
        }

        // set current score of best match
        var matchDifference = 50;
        var userDifference = 0

        // go through friends.js and check compatibility
        for (var i = 0; i < allFriends.length; i++) {
            userDifference = 0;
            for (var j = 0; j < allFriends[i].answers.length; j++) {
                userDifference += Math.abs(allFriends[i].answers[j] - newFriend.answers[j]);
                if (userDifference <= matchDifference) {
                    match.name = allFriends[i].name,
                        match.image = allFriends[i].image,
                        matchDifference = userDifference
                }
            }
        }

        // add new profile to friend list
        allFriends.push(newFriend);

        console.log('\n--- MATCH ---')
        console.log(match);

        // send back json of best match
        res.json(match);

        // WIP - to send data back to front as a modal of matcb
    });
};
var friends = require("../data/friends");

module.exports = function(app){

    app.get('/api/friends', function(req, res){
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        var newPerson = req.body;

        for(var i = 0; i < newPerson.scores.length;i++){
            newPerson.scores[i] = parseInt(newPerson.scores[i]);
        }
        var bestMatchScore = 999;
        var bestMatchIndex = 0;
        for(var i = 0; i < friends.length; i++){
            var tempScore = 0;
            for(var j = 0; j < friends[i].scores.length; j ++){
                tempScore += Math.abs(friends[i].scores[j] - newPerson.scores[j]);
            };
            if(tempScore < bestMatchScore) {
                bestMatchScore = tempScore;
                bestMatchIndex = i;
            }
        }
        friends.push(newPerson);
        var bestMatch = {
            name: friends[bestMatchIndex].name,
            photo: friends[bestMatchIndex].photo
        }
        return res.json(bestMatch);
    });
};
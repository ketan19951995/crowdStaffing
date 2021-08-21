const User = require('../models/user.model');
exports.create = function (req, res) {
    console.log("req is", req.params);
    const newUser = new User(req.params);
    User.create(newUser, function (err, user) {
        console.log("user is", user);
        if (err) {
            res.send(err);
        } else {
            res.json(newUser);
        }
    });
};

exports.findByUserName = function (req, res) {
    User.findByUserName(req.params.userName, function (err, user) {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
};


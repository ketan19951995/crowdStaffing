const User = require('../models/user.model');
exports.findAll = function (req, res) {
    User.findAll(function (err, user) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', user);
        res.send(user);
    });
};
exports.create = function (req, res) {
    console.log("req is", req.params);
    const newUser = new User(req.params);
    User.create(newUser, function (err, user) {
        if (err)
            res.send(err);
        res.json({ error: false, message: "User added successfully!", data: user });
    });

};
exports.findByUserName = function (req, res) {
    User.findByUserName(req.params.userName, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


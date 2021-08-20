console.log("Hello");
let dbConn = require('./../../config/db.config');
//User object create
let User = function (user) {
    this.userName = user.userName;
    this.createdAt = new Date();
};
User.create = function (newUser, result) {
    console.log("newUser" , newUser);
    dbConn.query("INSERT INTO users set ?", newUser, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
User.findByUserName = function (userName, result) {
    dbConn.query("Select * from users where username = ? ", userName, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
User.findAll = function (result) {
    dbConn.query("Select * from users", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('users : ', res);
            result(null, res);
        }
    });
};


module.exports = User;
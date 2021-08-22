let dbConn = require('./../../config/db.config');
const { getDaysLeft , getValidTill} = require('../helper/helper');
//Subscription object create
let Subscription = function (subscription) {
    this.userName = subscription.userName;
    this.planId = subscription.planId;
    this.startDate = new Date();
};
Subscription.create = function (newSubscription, result) {
    dbConn.query("INSERT INTO subscription set ?", newSubscription, function (err, res) {
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
Subscription.findAllPlansByUserName = function (userName, result) {
    dbConn.query("Select * from subscription where username = ? ", userName, async function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            for(let i=0;i<res.length;i++){
                let startDate = res[i].startDate;
                let getValidTillResult = await getValidTill(res[i].planId , startDate);    
                getValidTillResult = JSON.stringify(getValidTillResult)
                startDate = JSON.stringify(startDate);
                res[i]["start_date"] = startDate.substring(1, startDate.indexOf('T'));
                res[i]["valid_till"] =  getValidTillResult.substring(1, getValidTillResult.indexOf('T'));
                delete res[i]["startDate"];
                delete res[i]["userName"]; 
            }
            result(null, res);
        }
    });
};

Subscription.findAllPlansByUserNameandDate = function (param, result) {
    console.log("params ", param);
    let sql = 'SELECT * FROM subscription WHERE username = ? AND startDate = ?';
    dbConn.query(sql, [param.userName, param.date], async function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log("res", res[0].startDate);
            let totalDaysLeft = await getDaysLeft(res[0].planId, res[0].startDate);
            console.log("totalDAYS", totalDaysLeft);
            result(null, { "plan_id": res[0].planId, "days_left": totalDaysLeft });
        }
    });
};

module.exports = Subscription;
const Subscription = require('../models/subscription.model');
const {getAmount} = require('../helper/helper');
exports.create = function (req, res) {
    console.log("req is", req.body);
    const newSubscription = new Subscription(req.body);
    console.log("newSubscription", newSubscription);
    Subscription.create(newSubscription, async function (err, subscription) {
        console.log("newSubscription", newSubscription);
        // get plan amount for subscription
        let amount = await getAmount(newSubscription.planId);
        console.log("amount is" , amount);
        if (err) {
            res.send(err);
        } else {
            res.json({ status: "SUCCESS", "amount ": `-${amount}` });
        }
    });
};


exports.findAllPlansByUserName = function (req, res) {
    console.log("req.param", req.params);
    Subscription.findAllPlansByUserName(req.params.userName, function (err, user) {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
};


exports.findAllPlansByUserNameandDate = function (req, res) {
    console.log("req.param", req.params);
    Subscription.findAllPlansByUserNameandDate(req.params, function (err, user) {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
};
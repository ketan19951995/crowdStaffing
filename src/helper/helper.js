const fs = require('fs');
let path = require('path');

console.log(__dirname);
let jsonPath = path.join(__dirname, '../json/plan.json');

console.log(jsonPath);

// this will get the cost of the plan
async function getAmount(planId) {
    let result = await getPlanDetailsFromPlanId(planId);
    console.log("result ", result);
    return result.cost;
}


// This will get the days left of the plan
async function getDaysLeft(planId, startDate) {
    
    let currentDate = new Date();
    let result = await getPlanDetailsFromPlanId(planId);
    console.log("result ", result);
    let validity = result.validity;
    var Difference_In_Time = currentDate.getTime() - startDate.getTime();
    // To calculate the no. of days between two dates
    var totalDaysused = Difference_In_Time / (1000 * 3600 * 24);
    console.log("toal day" , totalDaysused);

    //let totalDaysused = currentDate - startDate
    let totalDaysLeft = validity - totalDaysused.toFixed(0);
    return totalDaysLeft;
}


// This will get the days left of the plan
async function getValidTill(planId, startDate) {
    let result = await getPlanDetailsFromPlanId(planId);
    console.log("result ", result);
    let validity = result.validity;
    var valid_till = new Date(startDate);
    valid_till.setDate(valid_till.getDate() + validity);
    return valid_till;
}


function getPlanDetailsFromPlanId(planId){
    let planData = fs.readFileSync(jsonPath, { encoding: 'utf-8' })
    data = JSON.parse(planData);
    console.log("data", data);
    let result = data.find(plan => plan.planId === planId);
    return result;
}

module.exports = {
    getAmount,
    getDaysLeft,
    getPlanDetailsFromPlanId,
    getValidTill
}

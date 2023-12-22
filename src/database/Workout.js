const DB = require("./db.json")
const {saveToDatabase} = require("./utils");

const getAllWorkouts = () => {
    return DB.workouts;
}

const

module.exports = { getAllWorkouts };
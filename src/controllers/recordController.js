const recordService = require("./../services/recordService");

const getRecordForWorkout = (req, res) => {
    const workoutId = req.params.workoutId; 
    if(!workoutId) {
        res.status(400).send({ status:"Error", message: "WorkoutId is required." })
        return;
    }
    try {
        const record = recordService.getRecordForWorkout(workoutId)
        res.send({status: "OK", data: record})
    }catch (error) {
        console.error("Error in getRecordForWorkout:", error)
        res.status(error.status || 500).send({status: "Error", message: error.message || "Internel Server Error"})
    }
}

module.exports = {
    getRecordForWorkout
};
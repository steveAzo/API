const DB = require("./db.json")
const {saveToDatabase} = require("./utils");

const getAllWorkouts = (filterParams) => {
    try{
        let workouts = DB.workouts
        if(filterParams.mode) {
            return DB.workouts.filter((workout) =>
            workout.mode.toLowerCase().includes(filterParams.mode)
            );
        }
        if (filterParams.equipment) {
            workouts = workouts.filter((workout) =>
              workout.equipment.toLowerCase().includes(filterParams.equipment.toLowerCase())
            );
        }
        const page = parseInt(filterParams.page) || 1;
        const pageSize = parseInt(filterParams.pageSize) || 10;
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        workouts = workouts.slice(startIndex, endIndex);
      

        return workouts;
    } catch(error) {
        throw { status: 500, message: error }
    }
   
}

const getOneWorkout = (workoutId) => {
    try {
        const workout = DB.workouts.find((workout) => workout.id === workoutId)
        if(!workout) {
            throw {
                status: 400,
                message: `Can't find workout with the id '${workoutId}'`,
            } 
        }
        return workout;
    } catch(error) {
        throw { status: error?.status || 500, message: error?.message || error }
    }
}

const createNewWorkout = (newWorkout) => {
    try {
        const isAlreadyAdded =
        DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
        if(isAlreadyAdded) {
            throw {
                status: 400,
                message: `Workout with the name '${newWorkout.name}' already in use`
            }
        }
        DB.workouts.push(newWorkout);
        saveToDatabase(DB);
        return newWorkout;
    } catch(error) {
        throw {status: error?.status || 500, message: error?.message || error}
    }
    
}
const updateOneWorkout = (workoutId, changes) => {
    try {
        const indexForUpdate = DB.workouts.findIndex(
            (workout) => workout.id === workoutId
        )
        if (indexForUpdate === -1) {
            throw {
                status: 400,
                message: `Can't find workout with id '${workoutId}'`,
            }
        }
        const updateWorkout = {
            ...DB.workouts[indexForUpdate],
            ...changes,
            updatedAt: new Date().toLocaleString("en-US", {timeZone: "UTC"})
        }
        DB.workouts[indexForUpdate] = updatedWorkouts
        saveToDatabase(DB);
        return updateWorkout;
    } catch(error) {
        throw { status: error?.status || 500, message: error?.message || error }
    }
    
}

const deleteOneWorkout = (workoutId) => {
    try {
        const indexForDeletion = DB.workouts.findIndex(
            (workout) = workout.id === workoutId 
        )
        if (indexForDeletion === -1) {
            throw {
                status: 400,
                message: `Can't find workout with id '${workoutId}',`
            }
        }
        DB.workouts.splice(indexForDeletion, 1);
        saveToDatabase;
    } catch(error) {
        throw { status: error?.status || 500, message: error?.message || error }
    }
    
}

module.exports = { 
    getAllWorkouts,
    createNewWorkout,
    getOneWorkout,
    updateOneWorkout,
    deleteOneWorkout,
 };
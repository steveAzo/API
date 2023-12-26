const express = require("express");
const apicache = require("apicache")
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");
const bodyParser = require("body-parser");
const v1WorkoutRouter = require("./v1/routes/workoutRoutes");

const app = express();
const cache = apicache.middleware
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/api/v1/workouts", v1WorkoutRouter);
app.use(cache("2 minutes"))
app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
    V1SwaggerDocs(app, PORT);
});


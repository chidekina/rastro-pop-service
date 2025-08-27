const { Router } = require("express");
const TaskRouter = require("@/routes/TasksRoute");

const routes = Router();
routes.use("/tasks", TaskRouter);

module.exports = routes;

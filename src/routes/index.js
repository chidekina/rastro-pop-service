const { Router } = require('express');
const TaskRouter = require('./TasksRoute');

const routes = Router();
routes.use("/tasks", TaskRouter);

module.exports = routes;
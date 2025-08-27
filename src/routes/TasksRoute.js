const express = require('express');
const TaskController = require('../controllers/TaskController');

const TaskRouter = express.Router();

const taskController = new TaskController;

TaskRouter.get("/", (req, res) => taskController.read(req, res));

TaskRouter.get("/:id", (req, res) => taskController.index(req, res));

TaskRouter.post("/", (req, res) => taskController.create(req, res));

TaskRouter.put('/:id', (req, res) => taskController.update(req, res));

TaskRouter.delete('/:id',(req, res) => taskController.delete(req, res));

module.exports = TaskRouter;
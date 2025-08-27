const express = require("express");
const TaskController = require("../controllers/TaskController");
const TaskRouter = express.Router();

TaskRouter.get("/", TaskController.read);

TaskRouter.get("/:id", TaskController.index);

TaskRouter.post("/", TaskController.create);

TaskRouter.put("/:id", TaskController.update);

TaskRouter.delete("/:id", TaskController.delete);

module.exports = TaskRouter;

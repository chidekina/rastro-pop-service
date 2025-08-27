const { z } = require('zod');
const TaskModel = require('../model/TaskModel');

const bodySchema = z.object({
    title: z.string().min(6, "O título deve ter pelo menos 6 caracteres."),
    description: z.string().min(6, "A descrição deve ter pelo menos 6 caracteres."),
});

class TaskController {

    read(req, res) {
        try {
            const tasksList = TaskModel.read();
            return res.json(tasksList);

        } catch (error) {
            return res.status(500).json({
                error: error.message || "Erro ao buscar tarefas."
            });
        }
    }

    index(req, res) {
        try {
            const id = req.params.id;

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    error: "ID é obrigatório."
                });
            }

            const task = TaskModel.index(id);

            if (!task) {
                return res.status(404).json({
                    error: "Tarefa não encontrada."
                });
            }

            return res.json(task);
        } catch (error) {
            return res.status(500).json({
                error: error.message || "Erro ao buscar tarefa."
            });
        }
    }

    create(req, res) {
        try {
            const taskCreated = bodySchema.parse(req.body);
            TaskModel.create(taskCreated);

            return res.status(201).json({
                message: "Tarefa criada com sucesso."
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    error: "Dados inválidos",
                    details: error.errors,
                });
            }

            return res.status(500).json({
                error: error.message || "Erro ao criar tarefa."
            });
        }
    }

    update(req, res) {
        try {
            const id = req.params.id;

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    error: "ID é obrigatório."
                });
            }

            const existingTask = TaskModel.index(id)

            if (!existingTask) {
                return res.status(404).json({
                    error: "Tarefa não encontrada."
                });
            }

            const taskUpdated = bodySchema.parse(req.body);
            TaskModel.update(id, taskUpdated);

            return res.json({
                message: "Tarefa atualizada com sucesso!"
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    error: "Dados inválidos",
                    details: error.errors,
                });
            }
            return res.status(500).json({
                error: error.message || "Erro ao atualizar tarefa."
            });
        }
    }

    delete(req, res) {
        try {
            const id = req.params.id;

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    error: "ID é obrigatório."
                });
            }

            const existingTask = TaskModel.index(id)

            if (!existingTask) {
                return res.status(404).json({
                    error: "Tarefa não encontrada."
                });
            }

            TaskModel.delete(id)

            return res.json({
                message: "Tarefa excluída com sucesso!"
            });
        } catch (error) {
            return res.status(500).json({
                error: error.message || "Erro ao deletar tarefa."
            });
        }
    }
};

module.exports = TaskController;
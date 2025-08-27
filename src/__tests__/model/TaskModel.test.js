const TaskModel = require("@/model/TaskModel");

describe("TaskModel", () => {
    beforeEach(() => {
        // Reset da lista antes de cada teste
        TaskModel.list = [
            {
                id: 1,
                title: "Teste tarefa",
                description: "Descrição de teste"
            }
        ];
    });

    describe("read", () => {
        it("deve retornar todas as tarefas", () => {
            const tasks = TaskModel.read();
            expect(tasks).toHaveLength(1);
            expect(tasks[0]).toHaveProperty("id", 1);
        });
    });

    describe("create", () => {
        it("deve criar uma nova tarefa com ID incrementado", () => {
            const taskData = {
                title: "Nova tarefa",
                description: "Nova descrição"
            };

            const newTask = TaskModel.create(taskData);

            expect(newTask).toHaveProperty("id", 2);
            expect(newTask.title).toBe(taskData.title);
            expect(newTask.description).toBe(taskData.description);
            expect(TaskModel.list).toHaveLength(2);
        });
    });

    describe("index", () => {
        it("deve retornar a tarefa pelo ID", () => {
            const task = TaskModel.index(1);
            expect(task).toHaveProperty("id", 1);
        });

        it("deve retornar undefined para ID inexistente", () => {
            const task = TaskModel.index(999);
            expect(task).toBeUndefined();
        });
    });

    describe("update", () => {
        it("deve atualizar uma tarefa existente", () => {
            const updateData = {
                title: "Título atualizado",
                description: "Descrição atualizada"
            };

            const updatedTask = TaskModel.update(1, updateData);

            expect(updatedTask.title).toBe(updateData.title);
            expect(updatedTask.description).toBe(updateData.description);
            expect(updatedTask.id).toBe(1);
        });

        it("deve retornar null para ID inexistente", () => {
            const result = TaskModel.update(999, { title: "test" });
            expect(result).toBeNull();
        });
    });

    describe("delete", () => {
        it("deve deletar uma tarefa", () => {
            TaskModel.delete(1);
            expect(TaskModel.list).toHaveLength(0);
        });

        it("não deve alterar a lista se ID não existir", () => {
            TaskModel.delete(999);
            expect(TaskModel.list).toHaveLength(1);
        });
    });
});
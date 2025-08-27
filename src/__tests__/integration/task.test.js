const request = require("supertest");
const express = require("express");
const TaskModel = require("@/model/TaskModel");

// Configurar a aplicação para teste
const app = express();
app.use(express.json());

// Importar rotas
const routes = require("@/routes");
app.use(routes);

describe("Tasks API", () => {
    beforeEach(() => {
        // Reset para estado inicial
        TaskModel.list = [
            {
                id: 1,
                title: "Tarefa teste",
                description: "Descrição teste"
            }
        ];
    });

    describe("GET /tasks", () => {
        it("deve retornar todas as tarefas", async () => {
            const response = await request(app)
                .get("/tasks")
                .expect(200);

            expect(response.body).toHaveLength(1);
            expect(response.body[0]).toHaveProperty("id", 1);
        });
    });

    describe("POST /tasks", () => {
        it("deve criar uma nova tarefa", async () => {
            const taskData = {
                title: "Nova tarefa de teste",
                description: "Descrição da nova tarefa"
            };

            const response = await request(app)
                .post("/tasks")
                .send(taskData)
                .expect(201);

            expect(response.body.message).toBe("Tarefa criada com sucesso.");
            expect(response.body.task).toHaveProperty("id");
            expect(response.body.task.title).toBe(taskData.title);
        });

        it("deve retornar erro para dados inválidos", async () => {
            const taskData = {
                title: "abc", // Menor que 6 caracteres
                description: "def" // Menor que 6 caracteres
            };

            const response = await request(app)
                .post("/tasks")
                .send(taskData)
                .expect(400);

            expect(response.body.error).toBe("Dados inválidos");
            // Verificar se details é um array e tem pelo menos um erro
            expect(Array.isArray(response.body.details)).toBe(true);
            expect(response.body.details.length).toBeGreaterThan(0);
        });
    });

    describe("GET /tasks/:id", () => {
        it("deve retornar uma tarefa específica", async () => {
            const response = await request(app)
                .get("/tasks/1")
                .expect(200);

            expect(response.body).toHaveProperty("id", 1);
        });

        it("deve retornar 404 para tarefa inexistente", async () => {
            const response = await request(app)
                .get("/tasks/999")
                .expect(404);

            expect(response.body.error).toBe("Tarefa não encontrada.");
        });

        it("deve retornar 400 para ID inválido", async () => {
            const response = await request(app)
                .get("/tasks/abc")
                .expect(400);

            expect(response.body.error).toBe("ID deve ser um número positivo válido.");
        });
    });

    describe("PUT /tasks/:id", () => {
        it("deve atualizar uma tarefa existente", async () => {
            const updateData = {
                title: "Tarefa atualizada",
                description: "Descrição atualizada"
            };

            const response = await request(app)
                .put("/tasks/1")
                .send(updateData)
                .expect(200);

            expect(response.body.message).toBe("Tarefa atualizada com sucesso!");
            expect(response.body.task.title).toBe(updateData.title);
        });

        it("deve retornar 404 para tarefa inexistente", async () => {
            const updateData = {
                title: "Tarefa atualizada",
                description: "Descrição atualizada"
            };

            const response = await request(app)
                .put("/tasks/999")
                .send(updateData)
                .expect(404);

            expect(response.body.error).toBe("Tarefa não encontrada.");
        });
    });

    describe("DELETE /tasks/:id", () => {
        it("deve deletar uma tarefa existente", async () => {
            const response = await request(app)
                .delete("/tasks/1")
                .expect(200);

            expect(response.body.message).toBe("Tarefa excluída com sucesso!");
            
            const tasks = TaskModel.read();
            expect(tasks).toHaveLength(0);
        });

        it("deve retornar 404 para tarefa inexistente", async () => {
            const response = await request(app)
                .delete("/tasks/999")
                .expect(404);

            expect(response.body.error).toBe("Tarefa não encontrada.");
        });
    });
});
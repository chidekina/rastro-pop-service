class TaskModel {
    static list = [
        {
            id: 1,
            title: "Meeting de alinhamento",
            description: "Alinhamento com o time de backend para revisão de sprints"
        },
        {
            id: 2,
            title: "Compras da semana",
            description: "Ir ao supermercado para fazer as compras da semana"
        },
        {
            id: 3,
            title: "Curso Filipe Deschamps",
            description: "Terminar o módulo 4 de POO do curso"
        }
    ];

    static read() {
        return TaskModel.list;
    }

    static index(id) {
        return TaskModel.list.find(item => item.id === Number(id));
    }

    static create(data) {
        const newId = Math.max(...TaskModel.list.map(item => item.id), 0) + 1;
        const newTask = {
            id: newId,
            ...data
        };

        TaskModel.list.push(newTask);
        return newTask;
    }

    static update(id, data) {
        const index = TaskModel.list.findIndex(item => item.id === Number(id));
        if (index !== -1) {
            TaskModel.list[index] = {
                ...TaskModel.list[index],
                ...data,
                id: Number(id)
            };
            return TaskModel.list[index];
        }
        return null;
    }

    static delete(id) {
        const taskListUpdated = TaskModel.list.filter(item => item.id !== Number(id));
        TaskModel.list = taskListUpdated;
    }
};

module.exports = TaskModel;

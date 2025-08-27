class TaskModel {
    static list = [
        {
            id: 1,
            title: 'Meeting de alinhamento',
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
            "description": "Terminar o módulo 4 de POO do curso"
        }
    ]

    static read() {
        return TaskModel.list;
    }

    static index(id) {
        return task = TaskModel.list.filter(item => item.id === Number(id));
    }

    static create(data) {
        TaskModel.list.push(data);
    }

    static update(id, data) {
        const index = TaskModel.list.findIndex(item => item.id === Number(id));
        TaskModel.list[index] = data;
    }

    static delete(id) {
        const taskListUpdated = TaskModel.list.findIndex(index => item.id === Number(id));
        TaskModel.list = taskListUpdated;
    }
};

module.exports = TaskModel;
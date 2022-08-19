class TaskDto {
    id;
    complite;
    body;
    TaskListModelId;

    constructor(model) {
        this.id = model.id;
        this.complite = model.complite;
        this.body = model.body;
        this.TaskListModelId = model.TaskListModelId;
    }
}

export default TaskDto;
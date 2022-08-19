class TaskListDto {
    title;
    id;
    userId;

    constructor(model) {
        this.title = model.title;
        this.id = model.id;
        this.userId = model.userId;
    }
}

export default TaskListDto;
export class UpdateTaskDto {
  readonly TaskId: number;
  readonly TaskListId: number;
  readonly complite: boolean;
  readonly body: string;
}

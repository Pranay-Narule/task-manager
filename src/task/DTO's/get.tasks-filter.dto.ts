import { taskStatus } from "../task.model";

export class getTaskFilterDto {
    status: taskStatus;
    search: string;
}
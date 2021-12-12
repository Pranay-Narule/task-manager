import { taskStatus } from "../task-status.enum";
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
export class getTaskFilterDto {
    //validate only allowed status
    @IsOptional()
    @IsIn([taskStatus.OPEN, taskStatus.IN_PROGRESS, taskStatus.DONE])
    status: taskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
    //apply this on controller
}
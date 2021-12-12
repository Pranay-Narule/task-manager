import { Injectable } from '@nestjs/common';
import { task, taskStatus } from './task.model';

@Injectable()
export class TaskService {

    // make this array private so no outside function can modify it
    // define values using model
    private task: task[] = [];

    getAllTask(): task[]{
        return this.task;
    }
}

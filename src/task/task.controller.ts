import { Controller, Get } from '@nestjs/common';
import { task } from './task.model';
import { TaskService } from './task.service';
// any rq with /task handle by this controller
// cli import this in module
@Controller('task')
export class TaskController {
    // import service in constructor
    constructor(private taskSaervice: TaskService){}

    @Get()
    getAllTask(): task[]{
        return this.taskSaervice.getAllTask();
    }
}

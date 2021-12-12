import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { createTaskDto } from './DTO\'s/create.task.dto';
import { getTaskFilterDto } from './DTO\'s/get.tasks-filter.dto';
import { taskValidationPipe } from './pipes/task.status.validation.pipe';
import { taskStatus } from './task-status.enum';
import { task } from './task.entity';
import { TaskService } from './task.service';
// any rq with /task handle by this controller
// cli import this in module
@Controller('task')
export class TaskController {
    // import service in constructor
    constructor(private taskSaervice: TaskService){}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: getTaskFilterDto): Promise<task[]>{
        return this.taskSaervice.gettasks(filterDto);
    }
    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto: getTaskFilterDto): task[]{
    //    // check query parameter is not empty
    //    if(Object.keys(filterDto).length){
    //        return this.taskSaervice.getTaskWithFilters(filterDto);
    //    }else{
    //     return this.taskSaervice.getAllTask();
    //    }
    // }

    @Get('/:id')
    getTaskById( @Param('id', ParseIntPipe) id: number): Promise<task>{
        return this.taskSaervice.gettaskById(id);
    }


    // @Post()
    // //validate the entire body
    // @UsePipes(ValidationPipe)
    // createTask(
    //     @Body() createTaskDto: createTaskDto
    //     // @Body('title') title: string,
    //     // @Body('description') description: string,
    //     //use dto instead of above
    // ): task{
    //     //console.log('title', title);
    //     return this.taskSaervice.createTask(createTaskDto);
    // }

    @Delete('/:id')
    //as we not sure we get in rq number or not this throw error if not number
    deleteTaskById( @Param('id', ParseIntPipe) id: number): Promise<void>{
        return this.taskSaervice.deleteTaskById(id);
    }

    //or put
    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        // or can pass new name(parameter)
        @Body('status', taskValidationPipe) status: taskStatus,
    ): Promise<task>{
        return this.taskSaervice.updateTaskStatus(id, status);
    }

}

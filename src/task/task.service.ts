import { Injectable } from '@nestjs/common';
import { task, taskStatus } from './task.model';
import * as uuid from 'uuid';
import { createTaskDto } from './DTO\'s/create.task.dto';
import { getTaskFilterDto } from './DTO\'s/get.tasks-filter.dto';

@Injectable()
export class TaskService {

    // make this array private so no outside function can modify it
    // define values using model
    private task: task[] = [];

    getAllTask(): task[] {
        return this.task;
    }

    getTaskWithFilters(filterDto: getTaskFilterDto): task[]{
        const { status, search } = filterDto;
        //set local variable
        let tasks = this.getAllTask();
        if(status){
            tasks = tasks.filter(task => task.status === status);
        }
        if(search){

            //we are going to search this substring if yes then return true
            tasks = tasks.filter( task => 
                task.title.includes(search) ||
                task.description.includes(search),);
        }
        return tasks;
    }

    gettaskById(id : string): task{
        //this function run for each task 
        //whenever it is true it prints the value
        return this.task.find( task => task.id === id);
    }

    createTask(createTaskDto: createTaskDto): task{
        //what is structure see in model
        //to destruct dto
        const { title, description } = createTaskDto;
        
        const task: task = {
            id: uuid(),
            title,
            description,
            status: taskStatus.OPEN
        };

        this.task.push(task);
        // good practice to return updated value
        // as they don't have to code one extra api for this and reduce load on services 
        return task;

    }

    deleteTaskById(id: string): void{
        //going to use array filter method to delete the task
        // when false it delete that entry
        this.task = this.task.filter(task => task.id !== id);
    }

    updateTaskStatus(id: string, status: taskStatus): task{
        const task = this.gettaskById(id);
        task.status = status;
        return task;
    }
}

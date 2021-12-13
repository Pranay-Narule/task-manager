import { task } from "./task.entity";
import { EntityRepository, Repository } from 'typeorm';
import { taskStatus } from "./task-status.enum";
import { createTaskDto } from "./DTO's/create.task.dto";
import { title } from "process";
import { getTaskFilterDto } from "./DTO's/get.tasks-filter.dto";
import { user } from "src/auth/user.entity";

// now create repository which must extends follow
@EntityRepository(task)
export class taskRepository extends Repository<task>{
    //we make this repo available by module
    //leave repo emty for now letter add logic

    async getTasks(
        filterDto: getTaskFilterDto,
        user: user,
        ): Promise<task[]>{
        const { status, search } = filterDto;
        //manually pass query first create accesable entity
        const query = this.createQueryBuilder('task');

        //geting user id to show task related to them
        //we need to define this column userId in task
        query.where('task.userId = :userId', { userId: user.id } );

        if(status){
            //help to add where in query :status is variable to provide value {status: 'OPEN'} or below
            query.andWhere('task.status = :status', { status });

        }

        if(search){
            //and where did not override other where
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: '%$(search)%'});
            
        }


        //now exc query
        const tasks = await query.getMany();
        return tasks;
    }



    async createTask(
        createTaskDto: createTaskDto,
        user: user,
        ): Promise<task>{
        const Task = new task();
        const { title, description } = createTaskDto
        Task.title = title;
        Task.description = description;
        Task.status = taskStatus.OPEN;
        // after defining property in entity simply assign it here
        Task.user = user;
        await Task.save();
        //as api returning all rq so
        delete Task.user;

        return Task;
    }

}
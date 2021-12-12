import { task } from "./task.entity";
import { EntityRepository, Repository } from 'typeorm';

// now create repository which must extends follow
@EntityRepository(task)
export class taskRepository extends Repository<task>{
    //we make this repo available by module
    //leave repo emty for now letter add logic
}
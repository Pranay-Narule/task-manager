import { 
    BaseEntity, 
    Entity, 
    PrimaryGeneratedColumn,
    Column, 
} from 'typeorm';
import { taskStatus } from './task.model';

//to create entity must implement baseentity
@Entity()
export class task extends BaseEntity {
    //define primary key in table
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: taskStatus;
}
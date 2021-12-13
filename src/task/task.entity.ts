import { user } from 'src/auth/user.entity';
import { 
    BaseEntity, 
    Entity, 
    PrimaryGeneratedColumn,
    Column,
    ManyToMany, 
} from 'typeorm';
import { taskStatus } from './task-status.enum';

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

    // as there could be many task for one user
    @ManyToMany(type => user, user => user.tasks, { eager: false})
    user: user;

    @Column()
    userId: number;
}
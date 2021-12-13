//create user entity
import { BaseEntity, Unique, Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import * as bcrypt from 'bcrypt';
import { task } from 'src/task/task.entity';
import { type } from 'os';


@Entity()
@Unique(['username'])
export class user extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    username: string;

    @Column()
    password: string;

    
    @Column()
    salt: string;

    // this need some info first type of property
    // then at inverse side of relationship type
    // then options these are relation ship options
    @OneToMany(type => task, task => task.user, { eager: true})
    tasks: task[];
    // that it for usr side entity now go to task entity

    //retrive the password we get maybe correct or wrong
    // apend with current user salt and match both the string
    async validPassword(password: string): Promise<boolean>{
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }

}
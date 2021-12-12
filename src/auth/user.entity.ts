//create user entity
import { BaseEntity, Unique, Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import * as bcrypt from 'bcrypt';


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

    //retrive the password we get maybe correct or wrong
    // apend with current user salt and match both the string
    async validPassword(password: string): Promise<boolean>{
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }

}
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Repository, EntityRepository} from 'typeorm'
import { authCredentialsDto } from './dto\'s/auth-credential.dto';
import { user } from './user.entity';
import * as bcrypt from 'bcrypt';


@EntityRepository(user)
export class userRepository extends Repository<user>{

    async signUp(authCredentialDto: authCredentialsDto): Promise<void>{
        const { username, password } = authCredentialDto;

        // create entity here
        // const salt = await bcrypt.genSalt();
        // we need to store above salt as it is unique
        const User = new user();
        User.username = username;
        User.salt = await bcrypt.genSalt();
        User.password = await this.hashPassword(password, User.salt);

        try {
            await User.save();
        }catch(error){
            //code come in string
            if (error.code === '23505'){
                //can save this code in share code
                throw new ConflictException('Username alredy exists');
            }else {
                throw new InternalServerErrorException();
            }
        }
        
    }

    async validateUserPassword(authCredentialsDto: authCredentialsDto): Promise<string>{
        const { username, password } = authCredentialsDto;
        //this ref the use entity we define above
        const user = await this.findOne({ username });
        // now we get user
        if (user && user.validPassword(password)){
            return user.username;
        }else{
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string>{
        return bcrypt.hash(password, salt);
    }
}
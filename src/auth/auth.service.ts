import { Injectable, UnauthorizedException } from '@nestjs/common';
import { userRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm'
import { authCredentialsDto } from './dto\'s/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {

    // as we include jwt in module we can directly inject it here
    constructor(
        @InjectRepository(userRepository)
        private userRepository: userRepository,
        private jwtService: JwtService,
    ){}

    async signUp(authCredentialsDto: authCredentialsDto): Promise<void>{
        return this.userRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto: authCredentialsDto): Promise<{ accessToken: string }>{
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);

        if (!username){
            throw new UnauthorizedException('Invalid credentials');
        }
        //after sign in
        const payload: jwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }
}

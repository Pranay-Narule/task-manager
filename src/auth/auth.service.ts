import { Injectable } from '@nestjs/common';
import { userRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(userRepository)
        private userRepository: userRepository
    ){}
}

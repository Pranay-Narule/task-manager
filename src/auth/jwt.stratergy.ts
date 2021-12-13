//  // use this file to add functionalities to task access by only owner
  import { Injectable, UnauthorizedException } from '@nestjs/common';
 import { PassportStrategy } from '@nestjs/passport';
 import { InjectRepository } from '@nestjs/typeorm';
  import { Strategy, ExtractJwt } from 'passport-jwt';
  import { jwtPayload } from './jwt-payload.interface';
  import { user } from './user.entity';
 import { userRepository } from './user.repository';

  // this is comes under provider import in the module
  // this stratergy can be use by our passport
  @Injectable()
  export class JwtStrategy extends PassportStrategy(Strategy){
     constructor(
    //      @InjectRepository(userRepository)
    //      private userRepository: userRepository,
      ){
         //this is must as we are using constructor of PassportStrategy
          super({
              // this contain configuration object of how this class is going to work
              //retrive jwt from request
              jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
             //secrete we are used to create jwt token
              secretOrKey: 'topSecret51',
          });
     }

     //now create a method this method must exist for every startergy
      async validate(payload: jwtPayload): Promise<user>{
          // we do certain validation here
          // and return will be injected into rq. of any operation guarded with authentication
          // first retrive the user uising username for this we use repo
          const { username } = payload;
        const user = await this.userRepository.findOne({ username });

        if (!user){
            throw new UnauthorizedException();
        }

         return user;
      }
  }
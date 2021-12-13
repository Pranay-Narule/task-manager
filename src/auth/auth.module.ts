import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.stratergy';

@Module({
  imports : [
    PassportModule.register({ defaultStrategy: 'jwt' }), 
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      }
    }),
    TypeOrmModule.forFeature([userRepository]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
   JwtStrategy,
  ],
  exports: [
    //use this outside in any module
    JwtStrategy,
    PassportModule,
  ]
})
export class AuthModule {}

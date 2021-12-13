import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authCredentialsDto } from './dto\'s/auth-credential.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: authCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: authCredentialsDto): Promise<{ accessToken: string }>{
        return this.authService.signIn(authCredentialsDto);
    }    


    // // how authentication it work shown here
    // //can provide authentication on controller level and here also
    // @Post('/test')
    // @UseGuards(AuthGuard())
    // // we get here entire request
    // // test( @Req() req )
    // test( @GetUser() User: user ){
    //     console.log(User);
    // }
}

import { Matches, IsString, MinLength, MaxLength } from 'class-validator'


//we are using this dto for both signin and signup
export class authCredentialsDto{

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    //also pass must strong for this use RE
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password too weak' }) 
    password: string;

    // to apply above we must use validator pipe on body
}
import { IsNotEmpty } from 'class-validator';

export class createTaskDto{
    @IsNotEmpty()
    title: string;
    // install two class
    @IsNotEmpty()
    description: string;
}
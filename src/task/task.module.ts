import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { taskRepository } from './task.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([taskRepository]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}

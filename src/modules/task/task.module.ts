import { Module } from '@nestjs/common';
import { PrismaService } from '../../config/database/PrismaService';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, PrismaService],
})
export class TaskModule {}

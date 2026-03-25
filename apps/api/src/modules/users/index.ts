import { Module } from '@nestjs/common'
import { TasksController } from './users.controller'
import { TasksService } from './users.service'

@Module({
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
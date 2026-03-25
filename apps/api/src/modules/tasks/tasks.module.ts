import { Module } from '@nestjs/common'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'
import { TasksRepository } from './tasks.repository'
import { DatabaseService } from '../../database/database.service'

@Module({
  controllers: [TasksController],
  providers: [
    TasksService,
    TasksRepository,
    DatabaseService
  ]
})
export class TasksModule {}
import { Controller, Get, Post, Body } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { Task } from './tasks.interface'

@Controller('tasks')
export class TasksController {

  constructor(private service: TasksService) {
    console.log('SERVICE:', service)
  }

  @Get()
  async findAll() {
    return this.service.findAll()
  }

  @Post()
  async create(@Body() task: Task) {
    return this.service.create(task)
  }

}
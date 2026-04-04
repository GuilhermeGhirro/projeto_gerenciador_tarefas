  import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common'
  import { TasksService } from './tasks.service'
  import { Task } from './tasks.interface'

  @Controller('tasks')
  export class TasksController {

   constructor(private readonly service: TasksService) {
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

    @Delete(':id')
    async delete(@Param('id') id: number) {
      return this.service.delete(id)
    }

  }
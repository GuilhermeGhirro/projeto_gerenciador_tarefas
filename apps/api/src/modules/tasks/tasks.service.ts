import { Injectable } from '@nestjs/common'
import { TasksRepository } from './tasks.repository'
import { Task } from './tasks.interface'

@Injectable()
export class TasksService {

  constructor(private repository: TasksRepository) {}

  async findAll() {

    const data = await this.repository.findAll()
  
    return data ?? []
  }

  async create(task: Task) {
    return this.repository.create(task)
  }

}
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { TasksRepository } from './tasks.repository'
import { Task } from './tasks.interface'

@Injectable()
export class TasksService {

  constructor(private repository: TasksRepository) { }

  async findAll() {
    try {
      const data = await this.repository.findAll()
      if(data.length === 0) {
        return []
      }
      return data
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar tasks', {
        cause: error,
      })
    }
  }

  async create(task: Task) {
    try {
      return await this.repository.create(task)
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar tasks', {
        cause: error,
      })
    }
  }

  async delete(id: number) {
    try {
      return await this.repository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException('Erro ao deletar tarefa', {
        cause: error,
      })
    }
  }

}
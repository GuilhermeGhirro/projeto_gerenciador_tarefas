import { Injectable } from '@nestjs/common'
import { Task } from './tasks.interface'
import { DatabaseService } from '../../database/database.service'

@Injectable()
export class TasksRepository {

  constructor(private db: DatabaseService) { }

  async findAll() {

    const result = await this.db.query(
      `SELECT * FROM tasks WHERE deleted = 0`
    )

    return result.rows
  }

  async create(task: Task) {
    const result = await this.db.query(
      `
    INSERT INTO tasks
    (description,hours,start_date,end_date,status_id,name,deleted)
    VALUES ($1,$2,$3,$4,$5,$6,0)
    RETURNING *
    `,
      [
        task.description,
        task.hours,
        task.startDate,
        task.endDate,
        task.statusId,
        task.name
      ]
    )

    return result.rows[0]
  }

}
import { Injectable } from '@nestjs/common'
import { Pool } from 'pg'

@Injectable()
export class DatabaseService {

  private pool: Pool

  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5433'),
      user: process.env.DB_USER || 'taskflow',
      password: process.env.DB_PASSWORD || 'taskflow',
      database: process.env.DB_NAME || 'taskflow'
    })
  }

  async query(sql: string, params?: unknown[]) {
    return this.pool.query(sql, params)
  }

}
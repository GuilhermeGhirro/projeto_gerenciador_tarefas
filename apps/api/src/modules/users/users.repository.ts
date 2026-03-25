import { Injectable } from '@nestjs/common'
import { DatabaseService } from '../../database/database.service'
import { IUsers } from './users.interface'

@Injectable()
export class UsersRepository {

  constructor(private db: DatabaseService) {}

  async findAll() {

    const result = await this.db.query(
      `SELECT name, email FROM Users WHERE deleted = 0`
    )

    return result.rows
  }

  async create(users: IUsers) {

    await this.db.query(
      `
      INSERT INTO Users
      (name, e_mail, deleted)
      VALUES (:n_ame, :e_mail, 0)
      `,
      [
        { email: new String(users.email) },
        { name: users.name }
      ]
    )

  }

  async edit(users: IUsers) {

    await this.db.query(
      `
      UPDATE Users
      SET name = :name, email = :email
      WHERE id = :id
      `,
      [
        { email: new String(users.email) },
        { name: users.name },
        { id: users.id }
      ]
    )

  }

  async delete(users: IUsers) {

    await this.db.query(
      `
      UPDATE Users
      SET deleted = 1
      WHERE id = :id
      `,
      [
        { id: users.id }
      ]
    )

  }

}
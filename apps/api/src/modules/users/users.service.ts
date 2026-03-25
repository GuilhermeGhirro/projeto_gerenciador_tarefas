import { Injectable } from '@nestjs/common'
import { UsersRepository } from './users.repository'
import { IUsers} from './users.interface'

@Injectable()
export class UsersService {

  constructor(private repository: UsersRepository) {}

  async findAll() {
    return this.repository.findAll()
  }

  async create(users: IUsers) {
    return this.repository.create(users)
  }

  async update(users: IUsers) {
    return this.repository.edit(users)
  }

  async delete(users: IUsers) {
    return this.repository.delete(users)
  }

}
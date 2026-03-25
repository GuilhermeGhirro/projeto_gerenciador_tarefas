import { Controller, Body, Get, Post, Put, Delete, Param } from '@nestjs/common'
import { UsersService } from './users.service'
import { IUsers } from './users.interface'

@Controller('users')
export class UsersController {

  constructor(private service: UsersService) {}

  @Get()
  async findAll() {
    return this.service.findAll()
  }

  @Post()
  async create(
    @Body() users: IUsers
  ) {
    return this.service.create(users)
  }

  @Put(':id')
  async update(
    @Param('id')users: IUsers
  ) {
    return this.service.update(users)
  }

  @Delete(':id')
  async delete(
    @Param('id') users: IUsers
  ) {
    return this.service.delete(users)
  }

}
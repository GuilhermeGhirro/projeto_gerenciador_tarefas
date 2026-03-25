import { Module } from '@nestjs/common'
import { DatabaseService } from '../../database/database.service'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { UsersRepository } from './users.repository'

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    DatabaseService
  ]
})
export class UsersModule {}
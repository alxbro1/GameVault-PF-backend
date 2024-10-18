import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from '../../../db/schemas/schema';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll({ page, limit }: { page: number; limit: number }) {
    return await this.usersRepository.findAllUsers({ page, limit });
  }

  async findOneBy(id: string) {
    return await this.usersRepository.findOneById(id);
  }

  async updateUser(id: string, body: Partial<CreateUserDto>) {
    return await this.usersRepository.updateUserById(id, body);
  }

  async removeUser(id: string) {
    return await this.usersRepository.removeUserById(id);
  }
}

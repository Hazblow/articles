import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserCreateDto } from '../dto/user-create.dto';
import { HashPasswordServiceInterface } from '../utils/hash-password.service.interface';

export class CreateUserService {
  constructor(
    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>,
    private readonly hashPasswordService: HashPasswordServiceInterface,
  ) {
  }

  async createUser(data: UserCreateDto) {
    try {
      data.password = await this.hashPasswordService.hashPassword(data.password);
      // return this.userRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating user');
    }
  }
}
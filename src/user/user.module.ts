import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { CreateUserService } from './use-case/create-user.service';
import { User } from './entity/user.entity';
import { HashPasswordService } from './utils/hash-password.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    CreateUserService, HashPasswordService
  ],
})
export class UserModule {
}

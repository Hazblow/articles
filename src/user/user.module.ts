import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { CreateUserService } from './use-case/create-user.service';
import { User } from './entity/user.entity';
import { HashPasswordService } from './utils/hash-password.service';
import { HashPasswordServiceInterface } from './utils/hash-password.service.interface';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    CreateUserService,
    HashPasswordService,
    {
      provide: CreateUserService,
      useFactory: (passwordHasherService: HashPasswordServiceInterface) => {
        return new CreateUserService(passwordHasherService);
      },
      inject: [HashPasswordService],
    },
  ],

})
export class UserModule {
}

import { Logger, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';

@Module({
  providers: [UserService, UserRepository, Logger],
  controllers: [UserController],
})
export class UserModule {}

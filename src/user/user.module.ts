import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '@prisma/prisma.module';
import { HashModule } from '@common/modules/hash/hash.module';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [PrismaModule, HashModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

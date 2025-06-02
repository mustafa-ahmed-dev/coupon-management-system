import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuditLogsModule } from 'src/common/audit-log/audit-logs.module';
import { ConfigModule } from 'src/common/config/config.module';

import { UserModule } from '@user/user.module';
import { PrismaModule } from './common/prisma/prisma.module';

@Module({
  imports: [ConfigModule, PrismaModule, AuditLogsModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

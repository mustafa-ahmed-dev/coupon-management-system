import { Module } from '@nestjs/common';

import { AuditLogsService } from './audit-logs.service';

import { ConfigModule } from '@common/modules/config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [AuditLogsService],
  exports: [AuditLogsService],
})
export class AuditLogsModule {}

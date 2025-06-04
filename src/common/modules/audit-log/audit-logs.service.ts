import { Injectable } from '@nestjs/common';

import { ConfigService } from '@common/modules/config/config.service';

@Injectable()
export class AuditLogsService {
  constructor(private readonly configService: ConfigService) {}
}

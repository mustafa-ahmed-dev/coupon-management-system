import { Injectable } from '@nestjs/common';

import { ConfigService } from 'src/common/config/config.service';

@Injectable()
export class AuditLogsService {
  constructor(private readonly configService: ConfigService) {}
}

import { Controller, Get } from '@nestjs/common';

import { ApiResponse } from '@/common/api';
import type DocService from './doc.service';

@Controller('/api/v1/docs')
export default class DocController {
  constructor(private readonly docService: DocService) {}

  @Get('/:title/latest')
  async docLatestVersion(title: string) {
    return ApiResponse.success(this.docService.docLatestVersion(title));
  }
}

import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiOkResponse } from '@nestjs/swagger';

import { ApiResponse } from '@/common/api';
import DocService from './doc.service';
import { DocResponseDto } from './dto/response';

@Controller('/api/v1/docs')
export default class DocController {
  constructor(private readonly docService: DocService) {}

  @Get('/:title/latest')
  @ApiParam({ name: 'title', required: true, description: '문서 제목' })
  @ApiOkResponse({
    type: DocResponseDto,
    description: '지정된 문서의 최신 버전 정보를 반환합니다.',
  })
  async docLatestVersion(@Param('title') title: string) {
    return ApiResponse.success(await this.docService.docLatestVersion(title));
  }

  @Get('/:title/:version')
  @ApiParam({ name: 'title', required: true, description: '문서 제목' })
  @ApiParam({
    name: 'version',
    required: true,
    description: '문서 버전 문자열',
  })
  @ApiOkResponse({
    type: DocResponseDto,
    description: '지정된 문서와 버전 정보를 반환합니다.',
  })
  async docSelectedVersion(
    @Param('title') title: string,
    @Param('version') version: string,
  ) {
    return ApiResponse.success(
      await this.docService.docSelectedVersion(title, version),
    );
  }
}

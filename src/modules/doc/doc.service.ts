import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import DocRepository from './doc.repository';
import { DocResponseDto } from './dto/response';
import { CustomException } from '@/common/api';

@Injectable()
export default class DocService {
  constructor(private readonly docRepository: DocRepository) {}

  async docLatestVersion(title: string): Promise<DocResponseDto> {
    const result = await this.docRepository.findDocLatestVersion(title);
    if (!result) {
      throw new CustomException('RESOURCE_NOT_FOUND');
    }
    return plainToInstance(DocResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async docSelectedVersion(
    title: string,
    version: string,
  ): Promise<DocResponseDto> {
    const result = await this.docRepository.findDocVersion(title, version);
    if (!result) {
      throw new CustomException('RESOURCE_NOT_FOUND');
    }
    return plainToInstance(DocResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }
}

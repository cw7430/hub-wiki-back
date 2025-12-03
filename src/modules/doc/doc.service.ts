import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import type DocRepository from './doc.repository';
import { DocResponseDto } from './dto/response';

@Injectable()
export default class DocService {
  constructor(private readonly docRepository: DocRepository) {}

  async docLatestVersion(title: string): Promise<DocResponseDto | undefined> {
    const result = await this.docRepository.findDocLatestVersion(title);
    return plainToInstance(DocResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }
}

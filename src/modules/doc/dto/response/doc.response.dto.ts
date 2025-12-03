import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { TransformBigintToString } from '@/common/decorator/transform.decorator';

export default class DocResponseDto {
  @ApiProperty({ type: String })
  @TransformBigintToString()
  @Expose()
  readonly wikiDocId: string;

  @ApiProperty({ type: String })
  @Expose()
  readonly title: string;

  @ApiProperty({ type: String })
  @TransformBigintToString()
  @Expose()
  readonly docVersionId: string;

  @ApiProperty({ type: String })
  @Expose()
  readonly body: string;

  @ApiProperty({ type: Date })
  @Expose()
  readonly createdAt: Date;

  @ApiProperty({ type: String })
  @Expose()
  readonly version: string;
}

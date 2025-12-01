import { ApiProperty } from '@nestjs/swagger';

export default class DocResponseDto {
  @ApiProperty()
  wikiDocId: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  docVersionId: string;
  @ApiProperty()
  body: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  version: string;
}

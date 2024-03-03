import { ApiProperty } from '@nestjs/swagger';

export class ResponseData {
  @ApiProperty()
  readonly success: boolean;
  @ApiProperty()
  readonly data: object;
}

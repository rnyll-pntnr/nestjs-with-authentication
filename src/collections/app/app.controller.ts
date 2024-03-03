import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('API Health Check')
@Controller('health')
export class AppController {
  @Get()
  getCheckAppHealth() {
    return {
      health: true,
    };
  }
}

import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import { UserLoginDto } from '../users/dto/login-user.dto';

@ApiTags('Authenticaiton')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Endpoint to login and generate access token' })
  @ApiBody({
    type: UserLoginDto,
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}

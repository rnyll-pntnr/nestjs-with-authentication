import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import AuthenticationHelper from '../../utils/authentication.helper';

@Injectable()
export class AuthService {
  private authenticationHelper: AuthenticationHelper;
  constructor(private usersService: UsersService) {
    this.authenticationHelper = new AuthenticationHelper();
  }

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);

    const comparePassword = await this.authenticationHelper.validatePassword(
      user.data.password,
      pass,
    );

    if (!comparePassword) {
      throw new UnauthorizedException();
    }
    const payload = user.data.toJSON();
    return {
      access_token: await this.authenticationHelper.generateToken(payload),
    };
  }
}

import { BadRequestException, Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export default class AuthenticationHelper {
  private logger: Logger;

  constructor() {
    this.logger = new Logger('JWT');
  }

  async generateToken(payload: any) {
    const _token: string = await jwt.sign(
      payload,
      process.env.JWT_TOKEN ?? 'JWT_TOKEN',
      {
        expiresIn: '86400s',
      },
    );

    return _token;
  }

  async verifyToken(token: string) {
    try {
      let result: any;

      await jwt.verify(
        token,
        process.env.JWT_TOKEN ?? 'JWT_TOKEN',
        (error: any, decoded: any) => {
          if (error) throw 'Invalid token';
          result = decoded;
        },
      );

      return result;
    } catch (error) {
      this.logger.debug(error.message || error);
      throw new BadRequestException(error.message || error);
    }
  }

  async encryptPassword(password: string) {
    try {
      const bcryptSalt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, bcryptSalt);

      return hashPassword;
    } catch (error) {
      this.logger.debug(error.message || error);
      throw new BadRequestException(error.message || error);
    }
  }

  async validatePassword(hashPassword: string, password: string) {
    try {
      const comparePassword: boolean = await bcrypt.compare(
        password,
        hashPassword,
      );

      return comparePassword;
    } catch (error) {
      this.logger.debug(error.message || error);
      throw new BadRequestException(error.message || error);
    }
  }
}

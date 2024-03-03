import {
  Injectable,
  Inject,
  BadRequestException,
  Logger,
  NotAcceptableException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './schemas/users.interface';
import { Model } from 'mongoose';
import { ResponseData } from './dto/success-response.dto';
import AuthenticationHelper from '../../utils/authentication.helper';

@Injectable()
export class UsersService {
  private logger: Logger;
  private authenticationHelper: AuthenticationHelper;
  constructor(
    @Inject('USERS_MODEL')
    private usersModel: Model<Users>,
  ) {
    this.logger = new Logger('Users');
    this.authenticationHelper = new AuthenticationHelper();
  }

  async create(createUserDto: CreateUserDto): Promise<ResponseData> {
    try {
      const checkDuplicate: number = await this.usersModel
        .find({ email: createUserDto.email })
        .countDocuments();
      if (checkDuplicate)
        throw new NotAcceptableException('Email already exists.');

      createUserDto.password = await this.authenticationHelper.encryptPassword(
        createUserDto.password,
      );
      const savedData: Users = await new this.usersModel(createUserDto).save();
      return {
        success: true,
        data: savedData,
      };
    } catch (error) {
      this.logger.debug(error);
      throw new BadRequestException(error.message ?? error);
    }
  }

  async findAll() {
    const data: any = await this.usersModel.find({});
    return {
      success: true,
      data: data.map((data) => data.toJSON()),
    };
  }

  async findOne(email: string) {
    const data: Users = await this.usersModel.findOne({ email: email });
    return {
      success: true,
      data: data,
    };
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseData> {
    try {
      const userData: Users = await this.usersModel.findByIdAndUpdate(
        id,
        {
          email: updateUserDto.email,
          name: updateUserDto.name,
          password: await this.authenticationHelper.encryptPassword(
            updateUserDto.password,
          ),
        },
        {
          new: true,
        },
      );

      return {
        success: true,
        data: userData.toJSON(),
      };
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  async remove(id: string): Promise<ResponseData> {
    try {
      const deleteFlag = await this.usersModel.findByIdAndDelete(id);
      return {
        success: true,
        data: deleteFlag,
      };
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  async getUser(email: string) {
    try {
      const findUser: Users = await this.usersModel.findOne({ email: email });
      return {
        success: true,
        data: findUser,
      };
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }
}

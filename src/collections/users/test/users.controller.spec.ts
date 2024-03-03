import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { usersProviders } from '../users.providers';
import { DatabaseModule } from '../../../config/database/database.module';
import { ResponseData } from '../dto/success-response.dto';
import { JwtModule } from '@nestjs/jwt';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, JwtModule],
      controllers: [UsersController],
      providers: [UsersService, ...usersProviders],
      exports: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return 200 status', async () => {
    const data: ResponseData = await controller.findAll();
    expect(data.success).toBeTruthy();
  });
});

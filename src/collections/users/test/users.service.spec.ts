import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { DatabaseModule } from '../../../config/database/database.module';
import { usersProviders } from '../users.providers';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [UsersService, ...usersProviders],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

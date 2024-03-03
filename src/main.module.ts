import { Module } from '@nestjs/common';
import { UsersModule } from './collections/users/users.module';
import { AppController } from './collections/app/app.controller';
import { AuthModule } from './collections/auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [AppController],
})
export class MainModule {}

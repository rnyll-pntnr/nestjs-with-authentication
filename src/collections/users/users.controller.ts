import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseData } from './dto/success-response.dto';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiResponseProperty,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@ApiSecurity('JWT_TOKEN')
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Create User Data',
    description: 'Create User',
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<Partial<ResponseData>> {
    try {
      if (
        !createUserDto.email ||
        !createUserDto.password ||
        !createUserDto.name
      )
        throw 'Please check all the required fields.';
      if (createUserDto.password.length <= 7)
        throw 'Password length must be atleast 8 characters';
      return this.usersService.create(createUserDto);
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  @ApiOperation({
    summary: 'Get all users',
    description: 'List all users',
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({
    summary: 'Update User details using user _id',
    description: 'Update User',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Delete user using _id',
    description: 'Delete User',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

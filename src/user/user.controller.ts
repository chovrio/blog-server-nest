import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { objFilter } from 'src/utils';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** 创建用户接口 */
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    const res = await this.userService.create(createUserDto);
    return objFilter<UserEntity>(res, [
      'create_time',
      'update_time',
      'password',
    ]);
  }
  /** 登录接口 */
  @Post('login')
  async login(@Body() user: UserDto) {
    return this.userService.login(user);
  }
  /** 获得用户接口 */
  @Get(':id')
  async findOne(@Param('id') info: string, @Request() req) {
    const res = await this.userService.findOne(info);
    return objFilter<UserEntity>(res, [
      'create_time',
      'update_time',
      'password',
    ]);
  }

  /** 更新用户 */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  /** 函数用户 */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

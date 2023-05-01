import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto/user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { objFilter } from 'src/utils';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    const result = await this.userRepository.save(user);
    return result;
  }
  async login(user: UserDto) {
    const { name } = user;
    const p = await this.userRepository.findOne({ where: { name } });
    const person = objFilter<UserEntity>(p, [
      'create_time',
      'update_time',
      'password',
    ]);
    const token = this.jwtService.sign(person);
    return {
      user: person,
      token,
      message: '登录成功',
    };
  }
  findAll() {
    return `This action returns all user`;
  }

  /**
   *
   * @param info 查询信息
   * @param flag 默认false标识id查询，为ture则是姓名查询
   * @returns
   */
  async findOne(info: string, flag = false) {
    if (!flag) {
      return await this.userRepository.findOne({ where: { id: info } });
    } else {
      const res = await this.userRepository.findOne({ where: { name: info } });
      return objFilter<UserEntity>(res, [
        'create_time',
        'update_time',
        'password',
      ]);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

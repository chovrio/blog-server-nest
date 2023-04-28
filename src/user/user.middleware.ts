import { NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import { BUSINESS_ERROR_CODE } from 'src/common/exceptions/business.error.codes';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { MiddleWare } from 'src/types/middleware';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
export const InfoMiddleWare: MiddleWare = (req, res, next) => {
  const { name, password } = req.body;
  if (!name) {
    throw new BusinessException({
      code: BUSINESS_ERROR_CODE.USERNAME_NOT_EXIST,
      message: '请输入用户名',
    });
  }
  if (!password) {
    throw new BusinessException({
      code: BUSINESS_ERROR_CODE.PASSWORD_NOT_EXIST,
      message: '请输入密码',
    });
  }
  next();
};

/** 注册中间件 */
export class RegistoryMiddleWare implements NestMiddleware {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    const person = await this.userRepository.findOne({ where: { name } });
    if (person) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.USER_EXIST,
        message: '用户名已经存在',
      });
    }
    next();
  }
}
/** 登录中间件 */
export class LoginMiddleWare implements NestMiddleware {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { name, password } = req.body;
    const person = await this.userRepository.findOne({ where: { name } });
    if (!person) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.USER_EXIST,
        message: '用户不存在',
      });
    }
    /** 对比密码 */
    if (!bcrypt.compareSync(password, person.password)) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.PASSWORD_ERROR,
        message: '密码错误',
      });
    }
    next();
  }
}

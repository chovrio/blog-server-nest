import { NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e, { Request, Response, NextFunction } from 'express';
import { BUSINESS_ERROR_CODE } from 'src/common/exceptions/business.error.codes';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { MiddleWare } from 'src/types/middleware';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

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

export class RegistoryMiddleWare implements NestMiddleware {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async use(req: any, res: any, next: (error?: any) => void) {
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
export class LoginMiddleWare implements NestMiddleware {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    const person = await this.userRepository.findOne({ where: { name } });
    if (!person) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.USER_EXIST,
        message: '用户不存在',
      });
    }
    next();
  }
}

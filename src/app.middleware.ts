import { Inject, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { NextFunction, Request, Response } from 'express';
import { BUSINESS_ERROR_CODE } from './common/exceptions/business.error.codes';
import { BusinessException } from './common/exceptions/business.exception';
import { getConfig } from './utils';

const { JWT_SECRET } = getConfig();
export class AuthMiddleWare implements NestMiddleware {
  constructor(@Inject(JwtService) private jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    try {
      const token = req.headers.authorization.replace('Bearer ', '');
      const info = this.jwtService.verify(token, JWT_SECRET.value);
      req.authInfo = info;
      next();
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.TOKEN_EXPIRED,
        message: 'token不存在或已过期',
      });
    }
  }
}

import { NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { BUSINESS_ERROR_CODE } from 'src/common/exceptions/business.error.codes';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { Repository } from 'typeorm';
import { ArticleEntity } from './entities/article.entity';

export class ValidateAuthorMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { author } = req.body;
    if (author !== (<any>req.authInfo).id) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.ARTICLE_AUTHOR_ERROR,
        message: '作者名称不符合',
      });
    }
    next();
  }
}

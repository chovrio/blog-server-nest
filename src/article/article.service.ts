import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/article.dto';
import { ArticleEntity } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async create(article: CreateArticleDto) {
    return await this.articleRepository.save(article);
  }
  test() {
    return 'test';
  }
}

import { Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeEntity } from './entities/grade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GradeEntity])],
  controllers: [GradeController],
  providers: [GradeService],
})
export class GradeModule {}

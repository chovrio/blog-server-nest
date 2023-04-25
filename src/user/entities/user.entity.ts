import { GradeEntity } from 'src/grade/entities/grade.entity';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主链，值自动生成
  @Column({ length: 20 })
  @Unique([])
  name: string;
  @Column({ length: 20 })
  password: string;
  @Column({ default: '这个用户很懒，什么也没留下' })
  info: string;
  @Column({ default: 2 })
  @OneToOne(() => GradeEntity, (grade) => grade.id)
  grade: number;
  @Column({ default: 'default.png' })
  avactor: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;
}

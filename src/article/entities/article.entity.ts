import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('article')
/** */
export class ArticleEntity {
  /** 文章id */
  @PrimaryGeneratedColumn('uuid')
  id: string;
  /** 文章名称 */
  @Column({ length: 20 })
  name: string;
  /** 封面 */
  @Column({ default: '' })
  img: string;
  /** 标签：约定前端传入数组，后端拼接成字符串使用,进行分割 */
  @Column({ default: 'none' })
  tag: string;
  /** 简介 */
  @Column({ length: 50, default: '无' })
  info: string;
  /** 内容 */
  @Column()
  content: string;
  /** 创建时间 */
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;
  /** 最后更新时间 */
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;

  /** 作者 */
  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'author' })
  author: string;
}

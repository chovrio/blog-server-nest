import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('grade')
export class GradeEntity {
  @PrimaryGeneratedColumn()
  @OneToMany(() => UserEntity, (user) => user.grade)
  id: number;
  @Column()
  state: number;
  @Column()
  info: string;
}

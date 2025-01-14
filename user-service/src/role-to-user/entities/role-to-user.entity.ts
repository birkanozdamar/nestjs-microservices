import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class RoleToUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  user_id: number;

  @Column()
  role_id: number;

  @Column()
  created_by_id: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}

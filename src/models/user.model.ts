import {
  Column,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    allowNull: false,
  })
  password: string;

  @Column({
    allowNull: false,
  })
  photourl: string;

  @Column({
    allowNull: false,
  })
  description: string;

  @CreatedAt
  @Column({
    allowNull: false,
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    allowNull: false,
  })
  updatedAt: Date;
}

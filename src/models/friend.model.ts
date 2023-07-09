import {
  Column,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({ tableName: 'friends' })
export class Friend extends Model<Friend> {
  @ForeignKey(() => User)
  @Column
  user_id: number;
  @ForeignKey(() => User)
  @Column
  friend_id: number;

  @Column({
    primaryKey: true,
  })
  id: string;
  @BelongsTo(() => User, 'friend_id')
  friendUser: User;
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

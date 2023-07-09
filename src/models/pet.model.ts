import {
  Column,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({ tableName: 'pets' })
export class Pet extends Model<Pet> {
  @ForeignKey(() => User)
  @Column
  user_id: number;

  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({
    allowNull: false,
  })
  name_pet: string;

  @Column({
    allowNull: false,
  })
  species_pet: string;

  @Column({
    allowNull: false,
  })
  photourl: string;
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

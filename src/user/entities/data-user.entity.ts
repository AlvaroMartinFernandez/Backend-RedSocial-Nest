import { User } from '../../models/user.model';
import { Friend } from '../../models/friend.model';
import { Pet } from '../../models/pet.model';
import { Model, Table, HasMany } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class DataUser extends Model<User> {
  @HasMany(() => Friend, 'user_id')
  Friends: Friend[];
  @HasMany(() => Pet, 'user_id')
  Pets: Pet[];
}

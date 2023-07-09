import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../models/user.model';
import { Friend } from '../models/friend.model';
import { Pet } from '../models/pet.model';
import { DataUser } from './entities/data-user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Friend)
    private friendModel: typeof Friend,
    @InjectModel(Pet)
    private petModel: typeof Pet,
    @InjectModel(DataUser)
    private userDataModel: typeof DataUser,
  ) {}
  async create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.findAll({
      attributes: ['id', 'name', 'photourl', 'description'],
    });
    if (users.length === 0) {
      throw new NotFoundException(`Users not found`);
    }
    return users;
  }

  async findOne(id: number): Promise<DataUser> {
    const user = await this.userDataModel.findOne({
      where: { id },
      include: [
        {
          model: Friend,
          include: [
            {
              model: User,
              attributes: ['name', 'photourl'],
              as: 'friendUser',
            },
          ],
        },
        { model: Pet },
      ],
      attributes: ['id', 'name', 'photourl', 'description'],
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    console.log(user);
    updateUserDto.updatedAt = new Date();
    console.log(updateUserDto);
    const data = await this.userModel.update(updateUserDto, { where: { id } });
    return data;
  }

  async remove(id: number) {
    const data = await this.userDataModel.findOne({
      where: { id },
      include: [{ model: Friend }, { model: Pet }],
    });
    if (!data) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (data.Friends.length > 0) {
      data.Friends.map(async (element) => {
        await this.friendModel.destroy({
          where: {
            [Op.or]: [
              { user_id: element.user_id },
              { friend_id: element.friend_id },
            ],
          },
        });
      });
    }
    if (data.Pets.length > 0) {
      data.Pets.map(async (element) => {
        await this.petModel.destroy({
          where: { user_id: element.user_id },
        });
      });
    }
    await this.friendModel.destroy({ where: { friend_id: id } });
    return await this.userModel.destroy({ where: { id } });
  }
}

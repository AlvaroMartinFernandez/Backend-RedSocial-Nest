import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { Friend } from '../models/friend.model';
import { Pet } from '../models/pet.model';
import { DataUser } from './entities/data-user.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, Friend, Pet, DataUser])],
  controllers: [UserController, PostController],
  providers: [UserService, PostService],
})
export class UserModule {}

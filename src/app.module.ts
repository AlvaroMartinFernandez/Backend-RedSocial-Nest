import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Friend } from './models/friend.model';
import { Pet } from './models/pet.model';
import { DataUser } from './user/entities/data-user.entity';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({}),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASEHOST,
      port: Number(process.env.DATABASEPORT),
      username: process.env.DATABASEUSERNAME,
      password: process.env.DATABASEPASSWORD,
      database: 'railway',
      models: [User, Friend, Pet, DataUser],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

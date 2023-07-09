import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { Friend } from '../models/friend.model';
import { Pet } from '../models/pet.model';
import { DataUser } from './entities/data-user.entity';
import { getModelToken } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
describe('UserService', () => {
  let service: UserService;

  const mockUserRepository = {
    create: jest.fn().mockImplementation((dto:CreateUserDto) => {
      return {
        id: 1,
        ...dto,
      };}),
    update: jest.fn().mockImplementation((id:number, dto:UpdateUserDto) => ({
      id:id,
      ...dto,
    })),
    findByPk: jest.fn().mockImplementation((id:number) => [
      {
        id: id,
        name: 'usuario1',
        photourl: 'https://xsgames.co/randomusers/avatar.php?g=mal',
        description: 'Descripcion de prueba',
      },
    ]),
    findAll: jest.fn().mockImplementation(() => [
      {
        id: 1,
        name: 'usuario1',
        photourl: 'https://xsgames.co/randomusers/avatar.php?g=mal',
        description: 'Descripcion de prueba',
      },
      {
        id: 2,
        name: 'usuario2',
        photourl: 'https://xsgames.co/randomusers/avatar.php?g=mal',
        description: 'Descripcion de prueba',
      },
    ]),
    findOne: jest.fn().mockImplementation((id:number) => [
      {
        id: id,
        name: 'usuario1',
        photourl: 'https://xsgames.co/randomusers/avatar.php?g=mal',
        description: 'Descripcion de prueba',
      },
    ]),

  };
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getModelToken(Friend),
          useValue: mockUserRepository,
        },
        {
          provide: getModelToken(Pet),
          useValue: mockUserRepository,
        },
        {
          provide: getModelToken(DataUser),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = moduleRef.get<UserService>(UserService);
  });

  it('should service be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a user', async () => {
    expect(
      await service.create({
        name: 'test',
        password: 'Test123456',
        photourl: 'https://xsgames.co/randomusers/avatar.php?g=mal',
        description: 'Descripcion de prueba',
      }),
    ).toEqual({
      id: expect.any(Number),
      name: 'test',
      password: 'Test123456',
      photourl: 'https://xsgames.co/randomusers/avatar.php?g=mal',
      description: 'Descripcion de prueba',
    });
  });
  it('should update a user', async () => {
    const date=new Date();
    expect(
      await service.update(1, {name:'testupdate',updatedAt: date}),
    ).
    toEqual({
      id: {
        name: "testupdate",
        updatedAt: date,
      },
      where: {
        id: 1,
      }
    });
  });
  it('should find all user', async () => {
    expect(await service.findAll()).toEqual([
      {
        id: 1,
        name: 'usuario1',
        photourl: 'https://xsgames.co/randomusers/avatar.php?g=mal',
        description: 'Descripcion de prueba',
      },
      {
        id: 2,
        name: 'usuario2',
        photourl: 'https://xsgames.co/randomusers/avatar.php?g=mal',
        description: 'Descripcion de prueba',
      },
    ]);
  });
  it('should find one user', async () => {
    expect(await mockUserRepository.findOne(1)).toEqual([
      {
        id: 1,
        name: 'usuario1',
        photourl: 'https://xsgames.co/randomusers/avatar.php?g=mal',
        description: 'Descripcion de prueba',
      },
    ]);
  });  
});

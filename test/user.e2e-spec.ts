import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../src/user/user.module';
import { UserService } from '../src/user/user.service';
import { getModelToken } from '@nestjs/sequelize';
import { User } from '../src/models/user.model';
import { Friend } from '../src/models/friend.model';
import { Pet } from '../src/models/pet.model';
import { DataUser } from '../src/user/entities/data-user.entity';

describe('User Controllers (e2e)', () => {
  let app: INestApplication;

  const mockUserModel = {
    create: jest.fn().mockImplementation((dto) => {
      return {
        id: 1,
        ...dto,
      };
    }),
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
  };
  const mockFriendModel = {};
  const mockPetModel = {};
  const mockDataUserModel = {
    findOne: jest.fn().mockImplementation((id) => [
      {
        id: id,
        name: 'usuario1',
        photourl: 'https://xsgames.co/randomusers/avatar.php?g=mal',
        description: 'Descripcion de prueba',
        Friends: [],
        Pets: [],
      },
    ]),
  };
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(getModelToken(User))
      .useValue(mockUserModel)
      .overrideProvider(getModelToken(Friend))
      .useValue(mockFriendModel)
      .overrideProvider(getModelToken(Pet))
      .useValue(mockPetModel)
      .overrideProvider(getModelToken(DataUser))
      .useValue(mockDataUserModel)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Method (GET ALL User)', async () => {
    const mockDataUsers = [
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
    ];
    mockUserModel.findAll.mockResolvedValue(mockDataUsers);

    const response = await request(app.getHttpServer())
      .get('/user')
      .expect(200);
    expect(response.body).toEqual(mockDataUsers);
  });
  it('Method (POST ONE User)', async () => {
    const mockUsers = {
      name: 'usuario1',
      password: 'Pass1234156',
      photourl: 'https://xsgames.co/randomusers/avatar.php?g=mal',
      description: 'Descripcion de prueba',
    };
    mockUserModel.create.mockResolvedValue(mockUsers);
    const response = await request(app.getHttpServer())
      .post('/user')
      .send(mockUsers)
      .expect(201)
      .expect('Content-Type', /json/);
    expect(response.body).toEqual(expect.objectContaining(mockUsers));
  });
  it('Method (GET ONE User)', async () => {
    const mockUserId = 1;
    const mockDataUser = {
      id: mockUserId,
      name: 'usuario1',
      password: 'Pass1234156',
      photourl: 'https://xsgames.co/randomusers/avatar.php?g=mal',
      description: 'Descripcion de prueba',
      Friends: [],
      Pets: [],
    };

    mockDataUserModel.findOne.mockResolvedValue(mockDataUser);

    const response = await request(app.getHttpServer())
      .get(`/user/${mockUserId}`)
      .expect(200);
    expect(response.body).toEqual(mockDataUser);
  });
});

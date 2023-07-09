import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModuleMock } from './user.module.mock';
import { PostService } from '../src/user/post.service';
import { PostController } from '../src/user/post.controller';

describe('PostController (e2e)', () => {
  let app: INestApplication;
  const mockPostService = {
    findOne: jest.fn().mockImplementation(async (id: number) => ({
      statusCode: 200,
      data: [
        {
          userId: id,
          id: 1,
          title: 'titulo1',
          body: 'contenido1',
        },
      ],
    })),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModuleMock],
      controllers: [PostController],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET Pos by UserID)', () => {
    const userId = 1;
    const expectedResponse = {
      statusCode: 200,
      data: [
        {
          userId: userId,
          id: 1,
          title: 'titulo1',
          body: 'contenido1',
        },
      ],
    };

    return request(app.getHttpServer())
      .get(`/post/${userId}`)
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual(expectedResponse);
      });
  });
});

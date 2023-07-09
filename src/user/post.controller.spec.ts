import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { HttpService, HttpModule } from '@nestjs/axios';
import { mock } from 'node:test';

describe('PostController', () => {
  let controller: PostController;

  const mockPostService = {
    findOne: jest.fn().mockImplementation((id: string) => ({
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
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService],
      imports: [HttpModule],
    })
      .overrideProvider(PostService)
      .useValue(mockPostService)
      .compile();

    controller = await module.resolve(PostController);
  });

  it('should controller be defined', () => {
    expect(controller).toBeDefined();
  });

  const mockPost = {
    statusCode: 200,
    data: [
      {
        userId: 1,
        id: 1,
        title: 'titulo1',
        body: 'contenido1',
      },
    ],
  };

  it('should show one Post User', async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual(mockPost);
    expect(mockPostService.findOne).toHaveBeenCalled();
  });
});

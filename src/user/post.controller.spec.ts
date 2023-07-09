import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';

describe('PostController', () => {
  let controller: PostController;
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService],
    }).compile();

    controller = await module.resolve(PostController);
    service = await module.resolve(PostService);
  });

  it('should controller be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should service be defined', () => {
    expect(service).toBeDefined();
  });
  it('test_controller_returns_200_status_code', async () => {
    const postService = new PostService();
    const postController = new PostController(postService);
    const result = await postController.findOne('1');
    expect(result.statusCode).toEqual(200);
  });

  it('test_controller_returns_array_of_post_objects', async () => {
    const postService = new PostService();
    const postController = new PostController(postService);
    const result = await postController.findOne('1');
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data[0]).toHaveProperty('userId');
    expect(result.data[0]).toHaveProperty('id');
    expect(result.data[0]).toHaveProperty('title');
    expect(result.data[0]).toHaveProperty('body');
  });

  it('test controler invalid id', async () => {
    const postService = new PostService();
    const postController = new PostController(postService);
    const result = await postController.findOne('invalid_id');
    expect(result.statusCode).toEqual(200);
  });
  describe('findOne', () => {
    it('should return an array of posts ', async () => {
      const result = {
        statusCode: 200,
        data: [
          { userId: 1, id: 1, title: 'title', body: 'body' },
          { userId: 1, id: 2, title: 'title', body: 'body' },
        ],
      };
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => Promise.resolve(result));
      expect(await controller.findOne('1')).toBe(result);
    });
  });
});

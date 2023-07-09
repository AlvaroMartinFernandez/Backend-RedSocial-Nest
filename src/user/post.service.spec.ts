import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { Post } from './post.controller';

describe('UserService', () => {
  let service: PostService;

  const mockPostRepository = {
    findOne: jest.fn().mockImplementation((id: number) => [
      {
        Userid: id,
        id: 1,
        title: 'titulo1',
        body: 'contenido1',
      },
    ]),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PostService,
          useValue: mockPostRepository,
        },
      ],
    }).compile();

    service = moduleRef.get<PostService>(PostService);
  });

  it('should service be defined', () => {
    expect(service).toBeDefined();
  });
  it('should find one user', async () => {
    expect(await mockPostRepository.findOne(1)).toEqual([
      {
        Userid: 1,
        id: 1,
        title: 'titulo1',
        body: 'contenido1',
      },
    ]);
  });
});

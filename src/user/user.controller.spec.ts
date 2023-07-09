import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;
  const mockUserService = {
    create: jest.fn((dto) => {
      return {
        id: Math.floor(Math.random() * 100),
        ...dto,
      };
    }),
    update: jest.fn().mockImplementation((id, dto) => ({
      id,
      ...dto,
    })),
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
    findOne: jest.fn().mockImplementation((id) => [
      {
        id: id,
        name: 'usuario1',
        photourl: 'https://xsgames.co/randomusers/avatar.php?g=mal',
        description: 'Descripcion de prueba',
      },
    ]),
    remove: jest.fn().mockImplementation((id) => ({
      id,
    })),
  };
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = moduleRef.get<UserController>(UserController);
  });

  it('should controller be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create a user', () => {
    const dto = new CreateUserDto();
    dto.name = 'usuario1';
    dto.photourl = 'https://xsgames.co/randomusers/avatar.php?g=mal';
    dto.description = 'Descripcion de prueba';
    expect(controller.create(dto)).toEqual({
      id: expect.any(Number),
      ...dto,
    });
    expect(mockUserService.create).toHaveBeenCalledWith(dto);
  });
  it('should update a user', () => {
    const dto = new UpdateUserDto();
    dto.name = 'usuario1';
    dto.photourl = 'https://xsgames.co/randomusers/avatar.php?g=mal';
    dto.description = 'Descripcion de prueba';
    expect(controller.update('1', dto)).toEqual({
      id: 1,
      ...dto,
    });
    expect(mockUserService.update).toHaveBeenCalled();
  });
  it('should show all users', () => {
    expect(controller.findAll()).toEqual([
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
    expect(mockUserService.findAll).toHaveBeenCalled();
  });
  it('should show one users', () => {
    expect(controller.findOne('1')).toEqual([
      {
        id: 1,
        name: 'usuario1',
        photourl: 'https://xsgames.co/randomusers/avatar.php?g=mal',
        description: 'Descripcion de prueba',
      },
    ]);
    expect(mockUserService.findOne).toHaveBeenCalled();
  });
  it('should remove one users', () => {
    expect(controller.remove('1')).toEqual({
      id: 1,
    });
    expect(mockUserService.remove).toHaveBeenCalled();
  });
});

import { Module } from '@nestjs/common';
import { PostService } from '../src/user/post.service';
import { PostController } from '../src/user/post.controller';

@Module({
  controllers: [ PostController],
  providers: [ PostService],
})
export class UserModuleMock {}
import { Module } from '@nestjs/common';
import { PostService } from '../src/user/post.service';
import { PostController } from '../src/user/post.controller';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule],
  controllers: [ PostController],
  providers: [ PostService],
})
export class UserModuleMock {}
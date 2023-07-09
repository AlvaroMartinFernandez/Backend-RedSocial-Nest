import { Controller, Get, Param } from '@nestjs/common';
import { PostService } from './post.service';
export interface Data {
  userid: number;
  id: number;
  title: string;
  body: string;
}
export interface Post {
  statusCode: number;
  data: Data[];
}
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('POSTS')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 404, description: 'Record not found.' })
  async findOne(
    @Param('id') id: string,
  ): Promise<{ statusCode: number; data: Data[] }> {
    return this.postService.findOne(+id);
  }
}

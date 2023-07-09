import { Injectable } from '@nestjs/common';
import { Post, Data } from './post.controller';
@Injectable()
export class PostService {
  async findOne(id: number): Promise<{ statusCode: number; data: Data[] }> {
    try {
      const response: Response = await fetch(`${process.env.POSTAPI}${id}`);
      const data: Post = await response.json();
      return data;
    } catch (e: any) {
      return e;
    }
  }
}

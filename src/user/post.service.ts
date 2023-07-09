import { Injectable } from '@nestjs/common';
import { Post, Data } from './post.controller';
@Injectable()
export class PostService {
  async findOne(id: number): Promise<{ statusCode: number; data: Data[] }> {
    try {
      const response: Response = await fetch(`${process.env.POSTAPI}${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        if (response.status === 404) {
          return { statusCode: response.status, data: [] };
        }
        throw new Error('Error fetching');
      }
      const data: Post = await response.json();
      return data;
    } catch (e: any) {
      return { statusCode: 500, data: [] };
    }
  }
}

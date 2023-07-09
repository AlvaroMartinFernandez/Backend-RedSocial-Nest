import { Injectable } from '@nestjs/common';
import { Post, Data } from './post.controller';
import fetch, { Response } from 'node-fetch';
@Injectable()
export class PostService {
  async findOne(id: number): Promise<{ statusCode: number; data: Data[] }> {
    try {
      const response: Response = await fetch(`${process.env.POSTAPI}${id}`);
      const data: any = await response.json();
      console.log('Ejecutamos el servicio');
      return data;
    } catch (e: any) {
      console.log(e);
      console.log('Error en el servicio');
      return e;
    }
  }
}

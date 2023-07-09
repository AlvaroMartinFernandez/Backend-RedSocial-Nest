import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Post, Data } from './post.controller';
@Injectable()
export class PostService {
  constructor(private readonly httpService: HttpService) {}
  async findOne(id: number): Promise<{ statusCode: number; data: Data[] }> {
    try {
      const response: AxiosResponse = await this.httpService
        .get(`${process.env.POSTAPI}${id}`)
        .toPromise();
      const data: any = await response.data;
      console.log('Ejecutamos el servicio');
      return data;
    } catch (e: any) {
      console.log(e);
      console.log('Error en el servicio');
      return e;
    }
  }
}

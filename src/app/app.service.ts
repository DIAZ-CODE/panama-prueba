import { Injectable } from '@nestjs/common';
import { ResponsePropio } from 'src/shared/response-propio';

@Injectable()
export class AppService {
  healthcheck(): ResponsePropio {
    return {
      message: 'Server On',
      status: 200,
      details: '',
      data: {},
    };
  }
}

import { HttpStatus, Injectable } from '@nestjs/common';
import { NestResponseBuilder } from '../nest-response-builder';

@Injectable()
export class RespostaHttpService {
  public responde(httpStatus: HttpStatus, local: string, mensagem: object | string): object {
    return new NestResponseBuilder()
      .withStatus(httpStatus)
      .withHeaders({ Location: local })
      .withBody(mensagem)
      .build();
  }
}
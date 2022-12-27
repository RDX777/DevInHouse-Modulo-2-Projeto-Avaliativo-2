import { Controller, Get, HttpStatus } from '@nestjs/common';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';

@Controller('usuario')
export class UsuarioSemAuthController {

  @Get("semauth")
  public comaut() {
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({ Location: `auth/token/cria` })
      .withBody({ message: "Sem auth" })
      .build();
  }
}

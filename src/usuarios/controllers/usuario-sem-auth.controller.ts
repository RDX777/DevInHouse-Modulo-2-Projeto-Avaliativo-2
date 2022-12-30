import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { CriaUsuarioDto } from '../dtos/cria-usuario.dto';
import { UsuarioService } from '../services/usuario.service';

@Controller('usuario')
export class UsuarioSemAuthController {

  constructor(private usuarioService: UsuarioService) { }

  @Post("cadastra")
  public async store(@Body() usuario: CriaUsuarioDto) {
    try {
      const usuariId = await this.usuarioService.store(usuario);
      let status = HttpStatus.CREATED;
      let message = {
        mensagem: "Usuario criado com sucesso"
      }
      if (!usuariId) {
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = {
          mensagem: "Houve um problema ao salvar usuario"
        }
      }
      return new NestResponseBuilder()
        .withStatus(status)
        .withHeaders({ Location: `usuario/cadastra/` })
        .withBody(message)
        .build();

    } catch (erro) {
      console.log(erro)
      if (erro.code == 23505)
        throw new HttpException({ reason: erro.detail }, HttpStatus.CONFLICT);
      throw new HttpException({ reason: erro }, HttpStatus.BAD_REQUEST);
    }
  }

}

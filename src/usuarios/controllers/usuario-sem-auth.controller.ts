import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CriaUsuarioDto } from '../dtos/cria-usuario.dto';
import { UsuarioService } from '../services/usuario.service';
import { RespostaHttpService } from "src/core/http/services/resposta-http.service";

@Controller('usuario')
export class UsuarioSemAuthController {

  constructor(private usuarioService: UsuarioService,
    private respostaHttp: RespostaHttpService) { }

  @Post("cadastra")
  public async store(@Body() usuario: CriaUsuarioDto) {
    return await this.usuarioService.store(usuario).then(() => {
      return this.respostaHttp.responde(HttpStatus.CREATED, "usuario/cadastra", { message: "Usuario criado com sucesso" })
    }).catch((erro) => {
      if (erro.code == 23505) {
        throw new HttpException({ reason: erro.detail }, HttpStatus.CONFLICT);
      }
      throw new HttpException({ reason: erro }, HttpStatus.BAD_REQUEST);

    });
  }

}

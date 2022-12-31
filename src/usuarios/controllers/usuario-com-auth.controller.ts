import { Body, Controller, Get, Post, UseGuards, Request, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { TrocaSenhaDto } from '../dtos/troca-senha.dto';
import { UsuarioService } from '../services/usuario.service';
import { RespostaHttpService } from "src/core/http/services/resposta-http.service";

@UseGuards(JwtAuthGuard)
@Controller('usuario')
export class UsuarioComAuthController {

  constructor(private usuarioService: UsuarioService,
    private respostaHttp: RespostaHttpService) { }

  @Post("trocasenha")
  public async trocasenha(@Request() request: any, @Body() senhas: TrocaSenhaDto) {
    return await this.usuarioService.trocasenha(request.user, senhas).then(() => {
      return this.respostaHttp.responde(HttpStatus.OK, "usuario/trocasenha", { message: "Realizado troca de senha com sucesso" })
    }).catch((erro) => {
      return this.respostaHttp.responde(HttpStatus.UNAUTHORIZED, "usuario/trocasenha", erro)

    });

  }

  @Get("perfil")
  public async perfil(@Request() request: any) {
    return await this.usuarioService.perfil(request.user).then((resposta) => {
      return this.respostaHttp.responde(HttpStatus.OK, "usuario/perfil", resposta)
    }).catch((erro) => {
      return this.respostaHttp.responde(HttpStatus.BAD_REQUEST, "usuario/trocasenha", erro)
    })
  }
}

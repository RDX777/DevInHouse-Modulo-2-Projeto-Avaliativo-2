import { Body, Controller, Get, Post, UseGuards, Request, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { TrocaSenhaDto } from '../dtos/troca-senha.dto';
import { UsuarioService } from '../services/usuario.service';

@UseGuards(JwtAuthGuard)
@Controller('usuario')
export class UsuarioComAuthController {

  constructor(private usuarioService: UsuarioService) { }

  @Post("trocasenha")
  public async trocasenha(@Request() request: any, @Body() senhas: TrocaSenhaDto) {
    return await this.usuarioService.trocasenha(request.user, senhas).then(() => {
      return new NestResponseBuilder()
        .withStatus(HttpStatus.ACCEPTED)
        .withHeaders({ Location: `usuario/trocasenha/` })
        .withBody({ message: "Realizado troca de senha com sucesso" })
        .build();
    }).catch((erro) => {
      return new NestResponseBuilder()
        .withStatus(HttpStatus.UNAUTHORIZED)
        .withHeaders({ Location: `usuario/trocasenha/` })
        .withBody(erro)
        .build();
    });

  }
}

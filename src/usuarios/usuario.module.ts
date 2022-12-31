import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/core/auth/guards/strategy/jwt.strategy';
import { AuthService } from 'src/core/auth/services/auth.service';
import { databaseProviders } from 'src/core/database/database.providers';

import { UsuarioComAuthController } from './controllers/usuario-com-auth.controller';
import { UsuarioSemAuthController } from './controllers/usuario-sem-auth.controller';
import { usuarioProvider } from './providers/usuario.provider';
import { enderecoProvider } from "src/enderecos/providers/endereco.provider"
import { UsuarioService } from './services/usuario.service';
import { EnderecoService } from 'src/enderecos/services/endereco.service';
import { RespostaHttpService } from 'src/core/http/services/resposta-http.service';

@Module({
  imports: [],
  exports: [UsuarioService],
  controllers: [UsuarioComAuthController, UsuarioSemAuthController],
  providers: [
    ...databaseProviders,
    ...usuarioProvider,
    ...enderecoProvider,
    UsuarioService,
    EnderecoService,
    AuthService,
    RespostaHttpService,
    JwtService,
    JwtStrategy,
  ],
})
export class UsuarioModule { }

import { Module } from '@nestjs/common';
import { JwtService, JwtModule } from '@nestjs/jwt';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './guards/strategy/jwt.strategy';
import { databaseProviders } from '../database/database.providers';
import { usuarioProvider } from 'src/usuarios/providers/usuario.provider';
import { UsuarioService } from 'src/usuarios/services/usuario.service';
import { EnderecoModule } from 'src/enderecos/endereco.module';
import { UsuarioModule } from 'src/usuarios/usuario.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 60 * 6
      }
    }),
    EnderecoModule,
    UsuarioModule
  ],
  controllers: [AuthController],
  providers: [
    ...databaseProviders,
    ...usuarioProvider,
    AuthService,
    JwtService,
    JwtStrategy,
    UsuarioService
  ],
  exports: [AuthService, JwtService],
})
export class AuthModule { }
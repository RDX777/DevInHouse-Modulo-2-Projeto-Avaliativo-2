import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.providers';

import { UsuarioController } from './controllers/usuario.controller';
import { usuarioProvider } from './providers/usuario.provider';

@Module({
  imports: [],
  exports: [],
  controllers: [UsuarioController],
  providers: [
    ...databaseProviders,
    ...usuarioProvider
  ],
})
export class UsuarioModule { }

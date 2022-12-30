import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.providers';
import { usuarioProvider } from 'src/usuarios/providers/usuario.provider';
import { DispositivoController } from './controllers/dispositivo.controller';
import { dispositivoProvider } from './providers/dispositivo.provider';
import { DispositivoService } from './services/dispositivo.services';
import { localProvider } from "src/locais/providers/local.provider"

@Module({
  imports: [],
  exports: [],
  controllers: [DispositivoController],
  providers: [
    ...databaseProviders,
    ...usuarioProvider,
    ...dispositivoProvider,
    ...localProvider,
    DispositivoService,
  ],
})
export class DispositivoModule { }
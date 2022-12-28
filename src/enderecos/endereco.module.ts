import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.providers';

import { EnderecoService } from 'src/enderecos/services/endereco.service';
import { enderecoProvider } from './providers/endereco.provider';

@Module({
  imports: [],
  exports: [EnderecoService],
  controllers: [],
  providers: [
    ...databaseProviders,
    ...enderecoProvider,
    EnderecoService,
  ],
})
export class EnderecoModule { }

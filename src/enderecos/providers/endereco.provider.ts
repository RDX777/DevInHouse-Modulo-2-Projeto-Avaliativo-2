import { DataSource } from 'typeorm';
import { EnderecoEntity } from "../entities/endereco.entity"

export const enderecoProvider = [
  {
    provide: 'ENDERECO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(EnderecoEntity),
    inject: ['DATA_SOURCE'],
  },
];
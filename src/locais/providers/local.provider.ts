import { DataSource } from 'typeorm';
import { LocalEntity } from "../entities/local.entity"

export const localProvider = [
  {
    provide: 'LOCAL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(LocalEntity),
    inject: ['DATA_SOURCE'],
  },
];
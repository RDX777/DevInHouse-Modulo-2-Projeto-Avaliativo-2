import { DataSource } from 'typeorm';
import { DispositivoEntity } from "../entities/dispositivo.entity"

export const dispositivoProvider = [
  {
    provide: 'DISPOSITIVO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(DispositivoEntity),
    inject: ['DATA_SOURCE'],
  },
];
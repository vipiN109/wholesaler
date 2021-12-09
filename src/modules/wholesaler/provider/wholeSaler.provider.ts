import { Connection } from 'typeorm';
import { wholeSaler } from '../entity/wholesaler.entity';

export const WholeSaler = [
  {
    provide: 'WHOLE_SALER_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(wholeSaler),
    inject: ['DATABASE_CONNECTION'],
  },
];
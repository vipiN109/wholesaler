import {Connection} from 'typeorm';
import {stock} from '../entity/stock.entity';

export const Stock=[
    {
        provide:'STOCK_REPOSITORY',
        useFactory:(connection:Connection)=>connection.getRepository(stock),
        inject:['DATABASE_CONNECTION'],
    }
];
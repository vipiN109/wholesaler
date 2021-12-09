import {Connection} from 'typeorm';
import {retailer} from '../entity/retailer.entity';

export const Retailer=[
    {
        provide:'RETAILER_REPOSITORY',
        useFactory:(connection:Connection)=>connection.getRepository(retailer),
        inject:['DATABASE_CONNECTION'],
    }
];
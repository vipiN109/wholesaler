import {IsNotEmpty} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock')
export class stock{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    @IsNotEmpty()
    retailer_id:string;

    @Column()
    @IsNotEmpty()
    wholesaler_id:number;

    @Column()
    @IsNotEmpty()
    stock_amount:number;

    @Column()
    @IsNotEmpty()
    date:Date;
}
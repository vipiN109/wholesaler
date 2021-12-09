import {IsNotEmpty} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('retailer')
export class retailer{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsNotEmpty()
    retailerId:string;

    @Column()
    @IsNotEmpty()
    wholeSalerId:number;

    @Column()
    @IsNotEmpty()
    name:string;

    @Column()
    mobile_number:number;

    @Column()
    createdOn:Date;
}

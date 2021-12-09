import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wholesalers')
export class wholeSaler{
    @PrimaryGeneratedColumn()
    @IsNotEmpty()
    id:number;

    @Column()
    @IsNotEmpty()
    name:string;

    @Column()
    mobile_number:number;

    @Column()
    createdOn:Date;
}
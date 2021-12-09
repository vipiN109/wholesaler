import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RetailerDto {
    @ApiProperty()
    @IsNotEmpty()
    wholeSalerId:number

    @ApiProperty()
    @IsNotEmpty()
    name:string;

    retailerId:string;

    @ApiProperty()
    mobile_number:number

    @ApiProperty()
    createdOn:Date
}
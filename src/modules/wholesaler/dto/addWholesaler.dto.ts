import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddWholeSalerDto {
    @ApiProperty()
    @IsNotEmpty()
    wholeSalerId:number

    name:string;

    @ApiProperty()
    @IsNotEmpty()
    retailerId:string;

    mobile_number:number

    createdOn:Date
}
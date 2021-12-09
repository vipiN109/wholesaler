import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class  WholeSalerDto {
    @ApiProperty()
    @IsNotEmpty()
    name:string

    @ApiProperty()
    mobile_number:number

    @ApiProperty()
    createdOn:Date
}
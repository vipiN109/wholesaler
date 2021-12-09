import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddStockDto {
    @ApiProperty()
    @IsNotEmpty()
    wholesaler_id:number

    @ApiProperty()
    @IsNotEmpty()
    stock_amount:number;

    @ApiProperty()
    @IsNotEmpty()
    retailer_id:string;

    date:Date
}
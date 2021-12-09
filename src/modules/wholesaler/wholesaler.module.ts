import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { Retailer } from './provider/retailer.provider';
import { Stock } from './provider/stock.provider';
import { WholeSaler } from './provider/wholeSaler.provider';
import { UserController } from './wholesaler.controller';
import { WholeSalerService } from './wholesaler.service';

@Module({
    imports:[DatabaseModule],
    controllers:[UserController],
    providers:[WholeSalerService,...WholeSaler,...Retailer,...Stock],
    exports:[]
})

export class WholeSalerModule{}
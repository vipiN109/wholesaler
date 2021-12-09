import { Module } from '@nestjs/common';
import { WholeSalerModule } from './wholesaler/wholesaler.module';

@Module({
    imports:[WholeSalerModule]
})

export class ModulesModule{}
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [DatabaseModule,
    ModulesModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}

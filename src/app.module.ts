import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationsModule } from './configurations/configuration.module';
import { DatabasesModule } from './databases/databases.module';

@Module({
  imports: [
    ConfigurationsModule,
    DatabasesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

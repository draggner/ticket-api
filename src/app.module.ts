import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationsModule } from './configurations/configuration.module';

@Module({
  imports: [
    ConfigurationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

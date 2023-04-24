import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigurationsModule } from './configurations/configuration.module';
import { DatabasesModule } from './databases/databases.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigurationsModule,
    DatabasesModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule { }

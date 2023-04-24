import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigurationsModule } from './configurations/configuration.module';
import { DatabasesModule } from './databases/databases.module';
import { TicketsModule } from './tickets/tickets.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigurationsModule,
    DatabasesModule,
    AuthModule,
    UsersModule,
    TicketsModule,
  ],
})
export class AppModule { }

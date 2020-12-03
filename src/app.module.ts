import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/user.module';
import { User } from './user/user.entity'
import { Role } from './role/role.entity'
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { ChatModule } from './chat/chat.module';
import { RedisModule } from './redis'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'nest',
      synchronize: true,
      entities: [User, Role],
    }),
    RedisModule.register({
      host: 'localhost',
      port: '6379'
    }),
    UsersModule,
    AuthModule,
    RoleModule,
    ChatModule
  ]
})
export class AppModule { }

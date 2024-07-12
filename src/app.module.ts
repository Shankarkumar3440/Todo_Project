import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { User } from './user/entities/user.entity';
import { Todo } from './todo/entities/todo.entity';
import { AuthModule } from './Auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.global.env'
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService) =>({
            type:'mysql',
            host:configService.get('DB_HOST'),
            port:configService.get<number>('DB_PORT'),
            username:configService.get('DB_USERNAME'),
            password:configService.get('DB_PASSWORD'),
            database:configService.get('DB_NAME'),
            entities:[User,Todo],
            synchronize:true,
            logging:true  
         }),
        }),
     UserModule,
    TodoModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

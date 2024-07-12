import { Module } from "@nestjs/common";
import { LocalStrategy } from "./strategy/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./strategy/auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { JwtAuthGuard } from "./guard/jwt.guard";


@Module({
    imports: [PassportModule,UserModule, JwtModule.registerAsync({
        imports:[ConfigModule],                                  // load the environment varible and configure it
                          
        useFactory:(configService:ConfigService) =>({          // provide dynamic module registration like ConfigModule,JwtModule
            secret:configService.get('JWT_SECRET'),
            signOptions:{
               expiresIn:configService.get<string>('JWT_EXPIRATION_TIME') + "s"
            },
           
        }),
        inject:[ConfigService],                               // to access the environment variable
    })],
    controllers: [AuthController],
    providers: [LocalStrategy,JwtStrategy],
    exports: []
})

export class AuthModule {}
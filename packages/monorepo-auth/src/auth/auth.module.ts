import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './services';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies';
import { AuthResolver } from './resolvers';
import { AuthController } from './controllers';
import { UserEntity } from '../user/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthConfig } from '../common/configs';
import { CaptchaService } from '../common/services';

@Module({
  controllers: [
    AuthController,
  ],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: AuthConfig.jwtSecret,
    }),
    TypeOrmModule.forFeature([
      UserEntity,
    ]),
  ],
  providers: [
    CaptchaService,
    AuthService,
    AuthResolver,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule { }

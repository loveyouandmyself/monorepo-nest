import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { MyFromAuthHeaderAsBearerToken } from '../extract';
import { PayloadSchema } from '../schemas';
import { ExpiryMode, MyRedisService } from '@monorepo-interface/core';
import { AuthConfig } from 'src/common/configs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private redisService: MyRedisService) {
    super({
      jwtFromRequest: MyFromAuthHeaderAsBearerToken,
      ignoreExpiration: true, // 不校验token的过期时间
      secretOrKey: AuthConfig.jwtSecret,
      passReqToCallback: true, // request请求参数将传递给validate回调
    });
  }

  async validate(request: Request, userArgs: PayloadSchema): Promise<boolean> {
    const token = MyFromAuthHeaderAsBearerToken(request);
    if (token === null) {
      return false;
    }
    const key = `${AuthConfig.key}-${userArgs.id}`;
    const verifyToken = await this.redisService.get(key);
    if (!verifyToken || token !== verifyToken){
      return false;
    }
    this.redisService.expire(key, AuthConfig.expiresIn, ExpiryMode.PX);
    return true;
  }
}
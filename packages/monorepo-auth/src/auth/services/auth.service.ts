import { HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../user/services';
import { JwtService } from '@nestjs/jwt';
import { isPhoneNumber, isEmail } from 'class-validator';
import { LoginSuccessSchema } from '../schemas';
import { LoginUserDto } from '../dto';
import { UserEntity } from '../../user/entities';
import { ExpiryMode, MyRedisService, RestfulException } from '@monorepo-interface/core';
import { AuthConfig } from '../../common/configs';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private redisService: MyRedisService
  ) {}

  public async validateUser(args: LoginUserDto): Promise<UserEntity> {
    const {
      loginName,
      password,
    } = args;
    let user = null;
    if (isPhoneNumber(loginName, 'CN')) {
      user = await this.userService.findOneByPhone(loginName, ['id', 'password']);
    } else if (isEmail(loginName)) {
      user = await this.userService.findOneByEmail(loginName, ['id', 'password']);
    } // TODO:用户名、身份证号、第三方登录等
    if (!user) {
      throw new RestfulException('用户不存在!', HttpStatus.UNAUTHORIZED);
    }
    if (user.password !== password) {
      throw new RestfulException('账号密码错误!', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  public async login(loginUser: LoginUserDto): Promise<LoginSuccessSchema> {
    const user = await this.validateUser(loginUser);
    const key = `${AuthConfig.key}-${user.id}`;
    let accessToken = await this.redisService.get(key);
    if (!accessToken) {
      const payload = {
        id: user.id,
      };
      accessToken = this.jwtService.sign(payload);
      await this.redisService.set(key, accessToken, AuthConfig.expiresIn, ExpiryMode.PX);
    }
    return {
      accessToken,
    };
  }
}
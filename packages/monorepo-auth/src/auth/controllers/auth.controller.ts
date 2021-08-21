import { commonOkResponse, encrypt, genApiBodySchema, Public, RestfulException } from '@monorepo-interface/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { isEmail, isMobilePhone } from 'class-validator';
import { omit } from 'lodash';
import { UserRegisterDto } from '../../user/dto';
import { CaptchaService } from '../../common/services';
import { UserService } from '../../user/services';
import { LoginUserDto } from '../dto';
import { LoginSuccessSchema } from '../schemas';
import { AuthService } from '../services';

@ApiTags('权限相关接口')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly captchaService: CaptchaService,
  ) {}

  @Public()
  @ApiOperation({ summary: '发送验证码', description: '支持手机号和邮箱' })
  @ApiBody({
    required: true,
    description: '发送验证码',
    schema: genApiBodySchema({
      account: { type: 'string', description: '注册账户', example: '15039137192@163.com' },
    }),
  })
  @ApiCreatedResponse({ schema: commonOkResponse({ example: true }) })
  @Post('sendCaptcha')
  public async sendCaptcha(@Body('account') registerAccount: string): Promise<boolean> {
    if (isMobilePhone(registerAccount, 'zh-CN')) {
      if (await this.userService.userIsExist({ phone: registerAccount })) {
        throw new RestfulException('该手机号已被注册', 400);
      }
      return this.captchaService.sendCaptchaToPhone(registerAccount);
    }
    if (isEmail(registerAccount)) {
      if (await this.userService.userIsExist({ email: registerAccount })) {
        throw new RestfulException('该邮箱已被注册', 400);
      }
      return this.captchaService.sendCaptchaToEmail(registerAccount);
    }
    throw new RestfulException('注册账户只能为手机号或者邮箱', 400);
  }

  @Public()
  @ApiOperation({ summary: '用户注册', description: '' })
  @ApiBody({
    type: UserRegisterDto,
  })
  @Post('register')
  public async registerUser(@Body() args: UserRegisterDto): Promise<boolean> {
    const {
      phone,
      password,
      confirmPassword,
      captcha,
    } = args;
    if (password !== confirmPassword) {
      throw new RestfulException('两次密码不一致!', 400);
    }
    if (await this.userService.userIsExist({ phone: phone })) {
      throw new RestfulException('该手机号已被注册!', 400);
    }
    await this.captchaService.verifyCode(phone, captcha);
    return this.userService.create([{
      ...omit(args, ['confirmPassword', 'captcha']),
      password: encrypt(password).toString(),
    }]);
  }

  @Public()
  @ApiExtraModels(LoginSuccessSchema)
  @ApiOperation({ summary: '用户登录' })
  @ApiBody({
    type: LoginUserDto,
  })
  @ApiCreatedResponse({ schema: commonOkResponse({ type: LoginSuccessSchema }) })
  @Post('login')
  public async login(@Body() args: LoginUserDto): Promise<LoginSuccessSchema> {
    return this.authService.login(args);
  }

}

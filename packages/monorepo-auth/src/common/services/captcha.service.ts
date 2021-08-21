import { Injectable, BadRequestException } from '@nestjs/common';
import random from 'string-random';
import { Logger, MyRedisService, RestfulException } from '@monorepo-interface/core';

@Injectable()
export class CaptchaService {

  constructor(
    private readonly myRedisService: MyRedisService,
  ) { }

  /**
   * 向手机号发送验证码
   * @param phone 手机号
   */
  public async sendCaptchaToPhone(phone: string): Promise<boolean> {
    if (await this.myRedisService.exist(phone)) {
      throw new RestfulException('验证码已发送，请稍后再试!', 400);
    }
    const code = await this.getCode(phone);
    // 向手机发送验证码
    Logger.debug(code);
    return true;
  }

  /**
   * 向邮箱发送验证码
   * @param email 邮箱
   * @returns {boolean} 发送是否成功
   */
  public async sendCaptchaToEmail(email: string): Promise<boolean> {
    if (await this.myRedisService.exist(email)) {
      throw new RestfulException('验证码已发送，请稍后再试!', 400);
    }
    const code = await this.getCode(email);
    // 向邮箱发送验证码
    Logger.debug(code);
    return true;
  }

  /**
   * 获取随机生成的代码
   * @param key 手机号或者邮箱
   * @returns {string} 生成的代码
   */
  private async getCode(key: string, codeLength = 4): Promise<string> {
    const code = random(codeLength).toString();
    const flag = await this.myRedisService.setNX(key, code, 60 * 1000);
    if (flag) {
      return code;
    }
    throw new RestfulException('验证码已创建', 400);
  }

  /**
   * 验证代码是否正确
   * @param key 手机号或者邮箱
   * @param code 需要验证的代码
   * @returns {boolean} 验证结果
   */
  public async verifyCode(key: string, code: string): Promise<void> {
    const value = await this.myRedisService.get(key);
    if (!value) {
      throw new BadRequestException('请先发送验证码!');
    }
    if (value !== code) {
      throw new BadRequestException('验证码不正确!');
    }
  }
}
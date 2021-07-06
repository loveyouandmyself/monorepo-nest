import Dyvmsapi20170525, * as $Dyvmsapi20170525 from '@alicloud/dyvmsapi20170525';
import * as $OpenApi from '@alicloud/openapi-client';

/**
 * 电话工具类
 */
export class PhoneUtil {

  private client:Dyvmsapi20170525;

  constructor(accessKeyId: string, accessKeySecret: string){
    this.client = this.createClient(accessKeyId, accessKeySecret);
  }

  /**
   * 使用AK&SK初始化账号Client
   * @param accessKeyId
   * @param accessKeySecret
   * @return Client
   * @throws Exception
   */
  private createClient(accessKeyId: string, accessKeySecret: string): Dyvmsapi20170525 {
    const config = new $OpenApi.Config({
      // 您的AccessKey ID
      accessKeyId: accessKeyId,
      // 您的AccessKey Secret
      accessKeySecret: accessKeySecret,
    });
    // 访问的域名
    config.endpoint = 'dyvmsapi.aliyuncs.com';
    return new Dyvmsapi20170525(config);
  }

  public async callPhone(calledNumber: string, playTimes = 3, volume = 100, ttsCode = 'TTS_215350068', calledShowNumber='02386039878'): Promise<void> {
    const singleCallByTtsRequest = new $Dyvmsapi20170525.SingleCallByTtsRequest({
      calledNumber, // 接收语音通知的手机号码
      ttsCode, // 已通过审核的语音验证码模板ID
      playTimes, // 语音文件的播放次数
      volume, // 语音文件播放的音量
      calledShowNumber, // 被叫显示号,文本转语音模板专属号码外呼，则必须传入已购买的号码，仅支持一个号码
    });
    // 复制代码运行请自行打印 API 的返回值
    await this.client.singleCallByTts(singleCallByTtsRequest);
  }

}
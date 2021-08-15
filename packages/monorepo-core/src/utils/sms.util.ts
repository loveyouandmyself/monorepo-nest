import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import * as $OpenApi from '@alicloud/openapi-client';

/**
 * 短信工具类
 * @param message 
 */
export class SMSUtil{
  private client:Dysmsapi20170525;

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
  private createClient(accessKeyId: string, accessKeySecret: string): Dysmsapi20170525 {
    const config = new $OpenApi.Config({
      // 您的AccessKey ID
      accessKeyId: accessKeyId,
      // 您的AccessKey Secret
      accessKeySecret: accessKeySecret,
    });
    // 访问的域名
    config.endpoint = 'dysmsapi.aliyuncs.com';
    return new Dysmsapi20170525(config);
  }

  public async sendSms(args: {
    phoneNumbers: string[],
    templateParam: {
      sat: string,
      H: number,
      M: number,
    },
  }, signNameJson = 'nest-interface接口平台', templateCode = 'SMS_215352907'): Promise<void> {
    const { phoneNumbers, templateParam } = args;
    const sendParams = {
      phoneNumberJson: JSON.stringify(phoneNumbers), // 接收短信的手机号码,["1590000****","1350000****"]
      signNameJson: JSON.stringify(phoneNumbers.map(()=>signNameJson)), // 短信签名名称,["阿里云","阿里巴巴"]
      templateCode, // 短信模板CODE
      templateParamJson: JSON.stringify(phoneNumbers.map(()=>templateParam)), // 模板变量值的个数必须与手机号码、签名的个数相同,[{"name":"TemplateParamJson"},{"name":"TemplateParamJson"}]
    };
    const sendSmsRequest = new $Dysmsapi20170525.SendBatchSmsRequest(sendParams);
    // 复制代码运行请自行打印 API 的返回值
    await this.client.sendBatchSms(sendSmsRequest);
  }
}
import nodemailer from 'nodemailer';
import { basename } from 'path';
import { Logger } from './log4js.util';

/**
 * 发送邮件
 * @param subject 邮件主题
 * @param to 收件人列表
 * @param filePaths 附件内容路径
 * @param text 文字内容
 * @param html html内容
 */
export async function sendEmail(subject: string, to: string[], filePaths: string[], text='', html=''): Promise<boolean> {

  try {
    // 填入自己的账号和密码
    const transporter = nodemailer.createTransport({
      host: 'smtp.163.com',
      port: 465,
      secure: true, // 如果是 true 则port填写465, 如果 false 则可以填写其它端口号
      auth: {
        user: '15039137192@163.com', // 发件人邮箱
        pass: 'XZYUWUKCCJXKHGCR', // 163IMAP/SMTP授权码密匙
      },
    });
    // 填写发件人, 收件人
    const mailOptions = {
    // 发件人地址
      from: 'gsxh0103@163.com',
      // 收件人列表, 向163邮箱, gmail邮箱, qq邮箱各发一封
      to,
      // 邮件主题
      subject,
      // 文字内容
      text,
      // html内容
      html,
      // 附件内容 是一个列表
      attachments: filePaths.map(filePath => {
        return {
          filename: basename(filePath),
          path: filePath,
        };
      }),
    };

    // 发送邮件
    await transporter.sendMail(mailOptions);
  } catch (error) {
    return false;
  }
  return true;
}
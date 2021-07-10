// AES（高级加密系统）'aes-256-ctr'算法CTR加密模式
import { createCipheriv, randomBytes, createDecipheriv } from 'crypto';
import { defaultTo } from 'lodash';
import { getEnvVariable } from './env.utils';

const SECRET_KEY = defaultTo(getEnvVariable('AUTH.SECRET'), 'monorepo');

/**
 * 加密
 */
export function encrypt(textToEncrypt: string, secretKey?: string): Buffer{
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-ctr', secretKey || SECRET_KEY, iv);

  const encryptedText = Buffer.concat([
    cipher.update(textToEncrypt),
    cipher.final(),
  ]);
  return encryptedText;
}

/**
 * 解密
 * @param encryptedText 需要解密的文本
 * @param iv 加密的密码
 */
export function decrypt(encryptedText: Buffer, iv: Buffer, secretKey?: string): Buffer{

  const decipher = createDecipheriv('aes-256-ctr', secretKey || SECRET_KEY, iv);
  const decryptedText = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);
  return decryptedText;
}
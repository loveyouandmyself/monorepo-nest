import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import * as Redis from 'ioredis';
import { Logger } from '../utils';

export enum ExpiryMode {
  EX = 'EX', // 精确到秒
  PX = 'PX' // 精确到毫秒
}

@Injectable()
export class MyRedisService {

  private client: Redis.Redis;

  constructor(private redisService: RedisService) {
    this.getClient();
  }

  private async getClient() {
    this.client = this.redisService.getClient();
  }

  /**
   * @Description: 封装设置redis缓存的方法
   * @param key {String} key值
   * @param value {String} key的值
   * @param time {Number} 过期时间 秒
   * @param expiryMode {ExpiryMode} 过期模式
   * @return: Promise<boolean>
   */
  public async set(key: Redis.KeyType, value: Redis.ValueType, time=60, expiryMode=ExpiryMode.EX): Promise<boolean> {
    try {
      if (!this.client) {
        await this.getClient();
      }

      const result = await this.client.set(key, value, expiryMode, time);
      if (result === 'OK') {
        return true;
      }
    } catch (error) {
      Logger.error('set error:' + error);
    }
    return true;
  }

  public async expire(key: Redis.KeyType, time: number, expiryMode=ExpiryMode.EX): Promise<boolean> {
    try {
      if (!this.client) {
        await this.getClient();
      }
      let result = 0;
      if (expiryMode === ExpiryMode.EX) {
        result = await this.client.expire(key, time);
      } else if (expiryMode === ExpiryMode.PX) {
        result = await this.client.pexpire(key, time);
      }

      if (result) {
        return true;
      }
    } catch (error) {
      Logger.error('set error:' + error);
    }
    return true;
  }


  /**
   * 获取redis缓存中的值
   * @param key 存在redis中的键
   */
  public async get(key: Redis.KeyType): Promise<string | null> {
    try {
      if (!this.client) {
        await this.getClient();
      }
  
      const data = await this.client.get(key);
  
      if (data) {
        return data;
      }
    } catch (error) {
      Logger.error('get error:' + error);
    }
    return null;
  }

  /**
   * 根据key删除redis缓存数据
   * @param key 存在redis中的键
   */
  public async del(key: Redis.KeyType): Promise<boolean> {
    try {
      if (!this.client) {
        await this.getClient();
      }
  
      const result = await this.client.del(key);
      if (result > 0) {
        return true;
      }
    } catch (error) {
      Logger.error('del error:' + error);
    }
    return false;
    
  }

  /**
   * 清空redis的缓存
   */
  public async flushall(): Promise<boolean> {
    try {
      if (!this.client) {
        await this.getClient();
      }
  
      const result = await this.client.flushall();
      if (result === 'OK') {
        return true;
      }
    } catch (error) {
      Logger.error('flushall error:' + error);
    }
    
    return false;
    
  }

  /**
   * redis发布
   * @param channel 频道
   * @param message 消息
   */
  public async pub(channel: string, message: string): Promise<boolean> {
    try {
      if (!this.client) {
        await this.getClient();
      }
      const result = await this.client.publish(channel, message);
      if (result>0) {
        return true;
      }
    } catch (error) {
      Logger.error('pub error:' + error);
    }
    return false;
  }

  /**
   * 键是否存在
   * @param key 
   */
  async exist(key: Redis.KeyType): Promise<boolean> {
    if (!this.client) {
      await this.getClient();
    }
    return new Promise((resolve) => {
      this.client.exists(key, (err, num) => {
        if (err) {
          Logger.debug('exist error');
          Logger.debug(err);
          Logger.debug('exist error');
        }
        if (num === 1) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  /**
   * 加锁
   * @param key 
   * @param requestId 
   * @param expireTime 
   */
  async setNX(key: Redis.KeyType, requestId: Redis.ValueType, expireTime = 5 * 1000): Promise<unknown> {
    if (!this.client) {
      await this.getClient();
    }
    return new Promise((resolve) => {
      this.client.set(key, requestId, 'NX', 'PX', expireTime, (err, res) => {
        if (err) {
          Logger.debug('setNX error');
          Logger.debug(err);
          Logger.debug('setNX error');
        }
        if (res === 'OK') {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  /**
   * 解锁
   * @param lockKey 
   * @param requestId 
   */
  async eval(lockKey: Redis.KeyType, requestId: Redis.ValueType): Promise<boolean> {
    if (!this.client) {
      await this.getClient();
    }
    return new Promise((resolve) => {
      const luaScript = 'if redis.call(\'get\', KEYS[1]) == ARGV[1] then return redis.call(\'del\', KEYS[1]) else return 0 end';
      this.client.eval(luaScript, 1, lockKey, requestId, (err) => {
        if (err) {
          Logger.debug('eval error');
          Logger.debug(err);
          Logger.debug('eval error');
        }
        resolve(true);
      });
    });
  }

}
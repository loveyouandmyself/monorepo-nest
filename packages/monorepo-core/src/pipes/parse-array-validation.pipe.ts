import { Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { isProduction } from '../utils';
import { ClassType } from '../metadata';
import { RestfulException } from '../exception';
import { isArray } from 'lodash';

@Injectable()
export class ParseArrayValidationPipe<T> implements PipeTransform {

  private readonly type: ClassType<T>;

  constructor(type: ClassType<T>) {
    this.type = type;
  }

  async transform(value: T): Promise<any> {
    const responseErrors: { field: string; value: any; index: any; errors: any[]; }[] = [];
    if (isArray(value)) {
      const promiseList = Array.from(value).map(async (valid, index) => {
        const object: any = plainToClass(this.type, valid);
        const errors = await validate(object);
  
        if (errors.length > 0) {
          errors.forEach(err => {
            responseErrors.push({
              field: err.property,
              value: err.value,
              index: index,
              errors: Object.values(err.constraints || err.children || {}),
            });
          });
        }
      });
      await Promise.all(promiseList);
    }
    if (responseErrors.length > 0) {
      const errMsg = isProduction() ? 'Validation failed' : responseErrors;
      throw new RestfulException(errMsg, 400);
    }
    return value;
  }
}
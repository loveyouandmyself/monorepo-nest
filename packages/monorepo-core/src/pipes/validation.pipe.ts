import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { getChildMessage, validateType } from '../utils/valid.util';
import { RestfulException } from '../exception';


@Injectable()
export class ValidationPipe implements PipeTransform {

  async transform(value: unknown, { metatype }: ArgumentMetadata): Promise<any> {
    if (!metatype || !validateType(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value, { excludeExtraneousValues: true });
    const errors = await validate(object);

    if (errors.length > 0) {
      const responseErrors = getChildMessage(errors);
      const errMsg = process.env.NODE_ENV === 'production' ? 'Validation failed' : responseErrors;
      throw new RestfulException(errMsg, 400);
    }
    return object;
  }
}
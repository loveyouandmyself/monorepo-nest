import { isNumberString, ValidationError } from 'class-validator';
import { ClassType } from '../metadata';

export function validateType<T>(metaType: ClassType<T>): boolean {
  const types: ClassType<any>[] = [String, Boolean, Number, Array, Object];
  return !types.includes(metaType);
}

export function getChildMessage(errors: ValidationError[], result: any[] = [], parent = ''): any[] {
  let parentMsg = parent;
  for (const err of errors) {
    if (err.children.length > 0) {
      if (isNumberString(err.property)) {
        return getChildMessage(err.children, result, parentMsg + ',数组下标' + err.property + ',');
      }
      parentMsg += '字段-' + err.property;
      return getChildMessage(err.children, result, parentMsg);
    }
    if (parent) {
      result.push({
        value: err.value,
        errors: parentMsg + '字段-' + err.property + ':' + Object.values(err.constraints || {})[0],
      });
    } else {
      result.push({
        value: err.value,
        errors: parentMsg + '字段-' + err.property + ':' + Object.values(err.constraints || {})[0],
      });
    }
  }
  return result;
}
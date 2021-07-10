import { ValueTransformer } from 'typeorm';

export const getSkip = (page: number, limit: number): number => {
  const skip = Math.floor(Number(page) - 1) * limit;
  return Math.max(0, skip);
};

class IdToStringTransformer implements ValueTransformer {
  to(value: any) {
    return value;
  }

  from(value: any) {
    return value + '';
  }
}

export const idToStringTransformer = new IdToStringTransformer();
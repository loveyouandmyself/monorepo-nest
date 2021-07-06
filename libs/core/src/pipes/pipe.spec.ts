import { ValidationPipe } from './validation.pipe';
import { ParseArrayValidationPipe } from './parse-array-validation.pipe';

describe('ValidationPipe', () => {
  it('should be defined', () => {
    expect(new ValidationPipe()).toBeDefined();
  });
  it('should be defined', () => {
    expect(new ParseArrayValidationPipe(Array)).toBeDefined();
  });
});

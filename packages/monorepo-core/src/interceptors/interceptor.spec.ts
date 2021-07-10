import { TimeoutInterceptor } from './timeout.interceptor';
import { TransformInterceptor } from './transform.interceptor';

describe('Interceptor', () => {
  it('should be defined', () => {
    expect(new TimeoutInterceptor()).toBeDefined();
  });

  it('should be defined', () => {
    expect(new TransformInterceptor()).toBeDefined();
  });
});

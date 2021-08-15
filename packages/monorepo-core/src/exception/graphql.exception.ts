/**
 * GraphQL异常
 */
export class GraphQLException extends Error {
  extensions: { code: string; };

  constructor(message: string, code: string, properties?: Record<string, any>) {
    super(message);
    if (properties) {
      Object.keys(properties).forEach(key => {
        this[key] = properties[key];
      });
    }
    if (!this.name) {
      Object.defineProperty(this, 'name', { value: 'GraphQLException' });
    }
    this.extensions = { code };
  }
}
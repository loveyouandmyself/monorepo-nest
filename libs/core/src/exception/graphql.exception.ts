import { ApolloError } from 'apollo-server-express';

/**
 * GraphQL异常
 */
export class GraphQLException extends ApolloError {
  constructor(
    message: string,
    code = '400',
    extensions?: Record<string, any>,
  ) {
    super(message, code, extensions);
  }
}
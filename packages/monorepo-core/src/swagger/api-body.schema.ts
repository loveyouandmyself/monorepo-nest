import { SchemaObject, ReferenceObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const genApiBodySchema = (properties: Record<string, SchemaObject | ReferenceObject>): SchemaObject => {
  return {
    type: 'object',
    properties,
  };
};
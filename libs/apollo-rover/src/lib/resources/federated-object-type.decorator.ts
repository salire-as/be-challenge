import { Directive, ObjectType, ObjectTypeOptions } from '@nestjs/graphql';

export function FederatedObjectType(options?: ObjectTypeOptions, by = '_id') {
  const objectType = ObjectType(options);
  const directive = Directive(`@key(fields: ${by})`);

  return function (target: Function) {
    objectType(target);
    directive(target);
  };
}

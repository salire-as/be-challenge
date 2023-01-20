import { Directive, ObjectType, ObjectTypeOptions } from '@nestjs/graphql';
import { FederationTypeMetadataStorage } from './federation.storage';

export function ExtendedObjectType(options?: ObjectTypeOptions & { name?: string }, by = '_id', resolvable = true) {
  const objectType = ObjectType(options?.name, options);
  const directive = Directive(`@key(fields: ${by}, resolvable: ${resolvable})`);
  const extended = Directive('@extends');

  return function (target: Function) {
    FederationTypeMetadataStorage.add(target);

    objectType(target);
    directive(target);
    extended(target);
  };
}

import { Directive, InterfaceType, InterfaceTypeOptions } from '@nestjs/graphql';
import { FederationTypeMetadataStorage } from './federation.storage';

export function ExtendedInterfaceType(options?: InterfaceTypeOptions, by = '_id', resolvable = true) {
  const interfaceType = InterfaceType(options);
  const directive = Directive(`@key(fields: ${by}, resolvable: ${resolvable})`);
  const extended = Directive('@extends');

  return function (target: Function) {
    FederationTypeMetadataStorage.add(target);

    interfaceType(target);
    directive(target);
    extended(target);
  };
}

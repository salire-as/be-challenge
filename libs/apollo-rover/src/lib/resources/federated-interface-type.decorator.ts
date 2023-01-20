import { Directive, InterfaceType, InterfaceTypeOptions } from '@nestjs/graphql';

export function FederatedInterfaceType(options?: InterfaceTypeOptions, by = '_id') {
  const interfaceType = InterfaceType(options);
  const directive = Directive(`@key(fields: ${by})`);

  return function (target: Function) {
    interfaceType(target);
    directive(target);
  };
}

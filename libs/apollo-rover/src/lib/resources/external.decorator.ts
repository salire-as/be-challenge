import { Directive } from '@nestjs/graphql';

export function External() {
  const external = Directive('@external');

  return function (target: Object, key: string) {
    external(target, key);
  };
}

import { CustomScalar, Scalar } from '@nestjs/graphql';
import { ValidationError } from 'apollo-server-core';
import { Kind, ValueNode } from 'graphql';
import { Types } from 'mongoose';

@Scalar('ObjectId', () => Types.ObjectId)
export class ObjectIdScalar implements CustomScalar<string, Types.ObjectId | null> {
  name = 'ObjectId';
  description = 'ObjectID custom scalar type';

  parseValue(value: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(value)) throw new ValidationError('String is not a valid ObjectId');

    const objectId = new Types.ObjectId(value);

    return objectId;
  }

  serialize(value: Types.ObjectId): string {
    return value.toString();
  }

  parseLiteral(ast: ValueNode): Types.ObjectId | null {
    if (ast.kind === Kind.STRING) {
      return new Types.ObjectId(ast.value);
    } else return null;
  }
}

import { FederatedObjectType } from '@salire-as/apollo-rover';
import { Field } from '@nestjs/graphql';
import { Types } from 'mongoose';

@FederatedObjectType()
export class UserType {
  @Field()
  _id: Types.ObjectId;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  phone?: string;
}

import { Args, Query, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { UserType } from './user.type';
import { UserService } from './user.service';
import { FederatedResolver } from '@salire-as/apollo-rover';

@Resolver(() => UserType)
export class UserResolver extends FederatedResolver {
  constructor(protected readonly service: UserService) {
    super(service);
  }

  @Query(() => [UserType])
  users() {
    return this.service.list();
  }

  @Query(() => UserType)
  user(
    @Args('_id') _id: Types.ObjectId,
  ) {
    return this.service.getById(_id);
  }
}

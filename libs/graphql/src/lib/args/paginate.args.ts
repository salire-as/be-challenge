import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql';

enum PaginateOrder {
  DESC = -1,
  ASC = 1,
}

@ArgsType()
@ObjectType()
@InputType('PaginateArgsInput')
export class PaginateArgs {
  @Field(() => Int, { defaultValue: 0, nullable: true })
  skip?: number = 0;

  @Field(() => Int, { defaultValue: 20, nullable: true })
  limit?: number = 20;

  @Field({ defaultValue: 'createdAt', nullable: true })
  sortBy?: string = 'createdAt';

  @Field(() => Int, { defaultValue: PaginateOrder.DESC, nullable: true })
  order?: PaginateOrder = PaginateOrder.DESC;
}
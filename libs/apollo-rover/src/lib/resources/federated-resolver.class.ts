import { Logger } from '@nestjs/common';
import { ResolveReference } from '@nestjs/graphql';
import { Types } from 'mongoose';

class FederationReference {
  __typename: string;
  _id: Types.ObjectId;
}

export class FederatedResolver {
  constructor(protected readonly service: unknown & { getById: (_id: Types.ObjectId) => unknown }) {}
  @ResolveReference()
  resolveReference({ _id }: FederationReference) {
    Logger.debug(`Resolving reference for id ${_id}`, 'FederatedResolver');
    return this.service.getById(_id);
  }
}

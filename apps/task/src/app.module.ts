import { Module } from '@nestjs/common';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { FederationTypeMetadataStorage } from '@salire-as/apollo-rover';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO } from '@salire-as/config';
import { ObjectIdScalar } from '@salire-as/graphql';
import { TaskModule } from './task/task.module';

const internal = [TaskModule];

@Module({
  imports: [
    MongooseModule.forRoot(MONGO.uri),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: join(__dirname, './schema.gql'),
      context: ({ req, res, payload, connection }) => ({
        req,
        res,
        payload,
        connection,
      }),
      buildSchemaOptions: {
        orphanedTypes: FederationTypeMetadataStorage.getExtended(),
      },
    }),
    ...internal,
  ],
  providers: [ObjectIdScalar],
})
export class AppModule { }

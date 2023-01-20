import { InternalServerErrorException } from '@nestjs/common';
import *  as shelljs from 'shelljs';
import { join } from 'path';
import { writeFileSync } from 'fs';

export class ApolloRover {
  public static publish(
    service: string,
    host: string,
    port: string | number,
    ref = process.env.APOLLO_GRAPH_REF,
    path = process.env.SCHEMA_PATH || join(__dirname, './schema.gql'),
  ) {
    if (!service || !host || !ref || !path) {
      throw new InternalServerErrorException(`
        Could not publish subgraph, some required value is missing: { "service": ${service}, "host": ${host}, "ref": ${ref}, "path": ${path} }
      `);
    }

    if (!process.env.MY_NAME) {
      throw new InternalServerErrorException(`You have not setup your name in the .env file or it is not valid, current value is ${process.env.MY_NAME}. Please add the MY_NAME variable to the .env file`)
    }

    const actualRef = `${ref}@${process.env.MY_NAME}`;

    const isProduction = process.env.IS_PRODUCTION;

    const enhancedHost = isProduction ? `${host}/graphql` : `http://host.docker.internal:${port}/graphql`;

    const introspect = () => `npx -p @apollo/rover rover subgraph introspect "http://localhost:${port}/graphql"`;

    const publish = () =>
      `npx -p @apollo/rover rover subgraph publish ${actualRef} \
    --name ${service} --schema ${path} \
    --routing-url ${enhancedHost}`;

    shelljs.exec(introspect(), { silent: true }, (code, stdout) => {
      writeFileSync(path, stdout);
      shelljs.exec(publish(), { async: true });
    });
  }
}

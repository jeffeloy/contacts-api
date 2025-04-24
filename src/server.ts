import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { ContactsResolver } from "./resolvers/contacts-resolver";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [ContactsResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
  console.log(`GraphQL server ready at ${url}`);
}

bootstrap();
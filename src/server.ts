import "reflect-metadata";
import express from "express";

import path from "node:path";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import { buildSchema } from "type-graphql";
import { authChecker } from "./auth/authChecker";
import authLogin from "./auth/login";
import { context } from "./context";
import { connectMongo } from "./database/mongo";
import { prisma } from "./database/prisma-client";
import { ContactResolver } from "./graphql/modules/contact/contact.resolver";

async function bootstrap() {
  prisma.$connect();
  await connectMongo();
  const schema = await buildSchema({
    resolvers: [ContactResolver],
    authChecker,
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  const server = new ApolloServer({ schema });
  await server.start();

  const app = express();
  app.use(express.json());

  app.use(authLogin);

  app.use(
    "/graphql",
    bodyParser.json(),
    expressMiddleware(server, {
      context,
    }),
  );

  app.listen(4000, () => {
    console.log("Server running in http://localhost:4000");
    console.log("GraphQL: http://localhost:4000/graphql");
    console.log("Auth Route: POST http://localhost:4000/auth");
  });
}

bootstrap();

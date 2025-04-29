import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { ContactInput } from "../dtos/inputs/create-contact-input";
import type { Client } from "../../context";
import { clients } from "../config/clientConfig";
import { prisma } from "../../database/prisma-client";
import { MongoContact } from "../../database/mongo";
import type { Contact } from "../dtos/models/contact-model";

@Resolver()
export class ContactResolver {
  @Query(() => String)
  async helloWorld() {
    return "Hello World!";
  }

  @Authorized()
  @Mutation(returns => Boolean)
  async addContacts(
    @Arg("contacts", () => [ContactInput]) contacts: ContactInput[],
    @Ctx() ctx: Client
  ): Promise<any> {
    const { clientId } = ctx;
    const client = clients.find((client) => client.id === clientId);

    if (!client) {
      throw new Error("Client not found");
    }

    if (client.dbType === "mysql") {
      prisma.contact.createMany({
        data: contacts,
      });
      return true;
    } else if (client.dbType === "mongodb") {
      MongoContact.insertMany(contacts);
      return true;
    }
  }
}

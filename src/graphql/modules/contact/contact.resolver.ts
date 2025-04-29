import { Resolver, Mutation, Arg, Ctx, Authorized, Query } from "type-graphql";
import { ContactInput, ContactInterface } from "./contact.entity";
import { Client } from "../../../context";
import { ContactService } from "./contact.service";
import { clients } from "../../config/clientConfig";

@Resolver()
export class ContactResolver {
  private service: ContactService;

  constructor() {
    this.service = new ContactService();
  }

  @Authorized()
  @Query(() => [ContactInterface])
  async getContacts(@Ctx() ctx: Client): Promise<ContactInterface[]> {
    const { clientId } = ctx;
    const client = clients.find((client) => client.id === clientId);
    if (!client) {
      throw new Error("Client not found");
    }
    return await this.service.getContacts(client.dbType);
  }

  @Authorized()
  @Mutation(() => Boolean)
  async addContacts(
    @Arg("contacts", () => [ContactInput]) contacts: ContactInput[],
    @Ctx() ctx: Client
  ): Promise<boolean> {
    const { clientId } = ctx;
    const client = clients.find((client) => client.id === clientId);
    if (!client) {
      throw new Error("Client not found");
    }
    await this.service.addContacts(client, contacts);
    return true;
  }
}

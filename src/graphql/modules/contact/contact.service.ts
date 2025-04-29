import type { Client } from "../../config/clientConfig";
import { ContactInput } from "./contact.entity";
import { ContactRepository } from "./contact.repository";

export class ContactService {
  private repository: ContactRepository;

  constructor() {
    this.repository = new ContactRepository();
  }

  async addContacts(client: Client, contacts: ContactInput[]): Promise<void> {
    if (client.dbType === "mysql") {
      await this.repository.saveToMysql(contacts);
    } else if (client.dbType === "mongodb") {
      await this.repository.saveToMongo(contacts);
    } else {
      throw new Error("Invalid client");
    }
  }
}

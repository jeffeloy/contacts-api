import type { ClientConfig } from "../../config/clientConfig";
import { ContactInput } from "./contact.entity";
import { ContactRepository } from "./contact.repository";

export class ContactService {
  private repository: ContactRepository;

  constructor() {
    this.repository = new ContactRepository();
  }

  async addContacts(client: ClientConfig, contacts: ContactInput[]): Promise<void> {
    if (client.dbType === "mysql") {
      const formattedContacts = contacts.map(contact => this.formatContact(client, contact));
      await this.repository.saveToMysql(formattedContacts);
    } else if (client.dbType === "mongodb") {
      await this.repository.saveToMongo(contacts);
    } else {
      throw new Error("Invalid client");
    }
  }

  async getContacts(dbType: string) {
    if (dbType === "mysql") {
      return await this.repository.findAllMySql();
    } else if (dbType === "mongodb") {
      return await this.repository.findAllMongo();
    } else {
      throw new Error("Invalid client");
    }
  }

  private formatContact(client: ClientConfig, contact: ContactInput): ContactInput {
    if (contact.name && client.isFormatNameToUpperCase) {
      contact.name = this.toUpperCaseName(contact.name);
    }
    if (contact.cell_phone && client.isFormatPhone) {
      contact.cell_phone = this.formatPhone(contact.cell_phone);
    }
    return contact;
  }

  private toUpperCaseName(name: string): string {
    return name.toUpperCase();
  }

  private formatPhone(phone: string): string {
    if (phone.length !== 13 || !phone.startsWith("55")) {
      throw new Error("Invalid cell_phone: expected format 5541999999999");
    }
  
    const countryCode = "+" + phone.slice(0, 2);
    const areaCode = phone.slice(2, 4);
    const firstPart = phone.slice(4, 9);
    const secondPart = phone.slice(9);
  
    return `${countryCode} (${areaCode}) ${firstPart}-${secondPart}`;
  }
}

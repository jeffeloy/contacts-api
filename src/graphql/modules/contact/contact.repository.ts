import { MongoContact } from "../../../database/mongo";
import { prisma } from "../../../database/prisma-client";
import { ContactInput, ContactInterface } from "./contact.entity";

export class ContactRepository {
  async saveToMysql(contacts: ContactInput[]) {
    await prisma.contact.createMany({
      data: contacts,
    });
  }

  async saveToMongo(contacts: ContactInput[]) {
    await MongoContact.insertMany(contacts);
  }

  async findAllMySql() {
    const contacts = await prisma.contact.findMany();
    return this.formatReturn(contacts);
  }

  async findAllMongo() {
    const contacts = await MongoContact.find();
    return this.formatReturn(contacts);
  }

  formatReturn(contacts: any): ContactInterface[] {
    return contacts.map((contact: any) => ({
      id: contact._id ? contact._id.toString() : contact.id,
      name: contact.name,
      cell_phone: contact.cell_phone
    }));
  }
}

import { MongoContact } from "../../../database/mongo";
import { prisma } from "../../../database/prisma-client";
import { ContactInput } from "./contact.entity";

export class ContactRepository {
  async saveToMysql(contacts: ContactInput[]) {
    await prisma.contact.createMany({
      data: contacts,
    });
  }

  async saveToMongo(contacts: ContactInput[]) {
    await MongoContact.insertMany(contacts);
  }
}

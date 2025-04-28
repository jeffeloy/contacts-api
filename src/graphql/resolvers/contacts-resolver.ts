import { Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class ContactsResolver {
  @Query(() => String)
  async helloWorld() {
    return "Hello World!";
  }

  @Mutation(() => String)
  async createContact() {
    return "Hello World!";
  }
}

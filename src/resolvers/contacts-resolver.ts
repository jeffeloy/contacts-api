import { Query, Resolver } from "type-graphql";

@Resolver()
export class ContactsResolver {
  
  @Query(() => String)
  async helloWorld() {
    return "Hello World!";
  } 
}
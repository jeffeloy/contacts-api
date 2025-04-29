import { Field, InputType } from "type-graphql";

@InputType()
export class ContactInput {
  @Field()
  name: string;

  @Field()
  cell_phone: string;
}

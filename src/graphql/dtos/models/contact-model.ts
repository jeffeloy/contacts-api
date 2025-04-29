import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Contact {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  cell_phone: string;

  @Field({ nullable: true })
  email: string;
}

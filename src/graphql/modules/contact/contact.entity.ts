import { Field, ObjectType, InputType, InterfaceType } from "type-graphql";

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


@InputType()
export class ContactInput {
  @Field()
  name: string;

  @Field()
  cell_phone: string;
}
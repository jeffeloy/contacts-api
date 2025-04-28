import type { AuthChecker } from "type-graphql";
import type { Client } from "../context";

export const authChecker: AuthChecker<Client> = ({ context }) => {
  return !!context.clientId;
};

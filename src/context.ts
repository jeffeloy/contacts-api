import type { Request } from "express";
import { verifyToken } from "./auth/jwt";

export interface Client {
  clientId: string;
}

export interface ErrorMessage {
  error: string;
}

export const context = async ({
  req,
}: { req: Request }): Promise<Client | ErrorMessage> => {
  const auth = req.headers.authorization || "";
  const token = auth.replace("Bearer ", "").trim();
  try {
    const payload = verifyToken(token);
    return { clientId: payload.clientId };
  } catch (err) {
    return { error: "Invalid token" };
  }
};

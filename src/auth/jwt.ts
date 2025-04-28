import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET_KEY as string;

export function verifyToken(token: string): { clientId: string } {
  return jwt.verify(token, SECRET) as { clientId: string };
}

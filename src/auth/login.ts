import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import { clients } from "../graphql/config/clientConfig";

dotenv.config();
const router = express.Router();

const SECRET = process.env.SECRET_KEY as string;

router.post("/auth", (req, res) => {
  const { clientId } = req.body;

  const clientFound = clients.some((client) => client.id === clientId);

  if (!clientFound) {
    return res.status(401).json({ error: "Invalid client" });
  }
  const token = jwt.sign({ client: clientId }, SECRET, { expiresIn: "1d" });
  return res.json({ token });
});

export default router;

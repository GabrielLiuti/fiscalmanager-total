import { Router } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

const schema = z.object({
  email: z.string().email(),
  senha: z.string().min(6),
});

router.post("/login", async (req, res) => {
  const parse = schema.safeParse(req.body);
  if (!parse.success)
    return res.status(400).json({ error: "Dados inválidos" });

  const { email, senha } = parse.data;

  const user = await prisma.usuario.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Credenciais inválidas" });

  const ok = await argon2.verify(user.senhaHash, senha);
  if (!ok) return res.status(401).json({ error: "Credenciais inválidas" });

  const secret = process.env.JWT_SECRET || "dev";
  const token = jwt.sign(
    { sub: user.id, role: user.role },
    secret,
    { expiresIn: "1h" }
  );

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });
});

export default router;

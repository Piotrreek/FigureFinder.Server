import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import app from "./app/index";
import UsersRouter from "./app/routes/users";

export const prisma = new PrismaClient();

const port = process.env.PORT || "3000";

async function main() {
  app.use(express.json());

  app.use("/api/users", UsersRouter);

  // Catch unregistered routes
  app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

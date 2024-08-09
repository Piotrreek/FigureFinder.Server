import express, { Request, Response } from "express";
import UsersRouter from "./routes/users";
import FiguresRouter from "./routes/figures";

const app = express();
app.use(express.json());

app.use("/api/users", UsersRouter);
app.use("/api/figures", FiguresRouter);

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

export default app;

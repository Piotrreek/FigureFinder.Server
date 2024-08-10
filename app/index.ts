import express from "express";
import errorHandlingMiddleware from "./middleware/error";
import notFoundMiddleware from "./middleware/notFound";
import FiguresRouter from "./routes/figures";
import UsersRouter from "./routes/users";

const app = express();

app.use("/api/users", UsersRouter);
app.use("/api/figures", FiguresRouter);

// Not found middleware
app.use(notFoundMiddleware);

// Error handling middleware
app.use(errorHandlingMiddleware);

export default app;

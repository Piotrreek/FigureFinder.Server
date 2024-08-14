import express from "express";
import FiguresController from "../controllers/figures";
import requireAuthenticatedUserMiddleware from "../middleware/requireAuthenticated";

const router = express.Router();

router.post(
  "/",
  express.json(),
  requireAuthenticatedUserMiddleware,
  FiguresController.createFigure
);

router.get("/", FiguresController.getFigures);

export default router;

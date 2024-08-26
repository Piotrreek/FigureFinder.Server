import express from "express";
import FiguresController from "../controllers/figures";
import attachUserPayloadMiddleware from "../middleware/attachUserPayload";
import requireAuthenticatedUserMiddleware from "../middleware/requireAuthenticated";

const router = express.Router();

router.post(
  "/",
  express.json(),
  requireAuthenticatedUserMiddleware,
  FiguresController.createFigure
);

router.get("/", attachUserPayloadMiddleware, FiguresController.getFigures);

router.post(
  "/:id/entries",
  express.json(),
  requireAuthenticatedUserMiddleware,
  FiguresController.createFigureUserEntry
);

router.patch(
  "/:id",
  express.json(),
  requireAuthenticatedUserMiddleware,
  FiguresController.editFigure
);

router.get("/:id", FiguresController.getFigure);

router.get(
  "/users/:id/entries/count",
  requireAuthenticatedUserMiddleware,
  FiguresController.getUserEntries
);

export default router;

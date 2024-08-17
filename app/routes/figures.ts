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

router.patch(
  "/:id",
  express.json(),
  requireAuthenticatedUserMiddleware,
  FiguresController.editFigure
);

export default router;

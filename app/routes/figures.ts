import express from "express";
import multer from "multer";
import FiguresController from "../controllers/figures";
import attachUserPayloadMiddleware from "../middleware/attachUserPayload";
import requireAdminRoleMiddleware from "../middleware/requireAdminRole";
import requireAuthenticatedUserMiddleware from "../middleware/requireAuthenticated";

const router = express.Router();
const upload = multer({ dest: "/upload" });

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

router.post(
  "/import",
  requireAdminRoleMiddleware,
  upload.single("gpxfile"),
  FiguresController.importFigures
);

router.get("/users/:id/entries", FiguresController.getUserEntries);

export default router;

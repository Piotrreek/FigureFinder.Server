import express from "express";
import multer from "multer";
import FiguresController from "../controllers/figures";
import attachUserPayloadMiddleware from "../middleware/attachUserPayload";
import blockBlockedUserMiddleware from "../middleware/blockBlockedUser";
import requireAdminRoleMiddleware from "../middleware/requireAdminRole";
import requireAuthenticatedUserMiddleware from "../middleware/requireAuthenticated";

const router = express.Router();
const upload = multer({ dest: "/upload" });

router.post(
  "/",
  express.json(),
  requireAuthenticatedUserMiddleware,
  blockBlockedUserMiddleware,
  FiguresController.createFigure
);

router.get("/", attachUserPayloadMiddleware, FiguresController.getFigures);

router.post(
  "/:id/entries",
  express.json(),
  requireAuthenticatedUserMiddleware,
  blockBlockedUserMiddleware,
  FiguresController.createFigureUserEntry
);

router.patch(
  "/:id",
  express.json(),
  requireAuthenticatedUserMiddleware,
  blockBlockedUserMiddleware,
  FiguresController.editFigure
);

router.get("/:id", FiguresController.getFigure);

router.post(
  "/import",
  requireAdminRoleMiddleware,
  upload.single("gpxfile"),
  FiguresController.importFigures
);

router.get(
  "/users/:id/entries/count",
  requireAuthenticatedUserMiddleware,
  FiguresController.getUserEntriesCount
);

router.get("/users/:id/entries", FiguresController.getUserEntries);

export default router;

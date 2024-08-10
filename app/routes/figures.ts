import express from "express";
import FiguresController from "../controllers/figures";

const router = express.Router();

router.post("/", express.json(), FiguresController.createFigure);

export default router;

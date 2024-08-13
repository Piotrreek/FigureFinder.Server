import express from "express";
import UsersController from "../controllers/users";

const router = express.Router();

router.post("/", express.json(), UsersController.createUser);

export default router;

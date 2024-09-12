import express from "express";
import UsersController from "../controllers/users";
import requireAdminRoleMiddleware from "../middleware/requireAdminRole";

const router = express.Router();

router.post("/", express.json(), UsersController.createUser);
router.post("/sign-in", express.json(), UsersController.signIn);
router.patch("/:id/block", requireAdminRoleMiddleware, UsersController.block);

export default router;

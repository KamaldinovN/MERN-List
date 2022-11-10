import Router from "express";
import { UserController } from "../controllers/index.js";
import {
  inputUpdateValidation,
  inputAddValidation,
} from "../validation/inputValidation.js";
import handleValidationErrors from "../validation/handleValidationErrors.js";

const router = new Router();

router.get("/", UserController.getListOfUsers);
router.post(
  "/",
  inputAddValidation,
  handleValidationErrors,
  UserController.addNewUser
);
router.patch(
  "/:id",
  inputUpdateValidation,
  handleValidationErrors,
  UserController.updateUserData
);
router.patch("/", UserController.updateUserDataDragDrop);
router.delete("/:id", UserController.deleteUser);

export default router;

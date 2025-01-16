import { Router } from "express";
import { roleController } from "../controller/role.create.controller"; // Correct the import based on your export method
import { asyncHandler } from "../middleware/asyncHandler";

const routes = Router();

const PATH = {
  ADD: "/add",
  CREATE: "/create",
  UPDATE: "/update/:id",
  DELETE: "/delete/:id",
};

routes.post(`${PATH.ADD}/addRole`,asyncHandler(roleController))

export default routes;

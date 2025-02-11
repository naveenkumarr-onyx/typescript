import { Router } from "express";
import { roleController } from "../controller/role.create.controller";
import { asyncHandler } from "../middleware/asyncHandler";
import { rolePermissionController } from "../controller/permission.role.create.controller";
import { assignPermissionToRole } from "../controller/assign.role.permissions";
import { employeeRegisterController } from "../controller/employee.register.controller";
import { employeeLoginController } from "../controller/employee.login.controller";
import { jwtMiddleware } from "../middleware/jwt";
import { getAllEmployeeList } from "../controller/get.all.employees";

const routes = Router();

const PATH = {
  ADD: "/add",
  LOGIN: "/login",
  GET: "/get",
  ASSIGN: "/assign",
  CREATE: "/create",
  UPDATE: "/update/:id",
  DELETE: "/delete/:id",
};

routes.post(`${PATH.ADD}/addRole`, asyncHandler(roleController));
routes.post(
  `${PATH.ADD}/addRolePermission`,
  asyncHandler(rolePermissionController)
);
routes.post(
  `${PATH.ASSIGN}/assign-permissions`,
  asyncHandler(assignPermissionToRole)
);
routes.post(
  `${PATH.ADD}/register-employee`,
  asyncHandler(employeeRegisterController)
);
routes.get(
  `${PATH.LOGIN}/login-employee`,
  asyncHandler(employeeLoginController),
  jwtMiddleware
);
routes.get(
  `${PATH.GET}/get-all-employee-list`,
  asyncHandler(getAllEmployeeList)
);

export default routes;

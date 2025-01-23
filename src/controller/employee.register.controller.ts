import { Request, Response } from "express";
import { EmployeeRegister } from "../model/employee.register..schema";
import { Role } from "../model/role.schema";
import { getNextEmployeeId } from "./generate.employee.id";

export const employeeRegisterController = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { userName, password, email, phone,role_names} = req.body;
    if (!userName || !password || !email || !phone) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const exisiting_Employee = await EmployeeRegister.findOne({
        phone
    });
    if (exisiting_Employee) {
      return res.status(409).json({
        success: false,
        message: `Employee already exists with this ${email} or ${phone} for this username (${userName})`,
      });
    }
    const schemaName = "employees"
    const employee_ids = await getNextEmployeeId(schemaName)

    const roles = await Role.find({ role_name: { $in: role_names } });
    const role_ids = roles.map((role)=>role._id)

    const registerNewEmployee = new EmployeeRegister({
      userName,
      password,
      email,
      phone,
      role_ids,
      employee_id: employee_ids ,
    });
    await registerNewEmployee.save();
    return res.status(201).json({
      success: true,
      message: `${userName} Employee Register Successfully`,
      data: registerNewEmployee,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};

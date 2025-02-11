import { Request, Response } from "express";
import { EmployeeRegister } from "../model/employee.register..schema";

export const getAllEmployeeList = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const getAllEmployee = await EmployeeRegister.find();
    return res.status(200).json({
      message: "Employee list fetched sucessfully",
      data: getAllEmployee,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error in getting all employees",
      success: false,
    });
  }
};

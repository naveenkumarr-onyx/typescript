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

export const getEmployeeWithPhoneNumber = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { phone } = req.params;
    const getAllEmployee = await EmployeeRegister.findOne({ phone });
    if (!getAllEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found in this phone number",
      });
    }
    if (getAllEmployee) {
      res.status(200).json({
        data: getAllEmployee,
        success: true,
        message: "Employee Fetched Successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: `${error} Internal Server error`,
      success: false,
    });
  }
};

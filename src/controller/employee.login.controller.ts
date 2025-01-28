import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { EmployeeRegister } from "../model/employee.register..schema";


export const employeeLoginController = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { employee_id, password } = req.body;

    // Find employee by ID
    const employee = await EmployeeRegister.findOne({ employee_id });
    if (!employee) {
      return res.status(401).json({ success: false, message: "No Employee Found." });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid employee ID or password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: employee_id, role_ids: employee.role_ids },
      process.env.JWT_SECRET|| "123",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      user:{
        id : employee_id,
        userName: employee.userName
      },
      auth: `Bearer ${token}`,
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

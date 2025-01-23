import { Request, Response } from "express";
import { Role } from "../model/role.schema";
import { v4 as uuidv4 } from "uuid";

export const roleController = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { role_name, description } = req.body;

    // Check if the role already exists
    const existingRole = await Role.findOne({ role_name });
    if (existingRole) {
      return res.status(409).json({
        json: `${role_name} role already exists`,
      });
    }

    const d = new Date();
    const dateString = `${d.getDate()}${d.getMonth() + 1}${d.getFullYear()}`; // Format as DD-MM-YYYY

    const role_id = `${role_name}_${uuidv4().substring(0, 4)}_${dateString}`;
    const newRole = new Role({
      role_id,
      role_name,
      description,
    });

    await newRole.save();

    return res.status(201).json({
      json: `${role_name} Role created successfully`,
      data: newRole,
    });
  } catch (error) {
    console.error("Error saving role:", error);
    return res.status(500).json({
      error: "An error occurred while saving the role",
    });
  }
};

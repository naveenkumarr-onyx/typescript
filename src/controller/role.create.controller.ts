import { Request, Response } from "express";
import {Role} from "../model/role.schema"; 


export const roleController =  async (req: Request, res: Response): Promise<void> => {
  try {
    const { role_name, description } = req.body;
    
    // Check if the role already exists
    const existingRole = await Role.findOne({ role_name });
    if (existingRole) {
      res.status(409).json({
        json: `${role_name} role already exists`,
      });
      return;
    }

    // If the role doesn't exist, create it
    const newRole = new Role({
      role_name,
      description,
    });

    await newRole.save();

    res.status(201).json({
      json : `${role_name} Role created successfully`,
      data: newRole,
    });
  } catch (error) {
    console.error("Error saving role:", error);
    res.status(500).json({
      error: "An error occurred while saving the role",
    });
  }
}
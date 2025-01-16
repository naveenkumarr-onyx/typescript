import { Request, Response } from "express";
import Role from "../model/role.schema"; 

export async function roleController(req: Request, res: Response): Promise<void> {
  try {
    const { role_name, description } = req.body;
    
    // Check if the role already exists
    const existingRole = await Role.findOne({ role_name });
    if (existingRole) {
      res.status(409).json({
        error: "Role name already exists",
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
      data: newRole,
    });
  } catch (error: any) {
    console.error("Error saving role:", error);
    res.status(500).json({
      error: "An error occurred while saving the role",
    });
  }
}

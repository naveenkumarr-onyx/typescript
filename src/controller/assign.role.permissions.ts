import { Request, Response } from "express";
import { Role } from "../model/role.schema";
import { RolePermission } from "../model/permission.role.schema";

export const assignPermissionToRole = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    console.log("Request Body:", req.body);

    const { role_name, permission_name } = req.body;

    // Validate input
    if (!role_name || !permission_name) {
      return res.status(400).json({ message: "role_name and permission_name are required" });
    }

    const role = await Role.findOne({ role_name });
    if (!role) {
      return res.status(404).json({ message: `Role '${role_name}' not found` });
    }

    const permissionArray = Array.isArray(permission_name) ? permission_name : [permission_name];

    const rolePermissions = await RolePermission.find({ permission_name: { $in: permissionArray } });


    if (rolePermissions.length === 0) {
      return res.status(404).json({ message: "Permissions not found" });
    }

    const permissionIds = rolePermissions.map((perm) => perm._id);

    role.permissions = [...new Set(permissionIds)];
    await role.save();
    
    return res.status(200).json({ message: "Permissions assigned successfully", permissions: role.permissions });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

import { Request, Response } from "express";
import { RolePermission } from "../model/permission.role.schema";

export const rolePermissionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { permission_name, description } = req.body;
    if (!permission_name || !Array.isArray(permission_name)) {
      res.status(409).json({
        success: false,
        error: "All Fields are required",
      });
      return;
    }

    const uniquepermissions = [...new Set(permission_name)];
    const exisiting_permission: any = await RolePermission.findOne({
      permission_name: {
        $in: uniquepermissions,
      },
    });

    if (exisiting_permission.length > 0) {
      const exisiting_permission_name = exisiting_permission.map(
        (perm: any) => perm.permission_name
      );
      const duplicate_permissions = uniquepermissions.filter((perm) =>
        exisiting_permission_name.includes(perm)
      );
      res.status(409).json({
        success: false,
        error: `The following permissions already exist: ${duplicate_permissions.join(
          ", "
        )}`,
      });
      return;
    }
    if (exisiting_permission) {
      res.status(409).json({
        success: false,
        error: "Already existing this permission",
      });
      return;
    }
    const permissions = new RolePermission({
      permission_name: permission_name,
      description: description,
    });
    await permissions.save();
    res.status(201).json({
      data: permissions,
      success: true,
      message: `${permission_name} created successfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating role permission",
      success: false,
    });
  }
};

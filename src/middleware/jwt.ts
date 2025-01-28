import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";



interface AuthenticationRequest extends Request {
  user?: any;
}

export const jwtMiddleware = (req: AuthenticationRequest, res: Response, next: NextFunction): any => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "123");
    req.user = decoded; 
    next(); 
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const verifyIsAdmMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
      (err: any, decoded: any) => {
        const user = { id: decoded.uuid, isAdm: decoded.isAdm };

        if (!user.isAdm) {
          return res.status(403).json({ message: "Unauthorized" });
        }

        next();
      }
    );
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

export default verifyIsAdmMiddleware;

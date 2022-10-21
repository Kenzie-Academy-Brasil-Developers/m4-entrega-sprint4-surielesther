import { Request, Response } from "express";
import updateUserService from "../services/updateUser.service";
import jwt from "jsonwebtoken";

const updateUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const { id } = req.params;
    const token = req.headers.authorization?.split(" ")[1];

    if (
      req.body.id != undefined ||
      req.body.isAdm != undefined ||
      req.body.isActive != undefined
    ) {
      return res.status(401).json({
        error: "campo inválido",
        message: "Este campo não pode ser atualizado!",
      });
    }

    jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
      (err: any, decoded: any) => {
        const user = { id: decoded.uuid, isAdm: decoded.isAdm };

        if (!user.isAdm) {
          return res.status(401).json({ message: "Unauthorized" });
        }
      }
    );

    const user = await updateUserService({ name, email, password, id });

    return res.status(200).json({ message: "Usuário atualizado!", user: user });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default updateUserController;

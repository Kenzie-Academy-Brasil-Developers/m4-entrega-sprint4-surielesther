import { Request, Response } from "express";
import deleteUserService from "../services/deleteUser.service";

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await deleteUserService({ id });

    return res.status(204).json({ message: "Usuário deletado!", user: user });
  } catch (err) {
    if (err instanceof Error) {
      if (err.message == "Este usuário já está inativo") {
        return res.status(400).send({
          error: err.name,
          message: err.message,
        });
      }
      return res.status(404).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default deleteUserController;

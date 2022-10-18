import { Request, Response } from "express";
import createUserService from "../services/createUser.service";

const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, isAdm } = req.body;

    const newUser = await createUserService({ name, email, password, isAdm });

    return res.status(201).send(newUser);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default createUserController;

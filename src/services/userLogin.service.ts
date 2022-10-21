import { IUserLogin } from "../interfaces/users";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userLoginService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const user = users.find((user) => user.email === email);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  if (!bcrypt.compareSync(password, user.password) || email !== user.email) {
    throw new Error("Email ou senha incorretos!");
  }

  const token = jwt.sign(
    { id: user.id, isAdm: user.isAdm, email: email },
    String(process.env.JWT_SECRET),
    {
      expiresIn: "24h",
    }
  );

  return token;
};

export default userLoginService;

import AppDataSource from "../data-source";

import { User } from "../entities/user.entity";

import { IUserRequest, IUser } from "../interfaces/users";

import * as bcrypt from "bcrypt";

const createUserService = async ({
  name,
  email,
  password,
  isAdm,
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const hashedPassword = await bcrypt.hash(password, 10);

  const emailAlreadyExists = users.find((user) => user.email === email);

  if (emailAlreadyExists) {
    throw new Error("Este email já está sendo usado");
  }

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = hashedPassword;
  user.isAdm = isAdm;
  user.isActive = true;
  user.createdAt = new Date();
  user.updatedAt = new Date();
  user.id;

  userRepository.create(user);
  await userRepository.save(user);

  const newUser: IUser = {
    name: user.name,
    email: user.email,
    isAdm: user.isAdm,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    id: user.id,
  };

  return newUser;
};

export default createUserService;

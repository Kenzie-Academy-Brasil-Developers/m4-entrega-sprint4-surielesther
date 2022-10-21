import { User } from "../entities/user.entity";
import AppDataSource from "../data-source";

import { IUser, IUserDelete } from "../interfaces/users";

const deleteUserService = async ({ id }: IUserDelete) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();
  const user = users.find((user: IUser) => user.id === id);

  if (user!.isActive == false) {
    throw new Error("Este usuário já está inativo");
  }

  const userUpdated = {
    isActive: false,
  };
  await userRepository.update(user!.id, userUpdated);

  return userUpdated;
};

export default deleteUserService;

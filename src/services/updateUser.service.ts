import { User } from "../entities/user.entity";
import AppDataSource from "../data-source";

import { IUserUpdate } from "../interfaces/users";

const updateUserService = async ({
  name,
  email,
  password,
  id,
}: IUserUpdate) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();
  const fulaninho = users.find((user) => user.id === id);

  const userUpdated = {
    name: name || fulaninho!.name,
    email,
    password,
    updatedOn: new Date(),
  };
  await userRepository.update(fulaninho!.id, userUpdated);

  return userUpdated;
};

export default updateUserService;

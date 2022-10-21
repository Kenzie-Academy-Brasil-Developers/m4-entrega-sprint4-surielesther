export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  isAdm: boolean;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  id: string;
}

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export interface IUserDelete {
  id: string;
}

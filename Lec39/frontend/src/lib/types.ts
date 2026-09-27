export type Role = "admin" | "user";

export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface SignUpBody {
  fullName: string;
  email: string;
  password: string;
}

export interface SignInBody {
  email: string;
  password: string;
}

export type UpdateUserBody = Partial<SignUpBody>;

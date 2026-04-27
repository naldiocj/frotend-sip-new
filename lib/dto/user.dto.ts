export interface User {
  id: string;
  name: string;
  email: string;
  roles: Role[];
}

interface Role {
  id: string;
  name: string;
}

export interface UserDTO {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
  password?: string;
  emailVerified?: boolean;
  provider?: "LOCAL" | "GOOGLE" | "FACEBOOK";
  providerId?: string;
  roles: { id: number; name: string }[];
  direcao?: { id: string; nome: string };
  active?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  phoneNumber?: string;
  password?: string;
  emailVerified?: boolean;
  provider?: "LOCAL" | "GOOGLE" | "FACEBOOK";
  providerId?: string;
  roleIds?: number[];
  active?: boolean;
}

export interface RoleDTO {
  id: number;
  name: string;
  description?: string;
}
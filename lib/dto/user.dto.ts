/**
 * Type definition for a generic user object.
 * Extend this interface to match your application's user model.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  roles: Role[];
  // Add any additional user properties here
}

interface Role {
  id: string;
  name: string;
}

export interface UserListDTO {
  id: string;
  name: string;
  email: string;
  roles: Role[];
}

export interface UserDTO {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  roles: Role[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

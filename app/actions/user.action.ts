"use server";

import { User, CreateUserDTO } from "@/lib/dto/user.dto";
import { getSession } from "@/lib/session";
import {
  createUser,
  deleteUser as deleteUserService,
} from "@/app/services/user.service";

export async function getUserDetail() {
  const token = await getSession();
  const url = `${process.env.API_URL!}/users/me`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (response.ok) {
    const user = result.data;

    return {
      status: 200,
      message: "Login realizado com sucesso",
      data: user as User,
    };
  }

  return {
    status: 401,
    message: "Usuário não encontrado.",
  };
}

export async function registerUser(formData: CreateUserDTO) {
  if (!formData.name || !formData.email) {
    return {
      status: 400,
      message: "Nome e email são obrigatórios.",
    };
  }

  try {
    const user = await createUser(formData);

    return {
      status: 200,
      message: "Utilizador registado com sucesso.",
      data: user,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error?.message || "Ocorreu um erro ao registar o utilizador.",
    };
  }
}

export async function deleteUserAction(id: string) {
  try {
    const user = await deleteUserService(id);

    return {
      status: 200,
      message: "Utilizador apagado com sucesso.",
      data: user,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error?.message || "Ocorreu um erro ao apagar o utilizador.",
    };
  }
}

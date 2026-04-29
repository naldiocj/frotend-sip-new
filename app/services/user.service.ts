"use server";

import { apiWithToken } from "@/lib/api";
import { CreateUserDTO, UserDTO } from "@/lib/dto/user.dto";
import { getSession } from "@/lib/session";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function getUserSession() {
  const token = await getSession();
  const url = `${process.env.API_URL!}/users/me`;
  const response = await fetch(url, {
    method: "GET",
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
      data: user as UserDTO,
    };
  }

  return {
    status: 401,
    message: "Usuário não encontrado.",
  };
}

export async function getUsers() {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token, {
      next: { tags: ["get-users"] },
    }).get("/users");

    return response.data as UserDTO[];
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Ocorreu um erro ao buscar os usuários.",
    );
  }
}

export async function createUser(data: CreateUserDTO) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).post("/auth/register", data);
    revalidateTag("get-users", {});
    return response.data as { id: number };
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Ocorreu um erro ao registar o usuário.",
    );
  }
}

export async function deleteUser(id: string) {
  await requiredUser();

  try {
    const token = await getSession();
    const response = await apiWithToken(token).delete(`/users/${id}`);
    revalidateTag("get-users", {});
    return response;
  } catch (error: any) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Ocorreu um erro ao apagar o usuário.",
    );
  }
}

export async function requiredUser() {
  try {
    const token = await getSession();
    const response = await apiWithToken(token).get("/users/me");
    if (response) {
      return response;
    }
  } catch (error: any) {
    console.log(error.response?.data);
  }

  redirect("/");
}

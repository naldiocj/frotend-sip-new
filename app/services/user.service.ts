"use server";

import { apiWithToken } from "@/lib/api";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function getUserSession() {
  // try {
  //   const token = await getSession();
  //   if (!token) {
  //     return null;
  //   }
  //   const response = await apiWithToken(token).get("/users/me");
  //   return response.data;
  // } catch (error: any) {
  //   console.log(error.response?.data);
  //   return null;
  // }

  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBzaWMuZ292LmFvIiwiaWF0IjoxNzczNjQ5NjQxLCJleHAiOjE3NzYyNDE2NDF9.i-8Ci488yQNqr_yaFuzlcd8wijGkabzoCh6A7ypfask";
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
      data: user,
    };
  }

  return {
    status: 401,
    message: "Usuário não encontrado.",
  };
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

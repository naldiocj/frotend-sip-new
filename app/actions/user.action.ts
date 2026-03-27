import { User } from "@/lib/dto/user.dto";
import { getSession } from "@/lib/session";

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

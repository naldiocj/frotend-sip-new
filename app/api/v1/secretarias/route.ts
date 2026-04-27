import { NextResponse } from "next/server";
import { createSecretaria } from "@/app/services/secretaria.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.nome || !body.nome.trim()) {
      return NextResponse.json({ message: "Nome é obrigatório" }, { status: 400 });
    }

    if (!body.codigo || !body.codigo.trim()) {
      return NextResponse.json({ message: "Código é obrigatório" }, { status: 400 });
    }

    const secretaria = await createSecretaria({
      nomeCompleto: body.nome,
      codigo: body.codigo,
      descricao: body.descricao,
    });
    
    return NextResponse.json({
      message: "Secretaria criada com sucesso",
      data: secretaria,
    });
  } catch (error: any) {
    console.error("Create error:", error);
    return NextResponse.json({ message: error.message || "Erro ao criar secretaria" }, { status: 500 });
  }
}
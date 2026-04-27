import { NextResponse } from "next/server";
import { createPatente } from "@/app/services/patente.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.nome || !body.nome.trim()) {
      return NextResponse.json({ message: "Nome é obrigatório" }, { status: 400 });
    }

    const patente = await createPatente({ nome: body.nome });
    
    return NextResponse.json({
      message: "Patente criada com sucesso",
      data: patente,
    });
  } catch (error: any) {
    console.error("Create error:", error);
    return NextResponse.json({ message: error.message || "Erro ao criar patente" }, { status: 500 });
  }
}
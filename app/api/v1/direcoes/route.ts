import { NextResponse } from "next/server";
import { createDireccao } from "@/app/services/direccao.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.nome || !body.nome.trim()) {
      return NextResponse.json({ message: "Nome é obrigatória" }, { status: 400 });
    }

    if (!body.sigla || !body.sigla.trim()) {
      return NextResponse.json({ message: "Sigla é obrigatória" }, { status: 400 });
    }

    const direccao = await createDireccao({
      nome: body.nome,
      sigla: body.sigla,
      descricao: body.descricao,
    });
    
    return NextResponse.json({
      message: "Direção criada com sucesso",
      data: direccao,
    });
  } catch (error: any) {
    console.error("Create error:", error);
    return NextResponse.json({ message: error.message || "Erro ao criar direção" }, { status: 500 });
  }
}
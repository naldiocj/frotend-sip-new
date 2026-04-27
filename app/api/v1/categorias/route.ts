import { NextResponse } from "next/server";
import { createCategoria, updateCategoria, deleteCategoria, getCategoriaById } from "@/app/services/categoria.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.nome || !body.nome.trim()) {
      return NextResponse.json({ message: "Nome é obrigatório" }, { status: 400 });
    }

    const categoria = await createCategoria({ nome: body.nome });
    
    return NextResponse.json({
      message: "Categoria criada com sucesso",
      data: categoria,
    });
  } catch (error: any) {
    console.error("Create error:", error);
    return NextResponse.json({ message: error.message || "Erro ao criar categoria" }, { status: 500 });
  }
}
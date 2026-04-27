import { NextResponse } from "next/server";
import { updateCategoria, deleteCategoria } from "@/app/services/categoria.service";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    if (body.nome !== undefined && !body.nome.trim()) {
      return NextResponse.json({ message: "Nome não pode ser vazio" }, { status: 400 });
    }

    const categoria = await updateCategoria(id, body);
    
    return NextResponse.json({
      message: "Categoria atualizada com sucesso",
      data: categoria,
    });
  } catch (error: any) {
    console.error("Update error:", error);
    return NextResponse.json({ message: error.message || "Erro ao atualizar categoria" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    
    await deleteCategoria(id);
    
    return NextResponse.json({
      message: "Categoria eliminada com sucesso",
    });
  } catch (error: any) {
    console.error("Delete error:", error);
    return NextResponse.json({ message: error.message || "Erro ao eliminar categoria" }, { status: 500 });
  }
}
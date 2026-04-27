import { NextResponse } from "next/server";
import { updateDireccao, deleteDireccao } from "@/app/services/direccao.service";

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

    if (body.sigla !== undefined && !body.sigla.trim()) {
      return NextResponse.json({ message: "Sigla não pode ser vazio" }, { status: 400 });
    }

    const direccao = await updateDireccao(id, body);
    
    return NextResponse.json({
      message: "Direção atualizada com sucesso",
      data: direccao,
    });
  } catch (error: any) {
    console.error("Update error:", error);
    return NextResponse.json({ message: error.message || "Erro ao atualizar direção" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    
    await deleteDireccao(id);
    
    return NextResponse.json({
      message: "Direção eliminada com sucesso",
    });
  } catch (error: any) {
    console.error("Delete error:", error);
    return NextResponse.json({ message: error.message || "Erro ao eliminar direção" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import { updateSecretaria, deleteSecretaria } from "@/app/services/secretaria.service";

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

    if (body.codigo !== undefined && !body.codigo.trim()) {
      return NextResponse.json({ message: "Código não pode ser vazio" }, { status: 400 });
    }

    const secretaria = await updateSecretaria(id, body);
    
    return NextResponse.json({
      message: "Secretaria atualizada com sucesso",
      data: secretaria,
    });
  } catch (error: any) {
    console.error("Update error:", error);
    return NextResponse.json({ message: error.message || "Erro ao atualizar secretaria" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    
    await deleteSecretaria(id);
    
    return NextResponse.json({
      message: "Secretaria eliminada com sucesso",
    });
  } catch (error: any) {
    console.error("Delete error:", error);
    return NextResponse.json({ message: error.message || "Erro ao eliminar secretaria" }, { status: 500 });
  }
}
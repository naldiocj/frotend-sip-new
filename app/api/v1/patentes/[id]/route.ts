import { NextResponse } from "next/server";
import { updatePatente, deletePatente } from "@/app/services/patente.service";

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

    const patente = await updatePatente(id, body);
    
    return NextResponse.json({
      message: "Patente atualizada com sucesso",
      data: patente,
    });
  } catch (error: any) {
    console.error("Update error:", error);
    return NextResponse.json({ message: error.message || "Erro ao atualizar patente" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    
    await deletePatente(id);
    
    return NextResponse.json({
      message: "Patente eliminada com sucesso",
    });
  } catch (error: any) {
    console.error("Delete error:", error);
    return NextResponse.json({ message: error.message || "Erro ao eliminar patente" }, { status: 500 });
  }
}
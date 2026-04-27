import { NextResponse } from "next/server";
import { createTipoCrime } from "@/app/services/tipo-crime.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!Array.isArray(body)) {
      return NextResponse.json(
        { message: "O corpo deve ser um array de tipos de crime" },
        { status: 400 }
      );
    }

    const results = [];
    for (const item of body) {
      try {
        const tipo = await createTipoCrime({
          descricao: item.descricao,
          artigoPenal: item.artigoPenal,
        });
        results.push(tipo);
      } catch (error) {
        console.error("Error creating tipo crime:", error);
      }
    }

    return NextResponse.json({
      message: `${results.length} tipos de crime importados com sucesso`,
      data: results,
    });
  } catch (error: any) {
    console.error("Bulk upload error:", error);
    return NextResponse.json(
      { message: error.message || "Erro ao importar tipos de crime" },
      { status: 500 }
    );
  }
}
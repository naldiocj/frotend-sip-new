import { NextResponse } from "next/server";
import { createDireccao } from "@/app/services/direccao.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!Array.isArray(body)) {
      return NextResponse.json(
        { message: "O corpo deve ser um array de direções" },
        { status: 400 }
      );
    }

    const results = [];
    for (const item of body) {
      try {
        const direccao = await createDireccao({
          nome: item.nome,
          sigla: item.sigla,
          descricao: item.descricao,
        });
        results.push(direccao);
      } catch (error) {
        console.error("Error creating direcao:", error);
      }
    }

    return NextResponse.json({
      message: `${results.length} direções importadas com sucesso`,
      data: results,
    });
  } catch (error: any) {
    console.error("Bulk upload error:", error);
    return NextResponse.json(
      { message: error.message || "Erro ao importar direções" },
      { status: 500 }
    );
  }
}

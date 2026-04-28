import { NextResponse } from "next/server";
import { createDirector } from "@/app/services/director.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!Array.isArray(body)) {
      return NextResponse.json(
        { message: "O corpo deve ser um array de directores" },
        { status: 400 }
      );
    }

    const results = [];
    for (const item of body) {
      try {
        const director = await createDirector({
          nomeCompleto: item.nomeCompleto,
          patenteId: item.patenteId,
          cargoId: item.cargoId,
          direcaoId: item.direcaoId,
        });
        results.push(director);
      } catch (error) {
        console.error("Error creating director:", error);
      }
    }

    return NextResponse.json({
      message: `${results.length} directores importados com sucesso`,
      data: results,
    });
  } catch (error: any) {
    console.error("Bulk upload error:", error);
    return NextResponse.json(
      { message: error.message || "Erro ao importar directores" },
      { status: 500 }
    );
  }
}
import openDB from "@/database/init";
import {ReceiptSwissFranc} from "lucide-react";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const db = await openDB();
  const recipe = await db.get('SELECT * FROM recipe WHERE id=?', [params.id])
  await db.close();

  if (recipe == null) {
    return new Response(null, {status: 404})
  }

  return Response.json(recipe);
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
  const db = await openDB();
  const result = await db.run("DELETE FROM recipe WHERE id = ?", [params.id]);

  await db.close();

  if (result.changes === 0) {
    return new Response(null, { status: 404 });
  }

  return new Response(null, { status: 200 });
}

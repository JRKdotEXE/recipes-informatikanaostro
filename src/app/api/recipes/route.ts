import openDB from "@/database/init";

export async function GET() {
  const db = await openDB();
  const recipes = await db.all("SELECT * FROM recipe");
  await db.close();

  return Response.json({ recipes });
}

export async function POST(req: Request) {
    const {
        title,
        description,
        is_vegetarian,
        cuisine,
        preparation_time,
        image_url,
        ingredients,
        steps,
    } = await req.json();

  const db = await openDB();

  try  {
      await db.run(
          `INSERT INTO recipe (title, description, is_vegetarian, cuisine, preparation_time, image_url, ingredients, steps)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [title, description, is_vegetarian, cuisine, preparation_time, image_url, ingredients, steps]
      );


    return new Response(null, {status: 200})
  } catch (error) {
      console.error("Failed to add")
      return new Response(null, {status: 400})
  } finally {
      await db.close()
  }
}

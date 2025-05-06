import { tables, useDrizzle } from "~/server/utils/drizzle";

export default defineEventHandler(async (event) => {
  const data = await readBody(event);

  if (!data) {
    return Response.json(
      {
        message: "No data provided",
      },
      { status: 500 }
    );
  }
  const todo = await useDrizzle()
    .insert(tables.users)
    .values({
      ...data,
    });

  return Response.json(
    {
      message: "User created successfully",
      data: todo,
    },
    { status: 201 }
  );
});

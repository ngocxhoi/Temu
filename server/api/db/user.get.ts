export default defineEventHandler(async (event) => {
  const users = await useDrizzle().select().from(tables.users).all();

  return Response.json(
    {
      message: "Users retrieved successfully",
      data: users,
    },
    { status: 200 }
  );
});

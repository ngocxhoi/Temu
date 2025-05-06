export default defineEventHandler(async (event) => {
  const { pathname } = getRouterParams(event);

  await hubBlob().delete(pathname);

  return Response.json(
    {
      message: "Blob deleted successfully",
      pathname,
    },
    { status: 200 }
  );
});

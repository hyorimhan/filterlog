export const getPaginationParams = (searchParams: URLSearchParams) => {
  const page = parseInt(searchParams.get('page') ?? '1');
  const limit = parseInt(searchParams.get('limit') ?? '10');

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  return { page, limit, from, to };
};

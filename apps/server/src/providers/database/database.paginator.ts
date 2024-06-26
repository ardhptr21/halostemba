export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
}

export type PaginateOptions = { page?: number; perPage?: number };
export type PaginateFunction = <T, K>(
  model: any,
  args?: K,
  options?: PaginateOptions,
) => Promise<PaginatedResult<T>>;

export const paginator = (
  defaultOptions: PaginateOptions,
): PaginateFunction => {
  return async (model, args: any, options) => {
    const page = Number(options?.page) || defaultOptions.page || 1;
    const perPage = Number(options?.perPage) || defaultOptions.perPage || 10;
    const skip = page > 0 ? (page - 1) * perPage : 0;

    const [total, data] = await Promise.all([
      model.count({ where: args.where || undefined }),
      model.findMany({ ...args, take: perPage, skip }),
    ]);
    const lastPage = Math.ceil(total / perPage);
    const totalPages = Math.ceil(total / perPage);

    return {
      data,
      meta: {
        total,
        lastPage,
        currentPage: page,
        perPage,
        totalPages,
        prev: page > 1 ? page - 1 : null,
        next: page < lastPage ? page + 1 : null,
      },
    };
  };
};

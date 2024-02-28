export default interface WithMetaResponseType<T> {
  data: T;
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    totalPages: number;
    prev: number | null;
    next: number | null;
  };
}

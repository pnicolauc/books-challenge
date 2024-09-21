import { IBookSearchParams } from "./types/book";

export const getChangedQueryParams = (key: string, value: string, searchParams: IBookSearchParams): string => {
    const newSearchParams = new URLSearchParams({ ...searchParams });
    newSearchParams.delete("page");
    newSearchParams.set(key, value);
    return `?${newSearchParams.toString()}`;
  };

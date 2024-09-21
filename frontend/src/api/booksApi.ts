import { IBook, IBookSearchParams } from '@/lib/types/book';
import { IFindResult, IOperationResult } from '@/lib/types/shared';
import { headers } from 'next/headers'

const booksApiUrl = process.env.BOOKS_BACKEND_URL;

if(booksApiUrl === undefined) {
  throw new Error("BOOKS_BACKEND_URL is not set")
}

export const booksApi = {
  get: async (bookId: string): Promise<IOperationResult<IBook>> => {
    try {
      const response = await fetch(`${booksApiUrl}/books/${bookId}`);
      const isSuccess = response.status === 200;
      const body: unknown = isSuccess ? await response.json() : null;

      return {
        success: isSuccess,
        error: !isSuccess ? response.statusText : undefined,
        data: body as IBook,
      };
    } catch (e: unknown) {
      console.log(e);

      return {
        success: false,
        error: "An error occurred"
      };
    }
  },
  update: async (bookId: string, data: object): Promise<IOperationResult<void>> => {
    try {
      const authHeader = headers().get('Authorization');

      if (!authHeader) {
        return {
          success: false,
          error: "Authorization header is missing"
        };
      }

      const url = `${booksApiUrl}/books/${bookId}`;
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Authorization": authHeader
        },
      });
      const isSuccess = response.status === 204 || response.status === 201;

      return {
        success: isSuccess,
        error: !isSuccess ? response.statusText : undefined,
      };
    } catch (e: unknown) {
      console.log(e);
      return {
        success: false,
        error: "An error occurred"
      };
    }
  },
  upload: async (data: FormData): Promise<IOperationResult<void>> => {
    try {
      const authHeader = headers().get('Authorization');

      if (!authHeader) {
        return {
          success: false,
          error: "Authorization header is missing"
        };
      }

      const url = `${booksApiUrl}/books/upload`;
      const response = await fetch(url, {
        method: "POST",
        body: data,
        headers: {
          "Authorization": authHeader
        },
      });
      const isSuccess = response.status === 202;

      return {
        success: isSuccess,
        error: !isSuccess ? response.statusText : undefined,
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: "An error occurred"
      };
    }
  },
  getAll: async (filters: IBookSearchParams): Promise<IOperationResult<IFindResult<IBook>>> => {
    try {
      let url = `${booksApiUrl}/books`;
      if (filters) {
        url += `?${new URLSearchParams({ ...filters }).toString()}`;
      }
      const response = await fetch(url);
      const isSuccess = response.status === 200;

      const body: unknown = isSuccess ? await response.json() : null;

      return {
        success: isSuccess,
        error: !isSuccess ? response.statusText : undefined,
        data: body as IFindResult<IBook>
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: "An error occurred"
      };
    }
  },
};

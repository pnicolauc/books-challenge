import { IBook, IBookSearchParams } from '@/lib/types/book';
import { IFindResult, IOperationResult } from '@/lib/types/shared';
import { headers } from 'next/headers'

const booksApiUrl = process.env.BOOKS_BACKEND_URL;

if(booksApiUrl === undefined) {
  throw new Error("BOOKS_BACKEND_URL is not set")
}

const errorMessageHelper = (response: Response): string | undefined => {
  if (response.status === 400) {
    return "Invalid request";
  }

  if (response.status === 401) {
    return "Unauthorized";
  }

  if (response.status === 403) {
    return "Forbidden";
  }

  if (response.status === 404) {
    return "The book was not found";
  }

  if (response.status === 409) {
    return "The book is already reserved.";
  }

  if (response.status === 412) {
    return "The book was updated by another user. Please refresh the page and try again.";
  }

  if (response.status === 500) {
    return "Internal server error";
  }

  return undefined;
}

export const booksApi = {
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
        error: errorMessageHelper(response),
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
  get: async (bookId: string): Promise<IOperationResult<IBook>> => {
    try {
      const response = await fetch(`${booksApiUrl}/books/${bookId}`);
      const isSuccess = response.status === 200;
      const body: unknown = isSuccess ? await response.json() : null;

      if(body && response.headers.has("etag")) {
        (body as IBook).etag = response.headers.get("etag") ?? undefined;
      }

      return {
        success: isSuccess,
        error: errorMessageHelper(response),
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
  update: async (bookId: string, data: object, etag?: string): Promise<IOperationResult<void>> => {
    try {
      const authHeader = headers().get('Authorization');

      if (!authHeader) {
        return {
          success: false,
          error: "Authorization header is missing"
        };
      }

      const requestHeaders: Record<string,string> = {
        "Content-Type": "application/json",
        "Authorization": authHeader
      };

      if(etag) {
        requestHeaders["If-Match"] = etag;
      }

      const url = `${booksApiUrl}/books/${bookId}`;
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: requestHeaders,
      });
      const isSuccess = response.status === 204 || response.status === 201;

      return {
        success: isSuccess,
        error: errorMessageHelper(response),
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
        error: errorMessageHelper(response),
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: "An error occurred"
      };
    }
  }
};

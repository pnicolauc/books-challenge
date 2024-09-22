export interface IBook {
  bookId: number;
  goodreadsBookId: number;
  bestBookId: number;
  workId: number;
  booksCount: number;
  isbn: string;
  isbn13: number;
  authors: string;
  originalPublicationYear: number;
  originalTitle: string;
  title: string;
  languageCode: string;
  averageRating: number;
  ratingsCount: number;
  workRatingsCount: number;
  workTextReviewsCount: number;
  ratings1: number;
  ratings2: number;
  ratings3: number;
  ratings4: number;
  ratings5: number;
  imageUrl: string;
  smallImageUrl: string;
  etag?: string;
}

export interface IBookSearchParams {
  page?: string;
  pageSize?: string;
  title?: string;
  authors?: string;
  languageCode?: string;
  originalPublicationYear?: string;
  sort?: string;
}

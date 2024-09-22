import { DataTypes } from "sequelize";
import typia from "typia";
import dbClient from "./dbClient";
import { Pattern } from "typia/lib/tags";

typia.createIs<IBook>();
typia.createIs<IBookCsvEntry>();
typia.createIs<IBookSearchFilter>();
typia.createIs<IBookUrlParams>();
typia.createIs<IBookReservationBody>();

type NumberPattern = Pattern<"^-?[0-9]+(\\.[0-9]+)?(e\\+[0-9]+)?$">;
type OptionalNumberPattern = Pattern<"^(-?[0-9]+(\\.[0-9]+)?(e\\+[0-9]+)?)?$">;
export interface IBookCsvEntry {
  book_id: string & NumberPattern;
  goodreads_book_id: string & NumberPattern;
  best_book_id: string & NumberPattern;
  work_id: string & NumberPattern;
  books_count: string & NumberPattern;
  isbn: string;
  isbn13: string & OptionalNumberPattern;
  authors: string;
  original_publication_year?: string & OptionalNumberPattern;
  original_title: string;
  title: string;
  language_code: string;
  average_rating: string & NumberPattern;
  ratings_count: string & NumberPattern;
  work_ratings_count: string & NumberPattern;
  work_text_reviews_count: string & NumberPattern;
  ratings_1: string & NumberPattern;
  ratings_2: string & NumberPattern;
  ratings_3: string & NumberPattern;
  ratings_4: string & NumberPattern;
  ratings_5: string & NumberPattern;
  image_url: string;
  small_image_url: string;
}

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
  reserverdUntil?: Date | null;
  reservedBy?: string | null;
}

export const Book = dbClient().define(
  'books',
  {
    bookId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    goodreadsBookId: DataTypes.INTEGER,
    bestBookId: DataTypes.INTEGER,
    workId: DataTypes.INTEGER,
    booksCount: DataTypes.INTEGER,
    isbn: DataTypes.STRING,
    isbn13: DataTypes.BIGINT,
    authors: DataTypes.TEXT,
    originalPublicationYear: DataTypes.INTEGER,
    originalTitle: DataTypes.TEXT,
    title: DataTypes.TEXT,
    languageCode: DataTypes.STRING,
    averageRating: DataTypes.FLOAT,
    ratingsCount: DataTypes.INTEGER,
    workRatingsCount: DataTypes.INTEGER,
    workTextReviewsCount: DataTypes.INTEGER,
    ratings1: DataTypes.INTEGER,
    ratings2: DataTypes.INTEGER,
    ratings3: DataTypes.INTEGER,
    ratings4: DataTypes.INTEGER,
    ratings5: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    smallImageUrl: DataTypes.STRING,
    reservedUntil: DataTypes.DATE,
    reservedBy: DataTypes.STRING,
  },
  {
    indexes: [
      {
        fields: ['title'],
      },
      {
        fields: ['authors'],
      },
      {
        fields: ['originalPublicationYear'],
      },
      {
        fields: ['languageCode'],
      },
      {
        fields: ['averageRating'],
      },
    ],
    timestamps: false,
  },
);

export interface IBookUrlParams {
  [key: string]: string;
  bookId: string & NumberPattern;
}

export interface IBookSearchFilter {
    title?: string,
    authors?: string,
    originalPublicationYear?: string & NumberPattern,
    languageCode?: string,
    averageRating?: string & NumberPattern,
    sort?: 'title+ASC' | 'title+DESC' | 'averageRating+ASC' | 'averageRating+DESC',
    page?: string & NumberPattern,
    pageSize?: string & NumberPattern
}

export interface IBookReservationBody {
  reservedBy: string;
}

export interface IBookReservation {
  reservedBy: string;
  reservedUntil: Date;
}
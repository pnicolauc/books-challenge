import { Op, OrderItem } from "sequelize";
import { IBook, IBookSearchFilter, Book } from "../models/book";
import { IOperationResult, IFindResult } from "../models/shared";
import dbClient from "../models/dbClient";
import crypto from "crypto";

export class BookService {
  static async findOne(id: number): Promise<IOperationResult<IBook>> {
    try {
      const book = await Book.findByPk(id);

      return {
        success: true,
        data: book ? book.dataValues : null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
      };
    }
  }

  static async find (
    filter: IBookSearchFilter
  ): Promise<IOperationResult<IFindResult<IBook>>> {
    const where: any = {};
    if (filter.title) {
      where.title = {
        [Op.iLike]: `%${filter.title}%`,
      };
    }
    if (filter.authors) {
      where.authors = {
        [Op.iLike]: `%${filter.authors}%`,
      };
    }
    if (filter.languageCode) {
      where.languageCode = filter.languageCode;
    }
    if (filter.originalPublicationYear) {
      where.originalPublicationYear = filter.originalPublicationYear;
    }

    if (filter.averageRating) {
      where.averageRating = filter.averageRating;
    }

    const page = parseInt(filter.page || "1");
    const pageSize = parseInt(filter.pageSize || "10");

    try {
      const { count, rows } = await Book.findAndCountAll({
        where,
        limit: pageSize,
        offset: (page - 1) * pageSize,
        order: filter.sort ? [filter.sort.split("+") as OrderItem] : [],
      });
      return {
        success: true,
        data: {
          items: rows.map((b) => b.dataValues as IBook),
          page,
          pageSize,
          totalItems: count,
        }
      };
    } catch (error) {
      throw error;
    }
  }
  
  static async upsertMany(books: IBook[]): Promise<IOperationResult<boolean>> {
    try {
      await Book.bulkCreate(books as any, {
        updateOnDuplicate: [
          "goodreadsBookId",
          "bestBookId",
          "workId",
          "booksCount",
          "isbn",
          "isbn13",
          "authors",
          "originalPublicationYear",
          "originalTitle",
          "title",
          "languageCode",
          "averageRating",
          "ratingsCount",
          "workRatingsCount",
          "workTextReviewsCount",
          "ratings1",
          "ratings2",
          "ratings3",
          "ratings4",
          "ratings5",
          "imageUrl",
          "smallImageUrl",
        ],
      });

      return {
        success: true,
        data: true,
      };
    } catch (error) {
      return {
        success: false,
        data: false
      };
    }
  }

  static async upsert(book: IBook): Promise<IOperationResult<boolean>> {
    try {
      const [_, created] = await Book.upsert(book as any);
      return {
        success: true,
        data: created
      };
    } catch (error) {
      return {
        success: false,
        data: false
      };
    }
  }

  static async updateIf(
    book: IBook,
    condition: (book: IBook) => boolean
  ): Promise<IOperationResult<boolean>> {
    const transaction = await dbClient().transaction();

    try {
      const existingBook = await Book.findByPk(book.bookId, { transaction });
      if (!existingBook) {
        await transaction.rollback();
        return {
          success: false,
          data: null,
          error: "Book not found",
        };
      }

      if (!condition(existingBook.dataValues)) {
        await transaction.rollback();
        return {
          success: false,
          data: false
        };
      }

      await existingBook.update(book, { transaction });

      await transaction.commit();
      return {
        success: true,
        data: true,
      };
    } catch (error) {
      await transaction.rollback();
      return {
        success: false,
        data: null,
      };
    }
  }

  static async reserve(
    bookId: number,
    reservedBy: string,
    reservedUntil: Date
  ): Promise<IOperationResult<boolean>> {
    const transaction = await dbClient().transaction();

  try {
    const book = await Book.findByPk(bookId, { transaction });
    if (!book) {
      await transaction.rollback();
      return {
        success: false,
        data: false,
        error: "Book not found",
      };
    }

    if (book.dataValues.reservedUntil && book.dataValues.reservedUntil > new Date()) {
      await transaction.rollback();
      return {
        success: false,
        data: false,
        error: "Book is already reserved",
      };
    }

    book.set({
      reservedBy,
      reservedUntil,
    })
    await book.save({ transaction });

    await transaction.commit();
    return {
      success: true,
      data: true,
    };
  } catch (error) {
    await transaction.rollback();
    return {
      success: false,
      data: false,
    };
  }
  }

  static getETag(book: IBook): string {
    const dataString = JSON.stringify(book);
    return crypto.createHash('md5').update(dataString).digest('hex');
  }

  static validateEtag(book: IBook, etag: string): boolean {
    return this.getETag(book) === etag;
  }

};

import Image from "next/image";
import { Rating } from "./Rating";
import { IBook } from "@/lib/types/book";
import { ReservedBadge } from "./ReservedBadge";

interface BookSummaryProps {
  book: IBook;
}

export const BookSummary = ({ book }: BookSummaryProps) => {
  const isBookReserved =
    !!book?.reservedUntil && new Date(book.reservedUntil) > new Date();

  const authors = book.authors.split(",");

  return (
    <div className="flex flex-col">
      <div className="m-2 flex">
        <div className="h-100 flex-none">
          <Image
            className="rounded-t-lg rounded-xl overflow-hidden"
            src={book.imageUrl}
            width={100}
            height={150}
            alt={book.title}
          />
        </div>
        <div className="flex-1 grow">
          <h5 className="ml-2 lg:text-xl font-bold tracking-tight text-white">
            {book.title}
          </h5>
          <div className="flex flex-col flex-1 py-4 px-2">
            <div className="flex items-center">
              <p className="font-normal text-gray-400">{authors[0]} {authors.length > 1 && `+ ${authors.length -1 }` }</p>
              <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full bg-gray-400"></span>
              <p className="font-normal text-gray-400">
                {book.originalPublicationYear}
              </p>
            </div>
            <p className="font-normal text-gray-400">{book.languageCode}</p>
            <Rating rating={book.averageRating} />
            <div>{isBookReserved && <ReservedBadge />}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

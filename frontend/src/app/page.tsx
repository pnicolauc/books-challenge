

import { LinkCard } from "@/components/links/LinkCard";
import { BookSummary } from "@/components/books/BookSummary";
import { BookSearchForm } from "@/components/books/BookSearchForm";
import { PageChanger } from "@/components/lists/PageChanger";
import { BookSortFilter } from "@/components/books/BookSortFilter";
import { PageFrame } from "@/components/frames/PageFrame";
import { booksApi } from "@/api/booksApi";
import { Link } from "@/components/links/Link";
import { IBook, IBookSearchParams } from "@/lib/types/book";
import { getChangedQueryParams } from "@/lib/filters";

export const revalidate = 60;

interface PublicBooksPageProps {
  searchParams: IBookSearchParams;
}

export default async function PublicBooksPage({ searchParams }: PublicBooksPageProps) {
  if (searchParams.pageSize === undefined) {
    searchParams.pageSize = '12';
  }
  const bookResult = await booksApi.getAll(searchParams);

  const Header = () => (
    <div className="md:flex justify-between">
      <BookSearchForm {...searchParams} />
      <div className="flex items-end justify-end">
        <BookSortFilter
          setSort={(sort) => getChangedQueryParams("sort", sort, searchParams)}
          sort={searchParams.sort}
        />
      </div>
    </div>
  );

  const Footer = () => {
    if(!bookResult.success){
      return <></>;
    }

    const currentPage = bookResult.data!.page;
    const totalPages = Math.ceil(bookResult.data!.totalItems / bookResult.data!.pageSize);

    return (bookResult.success &&
      <div className="flex justify-items-center w-full place-content-center">
        <PageChanger
          page={currentPage}
          totalPages={totalPages}
          setPage={(page: string) => getChangedQueryParams("page", page, searchParams)}
        />
      </div>
    )
  }

  let list = <div>Failed to fetch books</div>;

  if (bookResult.success && bookResult.data!.items.length === 0) {
    list = <div>No books</div>;
  }

  if (bookResult.success && bookResult.data!.items.length > 0) {
    list = (
      <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 overflow-hidden">
        {bookResult.data!.items.map((book: IBook) => (
          <LinkCard key={book.bookId} href={book.bookId.toString()}>
            <BookSummary book={book} />
          </LinkCard>
        ))}
      </div>
    );
  }

  return (
    <PageFrame title="Books Challenge" navHeader={<Link href="/admin">Administration</Link>} header={<Header />} footer={<Footer />}>
      {list}
    </PageFrame>
  );
}

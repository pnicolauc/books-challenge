import { booksApi } from "@/api/booksApi";
import { BookDetails } from "@/components/books/BookDetails";
import { BookReserveForm } from "@/components/books/BookReserveForm";
import { BookSummary } from "@/components/books/BookSummary";
import { Card } from "@/components/frames/Card";
import { PageFrame } from "@/components/frames/PageFrame";
import { ArrowLeft } from "@/components/icons/ArrowLeft";
import { Link } from "@/components/links/Link";

export const fetchCache = 'force-no-store';

interface PublicBookPageProps {
  params: {
    bookId: string;
  };
}

export default async function PublicBookPage({ params: { bookId } }: PublicBookPageProps) {
  const bookResult = await booksApi.get(bookId);

  const Header = () => (
    <Link href="/">
      <ArrowLeft />
      Go back to list
    </Link>
  );

  const Footer = () => <></>;
  
  const isBookReserved = (!!bookResult.data?.reservedUntil) && (new Date(bookResult.data.reservedUntil) > new Date()); 

  return (
    <PageFrame
      title="Books Challenge"
      navHeader={<Link prefetch={false} href={`/admin/${bookId}`}>Administration</Link>}
      header={<Header />}
      footer={<Footer />}
    >
      {bookResult.success === true && bookResult.data  ? (
        <div className="flex flex-col items-center">
        <div className="flex flex-col gap-2 w-full lg:w-96">
          <div className="md:mr-10 my-10">
            <BookSummary book={bookResult.data} />
          </div>
          <Card title="Details">
            <BookDetails book={bookResult.data} />
          </Card>
          <Card title="Reservation Details">
            {isBookReserved ? <div>Book is reserved until {bookResult.data.reservedUntil}</div> : <BookReserveForm book={bookResult.data} />}
          </Card>
        </div>
        </div>
      ) : (
        <div>Book not found</div>
      )}
    </PageFrame>
  );
}

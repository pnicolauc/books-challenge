import { booksApi } from "@/api/booksApi";
import { BookDetails } from "@/components/books/BookDetails";
import { BookSummary } from "@/components/books/BookSummary";
import { PageFrame } from "@/components/frames/PageFrame";
import { ArrowLeft } from "@/components/icons/ArrowLeft";
import { Link } from "@/components/links/Link";

export const revalidate = 60;

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

  return (
    <PageFrame
      title="Books Challenge"
      navHeader={<Link href={`/admin/${bookId}`}>Administration</Link>}
      header={<Header />}
      footer={<Footer />}
    >
      {bookResult.success === true && bookResult.data  ? (
        <div>
          <div className="md:mr-10 my-20">
            <BookSummary book={bookResult.data} />
          </div>
          <div>
            <BookDetails book={bookResult.data} />
          </div>
        </div>
      ) : (
        <div>Book not found</div>
      )}
    </PageFrame>
  );
}

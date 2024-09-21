import { booksApi } from "@/api/booksApi";
import { BookUpdateForm } from "@/components/books/BookUpdateForm";
import { PageFrame } from "@/components/frames/PageFrame";
import { ArrowLeft } from "@/components/icons/ArrowLeft";
import { Link } from "@/components/links/Link";

export const revalidate = 1;

interface AdminBookPageProps {
  params: {
    bookId: string;
  };
}

export default async function AdminBookPage({ params: { bookId } }: AdminBookPageProps) {
  const bookResult = await booksApi.get(bookId);

  const Header = () => (
    <Link href="/admin">
      <ArrowLeft />
      Go back to list
    </Link>
  );

  const Footer = () => <></>;

  return (
    <PageFrame
      title="Books Challenge - Admin"
      navHeader={<Link href={`/${bookId}`}>Public</Link>}
      header={<Header />}
      footer={<Footer />}
    >
      {bookResult.success === true && bookResult.data !== undefined && bookResult.data !== null ? (
        <BookUpdateForm book={bookResult.data} />
      ) : (
        <div>Book not found</div>
      )}
    </PageFrame>
  );
}

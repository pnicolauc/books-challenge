import { ArrowLeft } from "../icons/ArrowLeft";
import { ArrowRight } from "../icons/ArrowRight";
import { Link } from "../links/Link";

interface PageChangerProps {
  page: number;
  setPage: (value: string) => string;
  totalPages: number;
}

export const PageChanger = ({ page, setPage, totalPages }: PageChangerProps) => {
  const hasPrevious = page !== 1;
  const hasNext = page !== totalPages;
  return (
    <div className="flex flex-col items-center">
      <p>
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-2">
        <Link
          disabled={!hasPrevious}
          href={hasPrevious ? setPage(`${page - 1}`) : "#"}
          className="w-32 flex space-between"
        >
          <ArrowLeft />
          <p>Previous</p>
        </Link>
        <Link
          disabled={!hasNext}
          href={hasNext ? setPage(`${page + 1}`) : "#"}
          className="w-32"
        >
          Next
          <ArrowRight />
        </Link>
      </div>
    </div>
  );
};

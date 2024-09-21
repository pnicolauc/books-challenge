import { Dropdown } from "../buttons/Dropdown";
import { Link } from "../links/Link";

interface BookSortFilterProps {
  setSort: (value: string) => string;
  sort?: string;
}

export const BookSortFilter = ({ setSort, sort }: BookSortFilterProps) => {
  const sortFilters = [
    {
      label: "Best rated",
      value: "averageRating+DESC",
    },
    {
      label: "Worst rated",
      value: "averageRating+ASC",
    },
    {
      label: "Alphabetically",
      value: "title+ASC",
    },
  ];

  return (
    <Dropdown title="Sort by">
      {sortFilters.map((filter) => (
        <div key={filter.label}>
          <Link
            className={`w-full p-2 block hover:bg-gray-500 overflow-hidden rounded-lg ${sort === filter.value ? "bg-gray-900" : ""}`}
            href={setSort(filter.value)}
          >
            {filter.label}
          </Link>
        </div>
      ))}
    </Dropdown>
  );
};

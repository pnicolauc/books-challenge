import { Stars } from "../icons/Stars";

interface RatingProps {
  rating: number;
}

export const Rating = ({ rating }: RatingProps) => {
  return (
    <div className="flex items-center">
      <Stars number={1} />
      <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
        {rating}
      </p>
    </div>
  );
};

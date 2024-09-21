import { IBook } from "@/lib/types/book";
import { Stars } from "../icons/Stars";

interface BookDetailsProps {
    book: IBook;
}

export const BookDetails = ({ book }: BookDetailsProps) => {
    return (
        <div>
            <div className="flex items-center">
                <Stars number={1} />
                <p>{book.ratings1}</p>
            </div>
            <div className="flex items-center">
                <Stars number={2} />
                <p>{book.ratings2}</p>
            </div>
            <div className="flex items-center">
                <Stars number={3} />
                <p>{book.ratings3}</p>
            </div>
            <div className="flex items-center">
                <Stars number={4} />
                <p>{book.ratings4}</p>
            </div>
            <div className="flex items-center">
                <Stars number={5} />
                <p>{book.ratings5}</p>
            </div>
            <div>Total Ratings: {book.ratingsCount}</div>
            <div>Total Work Text Reviews: {book.workTextReviewsCount}</div>
        </div>
    );
}
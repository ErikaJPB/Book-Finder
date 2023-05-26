import Image from "next/image";
import { AiFillCloseSquare } from "react-icons/ai";
import { Book } from "../types/Book";
import nocover from "../../public/nocover.jpg";

interface BookListItemProps {
  book: Book;
  onRemoveFavorite: (bookId: string) => void;
  onViewDetails: (book: Book) => void;
}

function BookListItem({
  book,
  onRemoveFavorite,
  onViewDetails,
}: BookListItemProps) {
  const handleRemoveFavorite = async () => {
    await onRemoveFavorite(book.id);
  };

  return (
    <li
      key={book.id}
      className="flex m-2 bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105"
      style={{ width: "420px", height: "250px" }}
    >
      {book.thumbnail ? (
        <div className="flex-shrink-0 relative w-40 h-60">
          <div className="w-full h-full rounded-lg overflow-hidden mx-4 my-4 py-2 px-4 mt-4">
            <Image
              src={book.thumbnail}
              alt={book.title}
              height={100}
              width={100}
              objectFit="cover"
              quality={100}
              className="rounded-l-lg"
            />
          </div>
        </div>
      ) : (
        <div className="flex-shrink-0 relative w-40 h-60">
          <div className="w-full h-full rounded-lg overflow-hidden mx-4 my-4 py-2 px-4 mt-4">
            <Image
              src={nocover}
              alt="Placeholder"
              height={100}
              width={150}
              objectFit="cover"
              quality={100}
              className="rounded-l-lg"
            />
          </div>
        </div>
      )}

      <div className="p-6">
        <button
          className="text-lg font-bold hover:underline cursor-pointer"
          onClick={() => onViewDetails(book)}
        >
          {book.title}
        </button>
        <p className="text-gray-400">
          By {book.authors ? book.authors.join(", ") : ""}
        </p>
        <p>Publisher: {book.publisher}</p>
        <p>Published: {book.publishedDate}</p>

        <button
          className="absolute top-0 right-0 mt-2 mr-2 p-1 rounded-full bg-transparent hover:bg-gray-300"
          onClick={handleRemoveFavorite}
        >
          <AiFillCloseSquare className="inline-block fill-current text-gray-900 w-6 h-6" />
        </button>
      </div>
    </li>
  );
}

export default BookListItem;

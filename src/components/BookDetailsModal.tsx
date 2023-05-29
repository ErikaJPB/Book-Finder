import Modal from "../components/Modal";
import { Book } from "../types/Book";
import Image from "next/image";

interface BookDetailsModalProps {
  book: Book | null;
  onClose: () => void;
}

function BookDetailsModal({ book, onClose }: BookDetailsModalProps) {
  const sanitizeDescription = (description: string | undefined): string => {
    if (!description) {
      return "";
    }

    const tempEl = document.createElement("div");
    tempEl.innerHTML = description;
    return tempEl.textContent || tempEl.innerText || "";
  };

  return (
    <Modal isOpen={!!book} onClose={onClose}>
      <div className="modal-content">
        {book && (
          <div className="flex flex-wrap items-start p-6 mr-1 ml-1 w-12/6">
            <div className="w-full md:w-1/2 pr-2 p-4 ">
              <h1 className="text-lg font-bold mb-4">{book.title}</h1>
              <p className="text-gray-700 mb-4">
                By {book.authors ? book.authors.join(", ") : ""}
              </p>
              {book.thumbnail && (
                <div className="flex mb-4">
                  <Image
                    src={book.thumbnail}
                    alt={book.title}
                    height={100}
                    width={120}
                    objectFit="contain"
                    quality={100}
                  />
                </div>
              )}
              <div className="text-gray-700 mb-2">
                Publisher: {book.publisher}
              </div>
              <div className="text-gray-700 mb-2">
                Published Year:{" "}
                {book.publishedDate
                  ? new Date(book.publishedDate).getFullYear()
                  : ""}
              </div>
              <div className="text-gray-700 mb-2">
                Page Count: {book.pageCount}
              </div>
              <div className="text-gray-700 mb-2">
                Categories: {book.categories ? book.categories.join(", ") : ""}
              </div>
              <div className="text-gray-700 mb-2">
                Rating: {book.averageRating}
              </div>
            </div>
            <div className="w-full md:w-1/2 pl-4">
              <div className="text-gray-700 mb-2 mr-3 text-justify text-sm ml-2">
                {sanitizeDescription(book.description)}
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default BookDetailsModal;

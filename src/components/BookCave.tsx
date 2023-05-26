import Image from "next/image";
import { useState } from "react";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { useRouter } from "next/router";
import { addToFavorites } from "../utils/favorites";
import Pagination from "./Pagination";
import nocover from "../../public/nocover.jpg";
import { Book } from "../types/Book";

function BookCove() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);

  const router = useRouter();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const maxResults = 40;
    const startIdx = (currentPage - 1) * maxResults;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=${startIdx}&maxResults=${maxResults}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    setSearchResults(
      data.items?.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || [],
        description: item.volumeInfo.description || "",
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
        publisher: item.volumeInfo.publisher || "",
        publishedDate: item.volumeInfo.publishedDate || "",
        pageCount: item.volumeInfo.pageCount || "",
        categories: item.volumeInfo.categories || [],
        averageRating: item.volumeInfo.averageRating || "",
      }))
    );
    setCurrentPage(1);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = searchResults.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-10 text-gray-700 my-6">BookCove</h1>
      <form onSubmit={handleSubmit} className="max-w-md w-full px-2 py-4">
        <label htmlFor="search-input" className="sr-only ">
          Search for a book
        </label>
        <div className="relative rounded border-gray-900 shadow-sm">
          <input
            id="search-input"
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className="block w-full px-4 py-2 sm:text-sm rounded focus:outline-none focus:ring-gray-500 focus:border-gray-500 placeholder-gray-500"
            placeholder="Search for a book"
          />
          <button
            type="submit"
            className="absolute top-0 right-0 bottom-0 px-3 py-2 bg-gray-200 text-gray-700 font-bold rounded-r hover:bg-gray-400 focus:outline-none focus:ring-gray-400 focus:ring-offset-blue-200 focus:ring-2"
          >
            <BsSearch className="w-5 h-5" />
          </button>
        </div>
      </form>
      {searchResults.length > 0 && (
        <ul className="mt-8 ml-8 mr-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {currentBooks?.map((book) => (
            <li
              key={book.id}
              className="flex m-2 bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              style={{ width: "400px", height: "220px" }}
            >
              <div className="absolute top-0 right-0 p-2">
                <button onClick={() => addToFavorites(book.id, router)}>
                  <BsFillBookmarkHeartFill className="inline-block fill-current text-gray-900 w-6 h-6 " />
                </button>
              </div>
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

              <div className="p-6 flex-grow">
                <h2 className="text-base font-medium text-gray-800">
                  {book.title}
                </h2>
                <p className="text-sm font-light text-gray-600">
                  By {book.authors.join(", ")}
                </p>

                {book.publisher && (
                  <p className="text-sm font-light text-gray-600">
                    Publisher: {book.publisher}
                  </p>
                )}
                {book.publishedDate && (
                  <p className="text-sm font-light text-gray-600">
                    Published Year: {new Date(book.publishedDate).getFullYear()}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      <div>
        <Pagination
          booksPerPage={booksPerPage}
          totalBooks={searchResults.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default BookCove;

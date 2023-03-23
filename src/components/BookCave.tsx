import Image from "next/image";
import { useState } from "react";

interface Book {
  id: string;
  title: string;
  authors: string[];
  description: string;
  thumbnail: string;
}

const BookCove = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    setSearchResults(
      data.items.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || [],
        description: item.volumeInfo.description || "",
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
      }))
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-8">BookCove</h1>
      <form onSubmit={handleSubmit} className="max-w-md w-full">
        <label htmlFor="search-input" className="sr-only">
          Search for a book
        </label>
        <div className="relative rounded border-gray-700 shadow-sm">
          <input
            id="search-input"
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className="block w-full px-3 py-2 sm:text-sm rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
            placeholder="Search for a book"
          />
          <button
            type="submit"
            className="absolute top-0 right-0 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 focus:outline-none focus:ring-blue-500 focus:ring-offset-blue-200 focus:ring-2"
          >
            Search
          </button>
        </div>
      </form>
      {searchResults.length > 0 && (
        <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {searchResults?.map((book) => (
            <li
              key={book.id}
              className="flex m-2 bg-white rounded-lg overflow-hidden shadow-lg"
            >
              {book.thumbnail && (
                <div className="flex-shrink-0 relative w-40 h-60">
                  <Image
                    src={book.thumbnail}
                    alt={book.title}
                    width={200}
                    height={150}
                    className="rounded-l-lg mx-2 my-2"
                  />
                </div>
              )}

              <div className="p-6 flex-grow">
                <h2 className="text-lg font-bold">{book.title}</h2>
                <p className="text-gray-600">By {book.authors.join(", ")}</p>
                <p className="mt-4 text-sm text-gray-900 leading-snug">
                  {book.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookCove;

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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8">BookCove</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search-input" className="sr-only">
          Search for a book
        </label>
        <div className="relative rounded-md shadow-sm">
          <input
            id="search-input"
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className="block w-full pr-10 sm:text-sm rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 border-gray-300"
            placeholder="Search for a book"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:ring-offset-blue-200 focus:ring-2"
          >
            Search
          </button>
        </div>
      </form>
      {searchResults.length > 0 && (
        <ul>
          {searchResults?.map((book) => (
            <li key={book.id}>
              <h2>{book.title}</h2>
              <p>By {book.authors.join(", ")}</p>
              {book.thumbnail && (
                <Image
                  src={book.thumbnail}
                  alt={book.title}
                  width={100}
                  height={150}
                />
              )}
              <p>{book.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookCove;

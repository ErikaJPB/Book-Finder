import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import {
  getFavorites,
  getBookDetails,
  removeFavorite,
} from "../utils/favorites";
import Image from "next/image";
import { BsFillBookmarkHeartFill } from "react-icons/bs";

import Link from "next/link";
import nocover from "../../public/nocover.jpg";
import { AiFillCloseSquare } from "react-icons/ai";

type Book = {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string;
  publisher?: string;
  publishedDate?: string;
};

function Favorites() {
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    async function fetchUserFavorites() {
      const bookIds = await getFavorites(userId!);
      const bookDetails = await Promise.all(bookIds.map(getBookDetails));
      setFavorites(bookDetails);
      setIsLoading(false);
    }

    if (userId) {
      fetchUserFavorites();
    }
  }, [userId]);

  const handleRemoveFavorite = async (bookId: string) => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.log("No user is currently logged in.");
      return;
    }

    await removeFavorite(bookId);
    const updatedFavorites = favorites.filter((book) => book.id !== bookId);
    setFavorites(updatedFavorites);
  };

  return (
    <div className="bg-white text-gray-700 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Favorite Books</h1>
        {isLoading ? (
          <p className="text-center text-gray-700">Loading favorites...</p>
        ) : favorites.length > 0 ? (
          <ul className="mt-8 ml-8 mr-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {favorites.map((book) => (
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
                  <Link href={`/books/${book.id}`}>
                    <p className="text-lg font-bold hover:underline">
                      {book.title}
                    </p>
                  </Link>
                  <p className="text-gray-400">
                    By {book.authors ? book.authors.join(", ") : ""}
                  </p>
                  <p>Publisher: {book.publisher}</p>
                  <p>Published: {book.publishedDate}</p>

                  <button
                    className="absolute top-0 right-0 mt-2 mr-2 p-1 rounded-full bg-transparent hover:bg-gray-300"
                    onClick={async () => {
                      await handleRemoveFavorite(book.id);
                    }}
                  >
                    <AiFillCloseSquare className="inline-block fill-current text-gray-900 w-6 h-6" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorites yet</p>
        )}
      </div>
    </div>
  );
}

export default Favorites;

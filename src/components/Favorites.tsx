import React, { useState, useEffect } from "react";
import { auth, firestore } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import {
  getFavorites,
  getBookDetails,
  removeFavorite,
  fetchFavorites,
} from "../utils/favorites";
import Image from "next/image";

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
    async function fetchFavorites() {
      const bookIds = await getFavorites(userId!);
      const bookDetails = await Promise.all(bookIds.map(getBookDetails));
      setFavorites(bookDetails);
      setIsLoading(false);
    }

    if (userId) {
      fetchFavorites();
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
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((book) => (
              <li
                key={book.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg relative"
              >
                {book.thumbnail && (
                  <div className="w-full h-40">
                    <Link href={`/books/${book.id}`}>
                      <Image
                        src={book.thumbnail}
                        height={100}
                        width={100}
                        quality={100}
                        alt={book.title}
                        className="rounded-t-lg w-full h-full object-cover"
                      />
                    </Link>
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
                    className="bg-transparent border border-white rounded-full px-2 py-1 text-sm font-semibold mt-4 mr-4"
                    onClick={() => handleRemoveFavorite(book.id)}
                  >
                    <BsFillBookmarkHeartFill className="inline-block fill-current text-gray-900 w-6 h-6 " />
                    Favorite
                  </button>
                  <button
                    className="absolute top-0 right-0 mt-2 mr-2 p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                    onClick={async () => {
                      await handleRemoveFavorite(book.id);
                    }}
                  >
                    <AiOutlineClose className="inline-block fill-current text-gray-900 w-6 h-6" />
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

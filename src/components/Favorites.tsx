import React, { useState, useEffect } from "react";
import { auth, firestore } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import Link from "next/link";

type Book = {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string;
};

async function getFavorites(userId: string) {
  const favoritesRef = collection(firestore, "favorites");
  const q = query(favoritesRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const favorites = querySnapshot.docs.map((doc) => doc.data().bookId);
  return favorites;
}

async function getBookDetails(bookId: string): Promise<Book> {
  const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
  const response = await fetch(url);
  const data = await response.json();

  const book = {
    id: bookId,
    title: data.volumeInfo.title,
    authors: data.volumeInfo.authors || [],
    thumbnail: data.volumeInfo.imageLinks?.thumbnail || "",
  };
  return book;
}

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
                className="bg-white rounded-lg overflow-hidden shadow-lg"
              >
                {book.thumbnail && (
                  <div className="relative w-full h-40">
                    <Link href={`/books/${book.id}`}>
                      <img
                        src={book.thumbnail}
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
                  <p className="text-gray-400">By {book.authors.join(", ")}</p>
                  <button
                    className="bg-transparent border border-white rounded-full px-2 py-1 text-sm font-semibold mt-4"
                    disabled
                  >
                    <BsFillBookmarkHeartFill className="inline-block fill-current text-gray-900 w-6 h-6 " />
                    Favorite
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

import { useState, useEffect } from "react";
import { Book } from "../types/Book";
import { auth } from "../../firebase";
import {
  getFavorites,
  getBookDetails,
  removeFavorite,
} from "../utils/favorites";

import BookListItem from "../components/BookListItem";
import BookDetailsModal from "./BookDetailsModal";
import { FaSpinner } from "react-icons/fa";

function Favorites() {
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

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
    await removeFavorite(userId, bookId);
    const updatedFavorites = favorites.filter((book) => book.id !== bookId);
    setFavorites(updatedFavorites);
  };

  const handleViewDetails = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  return (
    <div className="bg-white text-gray-700 py-8 w-full">
      <div className="container max-w-full">
        <h1 className="text-3xl font-bold mb-8 text-center items-center">
          Favorite Books
        </h1>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <FaSpinner className="animate-spin h-5 w-5 text-gray-700" />
          </div>
        ) : favorites.length > 0 ? (
          <ul className="mt-8 mx-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {favorites.map((book) => (
              <BookListItem
                key={book.id}
                book={book}
                onRemoveFavorite={handleRemoveFavorite}
                onViewDetails={handleViewDetails}
              />
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center mt-8">
            <p className="text-center text-gray-700 text-lg font-medium mb-2">
              No favorites yet
            </p>
            <p className="text-center text-gray-500">
              You haven't added any books to your favorites yet. Start exploring
              and add some books to your list!
            </p>
          </div>
        )}

        <BookDetailsModal book={selectedBook} onClose={handleCloseModal} />
      </div>
    </div>
  );
}
export default Favorites;

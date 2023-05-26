import { auth, firestore, collection, addDoc } from "../../firebase";
import { query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export async function addToFavorites(bookId: string, router: any) {
  const userId = auth.currentUser?.uid;

  if (!userId) {
    toast.error("You must be logged in to add a book to your favorites.");
    router.push("/login");
    return;
  }

  const favoritesRef = collection(firestore, "favorites");

  await addDoc(favoritesRef, {
    userId: userId,
    bookId: bookId,
  });
  toast.success("The book was added to your favorites");
}

export async function getFavorites(userId: string) {
  const favoritesRef = collection(firestore, "favorites");
  const q = query(favoritesRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const favorites = querySnapshot.docs.map((doc) => doc.data().bookId);
  return favorites;
}

type Book = {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string;
  description: string;
  publisher: string;
  publishedDate: string;
  averageRating: number;
  pageCount: number;
  categories: string[];
};

export async function getBookDetails(bookId: string): Promise<Book> {
  const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
  const response = await fetch(url);
  const data = await response.json();

  const book = {
    id: bookId,
    title: data.volumeInfo.title,
    authors: data.volumeInfo.authors || [],
    thumbnail:
      data.volumeInfo.imageLinks?.thumbnail ||
      data.volumeInfo.imageLinks?.large,
    description: data.volumeInfo.description || "",
    publisher: data.volumeInfo.publisher || "",
    publishedDate: data.volumeInfo.publishedDate || "",
    averageRating: data.volumeInfo.averageRating || 0,
    pageCount: data.volumeInfo.pageCount || 0,
    categories: data.volumeInfo.categories || [],
  };
  return book;
}

export async function removeFavorite(bookId: string) {
  const userId = auth.currentUser?.uid;

  const favoritesRef = collection(firestore, "favorites");
  const q = query(
    favoritesRef,
    where("bookId", "==", bookId),
    where("userId", "==", userId)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    console.log(`Favorite ${bookId} not found for user ${userId}`);
    return;
  }
  const docToDelete = querySnapshot.docs[0].ref;

  await deleteDoc(docToDelete);
  toast.success("The book was removed from your favorites");
}

export async function fetchFavorites(userId: string) {
  const bookIds = await getFavorites(userId);
  const bookDetails = await Promise.all(bookIds.map(getBookDetails));
  return bookDetails;
}

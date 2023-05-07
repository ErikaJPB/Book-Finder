import { auth, firestore, collection, addDoc } from "../../firebase";
import { query, where, getDocs, doc, deleteDoc } from "firebase/firestore";

export async function addToFavorites(bookId: string, router: any) {
  const userId = auth.currentUser?.uid;

  if (!userId) {
    alert("You must be logged in to add a book to your favorites.");

    router.push("/login");
    return;
  }

  const favoritesRef = collection(firestore, "favorites");

  await addDoc(favoritesRef, {
    userId: userId,
    bookId: bookId,
  });
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
    description: data.volumeInfo.description || [],
  };
  return book;
}

export async function removeFavorite(bookId: string) {
  const userId = auth.currentUser?.uid;
  console.log("userId:", userId);

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
  console.log(`Removed favorite ${bookId} for user ${userId}`);
}
export async function fetchFavorites(userId: string) {
  const bookIds = await getFavorites(userId);
  const bookDetails = await Promise.all(bookIds.map(getBookDetails));
  return bookDetails;
}

import Image from "next/image";
import { fetchFavorites, getBookDetails } from "../../utils/favorites";

export async function getServerSideProps(context: any) {
  const { bookId } = context.query;
  const bookDetails = await getBookDetails(bookId);
  const userId = context.req.cookies.userId;
  const favorites = userId ? await fetchFavorites(userId) : [];

  return {
    props: {
      bookDetails,
      favorites,
    },
  };
}

function BookDetails({ bookDetails, favorites }: any) {
  return (
    <div>
      <h1>{bookDetails.title}</h1>
      <p>{bookDetails.authors}</p>

      <Image
        src={bookDetails.thumbnail}
        alt={bookDetails.id}
        width={90}
        height={90}
      />
      <p>{bookDetails.description}</p>
    </div>
  );
}

export default BookDetails;

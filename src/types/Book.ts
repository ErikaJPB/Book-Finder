export interface Book {
  id: string;
  title: string;
  authors?: string[];
  description?: string;
  categories?: string[];
  thumbnail?: string;
  publisher?: string;
  publishedDate?: string;
  averageRating?: number;
  pageCount?: number;
}

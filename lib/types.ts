export interface ICategory {
  _id: string;
  title: string;
  description: string;
  image: string;
}

export interface ErrorResponse {
  error: string;
}

export interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  oldPrice: number;
  images: string[];
  stockQuantity: number;
  specifications: string[];
  isFeatured: boolean;
  category: string | ICategory;
}

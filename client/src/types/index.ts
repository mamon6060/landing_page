export type TBanner = {
  image?: string;
  title?: string;
  details?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TProduct = {
  _id: string;
  image: string;
  title: string;
  details?: string;
  price: number;
  salePrice: number;
  createdAt?: Date;
  updatedAt?: Date;
  offer?: string;
};

export interface Image {
  id: number;
  url: string;
  productId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type Item = {
  id: string;
  name: string;
  description?: string;
  imgUrl?: string;
};

export type ItemWithQty = Item & { qty: number; category: string };

import { CartItem } from "./cart/page";

export type Invoice = {
  id: number;
  items: CartItem[];
  datetime: string;
  total: number;
};
